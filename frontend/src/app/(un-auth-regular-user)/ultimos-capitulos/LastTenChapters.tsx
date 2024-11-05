"use client";
import { useEffect, useState } from "react";
import { getLastTenChapters } from "./utils/getLastTenChapters";
import { LastTenChapterProp } from "./interface/interface";
import { BookLoaderComponent } from "@/components/shared/BookLoader";
import ChapterCard from "./components/ChapterCard";

export default function LastTenChapters() {
  const [chapters, setChapters] = useState<LastTenChapterProp[]>([]);
  const [error, setError] = useState("");
  const [loader, setLoader] = useState<boolean>(true);

  useEffect(() => {
    setLoader(true);
    const getLastFiveChaptersData = () => {
      getLastTenChapters(setError)
        .then((data) => {
          if (data) {
            setChapters(data);
          }
        })
        .catch((error) => setError(error));
    };
    getLastFiveChaptersData();
    setLoader(false);
  }, []);

  return (
    <article className="flex flex-col gap-6">
      {loader ? (
        <BookLoaderComponent />
      ) : (
        <>
          <div className="grid grid-col-1 md:grid-cols-2  mlg:grid-cols-5 gap-6 ">
            {chapters.map((chapter) => (
              <ChapterCard key={chapter.id} {...chapter} />
            ))}
          </div>
        </>
      )}
    </article>
  );
}