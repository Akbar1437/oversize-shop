import { Request, Response } from "express";

import { OrderModel } from "../models/order.model";
import { Product } from "../models/product.model";
import { handler } from "../utils/utils";

export async function createOrderController(
  request: Request,
  response: Response
) {
  handler(request, response, async () => {
    if (request.body.orderItems.length === 0) {
      response.status(400).json({ message: "Cart is empty" });
    } else {
      const createdOrder = await OrderModel.create({
        orderItems: request.body.orderItems.map((x: Product) => ({
          ...x,
          product: x._id,
        })),
        shippingAddress: request.body.shippingAddress,
        paymentMethod: request.body.paymentMethod,
        itemsPrice: request.body.itemsPrice,
        shippingPrice: request.body.shippingPrice,
        taxPrice: request.body.taxPrice,
        totalPrice: request.body.totalPrice,
        user: request.user._id,
      });
      response
        .status(201)
        .json({ message: "Order Created", order: createdOrder });
    }
  });
}
