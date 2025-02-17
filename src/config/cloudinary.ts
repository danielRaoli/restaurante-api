import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "produtos",
    format: async () => "png",
    public_id: (req: any, file: any) => file.originalname.split(".")[0],
  } as unknown as {
    folder: string;
    format: () => string;
    public_id: (req: any, file: any) => string;
  },
});

export const upload = multer({ storage });
