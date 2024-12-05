import { BookCardComponentProps } from "@/books/interfaces/bookData";

export const getBooksData = async (): Promise<
  BookCardComponentProps[] | undefined
> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/book/get-all-books`,
    );
    return await response.json();
  } catch (err) {
    console.error(
      `Error interno cargando los libros, vuelva a intentarlo más tarde ${err}`,
    );
    return;
  }
};
