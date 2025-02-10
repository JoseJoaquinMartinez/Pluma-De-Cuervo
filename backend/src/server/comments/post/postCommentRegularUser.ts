import { Router } from "express";
import prisma from "../../../../client";
import { AuthenticationRequest } from "../../../utils/verifyToken";
import { roleMiddleware } from "../../auth/middleware/checkRole";
const router = Router();

router.post(
  "/post-comment-regular-user/:paragraphId",
  roleMiddleware("user"),
  async (req: AuthenticationRequest, res) => {
    const paragraphId = parseInt(req.params.paragraphId);
    const { commentBody } = req.body;
    const userId = req.user.id;
    console.log(req.user.id);
    console.log(userId);
    try {
      const existingUser = await prisma.regularUserData.findFirst({
        where: { regularUserId: userId },
      });

      if (!existingUser) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }

      const existingParagraph = await prisma.paragraph.findFirst({
        where: { id: paragraphId },
      });

      if (!existingParagraph) {
        return res.status(404).json({ error: "Párrafo no encontrado" });
      }

      const newComment = await prisma.comment.create({
        data: {
          commentBody,
          paragraphId,
          regularUserDataId: existingUser.id,
          read: false,
        },
      });

      return res
        .status(201)
        .json({ newComment, message: "Comentario creado con éxito" });
    } catch (error) {
      return res
        .status(500)
        .json({ error: `Error inesperado: ${error.message}` });
    }
  }
);
export default router;
