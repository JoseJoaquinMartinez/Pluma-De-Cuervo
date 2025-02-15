import BookCardComponent from "@/books/components/BookCardComponent";
import { SectionComponentBook } from "@/homepage/components/SectionComponentBook";

export default function Biblioteca() {
  return (
    <div className="flex flex-col items-center justify-center pb-7 md:pb-0 px-4">
      <SectionComponentBook
        title="Biblioteca"
        content={<BookCardComponent />}
      />
    </div>
  );
}
