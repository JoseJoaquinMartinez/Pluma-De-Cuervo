import { AllExistingBlog, Blogs } from "../interface/blogs";

export const getAllBlogs = async (): Promise<Blogs> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/blog/get-all-blog-posts`
    );
    const data = await response.json();

    const shortedData = data.map((blog: AllExistingBlog) => ({
      ...blog,
      createdAt: new Date(blog.createdAt).toLocaleDateString(),
    }));

    return shortedData;
  } catch (error) {
    console.error(error);
    return [];
  }
};
