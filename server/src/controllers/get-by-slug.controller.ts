import { Request, Response } from "express";
import { ProductModel } from "../models/product.model";
import { handler } from "../utils/utils";

export async function getBySlugController(
  request: Request,
  response: Response
) {
  handler(request, response, async () => {
    const { id } = request.params;

    const product = await ProductModel.findOne({ _id: id });
    if (!product) {
      throw new Error("Product Not Found");
    }
    return product;
  });
}
