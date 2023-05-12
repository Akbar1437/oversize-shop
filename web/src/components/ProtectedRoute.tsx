import { Navigate, Outlet } from "react-router-dom";
import { useStore } from "../store-context";

export default function ProtectedRoute() {
  const {
    state: { userInfo },
  } = useStore();
  // ---------------------------------------------------------------------------
  if (userInfo) {
    return <Outlet />;
  } else {
    return <Navigate to="/signin" />;
  }
}
