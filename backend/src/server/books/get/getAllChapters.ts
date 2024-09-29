import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.get("/get-all-chapters/:bookId", async (req, res) => {
  const bookId = parseInt(req.params.bookId);

  try {
    const existingBook = await prisma.book.findFirst({
      where: {
        id: bookId,
      },
      include: { chapter: true },
    });

    if (!existingBook) {
      res.status(404).json({ message: "Libro no encontrado" });
    }
    return res.status(200).json(existingBook);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: `Error inesperado ${error.message}` });
    }
  } finally {
    prisma.$disconnect();
  }
});

export default router;
