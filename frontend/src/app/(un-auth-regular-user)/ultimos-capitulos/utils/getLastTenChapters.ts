import type { LastTenChapterProp } from "../interface/interface";
export async function getLastTenChapters(
  setError: React.Dispatch<React.SetStateAction<string>>
) {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_URL + "/book/get-last-ten-chapters"
    );

    if (!response.ok) {
      throw new Error("Error obteniendo los capítulos");
    }

    const lastFiveChapterData: LastTenChapterProp[] = await response.json();
    return lastFiveChapterData.map((chapter) => ({
      ...chapter,
      createdAt: new Date(chapter.createdAt).toLocaleString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
    }));
  } catch (error) {
    setError("Error al obtener los capitulos");
    return;
  }
}
