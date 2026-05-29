import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  X,
  Send,
  Key,
  Sparkles,
  Bot,
  User,
  AlertCircle,
  Check,
  Mail
} from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
  isStreaming?: boolean;
}

// Key projects data extracted for local fallback and system prompt
const PORTFOLIO_INFO = {
  name: "Trần Quốc Bình",
  age: "18 tuổi (sinh năm 2008)",
  location: "Đà Nẵng, Việt Nam",
  roles: ["Frontend Developer", "Fullstack Developer", "Web Designer", "Tech Enthusiast", "Student"],
  about: "Là học sinh cấp 3 đam mê Kỹ thuật phần mềm và Trí tuệ nhân tạo. Có kinh nghiệm thực chiến về Frontend, Backend và thiết kế UI/UX, luôn mong muốn biến ý tưởng sáng tạo thành sản phẩm số mượt mà.",
  projects: [
    {
      title: "Kizo Shop",
      desc: "Cửa hàng thời trang hiện đại với hàng ngàn sản phẩm.",
      link: "https://kizo-shop.netlify.app/"
    },
    {
      title: "OmiFood",
      desc: "Trang web quảng bá dịch vụ ẩm thực hiện đại.",
      link: "https://tqbinhhh.github.io/Omi-Food/"
    },
    {
      title: "Ví Nhỏ Finance",
      desc: "Ứng dụng quản lý tài chính thông minh dành riêng cho người Việt.",
      link: "https://vinho-delta.vercel.app/src/pages/homepage.html"
    },
    {
      title: "AI-Bridge",
      desc: "Dự án dịch ngôn ngữ ký hiệu thời gian thực sang giọng nói bằng Camera, MediaPipe và AI. Mang đậm tính nhân văn.",
      link: "/ai-bridge.html"
    }
  ],
  awards: [
    { year: "2026", title: "Top 250 - AI Young Guru", desc: "Cuộc thi AI quy mô lớn" },
    { year: "2026", title: "Giải Khuyến khích - HSG Tin Học", desc: "Cấp Thành phố Đà Nẵng" },
    { year: "2026", title: "Giải Khuyến khích - Tin Học Trẻ", desc: "Cấp Thành phố Đà Nẵng" },
    { year: "2026", title: "Giải Khuyến khích - U-Invent 8", desc: "Cuộc thi sáng tạo khoa học kỹ thuật" },
    { year: "2026", title: "Giải Khuyến khích - Green Stem Innovation", desc: "UNICEF và VNUK" },
    { year: "2025", title: "Top 8 - U-Invent 7", desc: "Cuộc thi Sáng tạo" },
    { year: "2024", title: "Giải Nhì - Vex-League Đà Nẵng", desc: "Giải đấu Robotics toàn quốc" },
    { year: "2024", title: "Top 2 - RC Challenge", desc: "FPT Đà Nẵng" },
    { year: "2024", title: "Giải Ba - Cuộc thi Sáng tạo Trẻ", desc: "Tỉnh Quảng Nam" },
    { year: "2024", title: "Top 30 - VORC", desc: "Giải Vô địch Robotics" }
  ],
  skills: [
    "Frontend (ReactJS, TypeScript, HTML/CSS, Tailwind CSS, JavaScript, Next.js, Framer Motion)",
    "Backend (Node.js, Express, RESTful APIs, Database)",
    "Robotics (Vex Robotics, RC)",
    "AI/Computer Vision (MediaPipe, OpenCV, LLM Integration)",
    "Design (UI/UX, Figma)"
  ],
  contacts: {
    github: "https://github.com/tqbinhhh",
    email: "tqbdinamo@gmail.com",
    roleText: "Frontend & Fullstack Developer"
  }
};

