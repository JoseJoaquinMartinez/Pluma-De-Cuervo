import { CreateBlog } from "@/blogs/blog/createBlog";
import { SectionComponent } from "@/homepage/components/SectionComponent";

export default function CreateBlogPage() {
  return (
    <div className="flex flex-col items-center justify-center  pb-8 px-4">
      <SectionComponent
        title="Que tienes en tu cabeza hoy"
        content={<CreateBlog />}
      />
    </div>
  );
}
