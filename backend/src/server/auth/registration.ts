import { Router } from "express";
import prisma from "../../../client";

import jwt from "jsonwebtoken";

const router = Router();

const JWT_SECRET = process.env.JWT_SECRET;

router.get("/registration", async (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).json({ message: "Token necesario" });
  }
  try {
    const { email, password } = jwt.verify(token as string, JWT_SECRET) as {
      email: string;
      password: string;
    };

    const existingUser = await prisma.regularUser.findFirst({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({ message: "El usuario ya existe" });
    }
    const newUser = await prisma.regularUser.create({
      data: {
        email,
        password,
        regularUserData: {
          create: {},
        },
      },
      include: { regularUserData: true },
    });

    if (!newUser) {
      return res.status(500).json({ message: "Error creando el usuario" });
    }

    /* const authToken = jwt.sign(
      { userId: newUser.id, email: newUser.email, role: newUser.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    const userToReturn = {
      id: newUser.id,
      email: newUser.email,
      role: newUser.role,
      regularUserData: newUser.regularUserData,
    }; */

    res.status(200).json({
      /* user: userToReturn,
      token: authToken, */
      message: "Usuario creado correctamente",
    });
  } catch (error) {
    res.status(400).json({ message: "Token no válido o caducado" });
  } finally {
    prisma.$disconnect();
  }
});

export default router;
