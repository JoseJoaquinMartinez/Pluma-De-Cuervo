import { Router } from "express";
import prisma from "../../../../client";
import { AuthenticationRequest, verifyToken } from "../../../utils/verifyToken";

const router = Router();

router.post(
  "/post-reply-to-admin/:commentId",
  verifyToken,
  async (req: AuthenticationRequest, res) => {
    const commentId = parseInt(req.params.commentId);
    const userId = req.user.id;
    const { commentBody } = req.body;
    try {
      const exisitngUser = await prisma.regularUserData.findFirst({
        where: { id: userId },
      });
      if (!exisitngUser) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }
      const existingComment = await prisma.comment.findFirst({
        where: { id: commentId },
      });
      if (!existingComment) {
        return res.status(404).json({ error: "Comentario no encontrado" });
      }
      const regularUserReply = await prisma.comment.create({
        data: {
          commentBody: commentBody,
          paragraph: {
            connect: { id: existingComment.paragraphId },
          },
          regularUserData: {
            connect: { id: exisitngUser.id },
          },
          parentComment: {
            connect: { id: commentId },
          },
        },
      });
      return res.status(201).json({
        regularUserReply,
        message: "Respuesta del usuario creada con éxito",
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({
          error: `Error inesperado respondiendo al comentario ${error.message}`,
        });
      }
    }
  }
);

export default router;
