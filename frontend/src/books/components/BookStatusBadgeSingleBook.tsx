import React from "react";

export const BookStatusBadgeSingleBook = ({ status }: { status: string }) => {
  return (
    <div className="flex items-center">
      <span className="relative inline-flex overflow-hidden rounded-full p-[1px]">
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#9C1209_0%,#C27A6D_50%,#DCD4CC_100%)]"></span>
        <div className="inline-flex items-center justify-center w-full px-3 py-1 text-sm text-whiteText bg-encabezados rounded-full backdrop-blur-3xl whitespace-nowrap">
          {status}
        </div>
      </span>
    </div>
  );
};
