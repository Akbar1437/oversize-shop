import * as dotenv from "dotenv";
dotenv.config();

export const Config = {
  mongoDB_URL: process.env.MONGODB_URI!,
  JWT_SECRET: "secret_jwt_key",
  PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID!,
};
