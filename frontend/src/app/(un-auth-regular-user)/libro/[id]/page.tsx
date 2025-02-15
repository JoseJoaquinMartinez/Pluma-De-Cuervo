import SingleBook from "@/books/book/singleBook";

export default function Libro({ params }: { params: { id: string } }) {
  const bookId = parseInt(params.id);

  return (
    <div className="flex flex-col items-center justify-center px-4">
      <SingleBook bookId={bookId} />
    </div>
  );
}
