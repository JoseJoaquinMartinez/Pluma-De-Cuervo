import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;
if (!JWT_SECRET) {
  throw new Error("Missing JWT_SECRET");
}

export interface AuthenticationRequest extends Request {
  user?: {
    id: number;
    role: string;
  };
}
export interface CustomJwtPayload extends JwtPayload {
  userId: number;
  role: string;
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
    const decodedToken = jwt.verify(token, JWT_SECRET) as CustomJwtPayload;

    if (decodedToken.userId && decodedToken.role) {
      req.user = { id: decodedToken.userId, role: decodedToken.role };
      next();
    } else {
      return res.status(403).json({ error: "Token inválido o incompleto" });
    }
  } catch (error) {
    return res.status(403).json({ error: "Fallo al autenticar el token" });
  }
};
