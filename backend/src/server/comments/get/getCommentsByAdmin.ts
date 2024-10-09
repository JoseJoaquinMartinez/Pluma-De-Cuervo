import { Router } from "express";
import prisma from "../../../../client";
import { verifyToken } from "../../../utils/verifyToken";

const router = Router();

router.get("/get-comments-by-admin/:chapter", verifyToken, async (req, res) => {
  const chapterId = parseInt(req.params.chapter);
  try {
    const existingChapter = await prisma.chapter.findFirst({
      where: { id: chapterId },
    });
    if (!existingChapter) {
      return res.status(404).json({ error: "Capítulo no encontrado" });
    }

    const paragraphs = await prisma.paragraph.findMany({
      where: { chapterId: chapterId },
      include: {
        comment: {
          include: {
            regularUserData: true,
            adminUserData: true,
          },
        },
      },
    });
    if (!paragraphs) {
      return res
        .status(404)
        .json({ error: "Párrafos con comentarios no encontrados" });
    }
    return res.status(200).json({ paragraphs });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        error: `Error inesperado recuperando los comentarios ${error.message}`,
      });
    }
  }
});

export default router;
