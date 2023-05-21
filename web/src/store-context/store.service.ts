import { CartItemType } from "../types/Cart";
import { ActionType, AppStateType } from "./store.context";

export function reducer(state: AppStateType, action: ActionType): AppStateType {
  switch (action.type) {
    // ---------------------------------------------------------------------------
    // SWITCH_MODE
    // ---------------------------------------------------------------------------

    case "SWITCH_MODE":
      localStorage.setItem("mode", state.mode === "dark" ? "light" : "dark");
      return { ...state, mode: state.mode === "dark" ? "light" : "dark" };

    // ---------------------------------------------------------------------------
    // CART_ADD_ITEM
    // ---------------------------------------------------------------------------

    case "CART_ADD_ITEM":
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item: CartItemType) => item._id === newItem._id
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item: CartItemType) =>
            item._id === existItem._id ? newItem : item
          )
        : [...state.cart.cartItems, newItem];

      localStorage.setItem("cartItems", JSON.stringify(cartItems));

      return { ...state, cart: { ...state.cart, cartItems } };

    // ---------------------------------------------------------------------------
    // CART_REMOVE_ITEM
    // ---------------------------------------------------------------------------

    case "CART_REMOVE_ITEM": {
      const cartItems = state.cart.cartItems.filter(
        (item: CartItemType) => item._id !== action.payload._id
      );
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    // ---------------------------------------------------------------------------
    // CART_CLEAR
    // ---------------------------------------------------------------------------

    case "CART_CLEAR":
      return { ...state, cart: { ...state.cart, cartItems: [] } };

    // ---------------------------------------------------------------------------
    // USER_SIGNIN
    // ---------------------------------------------------------------------------

    case "USER_SIGNIN":
      return { ...state, userInfo: action.payload };

    // ---------------------------------------------------------------------------
    // USER_SIGNOUT
    // ---------------------------------------------------------------------------

    case "USER_SIGNOUT":
      return {
        ...state,
        mode:
          window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light",
        cart: {
          cartItems: [],
          paymentMethod: "PayPal",
          shippingAddress: {
            fullName: "",
            address: "",
            postalCode: "",
            city: "",
            country: "",
          },
          itemsPrice: 0,
          shippingPrice: 0,
          taxPrice: 0,
          totalPrice: 0,
        },
      };

    // ---------------------------------------------------------------------------
    // SAVE_SHIPPING_ADDRESS
    // ---------------------------------------------------------------------------

    case "SAVE_SHIPPING_ADDRESS":
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress: action.payload,
        },
      };

    // ---------------------------------------------------------------------------
    // SAVE_PAYMENT_METHOD
    // ---------------------------------------------------------------------------

    case "SAVE_PAYMENT_METHOD":
      return {
        ...state,
        cart: { ...state.cart, paymentMethod: action.payload },
      };

    case "SET_FULLBOX_ON":
      return { ...state, fullBox: true };
    case "SET_FULLBOX_OFF":
      return { ...state, fullBox: false };

    // ---------------------------------------------------------------------------
    // default
    // ---------------------------------------------------------------------------

    default:
      return state;
  }
}
