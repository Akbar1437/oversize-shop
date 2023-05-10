import { Request, Response } from "express";
import * as asyncHandler from "express-async-handler";
import * as bcrypt from "bcryptjs";
import { UserModel } from "../models/user.model";
import { generateToken } from "../utils/utils";

export async function userSignInOrdersController(
  request: Request,
  response: Response
) {
  asyncHandler(async (req: Request, res: Response) => {
    const user = await UserModel.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).json({ message: "Invalid email or password" });
  });
}
