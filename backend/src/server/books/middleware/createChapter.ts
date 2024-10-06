import { Request, Response, NextFunction } from "express";
import prisma from "../../../../client";

export async function createNewChapter(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { title, chapterNumber, image, bookId } = req.body;

  try {
    const chapter = await prisma.chapter.create({
      data: {
        title: title,
        chapterNumber: parseInt(chapterNumber),
        image: image || null,
        bookId: parseInt(bookId),
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
