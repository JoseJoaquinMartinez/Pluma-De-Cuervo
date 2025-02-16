import { Router } from "express";
import prisma from "../../../client";
import { roleMiddleware } from "../..//auth/middleware/checkRole";
import { AuthenticationRequest } from "../../../utils/verifyToken";

const router = Router();
router.get(
  "/get-user-comments-on-a-chapter/:ChapterId",
  roleMiddleware("user"),
  async (req: AuthenticationRequest, res) => {
    const ChapterId = parseInt(req.params.ChapterId);
    const RegularUserId = req.user?.id;

    try {
      const existingUser = await prisma.regularUserData.findFirst({
        where: {
          regularUserId: RegularUserId,
        },
      });
      if (!existingUser) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }
      const existingChapter = await prisma.chapter.findFirst({
        where: {
          id: ChapterId,
        },
      });
      if (!existingChapter) {
        return res.status(404).json({ error: "Capítulo no encontrado" });
      }
      const comments = await prisma.comment.findMany({
        where: {
          regularUserDataId: existingUser.id,
          paragraph: {
            chapterId: ChapterId,
          },
        },
      });
      return res.status(200).json(comments);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({
          error: `Error inesperado obteniendo los comentarios: ${error.message}`,
        });
      }
      return res.status(500).json({ error: "Error inesperado" });
    }
  }
);

export default router;
