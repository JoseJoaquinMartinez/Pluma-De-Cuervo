import { Request, Response, NextFunction } from "express";
import multer, { Multer } from "multer";
import { v2 as cloudinary } from "cloudinary";
import sharp from "sharp";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_API_KEY,
  secure: true,
});

// Multer configuration
const multerConfig = {
  limits: {
    fileSize: 5 * 1024 * 1024, // Limit file size to 5MB
  },
  fileFilter: (
    _req: Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback
  ) => {
    if (file.fieldname === "imagen" && !file.mimetype.startsWith("image/")) {
      cb(new Error("Solo se permiten archivos de imagen")); // Only allow images
      return;
    }
    cb(null, true);
  },
};

// Use memory storage instead of disk storage
const memoryStorage = multer.memoryStorage();
export const upload: Multer = multer({
  ...multerConfig,
  storage: memoryStorage, // Store files in memory
});

// Middleware to upload files to Cloudinary
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
      return next(); // No file to process, proceed to the next middleware
    }

    let imageBuffer: Buffer;

    // If using memory storage, the file is already in memory
    if (file.buffer) {
      imageBuffer = file.buffer;
    } else {
      throw new Error("Archivo no encontrado en memoria");
    }

    // Resize the image using Sharp
    let resizedBuffer: Buffer;
    try {
      resizedBuffer = await sharp(imageBuffer)
        .resize({ width: 800, height: 600, fit: "inside" }) // Resize image
        .toBuffer();
    } catch (error) {
      console.error("Error procesando la imagen:", error);
      return next(new Error("Error procesando la imagen"));
    }

    // Upload the resized image to Cloudinary
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "auto",
        folder: "Pluma de Cuervo", // Specify the folder in Cloudinary
      },
      (err: any, result: any) => {
        if (err) {
          console.error("Error cargando la imagen a Cloudinary:", err);
          return next(err); // Pass the error to the next middleware
        }
        if (!result) {
          console.error("Error indefinido cargando la imagen a Cloudinary");
          return next(new Error("Carga a Cloudinary error inesperado"));
        }
        req.body.cloudinaryUrl = result.secure_url; // Save the Cloudinary URL to the request body
        next(); // Proceed to the next middleware
      }
    );

    uploadStream.end(resizedBuffer); // End the stream with the resized buffer
  } catch (error) {
    console.error("Error in uploadToCloudinary middleware:", error);
    next(error); // Pass the error to the next middleware
  }
};
