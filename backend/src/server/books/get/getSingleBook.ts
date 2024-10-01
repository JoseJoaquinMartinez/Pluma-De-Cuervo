import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.get("/get-single-book/:bookId", async (req, res) => {
  const bookId = parseInt(req.params.bookId);
  try {
    const existingBook = await prisma.book.findUnique({
      where: {
        id: bookId,
      },
      select: {
        id: true,
        title: true,
        image: true,
        Synopsis: true,
      },
    });
    if (!existingBook) {
      return res.status(404).json({ message: "Libro no encontrado" });
    }
    return res.status(200).json(existingBook);
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
