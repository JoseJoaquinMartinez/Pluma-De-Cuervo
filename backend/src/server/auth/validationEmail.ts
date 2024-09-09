import { Router } from "express";
import { PrismaClient } from "@prisma/client";

import { transporter } from "../../utils/emailService";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = Router();
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;

const saltRounds = 10;

router.post("/registration", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await prisma.regularUser.findFirst({
      where: { email: email },
    });
    if (existingUser) {
      return res.status(400).json({ error: "Email ya existe" });
    }

    const harshedPassword = await bcrypt.hash(password, saltRounds);

    const verifyEmailToken = jwt.sign(
      { email, password: harshedPassword },
      JWT_SECRET,
      { expiresIn: 120 }
    );
    const emailVerificationUrl = `${process.env.EMAIL_URL}/auth/verify-email?token=${verifyEmailToken}`;

    await transporter.sendMail({
      from: process.env.MAILER_EMAIL,
      to: email,
      subject: "Verificación de email",
      html: `
          <h2>Pluma de Cuervo</h2>
          <br>
          <p>Haz click en el siguiente enlace para verificar tu email:</p>
          <a href="${emailVerificationUrl}">Link de verificación</a>
        `,
    });

    res.status(200).json({ message: "Email enviado" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error inesperado" });
  } finally {
    await prisma.$disconnect();
  }
});

export default router;
