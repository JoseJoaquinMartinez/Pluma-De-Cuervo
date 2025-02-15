import { Router } from "express";
import prisma from "../../../../client";
import { roleMiddleware } from "../../auth/middleware/checkRole";
import { AuthenticationRequest } from "../../../utils/verifyToken";

const router = Router();

router.delete(
  "/delete-user-comment/:commentId",
  async (req: AuthenticationRequest, res) => {
    const commentId = parseInt(req.params.commentId);
    try {
      const existingComment = await prisma.comment.findFirst({
        where: { id: commentId },
      });
      if (!existingComment) {
        return res.status(404).json({ message: "Comentario no encontrado" });
      }
      const deletedComment = await prisma.comment.delete({
        where: { id: commentId },
      });
      return res.status(204);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({
          error: `Error inesperado eliminando el comentario: ${error.message}`,
        });
      }
      return res.status(500).json({ error: "Error inesperado" });
    }
  }
);
export default router;
