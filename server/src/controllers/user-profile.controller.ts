import * as bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { UserModel } from "../models/user.model";
import { generateToken, handler } from "../utils/utils";

export async function userProfileController(
  request: Request,
  response: Response
) {
  handler(request, response, async () => {
    const { name, email, password } = request.body;
    const user = await UserModel.findById(request.user._id);
    if (user) {
      user.name = name || user.name;
      user.email = email || user.email;
      if (password) {
        user.password = bcrypt.hashSync(password, 8);
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
