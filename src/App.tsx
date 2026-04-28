import { useState, useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import LoadingScreen from "./components/LoadingScreen";
import FlowLine from "./components/FlowLine";
import StarsBackground from "./components/StarsBackground";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SelectedWorks from "./components/SelectedWorks";
import Journal from "./components/Journal";
import Explorations from "./components/Explorations";
import Awards from "./components/Awards";
import PersonalMoments from "./components/PersonalMoments";
import Stats from "./components/Stats";
import ContactFooter from "./components/ContactFooter";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Initialize smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wrapper: window,
      content: document.documentElement,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Make lenis globally accessible if needed by GSAP
    // @ts-ignore
    window.lenis = lenis;

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <FlowLine />
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      
      {!isLoading && (
        <div className="text-text-primary overflow-hidden selection:bg-text-primary selection:text-bg">
          <StarsBackground />
          <Navbar />
          <Hero />
          
          <div className="relative z-10 w-full">
            <div className="relative z-10">
              <SelectedWorks />
              <Journal />
              <Explorations />
              <Awards />
              <PersonalMoments />
              <Stats />
              <ContactFooter />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
