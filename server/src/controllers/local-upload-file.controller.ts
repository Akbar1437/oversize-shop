import { Request, Response } from "express";
import { handler } from "../utils/utils";

export async function localUploadFileController(
  request: Request,
  response: Response
) {
  handler(request, response, async () => {
    if (!request.file) throw Error("req.file is null");
    console.log("request file", request.file);

    return {
      secure_url: `/${request.file.path}`,
    };
  });
}
