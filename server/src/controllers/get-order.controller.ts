import { Request, Response } from "express";
import { OrderModel } from "../models/order.model";
import { handler } from "../utils/utils";

export async function getOrderController(request: Request, response: Response) {
  handler(request, response, async () => {
    const order = await OrderModel.findById(request.params.id);
    if (order) {
      response.json(order);
    } else {
      response.status(404).json({ message: "Order Not Found" });
    }
  });
}
