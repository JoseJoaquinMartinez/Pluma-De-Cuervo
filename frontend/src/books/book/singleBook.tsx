"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { BookLoaderComponent } from "@/components/shared/BookLoader";
import { fetchSingleBookData } from "@/store/slices/singleBook/thunk/fetchSingleBookData";

function SingleBook({ bookId }: { bookId: number }) {
  const dispatch = useDispatch<AppDispatch>();
  const {
    data: book,
    loading,
    error,
  } = useSelector((state: RootState) => state.singleBook);

  useEffect(() => {
    if (!book || book.id !== bookId) {
      dispatch(fetchSingleBookData(bookId));
    }
  }, [bookId, book, dispatch]);

  if (loading) {
    return <BookLoaderComponent />;
  }
  if (error) {
    return <p>{error}</p>;
  }

  if (book) {
    return <div>{book.title}</div>;
  }
}

export default SingleBook;
