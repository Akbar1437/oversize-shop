export type CartItemType = {
  image: string | undefined;
  slug: string;
  quantity: number;
  countInStock: number;
  price: number;
  _id: string;
  name: string;
};

export type ShippingAddressType = {
  fullName: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
};

export type CartType = {
  cartItems: CartItemType[];
  shippingAddress: ShippingAddressType;
  paymentMethod: string;
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
};
