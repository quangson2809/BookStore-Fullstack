import { createContext, useContext, useReducer } from 'react';
import type { ReactNode } from 'react';
import type { Book, CartItem } from '../types/Book';

interface CartState {
  items: CartItem[];
  total: number;
}

interface CartContextType {
  state: CartState;
  addToCart: (book: Book) => void;
  removeFromCart: (bookId: number) => void;
  updateQuantity: (bookId: number, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

type CartAction =
  | { type: 'ADD_TO_CART'; payload: Book }
  | { type: 'REMOVE_FROM_CART'; payload: number }
  | { type: 'UPDATE_QUANTITY'; payload: { bookId: number; quantity: number } }
  | { type: 'CLEAR_CART' };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.items.find(item => item.book.id === action.payload.id);
      if (existingItem) {
        const updatedItems = state.items.map(item =>
          item.book.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return {
          items: updatedItems,
          total: calculateTotal(updatedItems)
        };
      }
      const newItems = [...state.items, { book: action.payload, quantity: 1 }];
      return {
        items: newItems,
        total: calculateTotal(newItems)
      };
    }

    case 'REMOVE_FROM_CART': {
      const filteredItems = state.items.filter(item => item.book.id !== action.payload);
      return {
        items: filteredItems,
        total: calculateTotal(filteredItems)
      };
    }

    case 'UPDATE_QUANTITY': {
      const updatedItems = state.items.map(item =>
        item.book.id === action.payload.bookId
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      return {
        items: updatedItems,
        total: calculateTotal(updatedItems)
      };
    }

    case 'CLEAR_CART':
      return { items: [], total: 0 };

    default:
      return state;
  }
}

function calculateTotal(items: CartItem[]): number {
  return items.reduce((total, item) => total + (item.book.price * item.quantity), 0);
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 });

  const addToCart = (book: Book) => {
    dispatch({ type: 'ADD_TO_CART', payload: book });
  };

  const removeFromCart = (bookId: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: bookId });
  };

  const updateQuantity = (bookId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(bookId);
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { bookId, quantity } });
    }
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider value={{ state, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}