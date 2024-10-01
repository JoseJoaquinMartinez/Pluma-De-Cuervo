import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.get("/get-all-books", async (req, res) => {
  try {
    const books = await prisma.book.findMany({
      select: {
        id: true,
        title: true,
        image: true,
      },
    });

    if (!books) {
      return res.status(404).json({ message: "No se han encontrado libros" });
    }

    return res.status(200).json(books);
  } catch (error) {
    if (error instanceof Error) {
      return res
        .status(500)
        .json({ error: `Error inesperado ${error.message}` });
    }
  } finally {
    prisma.$disconnect();
  }
});

export default router;