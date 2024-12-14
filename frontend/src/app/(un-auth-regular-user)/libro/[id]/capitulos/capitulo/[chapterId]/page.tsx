import { SingleChapter } from "@/chapters/chapter/singleChapter";
import React from "react";

export default function Capitulo({
  params,
}: {
  params: { chapterId: string; id: string };
}) {
  const chapterId = parseInt(params.chapterId);
  const bookId = parseInt(params.id);

  return (
    <div className="flex flex-col items-center justify-center px-4">
      <SingleChapter chapterId={chapterId} bookId={bookId} />
    </div>
  );
}
