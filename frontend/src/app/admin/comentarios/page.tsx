import { AdminGetComment } from "@/comments/comment/AdminGetComment";
import { SectionComponent } from "@/homepage/components/SectionComponent";

export default function CommentPage() {
  return (
    <div className="flex flex-col items-center justify-center  pb-8 px-4">
      <SectionComponent title="Comentarios" content={<AdminGetComment />} />
    </div>
  );
}
