"use client";
import { BookLoaderComponent } from "@/components/shared/BookLoader";
import { fetchAllBlogs } from "@/store/slices/blogs/thunks/fetchAllBlogs";
import { AppDispatch, RootState } from "@/store/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BlogCardComponent } from "./BlogCardComponent";

function AllBlogsComponent() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    data: blogs,
    loading,
    error,
  } = useSelector((state: RootState) => state.AllBlogs);

  useEffect(() => {
    if (!blogs || blogs?.length === 0) {
      dispatch(fetchAllBlogs());
    }
  }, [blogs, dispatch]);

  if (loading) {
    return <BookLoaderComponent />;
  }
  if (error) {
    return <p>{error}</p>;
  }
  if (blogs) {
    return (
      <section className="flex flex-col items-center mt-5 lg:max-w-screen-xl ">
        <h2 className="text-encabezados text-2xl  text-start mb-2 self-start px-2 font-semibold">
          Noticias & Pensamientos
        </h2>
        {blogs && blogs.length === 0 && <p>No hay blogs que mostrar</p>}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {blogs.map(({ id, title, createdAt, estimatedReadTime, imagen }) => (
            <BlogCardComponent
              key={id}
              id={id}
              title={title}
              createdAt={createdAt}
              estimatedReadTime={estimatedReadTime}
              imagen={imagen}
            />
          ))}
        </div>
      </section>
    );
  }
}

export default AllBlogsComponent;
