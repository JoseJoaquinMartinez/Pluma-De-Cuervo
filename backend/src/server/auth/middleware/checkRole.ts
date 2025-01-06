import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
  user?: {
    userId: string;
    role: string;
  };
}

export const roleMiddleware = (requiredRole: string) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Token is required" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
        id: string;
        role: string;
      };
      if (decoded.role !== requiredRole) {
        return res
          .status(403)
          .json({ error: `Access denied for ${decoded.role}` });
      }
      req.user = { userId: decoded.id, role: decoded.role };
      next();
    } catch (error) {
      return res.status(403).json({ error: "Invalid token" });
    }
  };
};
