"use client";
import { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type SuccessToastProps = {
  message: string;
  duration?: number;
};

export default function SuccessToast({
  message,
  duration = 5000,
}: SuccessToastProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-5 right-5 flex items-center gap-4 bg-green-400 text-whiteText px-4 py-2 rounded-lg shadow-lg border-l-4 border-green-950 sm:top-3 sm:right-3 sm:px-3 sm:py-2 md:top-20 md:right-20 md:px-4 md:py-2 w-[90%] max-w-sm sm:max-w-xs md:max-w-sm"
        >
          <p className="text-sm font-medium break-words">{message}</p>
          <button
            onClick={() => setVisible(false)}
            className="ml-auto text-whiteText hover:text-navBarActiveLink transition"
          >
            <CheckCircle className="w-6 h-6 text-whiteText" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
