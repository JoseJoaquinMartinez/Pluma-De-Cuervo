import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

export interface AuthenticationRequest extends Request {
  user?: {
    id: number;
    role: string;
  };
}

export const verifyToken = (
  req: AuthenticationRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ error: "Token no recibido o formato incorrecto" });
  }
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Formato de token no válido" });
  }
  try {
    const { userId, role } = jwt.verify(token, JWT_SECRET) as {
      userId: number;
      role: string;
    };

    req.user = { id: userId, role: role };

    next();
  } catch (error) {
    return res.status(403).json({ error: "Fallo al autenticar el token" });
  }
};
