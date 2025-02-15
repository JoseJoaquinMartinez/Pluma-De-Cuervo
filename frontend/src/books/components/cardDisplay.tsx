import React from "react";

import BookCardDisplay from "@/books/components/BookCardDisplay";
import { BookCardComponentProps } from "../interfaces/bookData";

const CardDisplay = ({ books }: { books: BookCardComponentProps[] }) => {
  return (
    <article className="grid grid-cols-3 justify-between items-center gap-5 mt-2">
      {books.map(
        ({ id, title, Synopsis, imagen, status }: BookCardComponentProps) => (
          <BookCardDisplay
            key={id}
            id={id}
            title={title}
            Synopsis={Synopsis}
            imagen={imagen}
            status={status}
          />
        )
      )}
    </article>
  );
};

export default CardDisplay;
