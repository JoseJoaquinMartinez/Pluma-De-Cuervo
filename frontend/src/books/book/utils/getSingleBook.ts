import { BookCardComponentProps } from "@/books/interfaces/bookData";

export const getSingleBook = async (
  id: number
): Promise<BookCardComponentProps> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/book/get-single-book/${id}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (err) {
    console.error(
      `Error interno cargando el libro, vuelva a intentarlo más tarde: ${err}`
    );
    throw new Error("Error obteniendo los datos del libro");
  }
};
