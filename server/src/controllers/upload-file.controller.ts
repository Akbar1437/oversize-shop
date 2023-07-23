import { Request, Response } from "express";
import { handler } from "../utils/utils";
import cloudinary from "../app/claudinary-config";

export async function uploadFileController(
  request: Request,
  response: Response
) {
  handler(request, response, async () => {
    if (!request.file) throw Error("req.file is null");
    console.log("filePath", request.file.path);

    // Upload the image to Cloudinary
    cloudinary.uploader.upload(
      request.file.path,
      { folder: "oversize" },
      (error: any, result: any) => {
        if (error) {
          console.error(error);
          throw new Error("Something went wrong");
        }

        const imageUrl = result.secure_url;
        const publicId = result.public_id;

        return { imageUrl, publicId };
      }
    );
  });
}
