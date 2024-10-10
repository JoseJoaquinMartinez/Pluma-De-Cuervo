import { Router } from "express";
import prisma from "../../../../client";
import { AuthenticationRequest, verifyToken } from "../../../utils/verifyToken";
import { formattedComments } from "../../../utils/formattedComments";

const router = Router();

router.get(
  "/get-comment-by-regularUser",
  verifyToken,
  async (req: AuthenticationRequest, res) => {
    const userId = req.user.id;

    try {
      const existingUser = await prisma.regularUser.findFirst({
        where: { id: userId },
      });
      if (!existingUser) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }

      const userComments = await prisma.comment.findMany({
        where: { regularUserDataId: userId },
        include: {
          paragraph: { include: { chapter: { include: { book: true } } } },
          regularUserData: true,
          replies: {
            where: { adminUserDataId: { not: null } },
            include: { adminUserData: true },
          },
        },
      });

      const formatted = formattedComments(userComments);
      return res.status(200).json(formatted);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({
          error: `Error inesperado al obtener los comentarios: ${error.message}`,
        });
      }
    }
  }
);

export default router;
