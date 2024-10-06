import { Router } from "express";
import prisma from "../../../../client";

const router = Router();

router.get("/get-single-blog-post/:blogId", async (req, res) => {
  const blogId = parseInt(req.params.blogId);
  if (isNaN(blogId)) {
    return res.status(400).json({ message: "Id del blog no recibido" });
  }
  try {
    const existingBlog = await prisma.blog.findFirst({ where: { id: blogId } });
    if (!existingBlog) {
      return res.status(404).json({ message: "Blog post no encontrado" });
    }
    return res
      .status(200)
      .json({ existingBlog, message: "Blog post necontrado" });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        error: `Error inesperado buscando el blog post ${error.message}`,
      });
    }
  } finally {
    prisma.$disconnect();
  }
});

export default router;
