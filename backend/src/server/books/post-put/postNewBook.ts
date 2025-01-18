import { Router } from "express";
import prisma from "../../../../client";
import { roleMiddleware } from "../../auth/middleware/checkRole";
import { upload, uploadToCloudinary } from "../../../utils/cloudinary";

const router = Router();

router.post(
  "/new-book",
  roleMiddleware("admin"),
  upload.single("imagen"),
  uploadToCloudinary,
  async (req, res) => {
    const { title, Synopsis } = req.body;
    const imagen = req.body.cloudinaryUrl || undefined;
    try {
      const newBook = await prisma.book.create({
        data: {
          title: title,
          imagen: imagen,
          Synopsis: Synopsis,
        },
      });
      return res.status(201).json({ newBook, message: "Libro creado" });
    } catch (error) {
      if (error.code === "P2002") {
        return res
          .status(409)
          .json({ message: "Libro con este titulo ya existe." });
      } else if (error instanceof Error) {
        return res
          .status(500)
          .json({ error: `Error inesperado creando libro ${error.message}` });
      }
    } finally {
      prisma.$disconnect();
    }
  }
);

export default router;
