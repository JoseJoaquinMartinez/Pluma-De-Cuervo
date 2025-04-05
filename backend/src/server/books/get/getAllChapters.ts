import { Router } from "express";
import prisma from "../../../client";

const router = Router();

router.get("/get-all-chapters/:bookId", async (req, res) => {
  const bookId = parseInt(req.params.bookId);

  try {
    const existingBook = await prisma.book.findFirst({
      where: {
        id: bookId,
      },
    });

    if (!existingBook) {
      res.status(404).json({ message: "Libro no encontrado" });
    }

    const chapters = await prisma.chapter.findMany({
      where: { bookId },
      orderBy: { createdAt: "asc" },
    });
    return res.status(200).json(chapters);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: `Error inesperado ${error.message}` });
    }
  } finally {
    prisma.$disconnect();
  }
});

export default router;
