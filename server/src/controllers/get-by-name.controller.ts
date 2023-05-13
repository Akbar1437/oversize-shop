import { Request, Response } from "express";
import { ProductModel } from "../models/product.model";
import { handler } from "../utils/utils";

export async function getByNameController(
  request: Request,
  response: Response
) {
  handler(request, response, async () => {
    const { query } = request.params;
    console.log("query", query);

    const products = await ProductModel.find();

    console.log("products", products);

    const filtered = products.filter(
      (product) =>
        product.name.toLocaleLowerCase().indexOf(query.toLocaleLowerCase()) !==
        -1
    );

    console.log("filtered", filtered);

    if (!filtered) {
      throw new Error("Product Not Found");
    }
    return filtered;
  });
}