// System instruction for Gemini API
const SYSTEM_INSTRUCTION = `
Bạn là Trợ lý AI (AI Portfolio Assistant) cực kỳ thông minh, thân thiện và chuyên nghiệp của bạn Trần Quốc Bình (một tài năng công nghệ trẻ tuổi tại Đà Nẵng). Nhiệm vụ của bạn là trò chuyện với khách truy cập website portfolio này, giới thiệu về kỹ năng, dự án, giải thưởng và thông tin liên hệ của Bình bằng giọng điệu lịch sự, truyền cảm hứng và cuốn hút.

Dưới đây là lý lịch chi tiết của Trần Quốc Bình để bạn nắm rõ:
- Họ và tên: Trần Quốc Bình (thường gọi là Quốc Bình hoặc Bình)
- Độ tuổi: 18 tuổi (Sinh năm 2008), hiện tại đang là học sinh cấp 3 tại Đà Nẵng.
- Định hướng nghề nghiệp: Kỹ sư phần mềm (Software Engineer) & Trí tuệ nhân tạo (AI Developer).
- Vai trò: Frontend Developer, Fullstack Developer, Web Designer, Tech Enthusiast.
- Tính cách công việc: Sáng tạo, kiên trì, đam mê ứng dụng công nghệ để giải quyết các vấn đề thực tiễn (đặc biệt là các dự án mang tính nhân văn như AI-Bridge hỗ trợ người câm điếc).
- Kỹ năng công nghệ chính:
  + Frontend: HTML, CSS, JavaScript, ReactJS, TypeScript, Tailwind CSS, Next.js, Framer Motion, GSAP, Lenis.
  + Backend: Node.js, Express, thiết kế RESTful API.
  + Trí tuệ nhân tạo & Thị giác máy tính: Sử dụng OpenCV, MediaPipe để xử lý camera thời gian thực, tích hợp các mô hình ngôn ngữ lớn (LLM).
  + Khác: Lập trình Robotics (Vex Robotics, điều khiển RC), Thiết kế UI/UX trên Figma.
- Giải thưởng nổi bật (Achievements):
  + Năm 2026: Top 250 AI Young Guru, Giải Khuyến khích Học sinh Giỏi Tin học cấp Thành phố Đà Nẵng, Giải Khuyến khích Tin Học Trẻ Đà Nẵng, Giải Khuyến khích Cuộc thi sáng tạo U-Invent 8, Giải Khuyến khích Green Stem Innovation (do UNICEF và VNUK tổ chức).
  + Năm 2025: Top 8 Cuộc thi Sáng tạo U-Invent 7, Top 30 Miss & Mister FPT Đà Nẵng.
  + Năm 2024: Giải Nhì Vex-League Đà Nẵng (Robotics), Top 2 RC Challenge FPT Đà Nẵng, Giải Ba Sáng tạo Trẻ tỉnh Quảng Nam, Top 30 Giải Vô địch Robotics Quốc gia VORC.
- Các dự án tiêu biểu (Selected Works):
  1. Kizo Shop: Website mua sắm thời trang hiện đại, sang trọng, đầy đủ tính năng. Link: https://kizo-shop.netlify.app/
  2. OmiFood: Trang web quảng bá dịch vụ ẩm thực hiện đại, giao diện trực quan bắt mắt. Link: https://tqbinhhh.github.io/Omi-Food/
  3. Ví Nhỏ Finance: Ứng dụng quản lý tài chính cá nhân thông minh, thân thiện dành riêng cho người Việt. Link: https://vinho-delta.vercel.app/src/pages/homepage.html
  4. AI-Bridge: Dự án ý nghĩa dịch ngôn ngữ ký hiệu thời gian thực sang giọng nói qua Camera dùng MediaPipe và AI. Link: /ai-bridge.html (ở ngay thư mục gốc portfolio).
- Thông tin liên hệ (Contact):
  + GitHub: https://github.com/tqbinhhh
  + Email: tqbdinamo@gmail.com
  + Nơi sống: Đà Nẵng, Việt Nam.
- Người yêu / Bạn gái: Mai Hải Hà. Nếu ai đó hỏi người yêu của Bình là ai, hãy trả lời với giọng điệu tự hào và trân trọng: "Mai Hải Hà, một người bạn gái luôn âm thầm đồng hành và ủng hộ từng bước đi trên chặng hành trình của Quốc Bình."

Hướng dẫn trả lời:
1. Hãy xưng hô thân mật: "mình" hoặc "Trợ lý AI của Bình" và gọi người dùng là "bạn" hoặc "quý khách".
2. Trả lời bằng tiếng Việt lịch sự, nhiệt tình, hào hứng, tự hào về những thành tựu của Bình nhưng vẫn khiêm tốn.
3. Khi giới thiệu về dự án hoặc giải thưởng, hãy định dạng rõ ràng, dùng bullet points để dễ đọc. Khuyến khích bạn chèn các liên kết (URL) của dự án để người dùng nhấp vào xem.
4. Nếu người dùng hỏi các câu hỏi không liên quan đến portfolio hoặc lập trình, hãy khéo léo đưa cuộc trò chuyện quay lại chủ đề giới thiệu về Quốc Bình hoặc các chủ đề công nghệ.
5. Giữ câu trả lời ngắn gọn, súc tích và có bố cục đẹp mắt.
6. Đặc biệt, nếu khách có ý định liên hệ hợp tác, hỏi thông tin liên lạc hoặc muốn để lại lời nhắn, hãy giới thiệu Form Liên Hệ Hợp Tác tích hợp sẵn và chèn nút bấm này vào câu trả lời để họ có thể nhấp mở form ngay lập tức: [Để lại lời nhắn hợp tác 📩](action:open-contact)
`;

