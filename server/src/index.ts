import * as cors from "cors";
import * as dotenv from "dotenv";
import * as express from "express";
import * as path from "path";
import { router } from "./routers";
import mongoose from "mongoose";
import { Config } from "./app/config";
dotenv.config();

const PORT = parseInt((process.env.PORT || "4000") as string, 10);
const app = express();
const MONGODB_URI = Config.mongoDB_URL;

app.use(cors({ credentials: true, origin: "http://127.0.0.1:5173" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

app.use(express.static(path.join(__dirname, "../../../web/dist")));
app.get("*", (req: express.Request, res: express.Response) =>
  res.sendFile(path.join(__dirname, "../../../web/dist/index.html"))
);

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
