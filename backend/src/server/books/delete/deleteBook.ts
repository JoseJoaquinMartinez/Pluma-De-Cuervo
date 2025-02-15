import { Router } from "express";
import prisma from "../../../../client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { roleMiddleware } from "../../auth/middleware/checkRole";

const router = Router();

router.delete(
  "/delete-book/:bookId",
  roleMiddleware("admin"),
  async (req, res) => {
    const bookId = parseInt(req.params.bookId);
    if (isNaN(bookId)) {
      return res
        .status(400)
        .json({ error: "Identificador del libro no recibido" });
    }
    try {
      const deletedBook = await prisma.book.delete({ where: { id: bookId } });

      return res.status(200).json({ message: "Libro eliminado exitosamente" });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        return res.status(404).json({ message: "Libro no encontrado" });
      } else {
        return res.status(500).json({
          error: `Error inesperando eliminando el libro ${error.message}`,
        });
      }
    } finally {
      prisma.$disconnect();
    }
  }
);

export default router;
