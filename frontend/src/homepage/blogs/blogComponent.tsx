"use client";
import React, { useState, useEffect } from "react";

import { lastFiveBlogInterface } from "@/homepage/blogs/interfaces/blog";
import getLastFiveBlogs from "@/homepage/blogs/utils/getLastFiveBlogs";
import BlogCard from "./blogCard";
import MainButton from "@/components/shared/mainButton";

const BlogComponent = () => {
  const [blogData, setBlogData] = useState<lastFiveBlogInterface[]>([]);

  useEffect(() => {
    const getBlogData = () => {
      getLastFiveBlogs()
        .then((data) => setBlogData(data))
        .catch((error) => console.error("Error fetching blogs:", error));
    };

    getBlogData();
  }, []);
  return (
    <article className="flex flex-col gap-6">
      <div className="flex flex-col mlg:flex-row gap-6">
        {blogData.map((blog) => (
          <BlogCard key={blog.id} {...blog} />
        ))}
      </div>
      <div className="self-center">
        <MainButton link="/blogs/all-blogs" name="Más Entradas" />
      </div>
    </article>
  );
};
export default React.memo(BlogComponent);
