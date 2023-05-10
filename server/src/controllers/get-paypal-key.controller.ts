import { Request, Response } from "express";

export async function getPaypalKeyController(
  request: Request,
  response: Response
) {
  try {
    return response.json({ clientId: process.env.PAYPAL_CLIENT_ID || "sb" });
  } catch (e) {
    console.log(e);
  }
}
