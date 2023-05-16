import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { User } from "../models/user.model";

export const generateToken = (user: User) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET || "secret_jwt_key",
    { expiresIn: "30d" }
  );
};

export async function handler(
  req: Request,
  res: Response,
  callback: (req: Request, res: Response) => any
) {
  try {
    let result = callback(req, res);
    if (result instanceof Promise) {
      result = await result;
    }
    if (result !== undefined && result !== null) {
      res.json(result);
    } else {
      res.json({ status: "ok" });
    }
  } catch (e: unknown) {
    console.error(e);
    res.status(500);
    if (e instanceof Error) {
      res.json({
        status: "fail",
        error: e.message,
      });
    } else {
      res.json(JSON.stringify(e));
    }
  }
}
