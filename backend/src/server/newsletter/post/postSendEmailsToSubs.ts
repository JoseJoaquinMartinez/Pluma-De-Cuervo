import { Router } from "express";
import prisma from "../../../../client";
import { transporter } from "../../../utils/emailService";

const router = Router();

router.post("/send-emai-to-subscribers", async (req, res) => {
  const { subject, message } = req.body;
  try {
    const subscribers = await prisma.newsLetterSubscriber.findMany();

    for (const subscriber of subscribers) {
      const emailUnsubscriptionUrl = `${process.env.EMAIL_URL}/newsletter/registration?token=${subscriber.unsubscribeToken}`;
      await transporter.sendMail({
        from: process.env.MAILER_EMAIL,
        to: subscriber.email,
        subject,
        html: `
        <p>${message}</p>
        <br>
        <p>Si quieres dejar de recibir estos emails puedes cancelar la subscriptión haciendo click en el siguiente botón</p>
        <a href: "${emailUnsubscriptionUrl}">Cancelar Subscripción</a>
      `,
      });

      res.status(200).json({ message: "NewsLetter email enviado" });
    }
  } catch (error) {
    if (error instanceof Error) {
      return res
        .status(500)
        .json({ error: `Error al enviar la newsletter ${error.message}` });
    }
  }
});

export default router;
