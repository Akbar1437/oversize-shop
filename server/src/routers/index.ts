import * as express from "express";
import { authMiddleware } from "../middleware/auth";
import {
  createOrderController,
  getByNameController,
  getBySlugController,
  getCategoriesController,
  getOrderController,
  getPaypalKeyController,
  getProductsController,
  orderPayController,
  seedController,
  userOrdersController,
  userProfileController,
  userSignInOrdersController,
  userSignUpOrdersController,
} from "../controllers";

export const router = express.Router();

router.post("/signin", userSignInOrdersController);
router.post("/signup", userSignUpOrdersController);
router.post("/order", authMiddleware, createOrderController);

router.put("/order/:id/pay", authMiddleware, orderPayController);
router.put("/profile", authMiddleware, userProfileController);

router.get("/keys/paypal", getPaypalKeyController);
router.get("/order/mine", authMiddleware, userOrdersController);
router.get("/order/:id", authMiddleware, getOrderController);
router.get("/products", getProductsController);
router.get("/categories", getCategoriesController);
router.get("/slug/:slug", getBySlugController);
router.get("/search/:query", getByNameController);
router.get("/seed", seedController);
