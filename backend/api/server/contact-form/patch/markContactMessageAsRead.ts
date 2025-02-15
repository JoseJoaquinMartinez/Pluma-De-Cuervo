import { Router } from "express";
import prisma from "../../../../client";
import { roleMiddleware } from "../../auth/middleware/checkRole";

const router = Router();

router.patch(
  "/update-contact-read/:id",
  roleMiddleware("admin"),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { isRead } = req.body;

      if (typeof isRead !== "boolean") {
        return res.status(400).json({
          error: "El campo 'read' debe ser un valor booleano.",
        });
      }

      const updatedContact = await prisma.contactForm.update({
        where: { id: Number(id) },
        data: { isRead },
      });

      return res.status(200).json({ updatedContact });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({
          error: `Error inesperado al actualizar el comentario: ${error.message}`,
        });
      }
    }
  }
);

export default router;
