"use client";

import { useState, useEffect } from "react";
import { LastFiveChapterProp } from "@/app/(un-auth-regular-user)/libro/interfaces/interface";

export default function Libro({ params }: { params: { id: string } }) {
  const [bookData, setBookData] = useState<BookCardComponentProps | null>(null);
  const [fiveLastChapters, setFiveLastChapters] = useState<
    LastFiveChapterProp[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const bookId = params.id;

  //TODO get the book data from the id and on a different call the last five chapters set loading in both
  useEffect(() => {}, [bookId]);
  return (
    <div className="flex flex-col items-center justify-center pb-8 px-4">
      <h2>Libro</h2>
    </div>
  );
}
