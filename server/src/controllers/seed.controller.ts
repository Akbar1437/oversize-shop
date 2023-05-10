import { Request, Response } from "express";
import * as asyncHandler from "express-async-handler";
import { ProductModel } from "../models/product.model";
import { UserModel } from "../models/user.model";
import { sampleProducts, sampleUsers } from "../app/data";

export async function seedController(request: Request, response: Response) {
  asyncHandler(async (req: Request, res: Response) => {
    await ProductModel.deleteMany({});
    const createdProducts = await ProductModel.insertMany(sampleProducts);

    await UserModel.deleteMany({});
    const createdUsers = await UserModel.insertMany(sampleUsers);

    res.json({ createdProducts, createdUsers });
  });
}
