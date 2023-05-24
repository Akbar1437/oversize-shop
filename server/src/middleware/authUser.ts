import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { Config } from "../app/config";

export const authUserMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;
  if (authorization) {
    const token = authorization.slice(7, authorization.length);
    const decode = jwt.verify(token, Config.JWT_SECRET);
    req.user = decode as {
      _id: string;
      name: string;
      email: string;
      isAdmin: boolean;
      token: string;
    };
    next();
  } else {
    res.status(401).json({ message: "User not authorized!" });
  }
};
