import { useState, useEffect } from "react";

export function ScreenFrame({ src, title }: { src: string; title: string }) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      let targetSrc = src;

      // Dynamically select mobile/desktop screen version
      if (src.includes("2.html") || src.includes("3.html")) {
        targetSrc = width < 768 ? "/screens/2.html" : "/screens/3.html";
      } else if (src.includes("4.html") || src.includes("5.html")) {
        targetSrc = width < 768 ? "/screens/5.html" : "/screens/4.html";
      } else if (src.includes("6.html") || src.includes("7.html")) {
        targetSrc = width < 768 ? "/screens/7.html" : "/screens/6.html";
      }

      if (targetSrc !== currentSrc) {
        setIsTransitioning(true);
        const timer = setTimeout(() => {
          setCurrentSrc(targetSrc);
          setIsTransitioning(false);
        }, 700);
        return () => clearTimeout(timer);
      }
    };

    // Trigger transition on initial load or navigation
    setIsTransitioning(true);
    const initialTimer = setTimeout(() => {
      const width = window.innerWidth;
      let targetSrc = src;
      if (src.includes("2.html") || src.includes("3.html")) {
        targetSrc = width < 768 ? "/screens/2.html" : "/screens/3.html";
      } else if (src.includes("4.html") || src.includes("5.html")) {
        targetSrc = width < 768 ? "/screens/5.html" : "/screens/4.html";
      } else if (src.includes("6.html") || src.includes("7.html")) {
        targetSrc = width < 768 ? "/screens/7.html" : "/screens/6.html";
      }
      setCurrentSrc(targetSrc);
      setIsTransitioning(false);
    }, 700);

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(initialTimer);
    };
  }, [src, currentSrc]);

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <style>{`
        @keyframes needleSweep {
          0% { transform: rotate(-80deg); }
          50% { transform: rotate(80deg); }
          100% { transform: rotate(-80deg); }
        }
        @keyframes carMove {
          0% { left: -20%; }
          100% { left: 110%; }
        }
        .clip-half {
          clip-path: polygon(0 0, 100% 0, 100% 50%, 0 50%);
        }
      `}</style>

      {/* Dynamic Navigation Car Transition Overlay */}
      {isTransitioning && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#0c2340]">
          <div className="relative w-full max-w-md px-8 flex flex-col items-center gap-6">
            {/* Speedometer sweep / Dashboard indicator */}
            <div className="w-48 h-24 relative overflow-hidden flex items-end justify-center">
              {/* Semi-circular gauge */}
              <div className="absolute top-0 w-48 h-48 border-8 border-white/10 border-b-0 rounded-full"></div>
              {/* Speedometer needle */}
              <div 
                className="w-1 h-20 bg-[#acc7ff] origin-bottom rounded-full transform"
                style={{ 
                  transformOrigin: "bottom center", 
                  animation: "needleSweep 1s cubic-bezier(0.4, 0, 0.2, 1) infinite" 
                }}
              ></div>
              <div className="absolute bottom-0 w-6 h-6 bg-[#acc7ff] rounded-full border-4 border-[#0c2340]"></div>
            </div>

            {/* Wireframe car animation */}
            <div className="w-full h-12 relative border-b-2 border-white/20 overflow-hidden flex items-end">
              <svg
                className="w-16 h-8 text-[#acc7ff] absolute"
                style={{
                  bottom: "2px",
                  animation: "carMove 1s linear infinite"
                }}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
                <circle cx="7" cy="17" r="2" />
                <circle cx="17" cy="17" r="2" />
              </svg>
            </div>
            
            <p className="text-white font-body-md text-sm tracking-widest uppercase opacity-75">
              Calibrating Precision...
            </p>
          </div>
        </div>
      )}

      <iframe
        src={currentSrc}
        title={title}
        className="w-screen h-screen border-0 block"
        style={{ width: "100vw", height: "100vh" }}
      />
    </div>
  );
}

