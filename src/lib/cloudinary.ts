import { v2 as cloudinary } from "cloudinary";

export function isCloudinaryConfigured(): boolean {
  return !!(
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  );
}

function configureCloudinary() {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  return cloudinary;
}

export async function uploadToCloudinary(
  buffer: Buffer,
  filename: string,
): Promise<{ url: string; publicId: string; width?: number; height?: number }> {
  const cld = configureCloudinary();
  const baseName = filename.replace(/\.[^.]+$/, "").replace(/[^a-zA-Z0-9_-]/g, "-");

  return new Promise((resolve, reject) => {
    cld.uploader
      .upload_stream(
        {
          folder: "daycrunch/products",
          public_id: `${baseName}-${Date.now()}`,
          resource_type: "image",
        },
        (error, result) => {
          if (error || !result) {
            reject(error ?? new Error("Cloudinary upload failed"));
            return;
          }
          resolve({
            url: result.secure_url,
            publicId: result.public_id,
            width: result.width,
            height: result.height,
          });
        },
      )
      .end(buffer);
  });
}
