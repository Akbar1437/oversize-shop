import { ApiErrorType } from "../types/ApiError";
import { CartItemType } from "../types/Cart";
import { ProductType } from "../types/Product";

export const getError = (error: ApiErrorType) => {
  return error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
};

export const convertProductToCartItem = (
  product: ProductType
): CartItemType => {
  const cartItem: CartItemType = {
    _id: product._id,
    name: product.name,
    slug: product.slug,
    image: product.image,
    price: product.price,
    countInStock: product.countInStock,
    quantity: 1,
  };
  return cartItem;
};
