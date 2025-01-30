import { SectionComponent } from "@/homepage/components/SectionComponent";
import { EditChapter } from "../../../../../../../../chapters/chapter/editChapter";

export default function EditChapterPage({
  params,
}: {
  params: { chapterId: string; bookId: string };
}) {
  const chapterId = parseInt(params.chapterId);
  const bookId = parseInt(params.bookId);
  return (
    <div className="flex flex-col items-center justify-center  pb-8 px-4">
      <SectionComponent
        title="Edita el capítulo"
        content={<EditChapter chapterId={chapterId} bookId={bookId} />}
      />
    </div>
  );
}
