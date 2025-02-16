import { Router } from "express";
import prisma from "../../../client";
import { roleMiddleware } from "../../auth/middleware/checkRole";
import { upload, uploadToCloudinary } from "../../../utils/cloudinary";

const router = Router();

router.post(
  "/post-new-blog",
  roleMiddleware("admin"),
  upload.single("imagen"),
  uploadToCloudinary,
  async (req, res) => {
    const { title, blogText } = req.body;
    const imagen = req.body.cloudinaryUrl || undefined;

    try {
      const newBlogPost = await prisma.blog.create({
        data: {
          title: title,
          imagen: imagen,
          blogText: blogText,
        },
      });
      return res.status(200).json({ newBlogPost });
    } catch (error) {
      if (error instanceof Error) {
        return res
          .status(500)
          .json({ error: `Error creando la entrada de blog ${error.message}` });
      }
    } finally {
      prisma.$disconnect();
    }
  }
);

export default router;
