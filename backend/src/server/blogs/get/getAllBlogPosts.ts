import { Router } from "express";
import prisma from "../../../../client";

const router = Router();

router.get("/get-all-blog-posts", async (req, res) => {
  try {
    const allExistingBlogs = await prisma.blog.findMany({
      select: {
        id: true,
        title: true,
        imagen: true,
        createdAt: true,
        estimatedReadTime: true,
      },
    });
    return res.status(200).json(allExistingBlogs);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        error: `Error inesperado recopilando los blogs ${error.message}`,
      });
    }
  } finally {
    prisma.$disconnect();
  }
});

export default router;
