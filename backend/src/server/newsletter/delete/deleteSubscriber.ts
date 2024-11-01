import { Router } from "express";
import prisma from "../../../../client";
import jwt from "jsonwebtoken";

const router = Router();

const JWT_SECRET = process.env.JWT_SECRET;

router.get("/delete-subscriber", async (req, res) => {
  const { unsubscribeToken } = req.query;
  console.log(unsubscribeToken);

  if (!unsubscribeToken || typeof unsubscribeToken !== "string") {
    return res.status(400).json({ error: "Token inválido" });
  }
  try {
    const { email } = jwt.verify(unsubscribeToken, JWT_SECRET) as {
      email: string;
    };
    const subscriberToDelete = await prisma.newsLetterSubscriber.delete({
      where: { email },
    });

    if (!subscriberToDelete) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    return res
      .status(200)
      .json({ message: "Cancelación completada con éxito" });
  } catch (error) {
    if (error instanceof Error) {
      return res
        .status(500)
        .json({ error: `Error eliminado al subscriptor ${error.message}` });
    }
  }
});

export default router;
