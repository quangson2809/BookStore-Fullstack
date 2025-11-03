export interface Book {
    id: number;
    imageLink?: string | null;
    name: string;
    author?: string | null;
    publisher?: string | null;
    salePrice: number;
    originalPrice?: number;
    quantity: number;
    language?: string;

    // Category
    category?: string;
    categoryId?: number | null;

    // Optional fields for frontend display
    description?: string;
    imageUrl?: string;
    isbn?: string;
    publishedDate?: string;
    stock?: number;
    rating?: number;
    reviewCount?: number;
    isNew?: boolean;
    isBestseller?: boolean;

    // Alias for compatibility
    title?: string;
    price?: number;
}

export interface BookDetail {
    imageUrls: string[];
    name: string;
    isbn: string;
    author: string | null;
    publisher: string | null;
    quantity: number;
    salePrice: number;
    originalPrice: number;
    pageNumber: number;
    publicTime: string;
    categoryName: string;
    language: string;
}