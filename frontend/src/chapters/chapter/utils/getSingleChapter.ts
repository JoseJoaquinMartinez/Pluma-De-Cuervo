import { ChapterProps } from "@/chapters/chapter/interface/chapter";

export const getSingleChapter = async (
  chapterId: number,
  bookId: number
): Promise<ChapterProps | undefined> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/book/get-chapter/${bookId}/${chapterId}`
    );
    if (!response.ok) {
      throw new Error("Error en la respuesta del servidor");
    }
    const chapterData: ChapterProps = await response.json();
    const chapterDataWithDate = {
      ...chapterData,
      createdAt: new Date(chapterData.createdAt).toLocaleDateString(),
    };
    return chapterDataWithDate;
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        `Error obteniendo la información del capítulo: ${error.message}`
      );
    } else {
      console.error("Error inesperado cargando el capítulo");
    }
    return undefined;
  }
};
