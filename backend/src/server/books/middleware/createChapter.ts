import { Request, Response, NextFunction } from "express";
import prisma from "../../../../client";

export async function createNewChapter(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { title, bookId, estimatedReadTime } = req.body;
  const imagen = req.body.cloudinaryUrl || undefined;

  try {
    const chapter = await prisma.chapter.create({
      data: {
        title: title,
        imagen: imagen,
        bookId: parseInt(bookId),
        estimatedReadTime: estimatedReadTime,
      },
    });
    if (!chapter) {
      return res.status(500).json({ error: "Error creando el capítulo" });
    }
    req.body.chapterId = chapter.id;

    next();
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Error creando el capítulo ${error}` });
  }
}
