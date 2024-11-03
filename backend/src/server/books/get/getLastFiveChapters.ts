import { Router } from "express";
import prisma from "../../../../client";

const router = Router();

router.get("/get-last-five-chapters", async (req, res) => {
  try {
    const lastFiveChapters = await prisma.chapter.findMany({
      orderBy: { createdAt: "desc" },
      skip: 0,
      take: 5,
      select: {
        id: true,
        imagen: true,
        title: true,
      },
    });

    if (!lastFiveChapters || lastFiveChapters.length === 0) {
      return res
        .status(404)
        .json({ error: "Últimos capítulos no encontrados" });
    }
    return res.status(200).json(lastFiveChapters);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        error: `Error cargando los últimos capítulos ${error.message}`,
      });
    }
  }
});

export default router;
