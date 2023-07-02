import { Request, Response } from "express";
import { handler } from "../utils/utils";
import { OrderModel } from "../models";

export async function getOrdersController(
  request: Request,
  response: Response
) {
  handler(request, response, async () => {
    const pageNumber = Number(request.query.page) || 1;
    const limit = Number(request.query.limit) || 8;

    let skip = (pageNumber - 1) * limit;

    const totalCountPromise = OrderModel.countDocuments().exec();

    const itemsPromise = OrderModel.find()
      .populate("user", "name")
      .skip(skip)
      .limit(limit);

    const [totalCount, items] = await Promise.all([
      totalCountPromise,
      itemsPromise,
    ]);

    const pageCount = Math.ceil(totalCount / limit);

    return {
      orders: items,
      pagination: {
        totalCount: totalCount,
        pageCount: pageCount,
      },
    };
  });
}
