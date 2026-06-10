import { useState, useEffect } from "react";

export function ScreenFrame({ src, title }: { src: string; title: string }) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [digitalSpeed, setDigitalSpeed] = useState(0);
  const [statusText, setStatusText] = useState("INITIALIZING DIAGNOSTICS...");

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
        }, 800);
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
    }, 800);

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(initialTimer);
    };
  }, [src, currentSrc]);

  // Handle speedometer counting and dynamic phrases during loading
  useEffect(() => {
    if (!isTransitioning) {
      setDigitalSpeed(0);
      setStatusText("INITIALIZING DIAGNOSTICS...");
      return;
    }

    let start = 0;
    const duration = 650;
    const startTime = performance.now();

    const phrases = [
      "INITIALIZING DIAGNOSTICS...",
      "CALIBRATING TELEMETRY...",
      "TUNING SUSPENSION ACTUATORS...",
      "MGP GENUINE PARTS INVENTORY VALIDATED...",
      "CALIBRATION COMPLETE"
    ];

    const phraseTimer = setInterval(() => {
      setStatusText((prev) => {
        const nextIdx = (phrases.indexOf(prev) + 1) % phrases.length;
        return phrases[nextIdx];
      });
    }, 180);

    let animationFrameId: number;

    const updateCounter = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Speed count up curve (starts fast, slows down at top speed)
      const currentSpeed = Math.floor(progress * (2 - progress) * 180);
      setDigitalSpeed(currentSpeed);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCounter);
      } else {
        setDigitalSpeed(180);
      }
    };

    animationFrameId = requestAnimationFrame(updateCounter);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearInterval(phraseTimer);
    };
  }, [isTransitioning]);

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <style>{`
        @keyframes gaugeSweeper {
          0% { transform: rotate(-100deg); }
          65% { transform: rotate(100deg); }
          100% { transform: rotate(-30deg); }
        }
        @keyframes dashRing {
          0% { stroke-dashoffset: 283; }
          65% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 80; }
        }
        @keyframes scannerSweep {
          0% { left: -10%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { left: 110%; opacity: 0; }
        }
        .neon-glow-blue {
          filter: drop-shadow(0 0 6px rgba(172, 199, 255, 0.75));
        }
        .neon-glow-accent {
          filter: drop-shadow(0 0 8px rgba(0, 86, 179, 0.85));
        }
        .pulse-text {
          animation: textPulse 1s ease-in-out infinite alternate;
        }
        @keyframes textPulse {
          0% { opacity: 0.6; }
          100% { opacity: 1; }
        }
      `}</style>

      {/* Dynamic Navigation Car Transition Overlay */}
      {isTransitioning && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#070f1e] overflow-hidden select-none">
          {/* Glowing background circles for depth */}
          <div className="absolute w-[600px] h-[600px] rounded-full bg-[#0056b3]/5 blur-[120px] pointer-events-none -top-1/4"></div>
          <div className="absolute w-[500px] h-[500px] rounded-full bg-[#115cb9]/5 blur-[100px] pointer-events-none -bottom-1/4"></div>
          
          <div className="relative w-full max-w-lg px-8 flex flex-col items-center gap-8 z-10">
            
            {/* Speedometer Cluster */}
            <div className="relative w-64 h-48 flex items-center justify-center">
              {/* Outer Dial SVG */}
              <svg className="w-64 h-64 absolute -top-8" viewBox="0 0 120 120">
                {/* Background Ring */}
                <circle 
                  cx="60" 
                  cy="60" 
                  r="45" 
                  className="stroke-white/5 fill-none" 
                  strokeWidth="5" 
                  strokeDasharray="283" 
                  strokeDashoffset="70" 
                  strokeLinecap="round" 
                  transform="rotate(135 60 60)"
                />
                {/* Glowing Active Ring */}
                <circle 
                  cx="60" 
                  cy="60" 
                  r="45" 
                  className="stroke-[#115cb9] fill-none neon-glow-blue" 
                  strokeWidth="5" 
                  strokeDasharray="283" 
                  strokeDashoffset="283" 
                  strokeLinecap="round" 
                  transform="rotate(135 60 60)"
                  style={{
                    animation: "dashRing 0.8s cubic-bezier(0.25, 1, 0.5, 1) forwards"
                  }}
                />
                
                {/* Ticks & Labels */}
                <path d="M 28 92 L 32 88" className="stroke-white/20 fill-none" strokeWidth="1" />
                <path d="M 20 60 L 25 60" className="stroke-white/20 fill-none" strokeWidth="1" />
                <path d="M 28 28 L 32 32" className="stroke-white/20 fill-none" strokeWidth="1" />
                <path d="M 60 20 L 60 25" className="stroke-white/20 fill-none" strokeWidth="1" />
                <path d="M 92 28 L 88 32" className="stroke-white/20 fill-none" strokeWidth="1" />
                <path d="M 100 60 L 95 60" className="stroke-white/20 fill-none" strokeWidth="1" />
                <path d="M 92 92 L 88 88" className="stroke-white/20 fill-none" strokeWidth="1" />
              </svg>

              {/* Digital Readings inside the dial */}
              <div className="flex flex-col items-center justify-center mt-6">
                <span className="text-5xl font-black tracking-tighter text-[#acc7ff] neon-glow-blue font-mono select-none">
                  {digitalSpeed}
                </span>
                <span className="text-[10px] font-bold tracking-widest text-white/50 uppercase select-none mt-1">
                  km/h
                </span>
              </div>

              {/* Speedometer needle */}
              <div 
                className="w-1.5 h-20 bg-[#acc7ff] absolute bottom-8 origin-bottom rounded-full transform shadow-lg"
                style={{ 
                  transformOrigin: "bottom center", 
                  animation: "gaugeSweeper 0.8s cubic-bezier(0.25, 1, 0.5, 1) forwards",
                  filter: "drop-shadow(0 0 4px rgba(172, 199, 255, 0.9))"
                }}
              ></div>
              <div className="absolute bottom-8 w-8 h-8 bg-[#acc7ff] rounded-full border-4 border-[#070f1e] shadow-md"></div>
            </div>

            {/* Wireframe Car Outline Console */}
            <div className="w-72 h-16 relative border-t border-b border-white/10 flex items-center justify-center overflow-hidden">
              {/* Laser Scan line moving across the car */}
              <div 
                className="absolute top-0 bottom-0 w-24 bg-gradient-to-r from-transparent via-[#acc7ff]/20 to-transparent pointer-events-none"
                style={{
                  animation: "scannerSweep 1s cubic-bezier(0.4, 0, 0.2, 1) infinite"
                }}
              ></div>
              
              {/* Sleek SVG Car Line Drawing */}
              <svg 
                className="w-48 h-12 text-white/30 neon-glow-blue" 
                viewBox="0 0 100 30" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {/* Sleek sports car contours */}
                <path d="M 8,21 L 12,21 C 13.5,16 18.5,16 20,21 L 70,21 C 71.5,16 76.5,16 78,21 L 92,21 C 94.5,21 96,19 96,16.5 C 96,14.5 94.5,13.5 91,13 C 89,13 86.5,11.5 83,10.5 C 78,9 72,5.5 63,4.5 L 42,4.5 C 33,5.5 24,9 18,10.5 C 13,11.8 10,13.5 6,15.5 C 4.5,16.5 4,18 4,19.5 C 4,20.5 5.5,21 8,21 Z" />
                {/* Detail elements like spoiler/window separator lines */}
                <path d="M 42,4.5 L 48,11.5 L 75,11.5 L 63,4.5" className="opacity-40" />
                <path d="M 28,11.5 L 38,11.5 L 42,4.5" className="opacity-40" />
                {/* Wheels */}
                <circle cx="16" cy="21" r="3.5" className="fill-[#070f1e] stroke-[#acc7ff] neon-glow-blue" strokeWidth="1.2" />
                <circle cx="74" cy="21" r="3.5" className="fill-[#070f1e] stroke-[#acc7ff] neon-glow-blue" strokeWidth="1.2" />
              </svg>
            </div>

            {/* Dynamic Status Text */}
            <div className="flex flex-col items-center gap-1.5">
              <p className="text-[#acc7ff] font-mono text-[10px] tracking-[0.2em] uppercase opacity-90 font-bold pulse-text">
                {statusText}
              </p>
              <div className="flex gap-1.5 mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#acc7ff] animate-ping"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#acc7ff] opacity-40"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#acc7ff] opacity-20"></span>
              </div>
            </div>
            
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
