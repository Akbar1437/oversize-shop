import { Request, Response } from "express";
import * as asyncHandler from "express-async-handler";
import { OrderModel } from "../models/order.model";

export async function orderPayController() {
  asyncHandler(async (req: Request, res: Response) => {
    const order = await OrderModel.findById(req.params.id);

    if (order) {
      order.isPaid = true;
      order.paidAt = new Date(Date.now());
      order.paymentResult = {
        paymentId: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };
      const updatedOrder = await order.save();

      res.send({ order: updatedOrder, message: "Order Paid Successfully" });
    } else {
      res.status(404).json({ message: "Order Not Found" });
    }
  });
}
