export const Config = {
  mongoDB_URL:
    process.env.MONGODB_URI ||
    "mongodb+srv://oversizeuser:q5NQE7XAOEcJUC1e@cluster0.dgvd742.mongodb.net/oversizedb?retryWrites=true&w=majority",
  JWT_SECRET: "secret_jwt_key",
  PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID || "sb",
};
