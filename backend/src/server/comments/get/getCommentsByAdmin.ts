import { Router } from "express";
import prisma from "../../../client";
import { roleMiddleware } from "../../auth/middleware/checkRole";

const router = Router();

router.get(
  "/get-comments-by-admin",
  roleMiddleware("admin"),

  async (req, res) => {
    try {
      const comments = await prisma.comment.findMany({
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
          error: `Error inesperado recuperando los comentarios: ${error.message}`,
        });
      }
    }
  }
);

export default router;
