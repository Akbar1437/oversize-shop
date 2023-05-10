import { Request, Response } from "express";
import * as asyncHandler from "express-async-handler";
import * as bcrypt from "bcryptjs";
import { User, UserModel } from "../models/user.model";
import { generateToken } from "../utils/utils";

export async function userSignUpOrdersController(
  request: Request,
  response: Response
) {
  asyncHandler(async (req: Request, res: Response) => {
    const user = await UserModel.create({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
    } as User);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user),
    });
  });
}
