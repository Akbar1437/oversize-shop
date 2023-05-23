import { Navigate, Outlet } from "react-router-dom";
import { useStore } from "../store-context";

export function AdminRoute() {
  const {
    state: { userInfo },
  } = useStore();
  // ---------------------------------------------------------------------------
  if (userInfo && userInfo.isAdmin) {
    return <Outlet />;
  } else {
    return <Navigate to="/signin" />;
  }
}
