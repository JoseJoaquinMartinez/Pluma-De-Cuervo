import React from "react";

import BookCardDisplay from "@/books/components/BookCardDisplay";

const CardDisplay = ({ books }: { books: BookCardComponentProps[] }) => {
  return (
    <article className="grid grid-cols-3 justify-between items-center gap-5 mt-2">
      {books.map(({ id, title, Synopsis, imagen }: BookCardComponentProps) => (
        <BookCardDisplay
          key={id}
          id={id}
          title={title}
          Synopsis={Synopsis}
          imagen={imagen}
        />
      ))}
    </article>
  );
};

export default CardDisplay;
