"use client";

import { useState, useEffect } from "react";
import { LastFiveChapterProp } from "@/app/(un-auth-regular-user)/libro/interfaces/interface";

export default async function Libro({ params }: { params: { id: string } }) {
  const [bookData, setBookData] = useState<BookCardComponentProps | null>(null);
  const [fiveLastChapters, setFiveLastChapters] = useState<
    LastFiveChapterProp[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const bookId = params.id;

  useEffect(() => {}, [bookId]);
  return (
    <div className="flex flex-col items-center justify-center pb-8 px-4">
      <h2>Libro</h2>
    </div>
  );
}
