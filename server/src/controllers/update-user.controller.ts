import { Request, Response } from "express";
import { handler } from "../utils/utils";
import { UserModel } from "../models";

export async function updateUserController(
  request: Request,
  response: Response
) {
  handler(request, response, async () => {
    const { name, email, isAdmin } = request.body;
    const user = await UserModel.findById(request.params.id);
    if (user) {
      user.name = name || user.name;
      user.email = email || user.email;
      user.isAdmin = Boolean(isAdmin);
      const updatedUser = await user.save();
      return { user: updatedUser };
    } else {
      throw new Error("User Not Found");
    }
  });
}