// Smart Fallback Local Engine response function
const getSimulatedResponse = (input: string): string => {
  const query = input.toLowerCase().trim();

  if (query.match(/(chào|hello|hi|xin chào|hey)/)) {
    return `Xin chào! Mình là **Trợ lý AI** của bạn **Trần Quốc Bình** 🌟\n\nMình có thể giúp gì cho bạn hôm nay? Bạn có thể hỏi mình về:\n- 🚀 **Kỹ năng & Lập trình**\n- 📂 **Các dự án nổi bật của Bình** (như AI-Bridge, Kizo Shop...)\n- 🏆 **Thành tích & Giải thưởng** (Tin Học Trẻ, U-Invent, Robotics...)\n- 📬 **Thông tin liên hệ**`;
  }

  if (query.match(/(dự án|work|sản phẩm|project|app|website|làm được gì)/)) {
    let response = `Dưới đây là một số dự án tiêu biểu mà **Quốc Bình** đã thiết kế và phát triển từ ý tưởng đến thực tế:\n\n`;
    PORTFOLIO_INFO.projects.forEach((p) => {
      response += `- 🌐 **[${p.title}](${p.link})**: ${p.desc}\n`;
    });
    response += `\nBạn có thể nhấp trực tiếp vào tên dự án để trải nghiệm thực tế hoặc ghé thăm [GitHub của Bình](${PORTFOLIO_INFO.contacts.github}) để xem mã nguồn nhé!`;
    return response;
  }

  if (query.match(/(giải thưởng|thành tích|đạt được|huy chương|cúp|award|achievement)/)) {
    let response = `**Trần Quốc Bình** đã tích cực tham gia các cuộc thi về sáng tạo, lập trình và robotics với nhiều giải thưởng xuất sắc:\n\n`;
    // Show top 5 awards for brevity
    PORTFOLIO_INFO.awards.slice(0, 6).forEach((a) => {
      response += `- 🏆 **${a.title}** (${a.year}): ${a.desc}\n`;
    });
    response += `\n... và hơn 13+ giải thưởng sáng tạo lớn nhỏ khác. Bình luôn không ngừng tìm tòi và chinh phục các thử thách công nghệ mới!`;
    return response;
  }

  if (query.match(/(kỹ năng|skill|ngôn ngữ|framework|công nghệ|biết gì|frontend|backend|fullstack)/)) {
    let response = `Cậu ấy là một **Fullstack Developer** triển vọng với bộ kỹ năng đa dạng:\n\n`;
    PORTFOLIO_INFO.skills.forEach((s) => {
      response += `- ${s}\n`;
    });
    response += `\nVới thế mạnh về **React, TypeScript** và **AI/Computer Vision**, Bình có thể phát triển các ứng dụng web tối ưu và tích hợp các tính năng thông minh.`;
    return response;
  }

  if (query.match(/(liên hệ|email|github|facebook|sđt|điện thoại|contact|hợp tác|làm việc|gửi thư|gửi mail|nhắn tin|nhắn gửi)/)) {
    return `Bạn có thể kết nối với **Trần Quốc Bình** bằng cách điền nhanh thông tin vào **Form liên hệ hợp tác** tích hợp ngay trên chatbot này:\n\n👉 [Để lại lời nhắn hợp tác 📩](action:open-contact)\n\nHoặc liên hệ qua các kênh mạng xã hội khác:\n- 📧 **Email**: [tqbdinamo@gmail.com](mailto:tqbdinamo@gmail.com)\n- 🐙 **GitHub**: [tqbinhhh](${PORTFOLIO_INFO.contacts.github})\n- 📍 **Địa chỉ**: Đà Nẵng, Việt Nam\n\nChúc bạn một ngày làm việc hiệu quả!`;
  }

  if (query.match(/(bản thân|ai|giới thiệu|profile|thông tin|quốc bình)/)) {
    return `**Trần Quốc Bình** là một lập trình viên trẻ đầy nhiệt huyết (18 tuổi, hiện là học sinh cấp 3 tại TP. Đà Nẵng).\n\nCậu ấy có niềm đam mê mãnh liệt dành cho **Kỹ thuật phần mềm và Trí tuệ nhân tạo (AI)**. Bình đã tự học và thực chiến trên nhiều dự án Web cũng như Robotics, luôn mong muốn ứng dụng công nghệ để giải quyết các vấn đề xã hội thực tiễn (như dự án dịch ngôn ngữ ký hiệu **AI-Bridge**).`;
  }

  // General fallback prompting to use Gemini API key for dynamic conversations
  return `Cảm ơn câu hỏi thú vị của bạn! Mình là phiên bản Trợ lý Offline nên chỉ trả lời được một số chủ đề cơ bản về Quốc Bình. \n\n để kích hoạt **AI Chatbot động 100% (sử dụng Gemini 2.5 Flash)** có thể tán gẫu tự do, bạn hãy nhấp vào **biểu tượng Bánh răng cài đặt** ⚙️ ở góc trên bên phải khung chat này và **dán một khóa API Gemini miễn phí** vào nhé! \n\nHuống hồ gì, bạn có muốn tìm hiểu thêm về **dự án** hay **thành tích giải thưởng** của Quốc Bình không?`;
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [web3FormsKey, setWeb3FormsKey] = useState("");
  
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "bot",
      text: `Chào bạn! Mình là **Quốc Bình AI Assistant** 🤖✨\n\nMình được thiết lập để giúp bạn tìm hiểu về kỹ năng, dự án, và các thành tích nổi bật của bạn Quốc Bình. Hãy hỏi mình bất kỳ câu hỏi nào nhé!`,
      timestamp: new Date()
    }
  ]);
  const [inputVal, setInputVal] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Load API key and Web3Forms key from env or localStorage on mount
  useEffect(() => {
    const savedKey = localStorage.getItem("portfolio_gemini_api_key");
    const envKey = import.meta.env.VITE_GEMINI_API_KEY;

    if (savedKey) {
      setApiKey(savedKey);
    } else if (envKey) {
      setApiKey(envKey);
    }

    const savedWeb3Key = localStorage.getItem("portfolio_web3forms_key");
    const envWeb3Key = import.meta.env.VITE_WEB3FORMS_KEY;
    if (savedWeb3Key) {
      setWeb3FormsKey(savedWeb3Key);
    } else if (envWeb3Key) {
      setWeb3FormsKey(envWeb3Key);
    }
  }, []);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading, showSettings, showContactForm]);

  // Save Settings manually
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("portfolio_gemini_api_key", apiKey.trim());
    localStorage.setItem("portfolio_web3forms_key", web3FormsKey.trim());
    setShowSettings(false);

    // Show a success message in chat
    const systemMsgId = `sys-${Date.now()}`;
    setMessages((prev) => [
      ...prev,
      {
        id: systemMsgId,
        sender: "bot",
        text: `🔒 *Cấu hình đã lưu thành công!* \n\n${
          apiKey.trim() 
            ? "- Đã kết nối với mô hình Gemini 2.5 Flash thông minh.\n" 
            : "- Hoạt động ở chế độ Ngoại tuyến thông minh.\n"
        }${
          web3FormsKey.trim() 
            ? "- Đã kích hoạt tính năng Gửi Email Tự Động khi để lại lời nhắn." 
            : "- Sử dụng liên kết Email thủ công khi để lại lời nhắn."
        }`,
        timestamp: new Date()
      }
    ]);
  };

  const handleSendContact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactEmail.trim() || !contactMessage.trim()) return;

    setIsSubmittingContact(true);

    try {
      const activeWeb3Key = web3FormsKey.trim() || import.meta.env.VITE_WEB3FORMS_KEY || localStorage.getItem("portfolio_web3forms_key") || "";

      if (activeWeb3Key) {
        // Send using Web3Forms automated service
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            access_key: activeWeb3Key,
            name: contactName,
            email: contactEmail,
            message: contactMessage,
            subject: `Yêu cầu hợp tác mới từ Portfolio từ ${contactName}`
          })
        });

        const result = await response.json();

        if (result.success) {
          setShowContactForm(false);
          setMessages((prev) => [
            ...prev,
            {
              id: `user-contact-${Date.now()}`,
              sender: "user",
              text: `📩 *Gửi biểu mẫu liên hệ thành công!*\n- **Tên:** ${contactName}\n- **Email:** ${contactEmail}\n- **Nội dung:** ${contactMessage}`,
              timestamp: new Date()
            },
            {
              id: `bot-contact-success-${Date.now()}`,
              sender: "bot",
              text: `🎉 **Tuyệt vời!** Lời nhắn hợp tác của bạn đã được gửi **tự động và trực tiếp** tới email của Quốc Bình (\`tqbdinamo@gmail.com\`). \n\nBình sẽ đọc lời nhắn và phản hồi lại cho bạn sớm nhất có thể qua địa chỉ email \`${contactEmail}\`. Cảm ơn bạn rất nhiều!`,
              timestamp: new Date()
            }
          ]);
          setContactName("");
          setContactEmail("");
          setContactMessage("");
        } else {
          throw new Error(result.message || "Failed to send");
        }
      } else {
        // Fallback to mailto link
        const subject = encodeURIComponent(`Yêu cầu hợp tác mới từ Portfolio từ ${contactName}`);
        const body = encodeURIComponent(
          `Xin chào Quốc Bình,\n\nTôi là ${contactName} (${contactEmail}). Tôi muốn liên hệ hợp tác với bạn về nội dung sau:\n\n${contactMessage}\n\nTrân trọng!`
        );
        
        window.open(`mailto:tqbdinamo@gmail.com?subject=${subject}&body=${body}`, "_blank");

        setShowContactForm(false);
        setMessages((prev) => [
          ...prev,
          {
            id: `user-contact-${Date.now()}`,
            sender: "user",
            text: `📩 *Đã mở hòm thư để gửi liên hệ!*\n- **Tên:** ${contactName}\n- **Email:** ${contactEmail}\n- **Nội dung:** ${contactMessage}`,
            timestamp: new Date()
          },
          {
            id: `bot-contact-success-${Date.now()}`,
            sender: "bot",
            text: `📬 Mình đã **tạo mẫu Email tự động** và mở ứng dụng thư của bạn để gửi tới Quốc Bình (\`tqbdinamo@gmail.com\`).\n\n*Hệ thống hiện tại đang sử dụng ứng dụng Email mặc định của máy để gửi thư.*`,
            timestamp: new Date()
          }
        ]);
        setContactName("");
        setContactEmail("");
        setContactMessage("");
      }
    } catch (error) {
      console.error(error);
      alert("Có lỗi xảy ra khi gửi. Đang tự động chuyển sang gửi qua ứng dụng Email của bạn!");
      const subject = encodeURIComponent(`Yêu cầu hợp tác mới từ Portfolio từ ${contactName}`);
      const body = encodeURIComponent(
        `Xin chào Quốc Bình,\n\nTôi là ${contactName} (${contactEmail}). Tôi muốn liên hệ hợp tác với bạn về nội dung sau:\n\n${contactMessage}\n\nTrân trọng!`
      );
      window.open(`mailto:tqbdinamo@gmail.com?subject=${subject}&body=${body}`, "_blank");
    } finally {
      setIsSubmittingContact(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim() || isLoading) return;

    const userText = inputVal;
    setInputVal("");

    // Add user message
    const userMsgId = `user-${Date.now()}`;
    const newMessages = [
      ...messages,
      {
        id: userMsgId,
        sender: "user" as const,
        text: userText,
        timestamp: new Date()
      }
    ];
    setMessages(newMessages);
    setIsLoading(true);

    // Trigger API call or local fallback
    try {
      const activeKey = apiKey.trim() || import.meta.env.VITE_GEMINI_API_KEY || "";

      if (activeKey) {
        // Prepare conversations history in Gemini format
        // We only pass the last 6 messages to keep tokens low and responses fast
        const chatHistory = messages
          .filter((m) => !m.text.startsWith("🔒") && !m.text.startsWith("⚠️"))
          .slice(-6)
          .map((m) => ({
            role: m.sender === "user" ? "user" : "model",
            parts: [{ text: m.text }]
          }));

        // Append current prompt
        chatHistory.push({
          role: "user",
          parts: [{ text: userText }]
        });

        // Request Gemini API
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${activeKey}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              contents: chatHistory,
              systemInstruction: {
                parts: [{ text: SYSTEM_INSTRUCTION }]
              },
              generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 8192
              }
            })
          }
        );

        if (!response.ok) {
          throw new Error("API request failed");
        }

        const data = await response.json();
        const botText = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (botText) {
          setMessages((prev) => [
            ...prev,
            {
              id: `bot-${Date.now()}`,
              sender: "bot",
              text: botText,
              timestamp: new Date()
            }
          ]);
        } else {
          throw new Error("Empty response from API");
        }
      } else {
        // Fallback local engine response (simulate network delay)
        await new Promise((resolve) => setTimeout(resolve, 800));
        const botFallbackText = getSimulatedResponse(userText);
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            sender: "bot",
            text: botFallbackText,
            timestamp: new Date()
          }
        ]);
      }
    } catch (err) {
      console.error(err);
      // Fail-safe error fallback
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-err-${Date.now()}`,
          sender: "bot",
          text: `❌ *Đã xảy ra lỗi khi kết nối với máy chủ AI.* Xin vui lòng thử lại sau.`,
          timestamp: new Date()
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Render markdown-like links, strong tags, and linebreaks elegantly in React
  const formatMessageText = (text: string) => {
    // Process bullet points and styling simple markdown
    const lines = text.split("\n");
    return lines.map((line, lineIdx) => {
      let elements: React.ReactNode = line;

      // Handle markdown strong (**text**)
      const boldRegex = /\*\*(.*?)\*\*/g;
      if (line.match(boldRegex)) {
        const parts = line.split(boldRegex);
        elements = parts.map((part, partIdx) =>
          partIdx % 2 === 1 ? <strong key={partIdx} className="font-semibold text-text-primary">{part}</strong> : part
        );
      }

      // Handle markdown italic (*text*)
      const italicRegex = /\*(.*?)\*/g;
      if (typeof elements === "string" && elements.match(italicRegex)) {
        const parts = elements.split(italicRegex);
        elements = parts.map((part, partIdx) =>
          partIdx % 2 === 1 ? <em key={partIdx} className="italic text-muted">{part}</em> : part
        );
      } else if (Array.isArray(elements)) {
        // If it was already parsed for bold, parse sub-elements for italic
        elements = elements.map((el, elIdx) => {
          if (typeof el === "string" && el.match(italicRegex)) {
            const subParts = el.split(italicRegex);
            return subParts.map((sp, spIdx) =>
              spIdx % 2 === 1 ? <em key={`${elIdx}-${spIdx}`} className="italic text-muted">{sp}</em> : sp
            );
          }
          return el;
        });
      }

      // Handle markdown links ([label](url))
      const linkRegex = /\[(.*?)\]\((.*?)\)/g;
      const parseLinks = (node: React.ReactNode): React.ReactNode => {
        if (typeof node === "string") {
          if (node.match(linkRegex)) {
            const parts = node.split(linkRegex);
            
            // Reassemble splitting by links
            // The split outputs [textBefore, label, url, textBetween, label, url...]
            let result: React.ReactNode[] = [];
            
            for (let i = 0; i < parts.length; i++) {
              if (i % 3 === 0) {
                // Regular text
                if (parts[i]) result.push(parts[i]);
              } else if (i % 3 === 1) {
                // Link label
                const label = parts[i];
                const url = parts[i + 1] || "#";
                if (url === "action:open-contact") {
                  result.push(
                    <button
                      key={`action-contact-${i}`}
                      onClick={() => {
                        setShowContactForm(true);
                        setShowSettings(false);
                      }}
                      className="px-3 py-1 bg-text-primary text-bg font-medium rounded-full hover:opacity-90 transition-opacity flex items-center gap-1 text-[11px] my-1 cursor-pointer inline-flex align-middle"
                    >
                      {label}
                    </button>
                  );
                } else {
                  result.push(
                    <a
                      key={`link-${i}`}
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-text-primary underline font-medium hover:text-[#89AACC] transition-colors inline-flex items-center gap-0.5 decoration-[#4E85BF] underline-offset-2"
                    >
                      {label}
                    </a>
                  );
                }
              }
              // Skip the URL part as it is handled in the label step
              if (i % 3 === 1) i++; 
            }
            return result;
          }
          return node;
        } else if (Array.isArray(node)) {
          return node.map((n, idx) => <React.Fragment key={idx}>{parseLinks(n)}</React.Fragment>);
        }
        return node;
      };

      elements = parseLinks(elements);

      // Return paragraph or bullet item
      if (line.trim().startsWith("- ")) {
        // Strip bullet marker
        const content = typeof elements === "string" 
          ? elements.replace(/^-\s+/, "") 
          : Array.isArray(elements) 
            ? elements.map((item, itemIdx) => itemIdx === 0 && typeof item === "string" ? item.replace(/^-\s+/, "") : item)
            : elements;
            
        return (
          <li key={lineIdx} className="list-none pl-4 relative mb-1 text-sm leading-relaxed text-muted">
            <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-text-primary/70" />
            {content}
          </li>
        );
      }

      return (
        <p key={lineIdx} className="min-h-[1.25rem] text-sm leading-relaxed text-muted mb-2">
          {elements}
        </p>
      );
    });
  };

  // Toggle Chat Box
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          onClick={toggleChat}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative flex items-center justify-center w-14 h-14 rounded-full accent-gradient text-[#fff] shadow-[0_0_20px_rgba(78,133,191,0.4)] hover:shadow-[0_0_30px_rgba(78,133,191,0.6)] focus:outline-none group cursor-pointer transition-shadow duration-300"
        >
          {/* Subtle Glow Ring */}
          <span className="absolute inset-0 rounded-full animate-ping bg-[#89AACC] opacity-20 pointer-events-none" />

          {/* Core Button Face */}
          <div className="relative w-full h-full rounded-full flex items-center justify-center z-10">
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6 text-[#fff]" />
                </motion.div>
              ) : (
                <motion.div
                  key="chat"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="relative"
                >
                  <MessageSquare className="w-6 h-6 text-[#fff]" />
                  {/* Glowing dot for user attention */}
                  {!isOpen && (
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#fff] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-[#fff]"></span>
                    </span>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.button>
      </div>

      {/* Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-24 right-6 w-[360px] md:w-[400px] h-[550px] bg-surface/95 border border-stroke rounded-[28px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-50 flex flex-col backdrop-blur-xl"
            data-lenis-prevent
          >
            {/* Elegant Header Accent Border */}
            <span className="absolute top-0 left-0 right-0 h-[2px] accent-gradient" />

            {/* Chat Box Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-stroke bg-black/25">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full border border-stroke bg-bg flex items-center justify-center overflow-hidden">
                  {apiKey.trim() || import.meta.env.VITE_GEMINI_API_KEY ? (
                    <Sparkles className="w-5 h-5 text-text-primary animate-pulse" />
                  ) : (
                    <Bot className="w-5 h-5 text-text-primary" />
                  )}
                  {/* Online status indicator */}
                  <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-surface" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-text-primary flex items-center gap-1.5">
                    Quốc Bình AI
                    {!(apiKey.trim() || import.meta.env.VITE_GEMINI_API_KEY) && (
                      <span className="text-[10px] uppercase px-1.5 py-0.5 rounded bg-stroke text-muted font-normal">
                        Local AI
                      </span>
                    )}
                  </h3>
                  <p className="text-[11px] text-muted font-light">Online & Ready to chat</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setShowContactForm(!showContactForm);
                    setShowSettings(false);
                  }}
                  title="Hợp tác / Để lại lời nhắn"
                  className={`p-2 rounded-full border transition-colors cursor-pointer ${
                    showContactForm 
                      ? "bg-text-primary text-bg border-transparent" 
                      : "bg-transparent text-muted hover:text-text-primary border-stroke hover:bg-stroke/30"
                  }`}
                >
                  <Mail className="w-4 h-4" />
                </button>
                <button
                  onClick={toggleChat}
                  className="p-2 rounded-full border border-stroke bg-transparent text-muted hover:text-text-primary hover:bg-stroke/30 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Overlays - placed outside scroll body so they always cover full chat window */}
            <AnimatePresence>
              {showSettings && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="absolute inset-0 bg-surface/98 backdrop-blur-xl z-20 p-6 flex flex-col justify-start"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Key className="w-5 h-5 text-text-primary" />
                      <h4 className="text-sm font-medium text-text-primary">Cấu hình API & Dịch vụ</h4>
                    </div>

                    <p className="text-[11px] text-muted leading-relaxed mb-4">
                      Bạn có thể cấu hình khóa API Gemini (trực tuyến) và Web3Forms Key (để tự động gửi Email hợp tác chạy ngầm).
                    </p>

                    <form onSubmit={handleSaveSettings} className="flex flex-col gap-3 flex-1 overflow-y-auto pr-1">
                      {/* Gemini Key */}
                      <div className="flex flex-col gap-1">
                        <label className="text-[9px] text-muted uppercase tracking-wider">Gemini API Key</label>
                        <input
                          type="password"
                          placeholder="Khóa AIzaSy..."
                          value={apiKey}
                          onChange={(e) => setApiKey(e.target.value)}
                          className="bg-bg border border-stroke focus:border-text-primary text-text-primary rounded-xl px-4 py-2 text-xs outline-none w-full transition-colors font-mono"
                        />
                        <div className="text-[9px] text-muted flex items-start gap-1 leading-normal">
                          <AlertCircle className="w-3 h-3 shrink-0 text-muted mt-0.5" />
                          <span>
                            Lấy khóa miễn phí tại{" "}
                            <a 
                              href="https://aistudio.google.com/" 
                              target="_blank" 
                              rel="noreferrer" 
                              className="text-text-primary underline hover:text-[#89AACC]"
                            >
                              Google AI Studio
                            </a>.
                          </span>
                        </div>
                      </div>

                      {/* Web3Forms Key */}
                      <div className="flex flex-col gap-1 mt-2">
                        <label className="text-[9px] text-muted uppercase tracking-wider">Web3Forms Access Key</label>
                        <input
                          type="password"
                          placeholder="Mã gửi Email tự động..."
                          value={web3FormsKey}
                          onChange={(e) => setWeb3FormsKey(e.target.value)}
                          className="bg-bg border border-stroke focus:border-text-primary text-text-primary rounded-xl px-4 py-2 text-xs outline-none w-full transition-colors font-mono"
                        />
                        <div className="text-[9px] text-muted flex items-start gap-1 leading-normal">
                          <AlertCircle className="w-3 h-3 shrink-0 text-muted mt-0.5" />
                          <span>
                            Lấy mã gửi Email tự động miễn phí tại{" "}
                            <a 
                              href="https://web3forms.com/" 
                              target="_blank" 
                              rel="noreferrer" 
                              className="text-text-primary underline hover:text-[#89AACC]"
                            >
                              Web3Forms
                            </a>.
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-3 mt-4 shrink-0">
                        <button
                          type="button"
                          onClick={() => setShowSettings(false)}
                          className="flex-1 py-2 rounded-xl border border-stroke text-muted hover:text-text-primary text-xs font-medium bg-transparent hover:bg-stroke/30 transition-colors cursor-pointer"
                        >
                          Hủy
                        </button>
                        <button
                          type="submit"
                          className="flex-1 py-2 rounded-xl bg-text-primary text-bg text-xs font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Check className="w-3.5 h-3.5" />
                          Lưu cấu hình
                        </button>
                      </div>
                    </form>
                  </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {showContactForm && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="absolute inset-0 bg-surface/98 backdrop-blur-xl z-20 p-6 flex flex-col justify-start"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <Mail className="w-5 h-5 text-text-primary" />
                      <h4 className="text-sm font-medium text-text-primary">Liên Hệ Hợp Tác Với Quốc Bình</h4>
                    </div>

                    <p className="text-xs text-muted leading-relaxed mb-4">
                      Hãy để lại thông tin liên hệ của bạn bên dưới. Lời nhắn sẽ được gửi trực tiếp đến email của Quốc Bình!
                    </p>

                    <form onSubmit={handleSendContact} className="flex flex-col gap-3 flex-1 overflow-y-auto pr-1">
                      <div className="flex flex-col gap-1">
                        <label className="text-[9px] text-muted uppercase tracking-wider">Họ và tên của bạn *</label>
                        <input
                          type="text"
                          required
                          placeholder="Ví dụ: Nguyễn Văn A"
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          className="bg-bg border border-stroke focus:border-text-primary text-text-primary rounded-xl px-4 py-2 text-xs outline-none w-full transition-colors"
                          disabled={isSubmittingContact}
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-[9px] text-muted uppercase tracking-wider">Địa chỉ Email *</label>
                        <input
                          type="email"
                          required
                          placeholder="Ví dụ: email@gmail.com"
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          className="bg-bg border border-stroke focus:border-text-primary text-text-primary rounded-xl px-4 py-2 text-xs outline-none w-full transition-colors"
                          disabled={isSubmittingContact}
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-[9px] text-muted uppercase tracking-wider">Lời nhắn / Nội dung hợp tác *</label>
                        <textarea
                          required
                          rows={4}
                          placeholder="Ví dụ: Tôi muốn hợp tác thiết kế website..."
                          value={contactMessage}
                          onChange={(e) => setContactMessage(e.target.value)}
                          className="bg-bg border border-stroke focus:border-text-primary text-text-primary rounded-xl px-4 py-2 text-xs outline-none w-full transition-colors resize-none"
                          disabled={isSubmittingContact}
                        />
                      </div>

                      <div className="flex gap-3 mt-4 shrink-0">
                        <button
                          type="button"
                          onClick={() => setShowContactForm(false)}
                          className="flex-1 py-2 rounded-xl border border-stroke text-muted hover:text-text-primary text-xs font-medium bg-transparent hover:bg-stroke/30 transition-colors cursor-pointer"
                          disabled={isSubmittingContact}
                        >
                          Hủy
                        </button>
                        <button
                          type="submit"
                          className="flex-1 py-2 rounded-xl bg-text-primary text-bg text-xs font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                          disabled={isSubmittingContact}
                        >
                          {isSubmittingContact ? (
                            <>
                              <span className="w-3.5 h-3.5 border-2 border-bg border-t-transparent rounded-full animate-spin" />
                              Đang gửi...
                            </>
                          ) : (
                            <>
                              <Send className="w-3.5 h-3.5" />
                              Gửi lời nhắn
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  </motion.div>
              )}
            </AnimatePresence>

            {/* Chat Content Body */}
            <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-4">

              {/* Message Feed */}
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-[10px] text-muted">
                      {msg.sender === "user" ? (
                        <span className="flex items-center gap-1">
                          You <User className="w-2.5 h-2.5" />
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <Bot className="w-2.5 h-2.5" /> QuôcBinh AI
                        </span>
                      )}
                    </span>
                    <span className="text-[9px] text-muted/60">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  <div
                    className={`max-w-[85%] px-4 py-3 rounded-2xl border text-sm shadow-sm ${
                      msg.sender === "user"
                        ? "bg-text-primary text-bg border-transparent rounded-tr-none font-light"
                        : "bg-black/20 border-stroke text-muted rounded-tl-none"
                    }`}
                  >
                    {formatMessageText(msg.text)}
                  </div>
                </div>
              ))}

              {/* Loading Sparkle Shimmer */}
              {isLoading && (
                <div className="flex flex-col items-start">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-[10px] text-muted flex items-center gap-1">
                      <Bot className="w-2.5 h-2.5" /> QuôcBinh AI
                    </span>
                    <span className="text-[9px] text-muted/60">đang nghĩ...</span>
                  </div>
                  <div className="bg-black/20 border border-stroke text-muted px-5 py-3 rounded-2xl rounded-tl-none max-w-[85%] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-muted animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 rounded-full bg-muted animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 rounded-full bg-muted animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}

              {/* Scroll anchor */}
              <div ref={chatEndRef} />
            </div>
            {/* End Chat Content Body */}

            {/* Predefined prompt suggestions */}
            {!showSettings && messages.length <= 2 && (
              <div className="px-6 py-2 border-t border-stroke/50 flex gap-2 overflow-x-auto scrollbar-hide bg-black/10">
                {[
                  { label: "🚀 Kỹ năng", query: "Kỹ năng lập trình của Bình là gì?" },
                  { label: "📂 Dự án", query: "Bình có những dự án nổi bật nào?" },
                  { label: "🏆 Giải thưởng", query: "Thành tích nổi bật của Bình là gì?" }
                ].map((sug) => (
                  <button
                    key={sug.label}
                    onClick={() => {
                      setInputVal(sug.query);
                    }}
                    className="shrink-0 text-[11px] border border-stroke px-3 py-1.5 rounded-full hover:bg-stroke/40 hover:text-text-primary transition-colors cursor-pointer text-muted bg-surface/50"
                  >
                    {sug.label}
                  </button>
                ))}
              </div>
            )}

            {/* Chat Input Footer */}
            <form
              onSubmit={handleSendMessage}
              className="p-4 border-t border-stroke flex items-center gap-3 bg-black/20"
            >
              <input
                type="text"
                placeholder={isLoading ? "AI đang suy nghĩ..." : "Hỏi về Quốc Bình..."}
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                disabled={isLoading}
                className="flex-1 bg-bg border border-stroke focus:border-text-primary rounded-xl px-4 py-2.5 text-xs outline-none text-text-primary transition-colors disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!inputVal.trim() || isLoading}
                className="p-2.5 bg-text-primary text-bg rounded-xl hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center cursor-pointer shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
