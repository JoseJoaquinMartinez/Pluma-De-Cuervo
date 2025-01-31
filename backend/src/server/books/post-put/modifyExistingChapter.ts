import { Router } from "express";
import prisma from "../../../../client";
import multer from "multer";
import fs from "fs";
import { fileContentManagement } from "../utils/fileContentManagement";
import { extractContentFromTextArea } from "../utils/extractContentFromTextArea";
import { roleMiddleware } from "../../auth/middleware/checkRole";
import { uploadFields, uploadToCloudinary } from "../../../utils/cloudinary";

const router = Router();
const uploadMultiple = uploadFields.fields([
  { name: "file", maxCount: 1 },
  { name: "imagen", maxCount: 1 },
]);

router.put(
  "/modify-chapter/:chapterId",
  roleMiddleware("admin"),
  uploadMultiple,
  uploadToCloudinary,
  async (req, res) => {
    const chapterId = parseInt(req.params.chapterId);
    const { title, bookId } = req.body;
    const textArea: string | null = req.body.textArea;
    const imagen = req.body.cloudinaryUrl || undefined;
    const files = req.files as
      | { [fieldname: string]: Express.Multer.File[] }
      | undefined;
    const file = files?.["file"]?.[0];

    const dataToUpdate: any = {};

    if (title) dataToUpdate.title = title;
    if (imagen) dataToUpdate.imagen = imagen;
    if (bookId) dataToUpdate.bookId = parseInt(bookId);

    try {
      let chapterUpdated = false;

      if (Object.keys(dataToUpdate).length > 0) {
        const updateChapter = await prisma.chapter.update({
          where: {
            id: chapterId,
          },
          data: dataToUpdate,
        });
        chapterUpdated = true;
      }

      if (file || textArea) {
        let content: { type: string; value: string }[] = [];
        if (file) {
          const fileExtension = file.mimetype.toLowerCase();
          content = await fileContentManagement(file.path, fileExtension);
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
              paragraphNumber: i + 1,
              paragraphText: value,
              paragraphType: type,
              comment: {
                create: [],
              },
            },
          });
        }
        chapterUpdated = true;
      }

      if (!chapterUpdated) {
        return res.status(400).json({ message: "No se realizaron cambios" });
      }
      const updatedChapter = await prisma.chapter.findUnique({
        where: {
          id: chapterId,
        },
        include: {
          paragraph: true,
        },
      });
      return res
        .status(200)
        .json({ updatedChapter, message: "Capítulo actualizado" });
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
