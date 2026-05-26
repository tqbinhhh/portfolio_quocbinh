import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowUpRight, Mail, Send, CheckCircle, AlertCircle, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const GithubIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);

export default function ContactFooter() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    if (!marqueeRef.current) return;
    
    // GSAP Marquee
    gsap.to(marqueeRef.current, {
      xPercent: -50,
      ease: "none",
      duration: 90,
      repeat: -1,
    });
  }, []);

  const handleSendContact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactEmail.trim() || !contactMessage.trim()) return;
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const activeWeb3Key = import.meta.env.VITE_WEB3FORMS_KEY || localStorage.getItem("portfolio_web3forms_key") || "";

      if (activeWeb3Key) {
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
          setSubmitStatus("success");
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
        
        setSubmitStatus("success");
        setContactName("");
        setContactEmail("");
        setContactMessage("");
      }
    } catch (error) {
      console.error(error);
      setSubmitStatus("error");
      // Open email app as fallback when API fails
      const subject = encodeURIComponent(`Yêu cầu hợp tác mới từ Portfolio từ ${contactName}`);
      const body = encodeURIComponent(
        `Xin chào Quốc Bình,\n\nTôi là ${contactName} (${contactEmail}). Tôi muốn liên hệ hợp tác với bạn về nội dung sau:\n\n${contactMessage}\n\nTrân trọng!`
      );
      window.open(`mailto:tqbdinamo@gmail.com?subject=${subject}&body=${body}`, "_blank");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }
  };

  return (
    <section id="contact" className="relative pt-16 md:pt-24 pb-8 md:pb-12 overflow-hidden border-t border-stroke">
      {/* Background Video flipped */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 min-w-full min-h-full object-cover scale-y-[-1] opacity-30 z-0"
        src="https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8"
      />
      <div className="absolute inset-0 bg-black/60 z-0" />

      <div className="relative z-10">
        {/* Marquee Header */}
        <div className="overflow-hidden flex whitespace-nowrap mb-16 md:mb-24">
          <div ref={marqueeRef} className="flex shrink-0">
            {Array.from({ length: 10 }).map((_, i) => (
              <h2 key={i} className="text-6xl md:text-8xl lg:text-[10rem] font-display italic text-white shrink-0 px-4">
                BUILDING THE FUTURE • QUOC BINH DEV •
              </h2>
            ))}
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 flex flex-col items-center text-center">
          <motion.h3 
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl lg:text-6xl text-text-primary tracking-tight mb-8"
          >
            Có dự án thú vị?
            <br />
            <span className="font-display italic text-muted">Hãy kết nối với tôi.</span>
          </motion.h3>

          <div className="w-full flex flex-col lg:flex-row gap-12 lg:gap-20 items-start text-left mb-24 z-10">
            {/* Contact Form Collapsible */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="w-full lg:w-[60%] order-2 lg:order-1 flex flex-col gap-4"
            >
              {/* Trigger Button */}
              <button 
                onClick={() => setIsFormOpen(!isFormOpen)}
                className="group flex items-center justify-between w-full bg-surface/40 backdrop-blur-xl border border-white/10 p-5 sm:p-6 rounded-[24px] hover:bg-surface/60 transition-colors shadow-xl text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full accent-gradient flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-white">Gửi Lời Nhắn Trực Tuyến</h4>
                    <p className="text-sm text-muted">Nhấn để {isFormOpen ? 'đóng' : 'mở'} form liên hệ</p>
                  </div>
                </div>
                <div className={`p-2 rounded-full bg-white/5 transition-transform duration-300 ${isFormOpen ? 'rotate-180' : ''}`}>
                  <ChevronDown className="w-5 h-5 text-white" />
                </div>
              </button>

              {/* Collapsible Form */}
              <AnimatePresence>
                {isFormOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                    className="overflow-hidden"
                  >
                    <form onSubmit={handleSendContact} className="w-full bg-surface/40 backdrop-blur-xl border border-white/10 p-6 sm:p-10 rounded-[32px] shadow-2xl relative overflow-hidden mt-2">
                      {/* Decorative glow */}
                      <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#4E85BF] rounded-full blur-[100px] opacity-20 pointer-events-none" />
                      
                      <p className="text-[#89AACC] mb-6 italic leading-relaxed text-sm">
                        * Hãy để lại thông tin liên hệ của bạn bên dưới. Lời nhắn sẽ được gửi trực tiếp đến email của Quốc Bình!
                      </p>
                      
                      <div className="flex flex-col gap-5">
                        <div className="flex flex-col sm:flex-row gap-5">
                          <div className="flex flex-col gap-2 w-full">
                            <label className="text-sm text-muted font-medium ml-2">Tên của bạn</label>
                            <input
                              type="text"
                              required
                              placeholder="John Doe"
                              value={contactName}
                              onChange={(e) => setContactName(e.target.value)}
                              className="bg-bg/50 border border-stroke focus:border-[#89AACC] text-white rounded-2xl px-5 py-4 outline-none w-full transition-colors"
                            />
                          </div>
                          <div className="flex flex-col gap-2 w-full">
                            <label className="text-sm text-muted font-medium ml-2">Email liên lạc</label>
                            <input
                              type="email"
                              required
                              placeholder="john@example.com"
                              value={contactEmail}
                              onChange={(e) => setContactEmail(e.target.value)}
                              className="bg-bg/50 border border-stroke focus:border-[#89AACC] text-white rounded-2xl px-5 py-4 outline-none w-full transition-colors"
                            />
                          </div>
                        </div>
                        
                        <div className="flex flex-col gap-2">
                          <label className="text-sm text-muted font-medium ml-2">Nội dung hợp tác</label>
                          <textarea
                            required
                            placeholder="Hãy chia sẻ về ý tưởng dự án của bạn..."
                            value={contactMessage}
                            onChange={(e) => setContactMessage(e.target.value)}
                            rows={4}
                            className="bg-bg/50 border border-stroke focus:border-[#89AACC] text-white rounded-2xl px-5 py-4 outline-none w-full transition-colors resize-none"
                          />
                        </div>
                        
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="mt-2 group relative flex items-center justify-center w-full sm:w-auto self-start bg-white text-bg px-8 py-4 rounded-full font-medium text-lg hover:bg-white/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? (
                            <span className="flex items-center gap-2">
                              <div className="w-5 h-5 border-2 border-bg/30 border-t-bg rounded-full animate-spin" />
                              Đang gửi...
                            </span>
                          ) : (
                            <span className="flex items-center gap-2">
                              Gửi Ngay
                              <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </span>
                          )}
                        </button>

                        {/* Status Messages */}
                        {submitStatus === "success" && (
                          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 text-emerald-400 text-sm mt-2 font-medium">
                            <CheckCircle className="w-5 h-5" />
                            Lời nhắn đã được gửi thành công!
                          </motion.div>
                        )}
                        {submitStatus === "error" && (
                          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 text-red-400 text-sm mt-2 font-medium">
                            <AlertCircle className="w-5 h-5" />
                            Có lỗi xảy ra, đã tự động chuyển sang ứng dụng Email!
                          </motion.div>
                        )}
                      </div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Direct Contact Options */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="w-full lg:w-[40%] order-1 lg:order-2 flex flex-col items-center lg:items-start gap-8 lg:pt-2"
            >
              <div className="flex flex-col gap-4 text-center lg:text-left">
                <h4 className="text-xl text-white font-medium">Liên hệ trực tiếp</h4>
                <p className="text-muted leading-relaxed">
                  Bạn có thể gửi form bên cạnh để lời nhắn đến trực tiếp hòm thư của tôi, hoặc liên hệ nhanh qua Email và các nền tảng mạng xã hội dưới đây.
                </p>
              </div>

              {/* Email Button (Premium Glow + Glassmorphism) */}
              <a 
                href="mailto:tqbdinamo@gmail.com"
                className="group relative inline-flex items-center justify-center p-[1px] rounded-full w-full sm:w-auto"
              >
                <span className="absolute inset-[-4px] rounded-full accent-gradient animate-gradient-shift opacity-50 group-hover:opacity-100 transition-opacity duration-500 blur-lg pointer-events-none" />
                <span className="absolute inset-0 rounded-full accent-gradient animate-gradient-shift opacity-100 pointer-events-none" />
                <div className="relative bg-bg/80 backdrop-blur-xl text-white px-8 py-4 rounded-full flex items-center justify-center gap-3 font-medium text-lg border border-white/10 group-hover:bg-bg/40 transition-colors duration-500 w-full">
                  <Mail className="w-5 h-5 text-[#89AACC]" />
                  tqbdinamo@gmail.com
                  <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity ml-1" />
                </div>
              </a>

              {/* Social Media Circular Buttons */}
              <div className="flex items-center gap-4 mt-2">
                <a 
                  href="https://www.facebook.com/martinbinh0608/" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-14 h-14 rounded-full bg-surface/50 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-[#1877F2] hover:text-white transition-all duration-300 hover:border-transparent group shadow-xl"
                >
                  <FacebookIcon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </a>
                <a 
                  href="https://www.instagram.com/tq.binhh/" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-14 h-14 rounded-full bg-surface/50 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:text-white transition-all duration-300 hover:border-transparent group shadow-xl"
                >
                  <InstagramIcon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </a>
                <a 
                  href="https://github.com/tqbinhhh" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-14 h-14 rounded-full bg-surface/50 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-[#333] hover:text-white transition-all duration-300 hover:border-transparent group shadow-xl"
                >
                  <GithubIcon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Footer Bar */}
          <div className="w-full flex justify-center items-center pt-8 border-t border-white/10">
            <div className="text-sm text-muted">
              &copy; {new Date().getFullYear()} Trần Quốc Bình.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
