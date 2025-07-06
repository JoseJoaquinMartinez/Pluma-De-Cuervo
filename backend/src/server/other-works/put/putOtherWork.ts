import { Router } from "express";
import prisma from "../../../client";
import { roleMiddleware } from "../../auth/middleware/checkRole";
import { upload, uploadToCloudinary } from "../../../utils/cloudinary";

const router = Router();

router.put(
  "/put-other-work/:otherWorkId",
  roleMiddleware("admin"),
  upload.single("imagen"),
  uploadToCloudinary,
  async (req, res) => {
    const otherWorkId = parseInt(req.params.otherWorkId);
    const { title, workText, buttonLink, buttonText } = req.body;
    const imagen = req.body.cloudinaryUrl || undefined;

    const dataToUpdate: any = {};
    if (title) dataToUpdate.title = title;
    if (imagen) dataToUpdate.imagen = imagen;
    if (workText) dataToUpdate.workText = workText;
    if (buttonLink) dataToUpdate.buttonLink = buttonLink;
    if (buttonText) dataToUpdate.buttonText = buttonText;

    try {
      const updatedOtherWork = await prisma.otherWorks.update({
        where: {
          id: otherWorkId,
        },
        data: dataToUpdate,
      });
      if (!updatedOtherWork) {
        return res.status(404).json({ message: "Trabajo no encontrado" });
      }
      return res.status(200).json({ updatedOtherWork });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({
          error: `Error inesperado modificando la información del trabajo ${error.message}`,
        });
      } else {
        return res.status(500).json({ message: "Error inesperado" });
      }
    } finally {
      prisma.$disconnect();
    }
  }
);
export default router;
