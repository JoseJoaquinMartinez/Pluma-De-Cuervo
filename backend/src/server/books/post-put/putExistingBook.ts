import { Router } from "express";
import prisma from "../../../client";
import { roleMiddleware } from "../../auth/middleware/checkRole";
import { upload, uploadToCloudinary } from "../../../utils/cloudinary";

const router = Router();

router.put(
  "/put-existing-book/:bookId",
  roleMiddleware("admin"),
  upload.single("imagen"),
  uploadToCloudinary,
  async (req, res) => {
    const bookId = parseInt(req.params.bookId);
    const { title, Synopsis, status } = req.body;
    const imagen = req.body.cloudinaryUrl || undefined;

    const dataToUpdate: any = {};
    if (title) dataToUpdate.title = title;
    if (imagen) dataToUpdate.imagen = imagen;
    if (Synopsis) dataToUpdate.Synopsis = Synopsis;
    if (status) {
      const validStatuses = ["ACTIVO", "DESCONTINUADO", "COMPLETADO"];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({
          message:
            "El estado del libro no es válido. Opciones: ACTIVO, DESCONTINUADO, COMPLETADO.",
        });
      }
      dataToUpdate.status = status;
    }

    try {
      const updatedBook = await prisma.book.update({
        where: {
          id: bookId,
        },
        data: dataToUpdate,
      });
      if (!updatedBook) {
        return res.status(404).json({ message: "Libro no encontrado" });
      }
      return res
        .status(200)
        .json({ updatedBook, message: "Libro actualizado" });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({
          error: `Error inesperado modificando la información del capítulo ${error.message}`,
        });
      }
    } finally {
      prisma.$disconnect();
    }
  }
);

export default router;
