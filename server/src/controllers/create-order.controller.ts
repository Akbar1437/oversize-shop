import { Request, Response } from "express";
import { OrderModel } from "../models/order.model";
import { Product } from "../models/product.model";
import { handler } from "../utils/utils";

export async function createOrderController(
  request: Request,
  response: Response
) {
  handler(request, response, async () => {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    } = request.body;
    if (orderItems.length === 0) {
      response.status(400).json({ message: "Cart is empty" });
    } else {
      const createdOrder = await OrderModel.create({
        orderItems: orderItems.map((orderItem: Product) => ({
          ...orderItem,
          product: orderItem._id,
        })),
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
        user: request.user._id,
      });
      response
        .status(201)
        .json({ message: "Order Created", order: createdOrder });
    }
  });
}
