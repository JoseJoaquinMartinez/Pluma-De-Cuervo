import { Router } from "express";
import prisma from "../../../../client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { roleMiddleware } from "../../auth/middleware/checkRole";

const router = Router();

router.delete(
  "/delete-blog-post/:blogId",
  roleMiddleware("admin"),
  async (req, res) => {
    const blogId = parseInt(req.params.blogId);

    if (isNaN(blogId)) {
      return res.status(400).json({ message: "Id del blog no recibido" });
    }

    try {
      const existingBlog = await prisma.blog.delete({ where: { id: blogId } });

      return res.status(200).json({ message: "Entrada de blog eliminada" });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        return res
          .status(404)
          .json({ message: "Entrada de blog no encontrada" });
      } else {
        return res.status(500).json({
          error: `Error inesperando eliminando la entrada de blog ${error.message}`,
        });
      }
    } finally {
      prisma.$disconnect();
    }
  }
);

export default router;
