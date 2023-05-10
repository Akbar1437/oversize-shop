import * as bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { User, UserModel } from "../models/user.model";
import { generateToken, handler } from "../utils/utils";

export async function userSignUpOrdersController(
  request: Request,
  response: Response
) {
  handler(request, response, async () => {
    const user = await UserModel.create({
      name: request.body.name,
      email: request.body.email,
      password: bcrypt.hashSync(request.body.password),
    } as User);
    response.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user),
    });
  });
}
