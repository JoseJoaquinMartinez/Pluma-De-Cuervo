import { EditExistingBlog } from "@/blogs/blog/editBlog";
import { SectionComponent } from "@/homepage/components/SectionComponent";

export default function ModifyBlogPage({
  params,
}: {
  params: { blogId: string };
}) {
  const blogId = parseInt(params.blogId);
  return (
    <div className="flex flex-col items-center justify-center  pb-8 px-4">
      <SectionComponent
        title="Que tienes en tu cabeza hoy"
        content={<EditExistingBlog blogId={blogId} />}
      />
    </div>
  );
}
