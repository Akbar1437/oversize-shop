import * as cors from "cors";
import * as dotenv from "dotenv";
import * as express from "express";
import { router } from "./routers";
import mongoose from "mongoose";
dotenv.config();

const PORT = 4000;
const app = express();
const MONGODB_URI = process.env.MONGODB_URI!;

app.use(cors({ credentials: true, origin: "http://127.0.0.1:5175" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

const start = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    app.listen(PORT, () => {
      console.log(`Server started at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

start();
