import { Router } from "express";
import prisma from "../../../client";
import { AuthenticationRequest } from "../../../utils/verifyToken";
import { roleMiddleware } from "../../auth/middleware/checkRole";

const router = Router();

router.post(
  "/post-reply-to-admin/:commentId",
  roleMiddleware("user"),
  async (req: AuthenticationRequest, res) => {
    const commentId = parseInt(req.params.commentId);
    const userId = req.user?.id;
    const { commentBody } = req.body;

    try {
      const existingUser = await prisma.regularUserData.findFirst({
        where: { regularUserId: userId },
      });

      if (!existingUser) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }

      const existingComment = await prisma.comment.findFirst({
        where: { id: commentId },
      });

      if (!existingComment) {
        return res.status(404).json({ error: "Comentario no encontrado" });
      }

      if (existingComment.adminUserDataId === null) {
        return res.status(400).json({
          error: "Solo puedes responder a comentarios de administradores",
        });
      }

      const regularUserReply = await prisma.comment.create({
        data: {
          commentBody,
          paragraphId: existingComment.paragraphId,
          regularUserDataId: existingUser.id,
          parentCommentId: commentId,
          read: false,
        },
      });

      return res.status(201).json({
        regularUserReply,
        message: "Respuesta del usuario creada con éxito",
      });
    } catch (error) {
      if (error instanceof Error) {
        return res
          .status(500)
          .json({ error: `Error inesperado: ${error.message}` });
      } else {
        return res.status(500).json({ error: "Error inesperado" });
      }
    }
  }
);

export default router;
