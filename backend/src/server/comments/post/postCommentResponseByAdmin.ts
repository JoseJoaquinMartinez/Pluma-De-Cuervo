import { Router } from "express";
import prisma from "../../../../client";
import { AuthenticationRequest } from "../../../utils/verifyToken";
import { roleMiddleware } from "../../auth/middleware/checkRole";

const router = Router();

router.post(
  "/post-comment-response-by-admin/:commentId",
  roleMiddleware("admin"),
  async (req: AuthenticationRequest, res) => {
    const commentId = parseInt(req.params.commentId);
    const { commentBody } = req.body;
    const adminId = req.user.id;
    try {
      const existingAdmin = await prisma.adminUserData.findFirst({
        where: { id: adminId },
      });
      if (!existingAdmin) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }
      const existingComment = await prisma.comment.findFirst({
        where: { id: commentId },
      });
      if (!existingComment) {
        return res.status(404).json({ error: "Comentario no encontrado" });
      }

      const adminReplyComment = await prisma.comment.create({
        data: {
          commentBody: commentBody,
          paragraph: {
            connect: { id: existingComment.paragraphId },
          },
          adminUserData: {
            connect: { id: existingAdmin.id },
          },
          parentComment: {
            connect: { id: commentId },
          },
        },
      });

      return res.status(201).json({
        adminReplyComment,
        message: "Respuesta del administrador creada con éxito",
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({
          error: `Error inesperado respondiendo al comentario: ${error.message}`,
        });
      }
    }
  }
);

export default router;
