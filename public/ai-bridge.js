const videoElement = document.getElementsByClassName('input_video')[0];
const canvasElement = document.getElementsByClassName('output_canvas')[0];
const canvasCtx = canvasElement.getContext('2d');
const statusText = document.getElementById('status-text');
const currentGestureText = document.getElementById('current-gesture');
const voiceBtn = document.getElementById('toggle-voice');

let voiceEnabled = true;
let currentGesture = "";
let gestureFrames = 0;
const GESTURE_THRESHOLD = 15; // Number of consecutive frames needed to confirm a gesture

let sentence = [];
let lastAddedGesture = "";

// Speech Synthesis Setup
const synth = window.speechSynthesis;
let vietnameseVoice = null;

// Wait for voices to load
function loadVoices() {
  const voices = synth.getVoices();
  // Try to find a Vietnamese voice, fallback to any available
  vietnameseVoice = voices.find(voice => voice.lang.includes('vi')) || voices[0];
}
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = loadVoices;
}

voiceBtn.addEventListener('click', () => {
  voiceEnabled = !voiceEnabled;
  if (voiceEnabled) {
    voiceBtn.classList.add('active');
    voiceBtn.innerText = "🔊 Voice On";
    if (synth.resume) synth.resume();
  } else {
    voiceBtn.classList.remove('active');
    voiceBtn.innerText = "🔇 Voice Off";
    synth.cancel();
  }
});

// Unlock speech synthesis on first interaction for iOS/Mobile
let speechUnlocked = false;
document.body.addEventListener('click', () => {
  if (!speechUnlocked) {
    if (synth.resume) synth.resume();
    const unlockUtterance = new SpeechSynthesisUtterance('');
    synth.speak(unlockUtterance);
    speechUnlocked = true;
  }
}, { once: true });

function speak(text) {
  if (!voiceEnabled) return;
  
  // Cancel any ongoing speech to prevent getting stuck (especially on iOS)
  synth.cancel();
  
  const utterThis = new SpeechSynthesisUtterance(text);
  if (vietnameseVoice) {
    utterThis.voice = vietnameseVoice;
  }
  utterThis.lang = 'vi-VN';
  synth.speak(utterThis);
}

// Distance helper
function calculateDistance(p1, p2) {
  return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}

// Simple Gesture Recognition Heuristics
function detectGesture(landmarks) {
  // Landmarks indices
  // Thumb: 4, Index: 8, Middle: 12, Ring: 16, Pinky: 20
  // PIP joints (lower joints): Index: 6, Middle: 10, Ring: 14, Pinky: 18
  
  const isThumbOpen = calculateDistance(landmarks[4], landmarks[17]) > calculateDistance(landmarks[3], landmarks[17]);
  const isIndexOpen = landmarks[8].y < landmarks[6].y;
  const isMiddleOpen = landmarks[12].y < landmarks[10].y;
  const isRingOpen = landmarks[16].y < landmarks[14].y;
  const isPinkyOpen = landmarks[20].y < landmarks[18].y;

  // Closed Fist: All fingers closed
  if (!isThumbOpen && !isIndexOpen && !isMiddleOpen && !isRingOpen && !isPinkyOpen) {
    return "[Xóa câu]";
  }

  // Thumbs Up: Thumb pointing UP (y smaller than base), others closed
  if (landmarks[4].y < landmarks[3].y && !isIndexOpen && !isMiddleOpen && !isRingOpen && !isPinkyOpen) {
    return "[Đọc câu]";
  }

  // Open Palm: All fingers open
  if (isThumbOpen && isIndexOpen && isMiddleOpen && isRingOpen && isPinkyOpen) {
    return "Xin chào";
  }

  // Peace Sign: Index and Middle open, others closed
  if (!isThumbOpen && isIndexOpen && isMiddleOpen && !isRingOpen && !isPinkyOpen) {
    return "mọi người";
  }

  // Index Up: Index open, others closed
  if (!isThumbOpen && isIndexOpen && !isMiddleOpen && !isRingOpen && !isPinkyOpen) {
    return "tôi";
  }

  // Rock Sign: Index and Pinky open, others closed
  if (!isThumbOpen && isIndexOpen && !isMiddleOpen && !isRingOpen && isPinkyOpen) {
    return "rất vui";
  }

  // I Love You: Thumb, Index, Pinky open, Middle & Ring closed
  if (isThumbOpen && isIndexOpen && !isMiddleOpen && !isRingOpen && isPinkyOpen) {
    return "được gặp";
  }

  // Pinky Up: Pinky open, others closed
  if (!isThumbOpen && !isIndexOpen && !isMiddleOpen && !isRingOpen && isPinkyOpen) {
    return "bạn";
  }

  // Four Fingers (all except thumb)
  if (!isThumbOpen && isIndexOpen && isMiddleOpen && isRingOpen && isPinkyOpen) {
    return "cảm ơn!";
  }

  return "Unknown";
}

function updateUI(text) {
  if (text === "[Xóa câu]") {
    sentence = [];
    currentGestureText.innerText = "Đã xóa câu...";
    currentGestureText.classList.add('waiting');
    lastAddedGesture = text;
    return;
  }
  
  if (text === "[Đọc câu]") {
    if (sentence.length > 0 && lastAddedGesture !== text) {
      const fullSentence = sentence.join(" ");
      speak(fullSentence);
      currentGestureText.innerText = fullSentence + " 🔊";
      lastAddedGesture = text;
    }
    return;
  }

  if (text !== "Unknown" && text !== lastAddedGesture) {
    sentence.push(text);
    lastAddedGesture = text;
    
    currentGestureText.innerText = sentence.join(" ");
    currentGestureText.classList.remove('waiting');
  }
}

function onResults(results) {
  // Hide status overlay once we get first result
  if (statusText.style.display !== 'none') {
    statusText.style.display = 'none';
  }

  canvasCtx.save();
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  
  // Draw video feed
  canvasCtx.drawImage(
      results.image, 0, 0, canvasElement.width, canvasElement.height);

  if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
    for (const landmarks of results.multiHandLandmarks) {
      // Draw Skeleton
      drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS,
                     {color: '#00ff88', lineWidth: 4});
      drawLandmarks(canvasCtx, landmarks, {color: '#ffffff', lineWidth: 2, radius: 4});
      
      // Detect Gesture
      const detected = detectGesture(landmarks);
      
      if (detected !== "Unknown") {
        if (detected === currentGesture) {
          gestureFrames++;
          if (gestureFrames === GESTURE_THRESHOLD) {
            updateUI(detected);
          }
        } else {
          currentGesture = detected;
          gestureFrames = 0;
        }
      } else {
        gestureFrames = 0;
      }
    }
  } else {
    // No hands detected
    currentGesture = "";
    gestureFrames = 0;
    lastAddedGesture = ""; // Reset to allow repeating the same word after dropping hand
  }
  canvasCtx.restore();
}

// Initialize MediaPipe Hands
const hands = new Hands({locateFile: (file) => {
  return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
}});

hands.setOptions({
  maxNumHands: 1,
  modelComplexity: 1,
  minDetectionConfidence: 0.7,
  minTrackingConfidence: 0.7
});

hands.onResults(onResults);

// Initialize Camera
const camera = new Camera(videoElement, {
  onFrame: async () => {
    await hands.send({image: videoElement});
  },
  width: 1280,
  height: 720
});

camera.start().catch(err => {
  statusText.innerText = "Error: Camera access denied or not available.";
  statusText.style.color = "#ff4444";
});
