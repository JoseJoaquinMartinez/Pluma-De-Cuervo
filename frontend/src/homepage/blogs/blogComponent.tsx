"use client";
import React, { useState, useEffect } from "react";
import BlogCard from "./blogCard";
import MainButton from "@/components/shared/mainButton";
import { BookLoaderComponent } from "@/components/shared/BookLoader";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { fetchBlogHomepage } from "@/store/slices/homepage/blogs/thunks/blogThunks";
import ErrorToast from "@/components/shared/ErrorToaster";

const BlogComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    data: blogs,
    loading,
    error,
  } = useSelector((state: RootState) => state.blogHomepage);

  useEffect(() => {
    if (blogs.length === 0) {
      dispatch(fetchBlogHomepage());
    }
  }, [dispatch, blogs]);

  return (
    <article className="flex flex-col gap-6">
      {loading ? (
        <div className="felx flex-col items-center justify-center w-full">
          <BookLoaderComponent />
        </div>
      ) : (
        <>
          {error && <ErrorToast message={error} />}
          <div className="grid grid-col-1 md:grid-cols-3  mlg:grid-cols-5 gap-6">
            {blogs.map((blog) => (
              <BlogCard key={blog.id} {...blog} />
            ))}
          </div>
          <div className="self-center">
            <MainButton link="/blogs/all-blogs" name="Más Noticias" />
          </div>
        </>
      )}
    </article>
  );
};
export default React.memo(BlogComponent);
