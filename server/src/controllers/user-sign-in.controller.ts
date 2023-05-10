import * as bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { UserModel } from "../models/user.model";
import { generateToken, handler } from "../utils/utils";

export async function userSignInOrdersController(
  request: Request,
  response: Response
) {
  handler(request, response, async () => {
    const { email, password } = request.body;
    const user = await UserModel.findOne({ email: email });
    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        response.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
        return;
      }
    }
    response.status(401).json({ message: "Invalid email or password" });
  });
}
