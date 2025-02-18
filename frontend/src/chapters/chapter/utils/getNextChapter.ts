export const getNextChapter = async (bookId: string, chapterId: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/book/next-chapter/${bookId}/${chapterId}`
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    } else if (response.status === 404) {
      return "No hay más capítulos";
    } else {
      return "Error inesperado";
    }
  } catch (error) {
    if (error instanceof Error) {
      return `Error inesperado ${error.message}`;
    } else {
      return "Error inesperado";
    }
  }
};
