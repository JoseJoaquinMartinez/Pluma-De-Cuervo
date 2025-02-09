"use client";
import { BookLoaderComponent } from "@/components/shared/BookLoader";
import { fetchSingleBlog } from "@/store/slices/blogs/thunks/fetchSingleBlog";
import { AppDispatch, RootState } from "@/store/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SingleBlogComponent } from "../components/SingleBlogComponent";

export const SingleBlog = ({ blogId }: { blogId: number }) => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    data: blog,
    loading,
    error,
  } = useSelector((state: RootState) => state.SingleBlog);

  const { data } = useSelector((state: RootState) => state.Authentication);

  useEffect(() => {
    if (!blog || blog.id !== blogId) {
      dispatch(fetchSingleBlog(blogId));
    }
  }, [blogId, dispatch]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center">
        <BookLoaderComponent />
      </div>
    );
  }
  if (error) {
    return <div>{error}</div>;
  }
  if (blog) {
    if (data) {
      const role = data.user.role;
      return <SingleBlogComponent {...blog} role={role} />;
    } else {
      return <SingleBlogComponent {...blog} />;
    }
  }
};
