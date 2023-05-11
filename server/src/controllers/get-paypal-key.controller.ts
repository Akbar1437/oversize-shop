import { Request, Response } from "express";
import { handler } from "../utils/utils";

export async function getPaypalKeyController(
  request: Request,
  response: Response
) {
  handler(request, response, async () => {
    return { clientId: process.env.PAYPAL_CLIENT_ID || "sb" };
  });
}
