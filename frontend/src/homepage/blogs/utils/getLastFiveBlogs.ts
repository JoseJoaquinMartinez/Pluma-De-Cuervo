import { lastFiveBlogInterface } from "../interfaces/blog";

//TODO ver porque falla a veces esta call
export default async function getLastFiveBlogs() {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_UR + "/blog/get-last-five-blogs"
    );

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const blogData = await response.json();

    return blogData.map((blog: lastFiveBlogInterface) => ({
      ...blog,
      createdAt: new Date(blog.createdAt).toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
    }));
  } catch (error) {
    console.error("Error al obtener los blogs:", error);

    return [];
  }
}
