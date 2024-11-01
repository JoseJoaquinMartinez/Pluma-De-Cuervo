import { Router } from "express";
import prisma from "../../../../client";

const router = Router();

router.get("/get-last-five-blogs", async (req, res) => {
  try {
    const fiveLastBlogs = await prisma.blog.findMany({
      orderBy: { createdAt: "desc" },
      skip: 0,
      take: 5,
      select: {
        id: true,
        imagenn: true,
        title: true,
      },
    });

    if (!fiveLastBlogs || fiveLastBlogs.length === 0) {
      return res.status(404).json({ error: "No se han encontrado los blogs" });
    }
    return res.status(200).json(fiveLastBlogs);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        error: `Error inesperado cargando los blogs ${error.message}`,
      });
    }
  }
});

export default router;
