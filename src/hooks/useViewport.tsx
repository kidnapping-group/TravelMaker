// hooks/useViewport.js
import { useEffect, useState } from "react";

type ViewPort = "pc" | "tablet" | "mobile";

const useViewport = () => {
  const [viewport, setViewport] = useState<ViewPort>("pc");

  useEffect(() => {
    const handleResize = () => {
      if (window.matchMedia("(min-width: 1200px)").matches) {
        setViewport("pc");
      } else if (window.matchMedia("(min-width: 768px)").matches) {
        setViewport("tablet");
      } else {
        setViewport("mobile");
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return viewport;
};

export default useViewport;
