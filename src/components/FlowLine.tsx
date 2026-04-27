import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export default function FlowLine() {
  const { scrollYProgress } = useScroll();
  
  // Apply a smooth spring to the scroll progress so the flow has a liquid feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const scaleY = useTransform(smoothProgress, [0, 1], [0, 1]);
  const yPercent = useTransform(smoothProgress, [0, 1], ["0vh", "100vh"]);

  return (
    <div className="fixed top-0 left-4 md:left-8 bottom-0 w-[1px] bg-white/5 z-[40] pointer-events-none hidden sm:block">
      {/* The glowing leading edge of the flow */}
      <motion.div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[3px] h-[15vh] accent-gradient blur-[2px] rounded-full z-10"
        style={{ 
          y: yPercent 
        }}
      />
      
      {/* The main liquid stream */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-full accent-gradient origin-top opacity-50"
        style={{ 
          scaleY: scaleY 
        }}
      />
    </div>
  );
}
