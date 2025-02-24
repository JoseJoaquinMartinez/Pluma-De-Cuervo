"use client";
import { BookLoaderComponent } from "@/components/shared/BookLoader";
import { fetchAllBlogs } from "@/store/slices/blogs/thunks/fetchAllBlogs";
import { AppDispatch, RootState } from "@/store/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BlogCardComponent } from "./BlogCardComponent";
import MainButton from "@/components/shared/mainButton";
import ErrorToast from "@/components/shared/ErrorToaster";

function AllBlogsComponent() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    data: blogs,
    loading,
    error,
    fetched,
  } = useSelector((state: RootState) => state.AllBlogs);
  const { data } = useSelector((state: RootState) => state.Authentication);

  useEffect(() => {
    if (!blogs || !fetched) {
      dispatch(fetchAllBlogs());
    }
  }, [fetched, dispatch, blogs]);

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
  if (blogs) {
    return (
      <section className="flex flex-col items-center mt-5 lg:max-w-screen-xl ">
        <div className="flex flex-col md:flex-row mb-2 w-full justify-between">
          <h2 className="text-encabezados text-2xl  text-start mb-2 self-start px-2 font-semibold">
            Noticias & Pensamientos
          </h2>
          <article className="self-center">
            {data?.user.role === "admin" && (
              <MainButton name="Nuevo Blog" link="/admin/blogs/crear-blog" />
            )}
          </article>
        </div>
        {blogs && blogs.length === 0 && (
          <p className="text-mainText text-xl">
            Aún no hay blogs publicados, pronto traeremos nuevas noticias
          </p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {blogs.map(({ id, title, createdAt, imagen }) => (
            <BlogCardComponent
              key={id}
              id={id}
              title={title}
              createdAt={createdAt}
              imagen={imagen}
            />
          ))}
        </div>
      </section>
    );
  }
}

export default AllBlogsComponent;
