"use client";
import React, { useState, useEffect } from "react";

import { lastFiveBlogInterface } from "@/homepage/blogs/interfaces/blog";
import getLastFiveBlogs from "@/homepage/blogs/utils/getLastFiveBlogs";
import BlogCard from "./blogCard";
import MainButton from "@/components/shared/mainButton";
import { BookLoaderComponent } from "@/components/shared/BookLoader";

const BlogComponent = () => {
  const [blogData, setBlogData] = useState<lastFiveBlogInterface[]>([]);
  const [loader, setLoader] = useState<boolean>(true);

  useEffect(() => {
    setLoader(true);
    const getBlogData = () => {
      getLastFiveBlogs()
        .then((data) => setBlogData(data))
        .catch((error) => console.error("Error fetching blogs:", error));
    };

    getBlogData();
    setLoader(false);
  }, []);
  return (
    <article className="flex flex-col gap-6">
      {loader ? (
        <BookLoaderComponent />
      ) : (
        <>
          <div className="grid grid-col-1 md:grid-cols-3  mlg:grid-cols-5 gap-6">
            {blogData.map((blog) => (
              <BlogCard key={blog.id} {...blog} />
            ))}
          </div>
          <div className="self-center">
            <MainButton link="/blogs/all-blogs" name="Más Entradas" />
          </div>
        </>
      )}
    </article>
  );
};
export default React.memo(BlogComponent);
