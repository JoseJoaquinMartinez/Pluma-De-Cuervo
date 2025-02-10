import prisma from "../../../client";
import Router from "express";
import { roleMiddleware } from "../auth/middleware/checkRole";

const router = Router();

router.patch(
  "/update-name/:userId",
  roleMiddleware("user"),
  async (req, res) => {
    const userId = parseInt(req.params.userId);
    const { newName } = req.body;

    try {
      const user = await prisma.regularUserData.update({
        where: {
          id: userId,
        },
        data: {
          userName: newName,
        },
      });
      res.json(user);
    } catch (error) {
      res.status(400).json({ message: "No se pudo actualizar el nombre" });
    }
  }
);
export default router;
