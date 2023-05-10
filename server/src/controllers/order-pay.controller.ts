import { Request, Response } from "express";
import { OrderModel } from "../models/order.model";
import { handler } from "../utils/utils";

export async function orderPayController(request: Request, response: Response) {
  handler(request, response, async () => {
    const order = await OrderModel.findById(request.params.id);

    if (order) {
      order.isPaid = true;
      order.paidAt = new Date(Date.now());
      order.paymentResult = {
        paymentId: request.body.id,
        status: request.body.status,
        update_time: request.body.update_time,
        email_address: request.body.email_address,
      };
      const updatedOrder = await order.save();

      response.send({
        order: updatedOrder,
        message: "Order Paid Successfully",
      });
    } else {
      response.status(404).json({ message: "Order Not Found" });
    }
  });
}
