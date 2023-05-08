import { useMutation, useQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";
import { CartItemType, ShippingAddressType } from "../types/Cart";
import { OrderType } from "../types/Order";

export const useGetOrderDetailsQuery = (id: string) =>
  useQuery({
    queryKey: ["orders", id],
    queryFn: async () =>
      (await apiClient.get<OrderType>(`api/orders/${id}`)).data,
  });

export const useGetPaypalClientIdQuery = () =>
  useQuery({
    queryKey: ["paypal-clientId"],
    queryFn: async () =>
      (await apiClient.get<{ clientId: string }>(`/api/keys/paypal`)).data,
  });

export const usePayOrderMutation = () =>
  useMutation({
    mutationFn: async (details: { orderId: string }) =>
      (
        await apiClient.put<{ message: string; order: OrderType }>(
          `api/orders/${details.orderId}/pay`,
          details
        )
      ).data,
  });

export const useCreateOrderMutation = () =>
  useMutation({
    mutationFn: async (order: {
      orderItems: CartItemType[];
      shippingAddress: ShippingAddressType;
      paymentMethod: string;
      itemsPrice: number;
      shippingPrice: number;
      taxPrice: number;
      totalPrice: number;
    }) =>
      (
        await apiClient.post<{ message: string; order: OrderType }>(
          `api/orders`,
          order
        )
      ).data,
  });

export const useGetOrderHistoryQuery = () =>
  useQuery({
    queryKey: ["order-history"],
    queryFn: async () =>
      (await apiClient.get<OrderType[]>(`/api/orders/mine`)).data,
  });
