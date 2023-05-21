import { Dispatch, createContext } from "react";
import { CartItemType, CartType, ShippingAddressType } from "../types/Cart";
import { UserInfoType } from "../types/UserInfo";

export type AppStateType = {
  mode: string;
  fullBox: boolean;
  cart: CartType;
  userInfo?: UserInfoType;
};

export const initialState: AppStateType = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo")!)
    : null,

  mode: localStorage.getItem("mode")
    ? localStorage.getItem("mode")!
    : window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light",
  fullBox: false,
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems")!)
      : [],
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress")!)
      : {},
    paymentMethod: localStorage.getItem("paymentMethod")
      ? localStorage.getItem("paymentMethod")!
      : "PayPal",
    itemsPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
  },
};

export type ActionType =
  | { type: "SWITCH_MODE" }
  | { type: "SET_FULLBOX_ON" }
  | { type: "SET_FULLBOX_OFF" }
  | { type: "CART_ADD_ITEM"; payload: CartItemType }
  | { type: "CART_REMOVE_ITEM"; payload: CartItemType }
  | { type: "CART_CLEAR" }
  | { type: "USER_SIGNIN"; payload: UserInfoType }
  | { type: "USER_SIGNOUT" }
  | { type: "SAVE_SHIPPING_ADDRESS"; payload: ShippingAddressType }
  | { type: "SAVE_PAYMENT_METHOD"; payload: string };

const defaultDispatch: Dispatch<ActionType> = () => initialState;

// ---------------------------------------------------------------------------
export const StoreContext = createContext<{
  state: AppStateType;
  dispatch: Dispatch<ActionType>;
}>({
  state: initialState,
  dispatch: defaultDispatch,
});
