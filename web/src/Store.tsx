import React, {
  Dispatch,
  PropsWithChildren,
  Reducer,
  createContext,
  useReducer,
} from "react";
import { CartItemType, CartType } from "./types/Cart";

type AppState = {
  mode: string;
  cart: CartType;
};

const initialState: AppState = {
  mode: localStorage.getItem("mode")
    ? localStorage.getItem("mode")!
    : window.matchMedia &&
      window.matchMedia("(prefers-color-scheme:dark)").matches
    ? "dark"
    : "light",

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
    shippingPrice: 0,
    itemsPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
  },
};

type Action =
  | { type: "SWITCH_MODE" }
  | { type: "CART_ADD_ITEM"; payload: CartItemType }
  | { type: "CART_REMOVE_ITEM"; payload: CartItemType };

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "SWITCH_MODE":
      return { ...state, mode: state.mode === "dark" ? "light" : "dark" };

    case "CART_ADD_ITEM":
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (cardItem) => cardItem._id === newItem._id
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item._id === existItem._id ? newItem : item
          )
        : [...state.cart.cartItems, newItem];

      localStorage.setItem("cartItems", JSON.stringify(cartItems));

      return { ...state, cart: { ...state.cart, cartItems } };

    case "CART_REMOVE_ITEM": {
      const cartItems = state.cart.cartItems.filter(
        (cardItem) => cardItem._id !== action.payload._id
      );

      localStorage.setItem("cartItems", JSON.stringify(cartItems));

      return { ...state, cart: { ...state.cart, cartItems } };
    }

    default:
      return state;
  }
}

const defaultDispatch: Dispatch<Action> = () => initialState;

const Store = createContext({
  state: initialState,
  dispatch: defaultDispatch,
});

function StoreProvider(props: PropsWithChildren<{}>) {
  const [state, dispatch] = useReducer<Reducer<AppState, Action>>(
    reducer,
    initialState
  );

  return <Store.Provider value={{ state, dispatch }} {...props} />;
}

export { Store, StoreProvider };
