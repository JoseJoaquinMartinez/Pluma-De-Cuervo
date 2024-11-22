import { SectionComponent } from "@/homepage/components/SectionComponent";
import BookCardComponent from "@/books/book/BookCardComponent";

export default function Biblioteca() {
  //TODO add slider to show all the books

  return (
    <div className="flex flex-col items-center justify-center pb-7 md:pb-0 px-4">
      <SectionComponent title="Biblioteca" content={<BookCardComponent />} />
    </div>
  );
}
