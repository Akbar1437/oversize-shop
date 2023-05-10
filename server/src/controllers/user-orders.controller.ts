import { Request, Response } from "express";
import * as asyncHandler from "express-async-handler";
import { OrderModel } from "../models/order.model";

export async function userOrdersController(
  request: Request,
  response: Response
) {
  asyncHandler(async (req: Request, res: Response) => {
    const orders = await OrderModel.find({ user: req.user._id });
    res.json(orders);
  });
}
