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
    const { title, workText } = req.body;
    const imagen = req.body.cloudinaryUrl || undefined;

    // Parseamos botones (por si vienen como string en multipart/form-data)
    let buttons: { text: string; link: string }[] = [];
    try {
      if (req.body.buttons) {
        buttons =
          typeof req.body.buttons === "string"
            ? JSON.parse(req.body.buttons)
            : req.body.buttons;
      }

      const dataToUpdate: any = {};
      if (title) dataToUpdate.title = title;
      if (imagen) dataToUpdate.imagen = imagen;
      if (workText) dataToUpdate.workText = workText;

      // 1. Actualizar la obra
      const updatedOtherWork = await prisma.otherWorks.update({
        where: { id: otherWorkId },
        data: dataToUpdate,
      });

      if (!updatedOtherWork) {
        return res.status(404).json({ message: "Trabajo no encontrado" });
      }

      // 2. Eliminar botones anteriores
      await prisma.otherWorksButton.deleteMany({
        where: { otherWorksId: otherWorkId },
      });

      // 3. Crear nuevos botones
      if (buttons.length > 0) {
        await prisma.otherWorksButton.createMany({
          data: buttons.map((button) => ({
            ...button,
            otherWorksId: otherWorkId,
          })),
        });
      }

      // 4. Obtener obra actualizada con botones
      const result = await prisma.otherWorks.findUnique({
        where: { id: otherWorkId },
        include: { buttons: true },
      });

      return res.status(200).json({ updatedOtherWork: result });
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        return res.status(500).json({
          error: `Error modificando la obra: ${error.message}`,
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
