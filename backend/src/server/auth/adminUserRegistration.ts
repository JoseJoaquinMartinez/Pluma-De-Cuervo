import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = Router();
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;

router.post("/adminUserGabriel", async (req, res) => {
  const email = "gps.beniel@gmail.com";
  const { password } = req.body;

  try {
    const hasedPassword = await bcrypt.hash(password, 10);
    console.log(hasedPassword);

    const adminAlreadyExists = await prisma.adminUser.findFirst({
      where: { email: email },
    });

    console.log(adminAlreadyExists);

    if (adminAlreadyExists) {
      return res.status(400).json({ message: "Ya existe un administrador" });
    }
    const newAdminUser = await prisma.adminUser.create({
      data: {
        email: email,
        password: hasedPassword,
        adminUserData: {
          create: {},
        },
      },
    });
    console.log(newAdminUser);

    if (!newAdminUser) {
      return res.status(500).json({ error: `Error creando el ususario` });
    }
    const authToken = jwt.sign({ userId: newAdminUser.id }, JWT_SECRET, {
      expiresIn: "2h",
    });
    res.status(200).json({ token: authToken, message: "administrador creado" });
  } catch (error) {
    res.status(500).json({ error: `Error creando el administrador ${error}` });
  } finally {
    prisma.$disconnect();
  }
});

export default router;
