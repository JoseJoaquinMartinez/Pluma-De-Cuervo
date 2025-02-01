import { Router } from "express";
import prisma from "../../../../client";
import { roleMiddleware } from "../../auth/middleware/checkRole";

const router = Router();

router.patch(
  "/update-comment-read/:id",
  roleMiddleware("admin"),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { read } = req.body;

      if (typeof read !== "boolean") {
        return res.status(400).json({
          error: "El campo 'read' debe ser un valor booleano.",
        });
      }

      const updatedComment = await prisma.comment.update({
        where: { id: Number(id) },
        data: { read },
      });

      return res.status(200).json({ updatedComment });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({
          error: `Error inesperado al actualizar el comentario: ${error.message}`,
        });
      }
    }
  }
);

export default router;
