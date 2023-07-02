import { Request, Response } from "express";
import { OrderModel } from "../models/order.model";
import { handler } from "../utils/utils";
import { UserModel } from "../models/user.model";
import { ProductModel } from "../models/product.model";

export async function getOrderSummaryController(
  request: Request,
  response: Response
) {
  handler(request, response, async () => {
    const orders = await OrderModel.aggregate([
      {
        $group: {
          _id: null,
          numOrders: { $sum: 1 },
          totalSales: { $sum: "$totalPrice" },
        },
      },
    ]);
    const users = await UserModel.aggregate([
      {
        $group: {
          _id: null,
          numUsers: { $sum: 1 },
        },
      },
    ]);
    const dailyOrders = await OrderModel.aggregate([
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          orders: { $sum: 1 },
          sales: { $sum: "$totalPrice" },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    const productCategories = await ProductModel.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
    ]);
    return { users, orders, dailyOrders, productCategories };
  });
}
