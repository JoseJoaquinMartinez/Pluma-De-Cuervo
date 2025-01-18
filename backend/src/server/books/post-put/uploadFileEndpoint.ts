import { uploadFields, uploadToCloudinary } from "./../../../utils/cloudinary";
import { Router } from "express";
import prisma from "../../../../client";
import fs from "fs";
import { createNewChapter } from "../middleware/createChapter";
import { roleMiddleware } from "../../auth/middleware/checkRole";
import { extractContentFromTextArea } from "../utils/extractContentFromTextArea";
import { fileContentManagement } from "../utils/fileContentManagement";

const router = Router();

const uploadMultiple = uploadFields.fields([
  { name: "file", maxCount: 1 },
  { name: "imagen", maxCount: 1 },
]);

router.post(
  "/upload-chapter",
  roleMiddleware("admin"),
  uploadMultiple,
  uploadToCloudinary,
  createNewChapter,
  async (req, res) => {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const textArea: string | null = req.body.textArea;
    const chapterId = req.body.chapterId;

    try {
      let content: { type: string; value: string }[] = [];

      if (files && files["file"]?.[0]) {
        const file = files["file"][0];
        const fileExtension = file.mimetype.toLowerCase();
        content = await fileContentManagement(file.path, fileExtension);

        try {
          await fs.promises.unlink(file.path);
        } catch (error) {
          console.error("Error limpiando archivo temporal:", error);
        }
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

      res.status(200).json({ message: "Capítulo creado exitosamente" });
    } catch (error) {
      console.error("Error creating chapter content:", error);
      res.status(500).json({
        error: `Error interno creando capítulo: ${error instanceof Error ? error.message : String(error)}`,
      });
    }
  }
);

export default router;
