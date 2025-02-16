import { Router } from "express";
import prisma from "../../../client";

const router = Router();

router.post("/post-new-contact-message", async (req, res) => {
  const { email, message } = req.body;
  try {
    const newMessage = await prisma.contactForm.create({
      data: {
        email,
        message,
      },
    });

    return res.status(201).json({
      newMessage: newMessage,
      message: "Mensaje enviado correctamente",
    });
  } catch (error) {
    if (error instanceof Error) {
      return res
        .status(500)
        .json({ error: `Error enviando el mensaje ${error.message}` });
    }
  }
});

export default router;
