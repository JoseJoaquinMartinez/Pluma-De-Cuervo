import { LastFiveChapters } from "@/books/interfaces/bookData";

export const getLastFiveChapters = async (
  bookId: number
): Promise<LastFiveChapters[]> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/book/get-last-five-chapters/${bookId}`
    );
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    const lastFiveChaptersData: LastFiveChapters[] = await response.json();
    return lastFiveChaptersData.map((chapter) => ({
      ...chapter,
      createdAt: new Date(chapter.createdAt).toLocaleString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
};
