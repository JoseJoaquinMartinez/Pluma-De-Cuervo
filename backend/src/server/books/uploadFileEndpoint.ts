import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import multer from "multer";
import fs from "fs";
import { createNewChapter } from "./middleware/createChapter";
import { extractContentFromPDF } from "./utils/extractContentFromPDF";
import { extractContentFromWord } from "./utils/extractContentFromWord";

const router = Router();
const prisma = new PrismaClient();
const upload = multer({ dest: "uploads/" });

router.post(
  "/upload-chapter",
  upload.single("file"),
  createNewChapter,
  async (req, res) => {
    const file = req.file;
    const { chapterId } = req.body.chapterId;

    try {
      let content: { type: string; value: string }[] = [];
      const fileExtension = file.mimetype.toLowerCase();

      switch (fileExtension) {
        case "application/pdf":
          content = await extractContentFromPDF(file.path);
          break;
        case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
          content = await extractContentFromWord(file.path);
          break;
        default:
      }
    } catch (error) {}
  }
);
