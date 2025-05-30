import { Router } from "express";
import prisma from "../../../client";

const router = Router();

router.get("/get-last-ten-chapters", async (req, res) => {
  try {
    const lastTenChapters = await prisma.chapter.findMany({
      orderBy: { createdAt: "desc" },
      skip: 0,
      take: 10,
      select: {
        id: true,
        imagen: true,
        title: true,
        createdAt: true,
        bookId: true,
        book: {
          select: {
            imagen: true,
          },
        },
      },
    });

    if (!lastTenChapters || lastTenChapters.length === 0) {
      return res
        .status(404)
        .json({ error: "Últimos capítulos no encontrados" });
    }
    const formattedChapters = lastTenChapters.map((chapter) => {
      const { book, ...chapterData } = chapter;
      return {
        ...chapterData,
        bookImg: book.imagen,
      };
    });
    return res.status(200).json(formattedChapters);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        error: `Error cargando los últimos capítulos ${error.message}`,
      });
    }
  }
});

export default router;
