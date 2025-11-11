import axios, { AxiosError } from 'axios';

const API_BASE_URL = 'http://localhost:5121/api';

// Response types from API
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

// Request types
export interface CreateOrderRequest {
  fullName: string;
  phone: string;
  address: string;
  email: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
}

export const orderService = {
  // Get all orders (Admin)
  getAllOrders: async (): Promise<OrderSummary[]> => {
    try {
      const response = await axios.get<OrderSummary[]>(`${API_BASE_URL}/order/orders`);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error('Error fetching all orders:', axiosError.message);
      throw error;
    }
  },

  // Get orders by user ID
  getOrdersByUserId: async (userId: number): Promise<OrderDetailResponse[]> => {
    try {
      const response = await axios.get<OrderDetailResponse[]>(`${API_BASE_URL}/order/${userId}`);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error('Error fetching user orders:', axiosError.message);
      throw error;
    }
  },

  // Create order from cart
  createOrder: async (cartId: number, orderInfo: CreateOrderRequest): Promise<ApiResponse> => {
    try {
      const response = await axios.post<ApiResponse>(
        `${API_BASE_URL}/Order/Create/${cartId}`,
        orderInfo,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      
      if (axiosError.response?.data) {
        return axiosError.response.data;
      }
      
      throw error;
    }
  },

  // Confirm order (Admin)
  confirmOrder: async (orderId: number): Promise<ApiResponse> => {
    try {
      const response = await axios.patch<ApiResponse>(
        `${API_BASE_URL}/Order/Confirm/${orderId}`
      );
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error('Error confirming order:', axiosError.message);
      throw error;
    }
  },
};
