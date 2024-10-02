import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.put("/put-existing-book/:bookId", async (req, res) => {
  const bookId = parseInt(req.params.bookId);
  const { title, image, Synopsis } = req.body;

  const dataToUpdate: any = {};
  if (title) dataToUpdate.title = title;
  if (image) dataToUpdate.image = image;
  if (Synopsis) dataToUpdate.Synopsis = Synopsis;

  try {
    const updatedBook = await prisma.book.update({
      where: {
        id: bookId,
      },
      data: dataToUpdate,
    });
    if (!updatedBook) {
      return res.status(404).json({ message: "Libro no encontrado" });
    }
    return res.status(200).json({ updatedBook, message: "Libro actualizado" });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        error: `Error inesperado modificando la información del capítulo ${error.message}`,
      });
    }
  } finally {
    prisma.$disconnect();
  }
});

export default router;
