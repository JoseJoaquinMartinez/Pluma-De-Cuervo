import { CreateChapter } from "@/chapters/chapter/createChapter";
import { SectionComponent } from "@/homepage/components/SectionComponent";

export default function CreateChapterPage({
  params,
}: {
  params: { bookId: string };
}) {
  const bookId = parseInt(params.bookId);
  return (
    <div className="flex flex-col items-center justify-center  pb-8 px-4">
      <SectionComponent
        title="Crea el nuevo capítulo"
        content={<CreateChapter bookId={bookId} />}
      />
    </div>
  );
}
