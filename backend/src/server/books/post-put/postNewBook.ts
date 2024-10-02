import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.post("/new-book", async (req, res) => {
  const { title, image, Synopsis } = req.body;

  try {
    const newBook = await prisma.book.create({
      data: {
        title: title,
        image: image || null,
        Synopsis: Synopsis,
      },
    });
    return res.status(201).json({ newBook, message: "Libro creado" });
  } catch (error) {
    if (error.code === "P2002") {
      return res
        .status(409)
        .json({ message: "Libro con este titulo ya existe." });
    } else if (error instanceof Error) {
      return res
        .status(500)
        .json({ error: `Error inesperado creando libro ${error.message}` });
    }
  } finally {
    prisma.$disconnect();
  }
});

export default router;
