import { Request, Response } from "express";
import * as asyncHandler from "express-async-handler";
import { ProductModel } from "../models/product.model";

export async function getBySlugController() {
  asyncHandler(async (req: Request, res: Response) => {
    const product = await ProductModel.findOne({ slug: req.params.slug });
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product Not Found" });
    }
  });
}
