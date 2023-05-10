import { Request, Response } from "express";
import { OrderModel } from "../models/order.model";
import { handler } from "../utils/utils";

export async function userOrdersController(
  request: Request,
  response: Response
) {
  handler(request, response, async () => {
    const orders = await OrderModel.find({ user: request.user._id });
    return orders;
  });
}
