import { RegularUserGetComment } from "@/comments/comment/regularUserGetComment";
import { SectionComponent } from "@/homepage/components/SectionComponent";
export default function RegularUserCommentsPage() {
  return (
    <div className="flex flex-col items-center justify-center  w-full pb-8 px-4">
      <SectionComponent
        title="Comentarios"
        content={<RegularUserGetComment />}
      />
    </div>
  );
}
