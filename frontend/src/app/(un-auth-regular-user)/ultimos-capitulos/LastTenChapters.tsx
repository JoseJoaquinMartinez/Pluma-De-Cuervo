"use client";
import { useEffect } from "react";
import { BookLoaderComponent } from "@/components/shared/BookLoader";
import ChapterCard from "./components/ChapterCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { fetchLastTenChapters } from "@/store/slices/lastTenChapters/thunks/fetchLastTenChapters";

export default function LastTenChapters() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    data: chapters,
    loading,
    error,
  } = useSelector((state: RootState) => state.lastTenChapters);

  useEffect(() => {
    if (chapters.length === 0) {
      dispatch(fetchLastTenChapters());
    }
  }, [dispatch, chapters]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center">
        <BookLoaderComponent />
      </div>
    );
  }
  //TODO add the error toaster
  if (error) return <p>{error}</p>;

  return (
    <article className="flex flex-col gap-6">
      <div className="grid grid-col-1 md:grid-cols-2 mlg:grid-cols-5 gap-6">
        {chapters.map((chapter) => (
          <ChapterCard key={chapter.id} {...chapter} />
        ))}
      </div>
    </article>
  );
}
