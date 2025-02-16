import { Router } from "express";
import prisma from "../../../client";
import { AuthenticationRequest } from "../../../utils/verifyToken";
import { roleMiddleware } from "../../auth/middleware/checkRole";

const router = Router();

router.get(
  "/get-comment-by-regularUser",
  roleMiddleware("user"),
  async (req: AuthenticationRequest, res) => {
    const userId = req.user?.id;

    try {
      const existingUser = await prisma.regularUserData.findFirst({
        where: { id: userId },
      });
      if (!existingUser) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }

      const comments = await prisma.comment.findMany({
        where: { regularUserDataId: userId },
        orderBy: { createdAt: "desc" },
        include: {
          paragraph: {
            include: {
              chapter: {
                include: {
                  book: true,
                },
              },
            },
          },
          regularUserData: {
            include: {
              regularUser: { select: { email: true } },
            },
          },
          adminUserData: {
            include: {
              adminUser: { select: { email: true } },
            },
          },
          replies: {
            include: {
              regularUserData: {
                include: {
                  regularUser: { select: { email: true } },
                },
              },
              adminUserData: {
                include: {
                  adminUser: { select: { email: true } },
                },
              },
            },
          },
        },
      });

      return res.status(200).json({ comments });
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
