import React from "react";

import { lastFiveBlogInterface } from "@/homepage/blogs/interfaces/blog";
import getLastFiveBlogs from "@/homepage/blogs/utils/getLastFiveBlogs";
import BlogCard from "./blogCard";
import MainButton from "@/components/shared/mainButton";

const BlogComponent = async () => {
  const blogData: lastFiveBlogInterface[] = await getLastFiveBlogs();
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
