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
        where: { adminUserId: adminId },
      });

      if (!existingAdmin) {
        return res.status(404).json({ error: "Administrador no encontrado" });
      }

      const existingComment = await prisma.comment.findFirst({
        where: { id: commentId },
      });

      if (!existingComment) {
        return res.status(404).json({ error: "Comentario no encontrado" });
      }

      /* // ✅ Evitar que el administrador responda a respuestas en lugar de comentarios principales
      if (existingComment.parentCommentId !== null) {
        return res
          .status(400)
          .json({
            error:
              "No puedes responder a respuestas, solo a comentarios principales",
          });
      } */

      const adminReplyComment = await prisma.comment.create({
        data: {
          commentBody,
          paragraphId: existingComment.paragraphId,
          adminUserDataId: existingAdmin.id,
          parentCommentId: commentId,
          read: false,
        },
      });

      return res.status(201).json({
        adminReplyComment,
        message: "Respuesta del administrador creada con éxito",
      });
    } catch (error) {
      return res
        .status(500)
        .json({ error: `Error inesperado: ${error.message}` });
    }
  }
);
export default router;
