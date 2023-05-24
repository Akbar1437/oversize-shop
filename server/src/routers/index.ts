import * as express from "express";
import { authUserMiddleware } from "../middleware/authUser";
import { authAdminMiddleware } from "../middleware/authAdmin";
import {
  UpdateUserController,
  createOrderController,
  getByNameController,
  getBySlugController,
  getCategoriesController,
  getOrderController,
  getPaypalKeyController,
  getProductsController,
  getUserByIdController,
  getUsersController,
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
router.post("/order", authUserMiddleware, createOrderController);

router.put("/order/:id/pay", authUserMiddleware, orderPayController);
router.put("/profile", authUserMiddleware, userProfileController);

router.get(
  "/users",
  authUserMiddleware,
  authAdminMiddleware,
  getUsersController
);

router.get("/details-user/:id", getUserByIdController);
router.get(
  "/update-user/:id",
  authUserMiddleware,
  authAdminMiddleware,
  UpdateUserController
);

router.get("/keys/paypal", getPaypalKeyController);
router.get("/order/mine", authUserMiddleware, userOrdersController);
router.get("/order/:id", authUserMiddleware, getOrderController);
router.get("/products", getProductsController);
router.get("/categories", getCategoriesController);
router.get("/slug/:slug", getBySlugController);
router.get("/search/:query", getByNameController);
router.get("/seed", seedController);
