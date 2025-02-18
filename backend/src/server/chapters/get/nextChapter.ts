import { Router } from "express";
import prisma from "../../../client";

const router = Router();

router.get("/next-chapter/:bookId/:chapterId", async (req, res) => {
  const chapterId = parseInt(req.params.chapterId);
  const bookId = parseInt(req.params.bookId);

  try {
    const existingBook = await prisma.book.findFirst({ where: { id: bookId } });
    if (!existingBook) {
      return res.status(404).json({ message: "El libro no existe" });
    }
    const nextChapter = await prisma.chapter.findFirst({
      where: { bookId: bookId, id: { gt: chapterId } },
      orderBy: { id: "asc" },
      include: { paragraph: true },
    });
    if (!nextChapter) {
      return res.status(404).json({ message: "No hay más capítulos" });
    }
    return res.status(200).json(nextChapter);
  } catch (error) {
    if (error instanceof Error) {
      return res
        .status(500)
        .json({ error: `Error inesperado ${error.message}` });
    }
  } finally {
    await prisma.$disconnect();
  }
});

export default router;
