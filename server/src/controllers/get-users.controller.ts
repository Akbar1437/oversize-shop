import { Request, Response } from "express";
import { handler } from "../utils/utils";
import { UserModel } from "../models";

export async function getUsersController(request: Request, response: Response) {
  handler(request, response, async () => {
    return await UserModel.find({});
  });
}
