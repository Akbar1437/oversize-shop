import { useMutation, useQuery } from "@tanstack/react-query";
import apiClient from "../http/apiClient";
import { OrderType } from "../types/Order";
import { CartItemType, ShippingAddressType } from "../types/Cart";

interface IOrders {
  orders: OrderType[];
  pagination: {
    totalCount: number;
    pageCount: number;
  };
}

export const useGetOrderDetailsQuery = (id: string) =>
  useQuery({
    queryKey: ["order", id],
    queryFn: async () =>
      (await apiClient.get<OrderType>(`api/order/${id}`)).data,
  });

export const useGetPaypalClientIdQuery = () =>
  useQuery({
    queryKey: ["paypal-clientId"],
    queryFn: async () =>
      (await apiClient.get<{ clientId: string }>(`api/keys/paypal`)).data,
  });

export const usePayOrderMutation = () =>
  useMutation({
    mutationFn: async (details: { orderId: string }) =>
      (
        await apiClient.put<{ message: string; order: OrderType }>(
          `api/order/${details.orderId}/pay`,
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
          `api/order`,
          order
        )
      ).data,
  });

export const useGetOrderHistoryQuery = () =>
  useQuery({
    queryKey: ["order-history"],
    queryFn: async () =>
      (await apiClient.get<OrderType[]>(`api/order/mine`)).data,
  });

export const useGetOrderSummaryQuery = () =>
  useQuery({
    queryKey: ["orders-summary"],
    queryFn: async () =>
      (
        await apiClient.get<{
          users: [{ numUsers: number }];
          orders: [{ numOrders: number; totalSales: number }];
          dailyOrders: [];
          productCategories: [];
        }>(`api/orders/summary`)
      ).data,
  });

export const useGetOrdersQuery = (page: number) =>
  useQuery({
    queryKey: ["orders", page],
    queryFn: async () =>
      (
        await apiClient.get<IOrders>(`api/orders`, {
          params: { page, limit: 12 },
        })
      ).data,
  });

export const useDeleteOrderMutation = () =>
  useMutation({
    mutationFn: async (orderId: string) =>
      (await apiClient.delete<{ message: string }>(`api/orders/${orderId}`))
        .data,
  });
