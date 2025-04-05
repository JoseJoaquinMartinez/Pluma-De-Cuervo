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
      select: {
        imagen: true,
      },
    });

    if (!existingBook) {
      res.status(404).json({ message: "Libro no encontrado" });
    }

    const chapters = await prisma.chapter.findMany({
      where: { bookId },
      orderBy: { createdAt: "asc" },
    });
    if (!chapters) {
      res.status(404).json({ message: "Capítulos no encontrados" });
    }
    const response = chapters.map((chapter) => ({
      ...chapter,
      bookImg: existingBook?.imagen,
    }));

    return res.status(200).json(response);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: `Error inesperado ${error.message}` });
    }
  } finally {
    prisma.$disconnect();
  }
});

export default router;
