import { Request, Response } from "express";
import * as asyncHandler from "express-async-handler";
import { OrderModel } from "../models/order.model";

export async function getOrderController() {
  asyncHandler(async (req: Request, res: Response) => {
    const order = await OrderModel.findById(req.params.id);
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: "Order Not Found" });
    }
  });
}
