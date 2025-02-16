import { Router } from "express";
import prisma from "../../../client";
import { roleMiddleware } from "../../auth/middleware/checkRole";
import { AuthenticationRequest } from "../../../utils/verifyToken";

const router = Router();

router.delete(
  "/delete-contact-message/:messageId",
  roleMiddleware("admin"),
  async (req: AuthenticationRequest, res) => {
    const messageId = parseInt(req.params.messageId);
    try {
      const existingContactMessage = await prisma.contactForm.findFirst({
        where: { id: messageId },
      });
      if (!existingContactMessage) {
        return res
          .status(404)
          .json({ message: "Mensaje de contacto no encontrado" });
      }
      const deleteContactMessage = await prisma.contactForm.delete({
        where: { id: messageId },
      });
      return res.status(204).send();
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({
          error: `Error inesperado eliminando el mensage de contacto: ${error.message}`,
        });
      }
      return res.status(500).json({ error: "Error inesperado" });
    }
  }
);
export default router;
