import { Request, Response } from "express";
import { ProductModel } from "../models/product.model";
import { handler } from "../utils/utils";

export async function getProductsController(
  request: Request,
  response: Response
) {
  handler(request, response, async () => {
    const pageNumber = Number(request.query.page) || 1;
    const limit = Number(request.query.limit) || 8;

    let skip = (pageNumber - 1) * limit;

    const totalCountPromise = ProductModel.countDocuments().exec();

    const itemsPromise = ProductModel.find().skip(skip).limit(limit);

    const [totalCount, items] = await Promise.all([
      totalCountPromise,
      itemsPromise,
    ]);

    const pageCount = Math.ceil(totalCount / limit);

    return {
      products: items,
      pagination: {
        totalCount: totalCount,
        pageCount: pageCount,
      },
    };
  });
}
