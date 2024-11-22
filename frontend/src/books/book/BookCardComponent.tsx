"use client";

import { BookLoaderComponent } from "@/components/shared/BookLoader";

import { useEffect, useState } from "react";
import Slider from "@/components/shared/Slider";
import { getBooksData } from "@/books/book/utils/getBooksData";

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
      <Slider books={books} />
    </>
  );
};

export default BookCardComponent;
