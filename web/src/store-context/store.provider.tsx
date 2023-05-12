import { PropsWithChildren, Reducer, useReducer } from "react";
import {
  ActionType,
  AppStateType,
  StoreContext,
  initialState,
} from "./store.context";
import { reducer } from "./store.service";

export function StoreProvider(props: PropsWithChildren<{}>) {
  // ---------------------------------------------------------------------------
  // variables
  // ---------------------------------------------------------------------------

  const [state, dispatch] = useReducer<Reducer<AppStateType, ActionType>>(
    reducer,
    initialState
  );

  // ---------------------------------------------------------------------------
  return <StoreContext.Provider value={{ state, dispatch }} {...props} />;
}
