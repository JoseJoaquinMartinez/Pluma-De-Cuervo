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
    const newUser = await prisma.regularUser.create({
      data: {
        email,
        password,
        regularUserData: {
          create: {},
        },
      },
    });

    if (!newUser) {
      return res.status(500).json({ message: "Error creando el usuario" });
    }

    const authToken = jwt.sign(
      { userId: newUser.id, email: newUser.email, role: newUser.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res
      .status(200)
      .json({ token: authToken, message: "Usuario creado correctamente" });
  } catch (error) {
    res.status(400).json({ message: "Token no válido o caducado" });
  } finally {
    prisma.$disconnect();
  }
});

export default router;
