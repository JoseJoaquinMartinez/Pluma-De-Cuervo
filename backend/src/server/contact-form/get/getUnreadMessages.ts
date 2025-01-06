import { Router } from "express";
import prisma from "../../../../client";
import { roleMiddleware } from "../../auth/middleware/checkRole";

const router = Router();

router.get(
  "/get-unread-messages",
  roleMiddleware("admin"),
  async (req, res) => {
    try {
      const unreadMessages = await prisma.contactForm.findMany({
        where: { isRead: false },
      });

      return res
        .status(200)
        .json({ unreadMessages: unreadMessages, message: "Mensages sin leer" });
    } catch (error) {
      if (error instanceof Error) {
        return res
          .status(500)
          .json({ error: `Error obteniendo los mensajes ${error.message}` });
      }
    }
  }
);

export default router;
