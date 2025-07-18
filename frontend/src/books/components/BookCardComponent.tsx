"use client";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { BookLoaderComponent } from "@/components/shared/BookLoader";
import { fetchLibraryBooks } from "@/store/slices/library/thunks/fecthLibraryBooks";
import { useEffect } from "react";
import Slider from "@/books/components/Slider";
import CardDisplay from "@/books/components/cardDisplay";

import ErrorToast from "@/components/shared/ErrorToaster";

const BookCardComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    data: books,
    loading,
    error,
  } = useSelector((state: RootState) => state.libraryBooks);

  useEffect(() => {
    if (books.length === 0) {
      dispatch(fetchLibraryBooks());
    }
  }, [dispatch, books]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center w-full">
        <BookLoaderComponent />
      </div>
    );
  }
  if (error) {
    return <ErrorToast message={error} />;
  }
  return (
    <>
      <div className="hidden mlg:flex mlg:flex-row items-center gap-5 mt-2">
        <CardDisplay books={books} />
      </div>
      <div className="mlg:hidden">
        <Slider books={books} />
      </div>
    </>
  );
};

export default BookCardComponent;
