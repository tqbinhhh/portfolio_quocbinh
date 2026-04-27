import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowUpRight, Mail } from "lucide-react";
import { motion } from "framer-motion";

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

export default function ContactFooter() {
  const marqueeRef = useRef<HTMLDivElement>(null);

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

          <div className="flex flex-col md:flex-row items-center gap-6 mb-24 z-10 w-full max-w-2xl justify-center">
            {/* Email Button (Premium Glow + Glassmorphism) */}
            <motion.a 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              href="mailto:tqbdinamo@gmail.com"
              className="group relative inline-flex items-center justify-center p-[1px] rounded-full w-full sm:w-auto"
            >
              <span className="absolute inset-[-4px] rounded-full accent-gradient animate-gradient-shift opacity-50 group-hover:opacity-100 transition-opacity duration-500 blur-lg pointer-events-none" />
              <span className="absolute inset-0 rounded-full accent-gradient animate-gradient-shift opacity-100 pointer-events-none" />
              <div className="relative bg-bg/80 backdrop-blur-xl text-white px-8 py-5 sm:px-10 sm:py-6 rounded-full flex items-center justify-center gap-3 font-medium text-lg md:text-xl border border-white/10 group-hover:bg-bg/40 transition-colors duration-500 w-full">
                <Mail className="w-6 h-6 text-[#89AACC]" />
                tqbdinamo@gmail.com
                <ArrowUpRight className="w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity ml-2" />
              </div>
            </motion.a>

            {/* Social Media Circular Buttons */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex items-center gap-4"
            >
              <a 
                href="https://www.facebook.com/martinbinh0608/" 
                target="_blank" 
                rel="noreferrer" 
                className="w-16 h-16 sm:w-[88px] sm:h-[88px] rounded-full bg-surface/50 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-[#1877F2] hover:text-white transition-all duration-300 hover:border-transparent group shadow-xl"
              >
                <FacebookIcon className="w-7 h-7 sm:w-8 sm:h-8 group-hover:scale-110 transition-transform" />
              </a>
              <a 
                href="https://www.instagram.com/tq.binhh/" 
                target="_blank" 
                rel="noreferrer" 
                className="w-16 h-16 sm:w-[88px] sm:h-[88px] rounded-full bg-surface/50 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:text-white transition-all duration-300 hover:border-transparent group shadow-xl"
              >
                <InstagramIcon className="w-7 h-7 sm:w-8 sm:h-8 group-hover:scale-110 transition-transform" />
              </a>
            </motion.div>
          </div>

          {/* Footer Bar */}
          <div className="w-full flex flex-col md:flex-row justify-between items-center gap-6 mt-12 pt-8 border-t border-white/10">
            <div className="flex items-center gap-6 text-sm text-muted">
              <a href="https://github.com/tqbinhhh" target="_blank" rel="noreferrer" className="hover:text-text-primary transition-colors">GitHub</a>
              <a href="https://www.facebook.com/martinbinh0608/" target="_blank" rel="noreferrer" className="hover:text-text-primary transition-colors">Facebook</a>
            </div>

            <div className="flex items-center gap-3 text-sm text-muted">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Available for projects
            </div>

            <div className="text-sm text-muted">
              &copy; {new Date().getFullYear()} Trần Quốc Bình.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
