import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const ADMIN_EMAIL = "gps.beniel@gmail.com";
const JWT_SECRET = process.env.JWT_SECRET;

export const checkIfAdminLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  if (email === ADMIN_EMAIL) {
    try {
      const existingAdmin = await prisma.adminUser.findFirst({
        where: { email: ADMIN_EMAIL },
      });
      if (!existingAdmin) {
        return res.status(404).json({ message: "Administrador no encontrado" });
      }
      const validPassword = await bcrypt.compare(
        password,
        existingAdmin.password
      );
      if (!validPassword) {
        return res.status(401).json({ message: "Contraseña no válida" });
      }

      const authToken = jwt.sign({ adminId: existingAdmin.id }, JWT_SECRET, {
        expiresIn: "2h",
      });
      res.status(200).json({ token: authToken, message: "Admin logeado" });
    } catch (error) {
      res.status(500).json({ error: `error al logear ${error}` });
    } finally {
      prisma.$disconnect();
    }
  } else {
    next();
  }
};
