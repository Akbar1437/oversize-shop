import * as bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { UserModel } from "../models/user.model";
import { generateToken, handler } from "../utils/utils";

export async function userProfileController(
  request: Request,
  response: Response
) {
  handler(request, response, async () => {
    const user = await UserModel.findById(request.user._id);
    if (user) {
      user.name = request.body.name || user.name;
      user.email = request.body.email || user.email;
      if (request.body.password) {
        user.password = bcrypt.hashSync(request.body.password, 8);
      }
      const updatedUser = await user.save();
      response.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser),
      });
      return;
    }

    response.status(404).json({ message: "User not found" });
  });
}
