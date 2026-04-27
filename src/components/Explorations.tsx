import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const images = [
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
];

export default function Explorations() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    let ctx = gsap.context(() => {
      // Pin the text center
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: contentRef.current,
        pinSpacing: false,
      });

      // Parallax effect on columns
      const columns = gsap.utils.toArray<HTMLElement>(".parallax-col");
      columns.forEach((col, index) => {
        const isLeft = index % 2 === 0;
        gsap.to(col, {
          yPercent: isLeft ? -30 : 30, // move opposite directions
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    });

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-[200vh] flex py-32">
      {/* Layer 1: Pinned Center */}
      <div 
        ref={contentRef} 
        className="w-full h-screen flex flex-col items-center justify-center pointer-events-none z-10 absolute top-0"
      >
        <div className="bg-bg/80 backdrop-blur-md p-10 rounded-[40px] text-center border border-white/5">
          <div className="text-xs text-muted uppercase tracking-[0.3em] mb-4">
            Toolkit
          </div>
          <h2 className="text-5xl md:text-7xl text-text-primary tracking-tight mb-4">
            Visual <span className="font-display italic">playground</span>
          </h2>
          <p className="text-muted max-w-sm mx-auto pointer-events-auto">
            Technologies and languages I use to build scalable web applications.
          </p>
        </div>
      </div>

      {/* Layer 2: Parallax Columns */}
      <div className="w-full max-w-[1400px] mx-auto px-6 grid grid-cols-2 gap-12 md:gap-40 z-20 relative pointer-events-auto mt-[50vh]">
        
        {/* Left Column */}
        <div className="parallax-col flex flex-col gap-12 md:gap-32 items-end pt-32">
          {images.slice(0, 3).map((src, i) => (
             <div key={i} className="bg-surface border border-stroke rounded-[40px] p-12 aspect-square max-w-[280px] hover:scale-105 transition-transform duration-500 cursor-pointer flex items-center justify-center">
               <img src={src} className="w-32 h-32 object-contain filter grayscale hover:grayscale-0 transition-all duration-300" alt="Skill" />
             </div>
          ))}
        </div>

        {/* Right Column */}
        <div className="parallax-col flex flex-col gap-12 md:gap-32 items-start pb-32">
          {images.slice(3, 6).map((src, i) => (
             <div key={i} className="bg-surface border border-stroke rounded-[40px] p-12 aspect-square max-w-[280px] hover:scale-105 transition-transform duration-500 cursor-pointer flex items-center justify-center">
               <img src={src} className="w-32 h-32 object-contain filter grayscale hover:grayscale-0 transition-all duration-300" alt="Skill" />
             </div>
          ))}
        </div>

      </div>
    </section>
  );
}
