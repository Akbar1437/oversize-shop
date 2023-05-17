import { Request, Response } from "express";
import { handler } from "../utils/utils";
import { Config } from "../app/config";

export async function getPaypalKeyController(
  request: Request,
  response: Response
) {
  handler(request, response, async () => {
    return { clientId: Config.PAYPAL_CLIENT_ID };
  });
}
