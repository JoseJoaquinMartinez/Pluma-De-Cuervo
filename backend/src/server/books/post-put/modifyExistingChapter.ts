import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import multer from "multer";
import fs from "fs";
import { fileContentManagement } from "../utils/fileContentManagement";
import { extractContentFromTextArea } from "../utils/extractContentFromTextArea";

const router = Router();
const prisma = new PrismaClient();
const upload = multer({ dest: "uploads/" });

router.put(
  "/modify-chapter/:chapterId",
  upload.single("file"),
  async (req, res) => {
    const chapterId = parseInt(req.params.chapterId);
    const { title, image, chapterNumber, bookId } = req.body;
    const textArea: string | null = req.body.textArea;
    const file = req.file;

    const dataToUpdate: any = {};

    if (title) dataToUpdate.title = title;
    if (image) dataToUpdate.image = image;
    if (chapterNumber) dataToUpdate.chapterNumber = parseInt(chapterNumber);
    if (bookId) dataToUpdate.bookId = parseInt(bookId);

    try {
      if (file || textArea) {
        let content: { type: string; value: string }[] = [];
        if (file) {
          const fileExtension = file.mimetype.toLowerCase();
          fileContentManagement(file.path, fileExtension);
          fs.unlinkSync(file.path);
        } else if (textArea) {
          content = await extractContentFromTextArea(textArea);
        }

        await prisma.paragraph.deleteMany({ where: { chapterId: chapterId } });

        for (let i = 0; i < content.length; i++) {
          const { type, value } = content[i];
          await prisma.paragraph.create({
            data: {
              chapterId: chapterId,
              paragraphNumber: i,
              paragraphText: value,
              paragraphType: type,
              comment: {
                create: [],
              },
            },
          });
        }
      }

      const updateChapter = await prisma.chapter.update({
        where: {
          id: chapterId,
        },
        data: dataToUpdate,
      });

      if (!updateChapter) {
        return res.status(404).json({ message: "Capítulo no encontrado" });
      }

      return res.status(200).json(updateChapter);
    } catch (error) {
      if (error instanceof Error) {
        return res
          .status(500)
          .json({ error: `Error inesperado ${error.message}` });
      }
    } finally {
      prisma.$disconnect();
    }
  }
);

export default router;
