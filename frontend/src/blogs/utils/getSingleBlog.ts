import type { SingleBlog } from "../interface/blogs";

export const getSingleBlog = async (blogId: number): Promise<SingleBlog> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/blog/get-single-blog-post/${blogId}`
    );
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    const data = await response.json();
    const estimatedReadTimeToString = {
      ...data,
      createdAt: new Date(data.createdAt).toLocaleDateString(),
    };
    return estimatedReadTimeToString;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Error inesperado");
  }
};
