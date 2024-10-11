import { Router } from "express";
import prisma from "../../../../client";
import { verifyToken } from "../../../utils/verifyToken";
import { AuthenticationRequest } from "../../../utils/verifyToken";

const router = Router();

router.post(
  "/post-comment-regular-user/:paragraphId",
  verifyToken,
  async (req: AuthenticationRequest, res) => {
    const paragraphId = parseInt(req.params.paragraphId);
    const { commentBody } = req.body;
    const userId = req.user.id;

    try {
      const existingUser = await prisma.regularUserData.findFirst({
        where: {
          regularUserId: userId,
        },
      });

      if (!existingUser) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }

      const existingParagraph = await prisma.paragraph.findFirst({
        where: { id: paragraphId },
      });

      if (!existingParagraph) {
        return res.status(404).json({ error: "Párrafo no encontrado" });
      }

      const newComment = await prisma.comment.create({
        data: {
          commentBody: commentBody,
          paragraph: { connect: { id: paragraphId } },
          regularUserData: { connect: { id: existingUser.id } },
        },
      });

      return res
        .status(201)
        .json({ newComment, message: "Comentario creado con éxito" });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({
          error: `Error inesperado creando el comentario: ${error.message}`,
        });
      }
    }
  }
);

export default router;