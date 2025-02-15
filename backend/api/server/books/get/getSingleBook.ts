import { Router } from "express";
import prisma from "../../../../client";

const router = Router();

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
        imagen: true,
        Synopsis: true,
        status: true,
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
