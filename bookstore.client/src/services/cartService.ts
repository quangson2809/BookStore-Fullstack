import axios, { AxiosError } from 'axios';

const API_BASE_URL = 'http://localhost:5121/api';

export interface CartItem {
  id: number;
  imageLink: string | null;
  name: string;
  author: string | null;
  salePrice: number;
  quantity: number;
  totalAmount: number;
}

export interface CartDetail {
  totalPrice: number;
  items: CartItem[];
}

export interface AddToCartRequest {
  quantity: number;
}

export interface UpdateCartRequest {
  quantity: number;
}

export const cartService = {
  // Get cart details
  getCart: async (cartId: number): Promise<CartDetail> => {
    try {
      const response = await axios.get<CartDetail>(`${API_BASE_URL}/Cart/${cartId}`);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error('Error fetching cart:', axiosError.message);
      throw error;
    }
  },

  // Add book to cart
  addToCart: async (cartId: number, bookId: number, quantity: number): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/Cart/${cartId}/adding/${bookId}`,
        { quantity }
      );
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error('Error adding to cart:', axiosError.message);
      throw error;
    }
  },

  // Update cart item quantity
  updateCartItem: async (cartId: number, bookId: number, quantity: number): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/Cart/${cartId}/updating/${bookId}`,
        { quantity }
      );
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error('Error updating cart:', axiosError.message);
      throw error;
    }
  },

  // Remove item from cart
  removeFromCart: async (cartId: number, bookId: number): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/Cart/${cartId}/deleting/${bookId}`);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error('Error removing from cart:', axiosError.message);
      throw error;
    }
  },
};