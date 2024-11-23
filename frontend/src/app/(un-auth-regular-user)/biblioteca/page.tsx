import { SectionComponent } from "@/homepage/components/SectionComponent";
import BookCardComponent from "@/books/components/BookCardComponent";

export default function Biblioteca() {
  return (
    <div className="flex flex-col items-center justify-center pb-7 md:pb-0 px-4">
      <SectionComponent title="Biblioteca" content={<BookCardComponent />} />
    </div>
  );
}
