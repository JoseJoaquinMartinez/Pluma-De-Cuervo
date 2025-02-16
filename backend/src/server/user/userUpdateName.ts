import prisma from "../../client";
import Router from "express";
import { roleMiddleware } from "../auth/middleware/checkRole";

const router = Router();

router.patch(
  "/update-name/:userDataId",
  roleMiddleware("user"),
  async (req, res) => {
    const userDataId = parseInt(req.params.userDataId);
    const { newName } = req.body;

    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Token no enviado" });
    }
    const token = authHeader.split(" ")[1];

    try {
      const existingUserData = await prisma.regularUserData.findUnique({
        where: { id: userDataId },
      });
      if (!existingUserData) {
        return res.status(404).json({ message: "Usuario no existe" });
      }

      await prisma.regularUserData.update({
        where: { id: userDataId },
        data: { userName: newName },
      });

      const user = await prisma.regularUser.findUnique({
        where: { id: existingUserData.regularUserId },
        include: { regularUserData: true },
      });

      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      return res.status(200).json({
        user,
        token,
        message: "Nombre actualizado correctamente",
      });
    } catch (error) {
      console.error(error);
      return res
        .status(400)
        .json({ message: "No se pudo actualizar el nombre" });
    }
  }
);

export default router;
