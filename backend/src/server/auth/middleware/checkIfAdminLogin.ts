import { NextFunction, Request, Response } from "express";
import prisma from "../../../../client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
        include: { adminUserData: true },
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

      const authToken = jwt.sign(
        { adminId: existingAdmin.id, role: existingAdmin.role },
        JWT_SECRET,
        {
          expiresIn: "2h",
        }
      );
      res.cookie("authToken", authToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 3600 * 1000,
      });
      const adminToReturn = {
        id: existingAdmin.id,
        email: existingAdmin.email,
        role: existingAdmin.role,
        adminUserData: existingAdmin.adminUserData,
      };
      res
        .status(200)
        .json({
          token: authToken,
          user: adminToReturn,
          message: "Admin logeado",
        });
    } catch (error) {
      res.status(500).json({ error: `error al logear ${error}` });
    } finally {
      prisma.$disconnect();
    }
  } else {
    next();
  }
};
