import { Request, Response } from "express";
import { ProductModel } from "../models/product.model";
import { handler } from "../utils/utils";

export async function getCategoriesController(
  request: Request,
  response: Response
) {
  handler(request, response, async () => {
    const categories = await ProductModel.find().distinct("category");
    return categories;
  });
}
