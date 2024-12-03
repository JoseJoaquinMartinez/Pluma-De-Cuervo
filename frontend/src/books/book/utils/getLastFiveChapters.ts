import { LastFiveChapters } from "@/books/interfaces/bookData";

export const getLastFiveChapters = async (
  bookId: number,
): Promise<LastFiveChapters[]> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/book/get-last-five-chapters/${bookId}`,
    );
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};
