"use client";

import { useEffect, useState } from "react";

const CommentParagraphBanner = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const ParagraphComments = localStorage.getItem("ParagraphComments");
    if (!ParagraphComments) {
      setShowBanner(true);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem(
      "ParagraphComments",
      JSON.stringify({
        ParagraphComments: true,
      })
    );

    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-navFoot text-whiteText p-4 text-center z-50">
      <p className="mb-2">
        Puedes dejar comentarios haciendo click sobre los párrafos.
      </p>
      <div className="space-x-4">
        <button
          onClick={handleAcceptAll}
          className="bg-botones px-4 py-2 rounded-md hover:bg-botonesSecundarios transition-colors"
        >
          Aceptar
        </button>
      </div>
    </div>
  );
};

export default CommentParagraphBanner;
