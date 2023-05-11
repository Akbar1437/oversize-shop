import * as bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { User, UserModel } from "../models/user.model";
import { generateToken, handler } from "../utils/utils";

export async function userSignUpOrdersController(
  request: Request,
  response: Response
) {
  handler(request, response, async () => {
    const { name, email, password } = request.body;
    const user = await UserModel.create({
      name: name,
      email: email,
      password: bcrypt.hashSync(password),
    } as User);

    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user),
    };
  });
}
