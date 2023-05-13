import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { StoreProvider } from "./store-context/index.ts";
import { App } from "./App.tsx";
import { HomePage } from "./pages/HomePage.tsx";
import { ProtectedRoute } from "./components/ProtectedRoute.tsx";
import { CartPage } from "./pages/CartPage.tsx";
import { OrderHistoryPage } from "./pages/OrderHistoryPage.tsx";
import { OrderPage } from "./pages/OrderPage.tsx";
import { PaymentMethodPage } from "./pages/PaymentMethodPage.tsx";
import { PlaceOrderPage } from "./pages/PlaceOrderPage.tsx";
import { ProductPage } from "./pages/ProductPage.tsx";
import { ProfilePage } from "./pages/ProfilePage.tsx";
import { ShippingAddressPage } from "./pages/ShippingAddressPage.tsx";
import { SigninPage } from "./pages/SigninPage.tsx";
import { SignupPage } from "./pages/SignupPage.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} element={<HomePage />} />
      <Route path="product/:slug" element={<ProductPage />} />
      <Route path="cart" element={<CartPage />} />
      <Route path="signin" element={<SigninPage />} />
      <Route path="signup" element={<SignupPage />} />

      <Route path="" element={<ProtectedRoute />}>
        <Route path="shipping" element={<ShippingAddressPage />} />
        <Route path="payment" element={<PaymentMethodPage />} />
        <Route path="placeorder" element={<PlaceOrderPage />} />
        <Route path="/order/:id" element={<OrderPage />} />
        <Route path="orderhistory" element={<OrderHistoryPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
    </Route>
  )
);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <StoreProvider>
      <PayPalScriptProvider options={{ "client-id": "sb" }} deferLoading={true}>
        <HelmetProvider>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </HelmetProvider>
      </PayPalScriptProvider>
    </StoreProvider>
  </React.StrictMode>
);
