import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import gsap from "gsap";
import { motion } from "framer-motion";

const roles = ["Frontend Developer", "Web Designer", "Tech Enthusiast", "Student"];

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  
  const [roleIndex, setRoleIndex] = useState(0);

  // Initialize HLS
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const source = "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(source);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {});
      });
      return () => {
        hls.destroy();
      };
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = source;
      video.addEventListener("loadedmetadata", () => {
        video.play().catch(() => {});
      });
    }
  }, []);

  // Role Cycling
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // GSAP Entrance
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Assuming we have a global loading state, we might delay this. 
    // Here we'll just run it after a short delay, but ideally we'd trigger it when `isLoading === false`.
    // Let's rely on Framer Motion's exit on the loader. We'll give GSAP a 1.5s delay to be safe.
    tl.fromTo(
      nameRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.2, delay: 1 }
    )
    .fromTo(
      eyebrowRef.current,
      { opacity: 0, filter: "blur(10px)", y: 20 },
      { opacity: 1, filter: "blur(0px)", y: 0, duration: 1 },
      "-=0.5"
    )
    .fromTo(
      ".hero-button",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 },
      "-=0.5"
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section id="home" className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center">
      {/* Background Video */}
      <motion.div
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.5, ease: [0.25, 0.1, 0.25, 1], delay: 1 }}
        className="absolute inset-0 w-full h-full z-[-2]"
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto object-cover -translate-x-1/2 -translate-y-1/2"
        />
      </motion.div>
      
      {/* Dark Overlays */}
      <div className="absolute inset-0 bg-black/40 z-[-2]" />
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg to-transparent z-0" />

      {/* Content */}
      <div ref={containerRef} className="relative z-10 flex flex-col items-center text-center px-6">
        <div ref={eyebrowRef} className="text-xs text-muted uppercase tracking-[0.3em] mb-8">
          PORTFOLIO '25
        </div>

        <h1 ref={nameRef} className="text-6xl md:text-8xl lg:text-9xl font-display italic leading-[0.9] tracking-tight text-text-primary mb-6">
          Trần Quốc Bình
        </h1>

        <div className="text-xl md:text-2xl font-light text-text-primary mb-4 flex gap-2 justify-center hero-button">
          <span>A</span>
          <span 
            key={roleIndex} 
            className="font-display italic text-text-primary animate-role-fade-in inline-block"
          >
            {roles[roleIndex]}
          </span>
          <span>lives in Da Nang.</span>
        </div>

        <p className="text-sm md:text-base text-muted max-w-md mb-12 opacity-80 hero-button">
         Xin Chào, mình là Quốc Bình! Hiện là học sinh cấp 3 với niềm đam mê dành cho Kỹ thuật phần mềm. Với kinh nghiệm đã được đúc kết trong những khoá học. Được thực chiến trong lĩnh vực Frontend và Design Website, mình luôn tìm kiếm cơ hội để biến những ý tưởng sáng tạo thành các sản phẩm số mượt mà và hiệu quả. Hiện tại, mình đang nỗ lực mở rộng kiến thức sang mảng Backend để trở thành một lập trình viên toàn diện.
        </p>

        <div className="inline-flex flex-col sm:flex-row gap-4 mb-16 hero-button">
          <a href="#work" className="relative group cursor-pointer">
            <span className="absolute inset-[-2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            <div className="relative bg-text-primary group-hover:bg-bg text-bg group-hover:text-text-primary rounded-full text-sm font-medium px-7 py-3.5 transition-all duration-300 hover:scale-105 border border-transparent">
              See Works
            </div>
          </a>
          
          <a href="#contact" className="relative group cursor-pointer inline-flex items-center text-xs sm:text-sm rounded-full">
            <span className="absolute inset-[-2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            <div className="relative bg-bg text-text-primary rounded-full text-sm font-medium px-7 py-3.5 transition-all duration-300 hover:scale-105 border-2 border-stroke group-hover:border-transparent">
               Reach out
            </div>
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center">
        <span className="text-xs text-muted uppercase tracking-[0.2em] mb-4">Scroll</span>
        <div className="w-px h-10 bg-stroke relative overflow-hidden">
          <div className="w-full h-full bg-text-primary animate-scroll-down absolute top-0 left-0" />
        </div>
      </div>
    </section>
  );
}
