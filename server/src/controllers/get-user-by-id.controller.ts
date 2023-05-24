import { Request, Response } from "express";
import { handler } from "../utils/utils";
import { UserModel } from "../models";

export async function getUserByIdController(
  request: Request,
  response: Response
) {
  handler(request, response, async () => {
    const user = await UserModel.findById(request.params.id);
    if (!user) throw new Error("User not found");
    return user;
  });
}
