import { Router } from "express";
import prisma from "../../../client";

const router = Router();

router.get("/get-last-five-chapters/:bookId", async (req, res) => {
  const bookId = parseInt(req.params.bookId);

  try {
    const existingBook = await prisma.book.findFirst({
      where: {
        id: bookId,
      },
      select: {
        imagen: true,
      },
    });

    if (!existingBook) {
      res.status(404).json({ message: "Libro no encontrado" });
    }
    const lastFiveChapters = await prisma.chapter.findMany({
      where: { bookId },
      orderBy: { createdAt: "desc" },
      take: 5,
      select: {
        id: true,
        imagen: true,
        title: true,
        createdAt: true,
      },
    });
    if (!lastFiveChapters) {
      res.status(404).json({ message: "Capítulos no encontrados" });
    }
    const response = lastFiveChapters.map((chapter) => ({
      ...chapter,
      bookImg: existingBook?.imagen,
    }));
    return res.status(200).json(response);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: `Error inesperado ${error.message}` });
    }
  }
});

export default router;
