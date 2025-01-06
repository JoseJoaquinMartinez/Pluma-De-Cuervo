import { Router } from "express";
import prisma from "../../../../client";
import multer from "multer";
import fs from "fs";
import { createNewChapter } from "../middleware/createChapter";
import { roleMiddleware } from "../../auth/middleware/checkRole";

import { extractContentFromTextArea } from "../utils/extractContentFromTextArea";
import { fileContentManagement } from "../utils/fileContentManagement";

const router = Router();

const upload = multer({ dest: "uploads/" });

router.post(
  "/upload-chapter",
  roleMiddleware("admin"),
  upload.single("file"),
  createNewChapter,
  async (req, res) => {
    const file = req.file;
    const textArea: string | null = req.body.textArea;
    const chapterId = req.body.chapterId;

    try {
      let content: { type: string; value: string }[] = [];
      if (file) {
        const fileExtension = file.mimetype.toLowerCase();
        content = await fileContentManagement(file.path, fileExtension);
        fs.unlinkSync(file.path);
      } else if (textArea) {
        content = await extractContentFromTextArea(textArea);
      }

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
      res.status(200).json({ message: "Capítulo creado" });
    } catch (error) {
      res
        .status(500)
        .json({ error: `Error interno creando capitulo ${error}}` });
    }
  }
);

export default router;
