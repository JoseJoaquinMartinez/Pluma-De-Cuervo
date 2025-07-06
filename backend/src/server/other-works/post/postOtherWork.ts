import { Router } from "express";
import prisma from "../../../client";
import { roleMiddleware } from "../../auth/middleware/checkRole";
import { upload, uploadToCloudinary } from "../../../utils/cloudinary";

const router = Router();

router.post(
  "/post-other-work",
  roleMiddleware("admin"),
  upload.single("imagen"),
  uploadToCloudinary,
  async (req, res) => {
    const { title, workText } = req.body;
    const imagen = req.body.cloudinaryUrl || undefined;

    // Parseamos botones (por si vienen como string en multipart/form-data)
    let buttons: { text: string; link: string }[] = [];

    try {
      if (req.body.buttons) {
        // Puede venir como string si es multipart/form-data
        buttons =
          typeof req.body.buttons === "string"
            ? JSON.parse(req.body.buttons)
            : req.body.buttons;
      }

      const otherWork = await prisma.otherWorks.create({
        data: {
          title,
          imagen,
          workText,
          buttons: {
            create: buttons,
          },
        },
        include: {
          buttons: true,
        },
      });

      return res.status(200).json({ otherWork });
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      } else {
        return res.status(400).json({ message: "Error inesperado" });
      }
    }
  }
);

export default router;
