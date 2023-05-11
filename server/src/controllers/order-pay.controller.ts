import { Request, Response } from "express";
import { OrderModel } from "../models/order.model";
import { handler } from "../utils/utils";

export async function orderPayController(request: Request, response: Response) {
  handler(request, response, async () => {
    const { id, status, update_time, email_address } = request.body;

    const order = await OrderModel.findById(request.params.id);
    if (!order) {
      throw new Error("Order Not Found");
    }

    order.isPaid = true;
    order.paidAt = new Date(Date.now());
    order.paymentResult = {
      paymentId: id,
      status,
      update_time,
      email_address,
    };
    const updatedOrder = await order.save();

    return { order: updatedOrder };
  });
}
