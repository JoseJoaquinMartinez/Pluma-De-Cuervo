"use client";
import { useEffect, useState } from "react";
import { XCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type ErrorToastProps = {
  message: string;
  duration?: number;
};

export default function ErrorToast({
  message,
  duration = 5000,
}: ErrorToastProps) {
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
          className="fixed top-20 left-20 flex items-center gap-4 bg-navFoot text-whiteText px-4 py-2 rounded-lg shadow-lg border-l-4 border-bordesDecor sm:top-3 sm:right-3 sm:px-3 sm:py-2 md:top-20 md:left-20 md:px-4 md:py-2 w-[90%] max-w-sm sm:max-w-xs md:max-w-sm"
        >
          <p className="text-sm font-medium break-words">{message}</p>
          <button
            onClick={() => setVisible(false)}
            className="ml-auto text-whiteText hover:text-botones transition"
          >
            <XCircle className="w-6 h-6 text-whiteText" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
