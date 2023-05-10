import { Request, Response } from "express";
import * as asyncHandler from "express-async-handler";
import { ProductModel } from "../models/product.model";

export async function getProductsController() {
  asyncHandler(async (req: Request, res: Response) => {
    const products = await ProductModel.find();
    res.json(products);
  });
}
