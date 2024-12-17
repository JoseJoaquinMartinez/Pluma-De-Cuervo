import { SingleBlog } from "@/blogs/blog/singleBlog";

export default function BlogPage({ params }: { params: { blogId: string } }) {
  const blogId = parseInt(params.blogId);

  return (
    <section className="flex flex-col items-center justify-center px-4">
      <SingleBlog blogId={blogId} />
    </section>
  );
}
