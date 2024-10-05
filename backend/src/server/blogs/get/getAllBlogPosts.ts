import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.get("/get-all-blog-posts", async (req, res) => {
  try {
    const allExistingBlogs = await prisma.blog.findMany({
      select: {
        title: true,
        imagen: true,
        createdAt: true,
      },
    });
    return res
      .status(200)
      .json({ allExistingBlogs, message: "Blogs encontrados" });
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