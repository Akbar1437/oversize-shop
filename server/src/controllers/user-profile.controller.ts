import { Request, Response } from "express";
import * as bcrypt from "bcryptjs";
import * as asyncHandler from "express-async-handler";
import { UserModel } from "../models/user.model";
import { generateToken } from "../utils/utils";

export async function userProfileController(
  request: Request,
  response: Response
) {
  asyncHandler(async (req: Request, res: Response) => {
    const user = await UserModel.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }
      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser),
      });
      return;
    }

    res.status(404).json({ message: "User not found" });
  });
}
