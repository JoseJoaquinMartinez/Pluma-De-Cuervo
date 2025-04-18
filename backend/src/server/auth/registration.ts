import { Router } from "express";
import prisma from "../../client";
import jwt, { JwtPayload } from "jsonwebtoken";

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET as string;
interface VerificationTokenPayload extends JwtPayload {
  email: string;
}

router.get("/registration", async (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).json({ message: "Token necesario" });
  }

  try {
    const decoded = jwt.verify(
      token as string,
      JWT_SECRET
    ) as VerificationTokenPayload;
    const { email } = decoded;

    const existingUser = await prisma.regularUser.findFirst({
      where: { email },
      include: { regularUserData: true },
    });

    if (!existingUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (existingUser.isVerified) {
      return res.status(400).json({ message: "Usuario ya verificado" });
    }

    const updatedUser = await prisma.regularUser.update({
      where: { email },
      data: { isVerified: true },
      include: { regularUserData: true },
    });

    const authToken = jwt.sign(
      { userId: updatedUser.id, role: updatedUser.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("authToken", authToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      domain: process.env.DOMAIN,
    });

    const userToReturn = {
      id: updatedUser.id,
      email: updatedUser.email,
      role: updatedUser.role,
      regularUserData: updatedUser.regularUserData,
    };

    res.status(200).json({
      user: userToReturn,
      token: authToken,
      message: "Email verificado correctamente",
    });
  } catch (error) {
    res.status(400).json({ message: "Token no válido o caducado" });
  }
});

export default router;
