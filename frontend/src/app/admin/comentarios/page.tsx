import { AdminGetComment } from "@/comments/comment/adminGetComment";
import { SectionComponent } from "@/homepage/components/SectionComponent";

export default function CommentPage() {
  return (
    <div className="flex flex-col items-center justify-center  w-full pb-8 px-4">
      <SectionComponent title="Comentarios" content={<AdminGetComment />} />
    </div>
  );
}
