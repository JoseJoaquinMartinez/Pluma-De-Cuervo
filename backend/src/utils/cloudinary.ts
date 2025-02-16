import { Request, Response, NextFunction } from "express";
import multer, { Multer } from "multer";
import {
  v2 as cloudinary,
  UploadApiResponse,
  UploadApiErrorResponse,
} from "cloudinary";
import sharp from "sharp";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_API_KEY,
  secure: true,
});

interface CloudinaryFile extends Express.Multer.File {
  buffer: Buffer;
}

const multerConfig = {
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (
    _req: Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback
  ) => {
    if (file.fieldname === "imagen" && !file.mimetype.startsWith("image/")) {
      cb(new Error("Solo se permiten archivos de imagen"));
      return;
    }
    cb(null, true);
  },
};

const memoryStorage = multer.memoryStorage();
export const upload: Multer = multer({
  ...multerConfig,
  storage: memoryStorage,
});

/* const diskStorage = multer.diskStorage({
  destination: "uploads/",
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${file.fieldname}-${uniqueSuffix}-${file.originalname}`);
  },
}); */

export const uploadFields = multer({
  ...multerConfig,
  storage: memoryStorage,
});

export const uploadToCloudinary = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const file =
      req.file ||
      (req.files && (req.files as any)["imagen"]
        ? (req.files as any)["imagen"][0]
        : undefined);

    if (!file) {
      return next();
    }

    let imageBuffer: Buffer;
    try {
      if (file.buffer) {
        imageBuffer = file.buffer;
      } else {
        imageBuffer = await fs.promises.readFile(file.path);

        await fs.promises.unlink(file.path).catch(console.error);
      }
    } catch (error) {
      console.error("Error leyendo el archivo:", error);
      return next(new Error("Error procesando el archivo de imagen"));
    }

    let resizedBuffer: Buffer;
    try {
      resizedBuffer = await sharp(imageBuffer)
        .resize({ width: 800, height: 600, fit: "inside" })
        .toBuffer();
    } catch (error) {
      console.error("Error procesando la imagen:", error);
      return next(new Error("Error procesando la imagen"));
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "auto",
        folder: "Pluma de Cuervo",
      },
      (
        err: UploadApiErrorResponse | undefined,
        result: UploadApiResponse | undefined
      ) => {
        if (err) {
          console.error("Error cargando la imagen a Cloudinary:", err);
          return next(err);
        }
        if (!result) {
          console.error("Error indefinido cargando la imagen a Cloudinary");
          return next(new Error("Carga a Cloudinary error inesperado"));
        }

        req.body.cloudinaryUrl = result.secure_url;
        next();
      }
    );

    uploadStream.end(resizedBuffer);
  } catch (error) {
    console.error("Error in uploadToCloudinary middleware:", error);
    next(error);
  }
};
