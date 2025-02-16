import { Router } from "express";
import prisma from "../../../client";
import { roleMiddleware } from "../../auth/middleware/checkRole";
import { upload, uploadToCloudinary } from "../../../utils/cloudinary";

const router = Router();

router.put(
  "/put-existing-blog/:blogId",
  roleMiddleware("admin"),
  upload.single("imagen"),
  uploadToCloudinary,
  async (req, res) => {
    const blogId = parseInt(req.params.blogId);
    const { title, blogText } = req.body;
    const imagen = req.body.cloudinaryUrl || undefined;

    const dataToUpdate: any = {
      createdAt: new Date(),
    };
    if (title) dataToUpdate.title = title;
    if (imagen) dataToUpdate.imagen = imagen;
    if (blogText) dataToUpdate.blogText = blogText;

    try {
      const updatedBlog = await prisma.blog.update({
        where: {
          id: blogId,
        },
        data: dataToUpdate,
      });

      if (!updatedBlog) {
        return res
          .status(404)
          .json({ message: "Entrada de blog no encontrada" });
      }
      return res.status(200).json({ updatedBlog });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      } else {
        return res.status(500).json({ message: "Algo salió mal" });
      }
    } finally {
      prisma.$disconnect();
    }
  }
);

export default router;
