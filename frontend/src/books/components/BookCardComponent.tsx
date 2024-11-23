"use client";

import { BookLoaderComponent } from "@/components/shared/BookLoader";

import { useEffect, useState } from "react";
import Slider from "@/books/components/Slider";
import { getBooksData } from "@/books/book/utils/getBooksData";
import CardDisplay from "@/books/components/cardDisplay";

const BookCardComponent = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [books, setBooks] = useState<BookCardComponentProps[]>([]);

  useEffect(() => {
    const booksData = async () => {
      setLoading(true);
      try {
        const response = await getBooksData(setError);
        if (response) {
          setBooks(response);
        }
      } catch (error) {
        setError(`Error cargando los libros: ${error}`);
      } finally {
        setLoading(false);
      }
    };
    booksData();
  }, []);
  if (loading) {
    return <BookLoaderComponent />;
  }
  if (error) {
    return <p>{error}</p>;
  }
  return (
    <>
      <div className="hidden md:flex mlg:flex-row items-center gap-5 mt-2">
        <CardDisplay books={books} />
      </div>
      <div className="w-full md:hidden">
        <Slider books={books} />
      </div>
    </>
  );
};

export default BookCardComponent;
