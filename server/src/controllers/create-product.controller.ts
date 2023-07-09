import { Request, Response } from "express";
import { OrderModel } from "../models/order.model";
import { Product, ProductModel } from "../models/product.model";
import { handler } from "../utils/utils";

export async function createProductController(
  request: Request,
  response: Response
) {
  handler(request, response, async () => {
    const product = await ProductModel.create(request.body);

    const createdProduct = await product.save();

    return createdProduct;
  });
}
