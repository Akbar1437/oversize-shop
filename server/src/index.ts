import * as cors from "cors";
import * as dotenv from "dotenv";
import * as express from "express";
import mongoose from "mongoose";
import { router } from "./routers";
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/oversize";
mongoose.set("strictQuery", true);
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch(() => {
    console.log("error mongodb");
  });

const PORT = 4000;
const app = express();

app.use(cors({ credentials: true, origin: "http://127.0.0.1:5173" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
