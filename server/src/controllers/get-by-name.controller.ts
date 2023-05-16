import { Request, Response } from "express";
import { ProductModel } from "../models/product.model";
import { handler } from "../utils/utils";

export async function getByNameController(
  request: Request,
  response: Response
) {
  handler(request, response, async () => {
    const { query } = request.params;

    if (!query) {
      throw new Error("query params is empty");
    }
    const queryToLowerCase = query.toLocaleLowerCase();

    const products = await ProductModel.find();

    if (queryToLowerCase.includes("sale")) {
      return products.filter((product) => product.isSale === true);
    }

    if (queryToLowerCase.includes("deals")) {
      return products.filter((product) => product.isLatest === true);
    }

    if (queryToLowerCase.includes("pants")) {
      return products.filter((product) =>
        product.category.toLocaleLowerCase().includes(queryToLowerCase)
      );
    }

    if (queryToLowerCase.includes("shirts")) {
      return products.filter((product) =>
        product.category.toLocaleLowerCase().includes(queryToLowerCase)
      );
    }

    const filtered = products.filter(
      (product) =>
        product.name.toLocaleLowerCase().indexOf(queryToLowerCase) !== -1
    );

    if (!filtered) {
      throw new Error("Product Not Found");
    }

    return filtered;
  });
}
