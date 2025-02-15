import { EditBook } from "@/books/book/editBook";
import { SectionComponent } from "@/homepage/components/SectionComponent";

export default function EditBookPage({
  params,
}: {
  params: { bookId: string };
}) {
  const bookId = parseInt(params.bookId);
  return (
    <div className="flex flex-col items-center justify-center  pb-8 px-4">
      <SectionComponent
        title="Modifica el libro"
        content={<EditBook bookId={bookId} />}
      />
    </div>
  );
}
