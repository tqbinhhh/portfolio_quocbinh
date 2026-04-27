import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = ["Home", "Work", "Resume"];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4 pointer-events-none">
      <motion.div 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 3.2, ease: [0.76, 0, 0.24, 1] }}
        className={`inline-flex items-center rounded-full backdrop-blur-md border border-white/10 bg-surface px-2 py-2 pointer-events-auto transition-shadow duration-300 ${
          scrolled ? "shadow-md shadow-black/10" : ""
        }`}
      >
        {/* Logo */}
        <div className="w-9 h-9 rounded-full accent-gradient p-[1px] group cursor-pointer hover:scale-110 transition-transform duration-300">
          <div className="w-full h-full bg-bg rounded-full flex items-center justify-center">
            <span className="font-display italic text-[13px] text-text-primary">BDEV</span>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px h-5 bg-stroke mx-3" />

        {/* Links */}
        <div className="flex items-center gap-1 mx-2">
          {navLinks.map((link, i) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className={`text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-colors duration-200 ${
                i === 0 
                  ? "text-text-primary bg-stroke/50" 
                  : "text-muted hover:text-text-primary hover:bg-stroke/50"
              }`}
            >
              {link}
            </a>
          ))}
        </div>

        {/* Divider */}
        <div className="w-px h-5 bg-stroke mx-2" />

        {/* Say Hi Button */}
        <a 
          href="#contact"
          className="relative group cursor-pointer inline-flex items-center text-xs sm:text-sm rounded-full"
        >
          {/* Hover Gradient Border */}
          <span className="absolute inset-[-2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          
          <div className="relative bg-surface rounded-full backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2 flex items-center gap-1.5 text-text-primary border border-transparent group-hover:border-white/10 transition-colors">
            Say hi
            <ArrowUpRight className="w-3.5 h-3.5 text-muted group-hover:text-text-primary transition-colors" />
          </div>
        </a>
      </motion.div>
    </nav>
  );
}
