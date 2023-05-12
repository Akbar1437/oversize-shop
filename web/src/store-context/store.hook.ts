import { useContext } from "react";
import { StoreContext } from "./store.context";

export function useStore() {
  return useContext(StoreContext);
}
