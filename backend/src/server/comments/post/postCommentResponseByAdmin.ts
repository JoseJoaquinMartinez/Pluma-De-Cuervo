import { Router } from "express";
import prisma from "../../../../client";
import { verifyToken } from "../../../utils/verifyToken";
import { AuthenticationRequest } from "../../../utils/verifyToken";

const router = Router();

router.post(
  "/post-comment-response-by-admin/:commentId",
  verifyToken,
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
        },
      });

      return res.status(200).json(adminReplyComment);
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
