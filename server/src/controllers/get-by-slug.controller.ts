import { Request, Response } from "express";
import { ProductModel } from "../models/product.model";
import { handler } from "../utils/utils";

export async function getBySlugController(
  request: Request,
  response: Response
) {
  handler(request, response, async () => {
    const { slug } = request.params;
    const product = await ProductModel.findOne({ slug: slug });

    return product
      ? product
      : response.status(404).json({ message: "Product Not Found" });
  });
}
