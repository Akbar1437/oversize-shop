import { CartItemType, ShippingAddressType } from "./Cart";
import { UserType } from "./User";

export type OrderType = {
  _id: string;
  orderItems: CartItemType[];
  shippingAddress: ShippingAddressType;
  paymentMethod: string;
  user: UserType;
  createdAt: string;
  isPaid: boolean;
  paidAt: string;
  isDelivered: boolean;
  deliveredAt: string;
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
};
