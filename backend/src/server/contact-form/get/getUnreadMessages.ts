import { Router } from "express";
import prisma from "../../../client";
import { roleMiddleware } from "../../auth/middleware/checkRole";

const router = Router();

router.get("/get-mensages", roleMiddleware("admin"), async (req, res) => {
  try {
    const unreadMessages = await prisma.contactForm.findMany({});

    const formattedDataMessages = unreadMessages.map((message) => ({
      ...message,
      createdAt: new Date(message.createdAt).toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
    }));

    return res.status(200).json({ messages: formattedDataMessages });
  } catch (error) {
    if (error instanceof Error) {
      return res
        .status(500)
        .json({ error: `Error obteniendo los mensajes ${error.message}` });
    }
  }
});

export default router;
