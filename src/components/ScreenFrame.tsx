import { useState, useEffect } from "react";

export function ScreenFrame({ src, title }: { src: string; title: string }) {
  const [currentSrc, setCurrentSrc] = useState(src);

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

      setCurrentSrc(targetSrc);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [src]);

  return (
    <iframe
      src={currentSrc}
      title={title}
      className="w-screen h-screen border-0 block"
      style={{ width: "100vw", height: "100vh" }}
    />
  );
}

