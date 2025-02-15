import React from "react";

export const BookStatusBadgeLibrary = ({ status }: { status: string }) => {
  return (
    <div className="flex items-center">
      <span className="relative inline-flex overflow-hidden rounded-full p-[0.5px]">
        <span className="absolute inset-[-200%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#9C1209_0%,#C27A6D_50%,#DCD4CC_100%)]"></span>
        <div className="inline-flex items-center justify-center w-full px-2 py-0.5 text-xs text-whiteText bg-encabezados rounded-full backdrop-blur-xl whitespace-nowrap">
          {status}
        </div>
      </span>
    </div>
  );
};
