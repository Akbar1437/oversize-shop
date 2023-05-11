import { Request, Response } from "express";
import { ProductModel } from "../models/product.model";
import { UserModel } from "../models/user.model";
import { handler } from "../utils/utils";
import { sampleProducts, sampleUsers } from "../app/data";

export async function seedController(request: Request, response: Response) {
  handler(request, response, async () => {
    await ProductModel.deleteMany({});
    const createdProducts = await ProductModel.insertMany(sampleProducts);

    await UserModel.deleteMany({});
    const createdUsers = await UserModel.insertMany(sampleUsers);

    return { createdProducts, createdUsers };
  });
}
