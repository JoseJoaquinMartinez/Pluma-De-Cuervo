import { Router } from "express";
import prisma from "../../../../client";

const router = Router();

router.put("/put-message-as-read/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const readMessage = await prisma.contactForm.update({
      where: { id: id },
      data: {
        isRead: true,
      },
    });
    if (!readMessage) {
      return res.status(404).json({ error: "Mensage no encontrado" });
    }
    return res.status(200).json({ message: "Mensaje leido" });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        error: `Error marcando el mensaje como leido ${error.message}`,
      });
    }
  }
});

export default router;
