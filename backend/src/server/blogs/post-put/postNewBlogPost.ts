import { Router } from "express";
import prisma from "../../../../client";
import { roleMiddleware } from "../../auth/middleware/checkRole";

const router = Router();

router.post("/post-new-blog", roleMiddleware("admin"), async (req, res) => {
  const { title, imagen, blogText, estimatedReadTime } = req.body;
  try {
    const newBlogPost = await prisma.blog.create({
      data: {
        title: title,
        imagen: imagen,
        blogText: blogText,
        estimatedReadTime: estimatedReadTime,
      },
    });
    return res
      .status(200)
      .json({ newBlogPost, message: "Entrada de blog creada con éxito" });
  } catch (error) {
    if (error instanceof Error) {
      return res
        .status(500)
        .json({ error: `Error creando la entrada de blog ${error.message}` });
    }
  } finally {
    prisma.$disconnect();
  }
});

export default router;
