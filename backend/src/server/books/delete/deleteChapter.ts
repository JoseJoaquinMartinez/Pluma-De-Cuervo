import { Router } from "express";
import prisma from "../../../../client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { roleMiddleware } from "../../auth/middleware/checkRole";

const router = Router();

router.delete(
  "/delete-chapter/:chapterId",
  roleMiddleware("admin"),
  async (req, res) => {
    const chapterId = parseInt(req.params.chapterId);
    if (isNaN(chapterId)) {
      return res
        .status(400)
        .json({ error: "Identificador del capítulo no recibido" });
    }
    try {
      const deletedChapter = await prisma.chapter.delete({
        where: { id: chapterId },
      });

      return res
        .status(200)
        .json({ message: "Capítulo eliminado correctamente" });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        return res.status(404).json({ message: "Capítulo no encontrado" });
      } else {
        return res.status(500).json({
          error: `Error inesperando eliminando el capítulo ${error.message}`,
        });
      }
    } finally {
      prisma.$disconnect();
    }
  }
);

export default router;
