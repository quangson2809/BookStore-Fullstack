import axios, { AxiosError } from 'axios';
import type { Book, BookDetail } from '../types/Book';

const API_BASE_URL = 'http://localhost:5121/api';

// Helper function to build full image URL
const buildImageUrl = (imageUrl: string | null | undefined): string => {
    if (!imageUrl) return 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop';
    if (imageUrl.startsWith('http')) return imageUrl;
    return `http://localhost:5121${imageUrl}`;
};

// Interface cho dữ liệu từ API backend
interface ApiBook {
    id: number;
    imageLink?: string | null;
    name: string;
    category?: string | null;
    author?: string | null;
    publisher?: string | null;
    salePrice: number;
    originalPrice?: number | null;
    quantity: number;
    language?: string | null;
}

interface ApiBookDetail {
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

export interface BookFormData {
    name: string;
    isbn: string;
    author: string;
    publisher: string;
    quantity: number;
    salePrice: number;
    originalPrice: number;
    pageNumber: number;
    publishTime: string;
    categoryId: number;
    language: string;
    images?: File[];
}

export interface BookUpdateFormData extends Partial<BookFormData> {
    existingImageUrls?: string[];
}

export interface PaginatedResponse<T> {
    data: T[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
}

export interface BookQuery {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
    sortBy?: 'name' | 'salePrice' | 'originalPrice';
    sortOrder?: 'asc' | 'desc';
}

// Transform API book data to frontend Book format
const transformApiBook = (apiBook: ApiBook): Book => {
    const hasDiscount = apiBook.originalPrice && apiBook.originalPrice > apiBook.salePrice;

    return {
        id: apiBook.id,
        title: apiBook.name,
        name: apiBook.name,
        author: apiBook.author || 'Đang cập nhật',
        publisher: apiBook.publisher || 'Đang cập nhật',
        price: apiBook.salePrice,
        salePrice: apiBook.salePrice,
        originalPrice: apiBook.originalPrice || undefined,
        stock: apiBook.quantity,
        quantity: apiBook.quantity,
        language: apiBook.language || 'Tiếng Việt',
        imageUrl: buildImageUrl(apiBook.imageLink), // ✅ Build full URL
        imageLink: apiBook.imageLink,
        category: apiBook.category || 'Sách',
        description: `${apiBook.name}${apiBook.author ? ` - Tác giả: ${apiBook.author}` : ''}`,
        isbn: '',
        publishedDate: new Date().toISOString(),
        rating: Math.random() * 1 + 4,
        reviewCount: Math.floor(Math.random() * 1000) + 100,
        isNew: apiBook.id > 1000,
        isBestseller: apiBook.quantity > 50 || hasDiscount
    };
};

// Transform API book detail to frontend Book format
const transformApiBookDetail = (apiBookDetail: ApiBookDetail, bookId: number): Book => {
    const hasDiscount = apiBookDetail.originalPrice > apiBookDetail.salePrice;
    const mainImage = apiBookDetail.imageUrls.length > 0 
        ? buildImageUrl(apiBookDetail.imageUrls[0])  // ✅ Build full URL
        : 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&h=800&fit=crop';

    return {
        id: bookId,
        title: apiBookDetail.name,
        name: apiBookDetail.name,
        author: apiBookDetail.author || 'Đang cập nhật',
        publisher: apiBookDetail.publisher || 'Đang cập nhật',
        price: apiBookDetail.salePrice,
        salePrice: apiBookDetail.salePrice,
        originalPrice: apiBookDetail.originalPrice,
        stock: apiBookDetail.quantity,
        quantity: apiBookDetail.quantity,
        language: apiBookDetail.language,
        imageUrl: mainImage,
        imageLink: mainImage,
        category: apiBookDetail.categoryName,
        isbn: apiBookDetail.isbn,
        publishedDate: apiBookDetail.publicTime,
        description: `${apiBookDetail.name} - Một tác phẩm xuất sắc thuộc thể loại ${apiBookDetail.categoryName}. ${apiBookDetail.author ? `Tác giả: ${apiBookDetail.author}.` : ''} ${apiBookDetail.publisher ? `Nhà xuất bản: ${apiBookDetail.publisher}.` : ''} Cuốn sách có ${apiBookDetail.pageNumber} trang, được viết bằng ${apiBookDetail.language}.`,
        rating: Math.random() * 1 + 4,
        reviewCount: Math.floor(Math.random() * 1000) + 100,
        isNew: new Date(apiBookDetail.publicTime).getFullYear() >= new Date().getFullYear() - 1,
        isBestseller: apiBookDetail.quantity > 50 || hasDiscount
    };
};

export const bookService = {
    // Get all books from API
    getAllBooks: async (): Promise<Book[]> => {
        try {
            const response = await axios.get<ApiBook[]>(`${API_BASE_URL}/Book/books`);
            return response.data.map(transformApiBook);
        } catch (error) {
            const axiosError = error as AxiosError;
            console.error('Error fetching books:', axiosError.message);
            throw error;
        }
    },

    // Get books with pagination and filtering (client-side)
    getBooks: async (query: BookQuery = {}): Promise<PaginatedResponse<Book>> => {
        try {
            const books = await bookService.getAllBooks();

            const {
                page = 1,
                limit = 12,
                search = '',
                category = '',
                sortBy = 'id',
                sortOrder = 'desc'
            } = query;

            let filteredBooks = [...books];

            if (search) {
                const lowercaseQuery = search.toLowerCase();
                filteredBooks = filteredBooks.filter(book =>
                    book.name.toLowerCase().includes(lowercaseQuery) ||
                    book.author?.toLowerCase().includes(lowercaseQuery) ||
                    book.publisher?.toLowerCase().includes(lowercaseQuery)
                );
            }

            if (category) {
                filteredBooks = filteredBooks.filter(book =>
                    book.category?.toLowerCase() === category.toLowerCase()
                );
            }

            filteredBooks.sort((a, b) => {
                let aValue: any = a[sortBy as keyof Book];
                let bValue: any = b[sortBy as keyof Book];

                if (typeof aValue === 'string') {
                    aValue = aValue.toLowerCase();
                    bValue = bValue?.toLowerCase() || '';
                }

                if (sortOrder === 'asc') {
                    return aValue > bValue ? 1 : -1;
                } else {
                    return aValue < bValue ? 1 : -1;
                }
            });

            const totalItems = filteredBooks.length;
            const totalPages = Math.ceil(totalItems / limit);
            const startIndex = (page - 1) * limit;
            const endIndex = startIndex + limit;
            const paginatedBooks = filteredBooks.slice(startIndex, endIndex);

            return {
                data: paginatedBooks,
                currentPage: page,
                totalPages,
                totalItems,
                itemsPerPage: limit
            };
        } catch (error) {
            console.error('Error in getBooks:', error);
            throw error;
        }
    },

    // Get book by ID with full details from API
    getBookById: async (id: number): Promise<Book | null> => {
        try {
            const response = await axios.get<ApiBookDetail>(`${API_BASE_URL}/Book/book/${id}`);
            return transformApiBookDetail(response.data, id);
        } catch (error) {
            const axiosError = error as AxiosError;
            console.error('Error fetching book by ID:', axiosError.message);
            return null;
        }
    },

    // Get book detail (raw API response with full image URLs)
    getBookDetail: async (id: number): Promise<BookDetail | null> => {
        try {
            const response = await axios.get<ApiBookDetail>(`${API_BASE_URL}/Book/book/${id}`);
            // ✅ Transform image URLs to full URLs
            return {
                ...response.data,
                imageUrls: response.data.imageUrls.map(url => buildImageUrl(url))
            };
        } catch (error) {
            const axiosError = error as AxiosError;
            console.error('Error fetching book detail:', axiosError.message);
            return null;
        }
    },

    // Add new book with image upload
    addBook: async (bookData: BookFormData): Promise<Book> => {
        try {
            const formData = new FormData();
            
            formData.append('Name', bookData.name);
            formData.append('ISBN', bookData.isbn);
            formData.append('Author', bookData.author);
            formData.append('Publisher', bookData.publisher);
            formData.append('Quantity', bookData.quantity.toString());
            formData.append('SalePrice', bookData.salePrice.toString());
            formData.append('OriginalPrice', bookData.originalPrice.toString());
            formData.append('PageNumber', bookData.pageNumber.toString());
            formData.append('PublishTime', bookData.publishTime);
            formData.append('CategoryId', bookData.categoryId.toString());
            formData.append('Language', bookData.language);

            if (bookData.images && bookData.images.length > 0) {
                bookData.images.forEach((image) => {
                    formData.append('Images', image);
                });
            }

            const response = await axios.post<ApiBook>(
                `${API_BASE_URL}/book/adding`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            
            return transformApiBook(response.data);
        } catch (error) {
            const axiosError = error as AxiosError;
            console.error('Error adding book:', axiosError.message);
            throw error;
        }
    },

    // Update book with image upload
    updateBook: async (id: number, bookData: BookUpdateFormData): Promise<Book | null> => {
        try {
            const formData = new FormData();

            if (bookData.name) formData.append('Name', bookData.name);
            if (bookData.isbn) formData.append('ISBN', bookData.isbn);
            if (bookData.author) formData.append('Author', bookData.author);
            if (bookData.publisher) formData.append('Publisher', bookData.publisher);
            if (bookData.quantity !== undefined) formData.append('Quantity', bookData.quantity.toString());
            if (bookData.salePrice !== undefined) formData.append('SalePrice', bookData.salePrice.toString());
            if (bookData.originalPrice !== undefined) formData.append('OriginalPrice', bookData.originalPrice.toString());
            if (bookData.pageNumber) formData.append('PageNumber', bookData.pageNumber.toString());
            if (bookData.publishTime) formData.append('PublishTime', bookData.publishTime);
            if (bookData.categoryId) formData.append('CategoryId', bookData.categoryId.toString());
            if (bookData.language) formData.append('Language', bookData.language);

            if (bookData.existingImageUrls && bookData.existingImageUrls.length > 0) {
                bookData.existingImageUrls.forEach((url) => {
                    formData.append('ImageUrlsExit[]', url);
                });
            }

            if (bookData.images && bookData.images.length > 0) {
                bookData.images.forEach((image) => {
                    formData.append('Images', image);
                });
            }

            const response = await axios.patch<ApiBook>(
                `${API_BASE_URL}/book/updating/${id}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            
            return transformApiBook(response.data);
        } catch (error) {
            const axiosError = error as AxiosError;
            console.error('Error updating book:', axiosError.message);
            throw error;
        }
    },

    deleteBook: async (id: number): Promise<boolean> => {
        try {
            await axios.delete(`${API_BASE_URL}/Book/deleting/${id}`);
            return true;
        } catch (error) {
            const axiosError = error as AxiosError;
            console.error('Error deleting book:', axiosError.message);
            return false;
        }
    },

    searchBooks: async (query: string): Promise<Book[]> => {
        try {
            const books = await bookService.getAllBooks();
            const lowercaseQuery = query.toLowerCase();
            return books.filter(book =>
                book.name.toLowerCase().includes(lowercaseQuery) ||
                book.author?.toLowerCase().includes(lowercaseQuery) ||
                book.publisher?.toLowerCase().includes(lowercaseQuery)
            );
        } catch (error) {
            const axiosError = error as AxiosError;
            console.error('Error searching books:', axiosError.message);
            throw error;
        }
    },

    getBooksByCategory: async (categoryName: string): Promise<Book[]> => {
        try {
            const books = await bookService.getAllBooks();
            return books.filter(book =>
                book.category?.toLowerCase() === categoryName.toLowerCase()
            );
        } catch (error) {
            const axiosError = error as AxiosError;
            console.error('Error fetching books by category:', axiosError.message);
            throw error;
        }
    }
};