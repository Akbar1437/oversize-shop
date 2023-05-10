import { Request, Response } from "express";
import { ProductModel } from "../models/product.model";
import { handler } from "../utils/utils";

export async function getProductsController(
  request: Request,
  response: Response
) {
  handler(request, response, async () => {
    return await ProductModel.find();
  });
}
