import { Router } from "express";
import prisma from "../../../../client";

const router = Router();

router.put("/put-existing-blog/:blogId", async (req, res) => {
  const blogId = parseInt(req.params.blogId);
  const { title, imagen, blogText } = req.body;

  const dataToUpdate: any = {
    createdAt: new Date(),
  };
  if (title) dataToUpdate.title = title;
  if (imagen) dataToUpdate.imagenn = imagen;
  if (blogText) dataToUpdate.blogText = blogText;

  try {
    const updatedBlog = await prisma.blog.update({
      where: {
        id: blogId,
      },
      data: dataToUpdate,
    });

    if (!updatedBlog) {
      return res.status(404).json({ message: "Entrada de blog no encontrada" });
    }
    return res
      .status(200)
      .json({ updatedBlog, message: "Entrada de blog actualizada" });
  } catch (error) {
    return res.status(500).json({
      error: `Error inesperado actualizando el blog ${error.message}`,
    });
  } finally {
    prisma.$disconnect();
  }
});

export default router;
