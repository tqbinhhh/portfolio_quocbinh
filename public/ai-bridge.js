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
  } else {
    voiceBtn.classList.remove('active');
    voiceBtn.innerText = "🔇 Voice Off";
  }
});

function speak(text) {
  if (!voiceEnabled || synth.speaking) return;
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

  // Open Palm: All fingers open
  if (isThumbOpen && isIndexOpen && isMiddleOpen && isRingOpen && isPinkyOpen) {
    return "Xin chào";
  }
  
  // Closed Fist: All fingers closed
  if (!isThumbOpen && !isIndexOpen && !isMiddleOpen && !isRingOpen && !isPinkyOpen) {
    return "Dừng lại";
  }

  // Peace Sign: Index and Middle open, others closed
  if (!isThumbOpen && isIndexOpen && isMiddleOpen && !isRingOpen && !isPinkyOpen) {
    return "Hòa bình";
  }

  // I Love You: Thumb, Index, Pinky open, Middle & Ring closed
  if (isThumbOpen && isIndexOpen && !isMiddleOpen && !isRingOpen && isPinkyOpen) {
    return "Tôi yêu bạn";
  }

  // Thumbs Up: Thumb pointing UP (y smaller than base), others closed
  if (landmarks[4].y < landmarks[3].y && !isIndexOpen && !isMiddleOpen && !isRingOpen && !isPinkyOpen) {
    return "Tuyệt vời";
  }

  return "Unknown";
}

function updateUI(text) {
  if (currentGestureText.innerText !== text) {
    currentGestureText.innerText = text;
    currentGestureText.classList.remove('waiting');
    speak(text);
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
