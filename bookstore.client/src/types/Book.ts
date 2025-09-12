export interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  originalPrice?: number; // For discount calculation
  description: string;
  category: string;
  imageUrl: string;
  isbn: string;
  publishedDate: string;
  stock: number;
  rating: number;
  publisher: string; // Publisher name
  reviewCount: number; // Number of reviews
  isNew?: boolean;
  isBestseller?: boolean;
}

export interface CartItem {
  book: Book;
  quantity: number;
}