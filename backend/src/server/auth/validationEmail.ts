import { Router } from "express";
import prisma from "../../client";

import { transporter } from "../../utils/emailService";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = Router();

const JWT_SECRET = process.env.JWT_SECRET as string;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET no está definido en .env");
}

const saltRounds = 10;

router.post("/verify-email", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await prisma.regularUser.findFirst({
      where: { email: email },
    });

    if (existingUser) {
      return res.status(400).json({ error: "Email ya existe" });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await prisma.regularUser.create({
      data: {
        email,
        password: hashedPassword,
        isVerified: false,
        regularUserData: {
          create: {},
        },
      },
    });

    if (!email) {
      return res.status(400).json({ error: "Email es requerido" });
    }

    const verifyEmailToken = jwt.sign({ email }, JWT_SECRET, {
      expiresIn: "10m",
    });

    const emailVerificationUrl = `${process.env.EMAIL_URL}?token=${verifyEmailToken}`;

    await transporter.sendMail({
      from: process.env.MAILER_EMAIL,
      to: email,
      subject: "Verificación de email",
      html: `
    <div
      style="font-family: Arial, sans-serif; background-color: #f4f5f7; padding: 20px;"
    >
      <div
        style="max-width: 600px; margin: auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);"
      >
        <div
          style="background-color: #9C1209; text-align: center; padding: 20px;"
        >
          <img
            src="https://res.cloudinary.com/dk9juz4fp/image/upload/v1739611427/Pluma%20de%20Cuervo/igvlg1cr6ntol97a2ct5.jpg"
            alt="Pluma de Cuervo Logo"
            style="width: 120px; border-radius: 8px;"
          />
        </div>
        <div style="padding: 20px; background-color: #DCD4CC">
          <h2
            style="color: #4A4A4A; font-size: 24px; margin-bottom: 16px; text-align: center;"
          >
            ¡Verifica tu Email!
          </h2>
          <p
            style="color: #4A4A4A; font-size: 16px; margin-bottom: 20px; text-align: center; line-height: 1.5;"
          >
            Gracias por registrarte en <strong>Pluma de Cuervo</strong>. Para
            continuar, por favor verifica tu email haciendo clic en el botón de
            abajo.
          </p>
          <div style="text-align: center;">
            <a
              href="${emailVerificationUrl}"
              style="background-color: #C27A6D; color: white; padding: 12px 24px; text-decoration: none; font-size: 16px; border-radius: 6px; display: inline-block;"
            >
              Verificar Email
            </a>
          </div>
          <p
            style="color: #4A4A4A; font-size: 14px; margin-top: 20px; text-align: center;"
          >
            Si no solicitaste esta verificación, puedes ignorar este correo.
          </p>
        </div>
        <div
          style="background-color: #DCD4CC; text-align: center; padding: 10px; font-size: 14px; color: #4A4A4A;"
        >
          © ${new Date().getFullYear()} Pluma de Cuervo. Todos los derechos
          reservados.
        </div>
      </div>
    </div>
  `,
    });

    res.status(200).json({ message: "Email enviado" });
  } catch (error) {
    console.error("Error en verificación de email:", error);
    res.status(500).json({ error: "Error inesperado" });
  } finally {
    await prisma.$disconnect();
  }
});

export default router;
