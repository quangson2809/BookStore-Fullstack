// Order types for the application

export interface OrderDetail {
  id: number;
  imageLink: string | null;
  name: string;
  quantity: number;
  totalPrice: number;
}

export interface OrderSummary {
  ordersId: number;
  fullName: string;
  ordersStatus: string;
  createTime: string | null;
  toalPrice: number;
  booknames: string[];
}

export interface OrderDetailResponse {
  ordersId: number;
  ordersStatus: string;
  createTime: string | null;
  fullName: string;
  phone: string;
  address: string;
  email: string;
  toalPrice: number;
  orderDetails: OrderDetail[];
}

export type OrderStatus = 'Pending' | 'Done' | 'Cancelled' | 'Processing' | 'Shipping';

export interface CreateOrderRequest {
  fullName: string;
  phone: string;
  address: string;
  email: string;
}
