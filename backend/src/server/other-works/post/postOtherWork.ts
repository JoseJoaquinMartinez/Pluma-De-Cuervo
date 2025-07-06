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
    const { title, workText, buttonLink, buttonText } = req.body;
    const imagen = req.body.cloudinaryUrl || undefined;

    try {
      const otherWork = await prisma.otherWorks.create({
        data: {
          title,
          imagen,
          workText,
          buttonLink,
          buttonText,
        },
      });

      return res.status(200).json({ otherWork });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      } else {
        return res.status(400).json({ message: "Error inesperado" });
      }
    }
  }
);

export default router;
