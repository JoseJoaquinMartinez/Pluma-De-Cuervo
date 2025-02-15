import { Router } from "express";
import prisma from "../../../../client";
import jwt from "jsonwebtoken";

const router = Router();

const JWT_SECRET = process.env.JWT_SECRET as string;

router.post("/post-new-subscriber", async (req, res) => {
  const { email } = req.body;
  try {
    const existingEmail = await prisma.newsLetterSubscriber.findFirst({
      where: { email },
    });

    if (existingEmail) {
      return res.status(400).json({ message: "Email ya registrado" });
    }

    const unsubscribeToken = jwt.sign({ email }, JWT_SECRET, {
      expiresIn: "365d",
    });

    const newSubscriber = await prisma.newsLetterSubscriber.create({
      data: {
        email,
        unsubscribeToken,
      },
    });

    return res.status(201).json({
      message: "Usuario registrado en la newsLetter",
      unsubscribeToken,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res
        .status(500)
        .json({ error: `Error al añadir subscriptor ${error.message}` });
    }
  }
});

export default router;
