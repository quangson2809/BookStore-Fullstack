import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { cartService, type CartItem } from '../services/cartService';
import type { Book } from '../types/Book';

interface CartState {
  items: CartItemWithBook[];
  total: number;
  cartId: number | null;
  isLoading: boolean;
}

interface CartItemWithBook {
  book: Book;
  quantity: number;
}

type CartAction =
  | { type: 'SET_CART'; payload: { items: CartItemWithBook[]; total: number } }
  | { type: 'SET_CART_ID'; payload: number }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'CLEAR_CART' }
  | { type: 'RESET_ALL' };

const CartContext = createContext<{
  state: CartState;
  addToCart: (book: Book, quantity?: number) => Promise<void>;
  removeFromCart: (bookId: number) => Promise<void>;
  updateQuantity: (bookId: number, quantity: number) => Promise<void>;
  clearCart: () => void;
  loadCart: () => Promise<void>;
  resetCart: () => void;
} | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'SET_CART':
      return {
        ...state,
        items: action.payload.items,
        total: action.payload.total,
        isLoading: false,
      };
    case 'SET_CART_ID':
      return {
        ...state,
        cartId: action.payload,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        total: 0,
      };
    case 'RESET_ALL':
      return {
        items: [],
        total: 0,
        cartId: null,
        isLoading: false,
      };
    default:
      return state;
  }
};

// Transform API CartItem to CartItemWithBook
const transformCartItem = (apiItem: CartItem): CartItemWithBook => {
  return {
    book: {
      id: apiItem.id,
      title: apiItem.name,
      name: apiItem.name,
      author: apiItem.author || 'Đang cập nhật',
      price: apiItem.salePrice,
      salePrice: apiItem.salePrice,
      imageUrl: apiItem.imageLink || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop',
      publisher: 'Đang cập nhật',
      category: 'Sách',
      description: '',
      isbn: '',
      publishedDate: '',
      stock: 100,
      rating: 4.5,
      reviewCount: 0,
    },
    quantity: apiItem.quantity,
  };
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const initialState: CartState = {
    items: [],
    total: 0,
    cartId: null,
    isLoading: false,
  };

  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Get cartId from localStorage on mount
  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const parsed = JSON.parse(userInfo);
      if (parsed.cartId) {
        dispatch({ type: 'SET_CART_ID', payload: parsed.cartId });
      }
    }
  }, []);

  // Load cart when cartId is available
  useEffect(() => {
    if (state.cartId) {
      loadCart();
    }
  }, [state.cartId]);

  const loadCart = async () => {
    if (!state.cartId) return;

    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const cartData = await cartService.getCart(state.cartId);
      
      const transformedItems = cartData.items.map(transformCartItem);

      dispatch({
        type: 'SET_CART',
        payload: {
          items: transformedItems,
          total: cartData.totalPrice,
        },
      });
    } catch (error) {
      console.error('Failed to load cart:', error);
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const addToCart = async (book: Book, quantity: number = 1) => {
    if (!state.cartId) {
      alert('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng');
      return;
    }

    try {
      await cartService.addToCart(state.cartId, book.id, quantity);
      await loadCart();
      alert(`Đã thêm "${book.title}" vào giỏ hàng!`);
    } catch (error) {
      console.error('Failed to add to cart:', error);
      alert('Không thể thêm sản phẩm vào giỏ hàng');
    }
  };

  const removeFromCart = async (bookId: number) => {
    if (!state.cartId) return;

    try {
      await cartService.removeFromCart(state.cartId, bookId);
      await loadCart();
    } catch (error) {
      console.error('Failed to remove from cart:', error);
      alert('Không thể xóa sản phẩm khỏi giỏ hàng');
    }
  };

  const updateQuantity = async (bookId: number, quantity: number) => {
    if (!state.cartId) return;

    if (quantity <= 0) {
      await removeFromCart(bookId);
      return;
    }

    try {
      await cartService.updateCartItem(state.cartId, bookId, quantity);
      await loadCart();
    } catch (error) {
      console.error('Failed to update cart:', error);
      alert('Không thể cập nhật số lượng');
    }
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const resetCart = () => {
    dispatch({ type: 'RESET_ALL' });
  };

  return (
    <CartContext.Provider
      value={{
        state,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        loadCart,
        resetCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};