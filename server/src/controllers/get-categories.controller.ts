import { Request, Response } from "express";
import * as asyncHandler from "express-async-handler";
import { ProductModel } from "../models/product.model";

export async function getCategoriesController() {
  asyncHandler(async (req: Request, res: Response) => {
    const categories = await ProductModel.find().distinct("category");
    res.json(categories);
  });
}
