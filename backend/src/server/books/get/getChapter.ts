import { Router } from "express";
import prisma from "../../../../client";

const router = Router();

router.get("/get-chapter/:bookId/:chapterId", async (req, res) => {
  const bookId = parseInt(req.params.bookId);
  const chapterId = parseInt(req.params.chapterId);
  try {
    const book = await prisma.book.findFirst({
      where: { id: bookId },
      select: { id: true, title: true },
    });

    const existingChapter = await prisma.chapter.findFirst({
      where: {
        id: chapterId,
        bookId: bookId,
      },
      include: {
        paragraph: true,
      },
    });
    if (!existingChapter) {
      res.status(404).json({ message: "Capítulo no encontrado" });
    }
    return res.status(200).json({
      ...existingChapter,
      bookTitle: book?.title,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: `Error inesperado ${error.message}` });
    }
  } finally {
    prisma.$disconnect();
  }
});
export default router;
