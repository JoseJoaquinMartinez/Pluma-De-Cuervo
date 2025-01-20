import { CreateBook } from "@/books/book/createBook";
import { SectionComponent } from "@/homepage/components/SectionComponent";

export default function NewBookPage() {
  return (
    <div className="flex flex-col items-center justify-center pb-7 md:pb-0 px-4">
      <SectionComponent title="Crea tu nuevo libro" content={<CreateBook />} />
    </div>
  );
}
