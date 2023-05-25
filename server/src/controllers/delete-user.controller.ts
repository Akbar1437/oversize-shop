import { Request, Response } from "express";
import { handler } from "../utils/utils";
import { UserModel } from "../models";

export async function deleteUserController(
  request: Request,
  response: Response
) {
  handler(request, response, async () => {
    const user = await UserModel.findById(request.params.id);
    if (user) {
      if (user.email === "admin@example.com") {
        response.status(400).send({ message: "Can Not Delete Admin User" });
        return;
      }
      const deleteUser = await user.deleteOne();
      return { user: deleteUser };
    } else {
      throw new Error("User not found");
    }
  });
}
