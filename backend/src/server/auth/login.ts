import { Router } from "express";
import prisma from "../../client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { checkIfAdminLogin } from "./middleware/checkIfAdminLogin";

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET as string;

router.post("/login", checkIfAdminLogin, async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await prisma.regularUser.findFirst({
      where: { email: email },
      include: { regularUserData: true },
    });
    if (!existingUser) {
      return res.status(404).json({ message: "Usuario no existe" });
    }
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "contraseña no válida" });
    }

    const authToken = jwt.sign(
      { userId: existingUser.id, role: existingUser.role },
      JWT_SECRET,
      {
        expiresIn: "2h",
      }
    );
    res.cookie("authToken", authToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      domain: process.env.DOMAIN,
    });
    const userToReturn = {
      id: existingUser.id,
      email: existingUser.email,
      role: existingUser.role,
      regularUserData: existingUser.regularUserData,
    };

    res.status(200).json({
      user: userToReturn,
      token: authToken,
      message: "usuario logeado",
    });
  } catch (error) {
    res.status(500).json({ error: `Error de inicio de session: ${error}` });
  } finally {
    prisma.$disconnect();
  }
});

export default router;
