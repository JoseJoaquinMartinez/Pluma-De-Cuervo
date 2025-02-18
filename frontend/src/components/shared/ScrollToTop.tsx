"use client";

import { useState, useEffect, useCallback } from "react";
import { ArrowUpCircle } from "lucide-react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 50) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-60 right-10 p-2 rounded-full transition-colors duration-300 ease-in-out
                     border-2 border-black hover:border-white hover:bg-[#C27A6D] focus:outline-none z-50"
          aria-label="Scroll to top"
        >
          <ArrowUpCircle className="w-6 h-6 text-black hover:text-white" />
        </button>
      )}
    </>
  );
};

export default ScrollToTop;
