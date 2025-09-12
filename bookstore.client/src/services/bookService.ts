import type { Book } from '../types/Book';

// Mock database với nhiều sách để test pagination
let books: Book[] = [
  {
    id: 1,
    title: "Nhà Giả Kim",
    author: "Paulo Coelho",
    price: 89000,
    originalPrice: 120000,
    description: "Cuốn tiểu thuyết nổi tiếng về hành trình tìm kiếm kho báu của cậu bé chăn cừu Santiago.",
    category: "Văn học",
    imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop",
    isbn: "978-0-06-112241-5",
    publishedDate: "1988-01-01",
    stock: 25,
    rating: 4.8,
    publisher: "HarperCollins",
    reviewCount: 1250,
    isNew: false,
    isBestseller: true
  },
  {
    id: 2,
    title: "Nghĩ Giàu Làm Giàu",
    author: "Napoleon Hill",
    price: 125000,
    originalPrice: 180000,
    description: "Cuốn sách kinh điển về tư duy làm giàu và thành công.",
    category: "Kinh tế",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
    isbn: "978-1-58542-433-7",
    publishedDate: "1937-01-01",
    stock: 30,
    rating: 4.5,
    publisher: "The Ralston Society",
    reviewCount: 890,
    isNew: false,
    isBestseller: true
  },
  {
    id: 3,
    title: "Lập Trình Python",
    author: "Nguyễn Văn A",
    price: 145000,
    originalPrice: 200000,
    description: "Hướng dẫn học lập trình Python từ cơ bản đến nâng cao.",
    category: "Công nghệ",
    imageUrl: "https://images.unsplash.com/photo-1518932945647-7a1c969f8be2?w=300&h=400&fit=crop",
    isbn: "978-0-13-444432-1",
    publishedDate: "2023-01-01",
    stock: 20,
    rating: 4.3,
    publisher: "NXB Thông tin và Truyền thông",
    reviewCount: 456,
    isNew: true,
    isBestseller: false
  },
  {
    id: 4,
    title: "Số Đỏ",
    author: "Vũ Trọng Phụng",
    price: 75000,
    originalPrice: 95000,
    description: "Tiểu thuyết kinh điển của văn học Việt Nam",
    category: "Văn học",
    imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
    isbn: "978-604-2-12345-6",
    publishedDate: "1936-01-01",
    stock: 18,
    rating: 4.6,
    publisher: "NXB Văn học",
    reviewCount: 890,
    isNew: false,
    isBestseller: true
  },
  {
    id: 5,
    title: "Dế Mèn Phiêu Lưu Ký",
    author: "Tô Hoài",
    price: 65000,
    description: "Tác phẩm văn học thiếu nhi nổi tiếng",
    category: "Văn học",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
    isbn: "978-604-2-12346-7",
    publishedDate: "1941-01-01",
    stock: 30,
    rating: 4.7,
    publisher: "NXB Kim Đồng",
    reviewCount: 1100,
    isNew: false,
    isBestseller: false
  },
  {
    id: 6,
    title: "Chiến Tranh và Hòa Bình",
    author: "Leo Tolstoy",
    price: 195000,
    originalPrice: 250000,
    description: "Kiệt tác văn học thế giới",
    category: "Văn học",
    imageUrl: "https://images.unsplash.com/photo-1518932945647-7a1c969f8be2?w=300&h=400&fit=crop",
    isbn: "978-0-14-044793-4",
    publishedDate: "1869-01-01",
    stock: 12,
    rating: 4.9,
    publisher: "NXB Hội Nhà văn",
    reviewCount: 2500,
    isNew: false,
    isBestseller: true
  },
  {
    id: 7,
    title: "Tôi Thấy Hoa Vàng Trên Cỏ Xanh",
    author: "Nguyễn Nhật Ánh",
    price: 85000,
    description: "Tiểu thuyết về tuổi thơ miền quê",
    category: "Văn học",
    imageUrl: "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=300&h=400&fit=crop",
    isbn: "978-604-2-12347-8",
    publishedDate: "2010-01-01",
    stock: 45,
    rating: 4.8,
    publisher: "NXB Trẻ",
    reviewCount: 1800,
    isNew: true,
    isBestseller: true
  },
  {
    id: 8,
    title: "Mắt Biếc",
    author: "Nguyễn Nhật Ánh",
    price: 78000,
    description: "Câu chuyện tình yêu đầu đời",
    category: "Văn học",
    imageUrl: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=400&fit=crop",
    isbn: "978-604-2-12348-9",
    publishedDate: "1990-01-01",
    stock: 35,
    rating: 4.7,
    publisher: "NXB Trẻ",
    reviewCount: 1600,
    isNew: false,
    isBestseller: true
  },
  {
    id: 9,
    title: "JavaScript cho Người Mới Bắt Đầu",
    author: "Trần Văn B",
    price: 135000,
    description: "Học JavaScript một cách dễ dàng và hiệu quả",
    category: "Công nghệ",
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=400&fit=crop",
    isbn: "978-0-13-444433-2",
    publishedDate: "2023-03-01",
    stock: 15,
    rating: 4.2,
    publisher: "NXB Khoa học và Kỹ thuật",
    reviewCount: 320,
    isNew: true,
    isBestseller: false
  },
  {
    id: 10,
    title: "Dạy Con Làm Giàu",
    author: "Robert Kiyosaki",
    price: 115000,
    originalPrice: 150000,
    description: "Bí quyết giáo dục tài chính cho trẻ em",
    category: "Kinh tế",
    imageUrl: "https://images.unsplash.com/photo-1518932945647-7a1c969f8be2?w=300&h=400&fit=crop",
    isbn: "978-1-58542-434-8",
    publishedDate: "1997-01-01",
    stock: 20,
    rating: 4.4,
    publisher: "Plata Publishing",
    reviewCount: 750,
    isNew: false,
    isBestseller: true
  },
  // Thêm nhiều sách để test pagination
  {
    id: 11,
    title: "Clean Code",
    author: "Robert C. Martin",
    price: 189000,
    originalPrice: 220000,
    description: "Hướng dẫn viết code sạch và dễ bảo trì",
    category: "Công nghệ",
    imageUrl: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=300&h=400&fit=crop",
    isbn: "978-0-13-235088-4",
    publishedDate: "2008-08-01",
    stock: 28,
    rating: 4.6,
    publisher: "Prentice Hall",
    reviewCount: 1850,
    isNew: false,
    isBestseller: true
  },
  {
    id: 12,
    title: "Atomic Habits",
    author: "James Clear",
    price: 159000,
    originalPrice: 199000,
    description: "Cách xây dựng thói quen tốt và bỏ thói quen xấu",
    category: "Tâm lý",
    imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop",
    isbn: "978-0-73-521129-2",
    publishedDate: "2018-10-16",
    stock: 35,
    rating: 4.7,
    publisher: "Avery",
    reviewCount: 2100,
    isNew: false,
    isBestseller: true
  },
  {
    id: 13,
    title: "Sapiens: Lược sử loài người",
    author: "Yuval Noah Harari",
    price: 175000,
    originalPrice: 210000,
    description: "Câu chuyện về sự tiến hóa của loài người",
    category: "Lịch sử",
    imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
    isbn: "978-0-06-231609-7",
    publishedDate: "2011-01-01",
    stock: 22,
    rating: 4.5,
    publisher: "Harper",
    reviewCount: 3200,
    isNew: false,
    isBestseller: true
  },
  {
    id: 14,
    title: "Tâm lý học tội phạm",
    author: "Nguyễn Thị C",
    price: 95000,
    description: "Phân tích tâm lý tội phạm và hành vi bất thường",
    category: "Tâm lý",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
    isbn: "978-604-2-15678-9",
    publishedDate: "2022-05-15",
    stock: 18,
    rating: 4.3,
    publisher: "NXB Tâm lý học",
    reviewCount: 680,
    isNew: true,
    isBestseller: false
  },
  {
    id: 15,
    title: "Lịch sử Việt Nam",
    author: "Trần Trọng Kim",
    price: 128000,
    originalPrice: 155000,
    description: "Tổng quan lịch sử Việt Nam qua các thời kỳ",
    category: "Lịch sử",
    imageUrl: "https://images.unsplash.com/photo-1518932945647-7a1c969f8be2?w=300&h=400&fit=crop",
    isbn: "978-604-2-16789-0",
    publishedDate: "1920-01-01",
    stock: 25,
    rating: 4.8,
    publisher: "NXB Sử học",
    reviewCount: 1500,
    isNew: false,
    isBestseller: true
  },
  {
    id: 16,
    title: "Node.js Design Patterns",
    author: "Mario Casciaro",
    price: 215000,
    originalPrice: 275000,
    description: "Thiết kế pattern cho ứng dụng Node.js",
    category: "Công nghệ",
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=400&fit=crop",
    isbn: "978-1-78-328734-1",
    publishedDate: "2020-07-29",
    stock: 12,
    rating: 4.4,
    publisher: "Packt Publishing",
    reviewCount: 890,
    isNew: true,
    isBestseller: false
  },
  {
    id: 17,
    title: "Doraemon Truyện Dài",
    author: "Fujiko F. Fujio",
    price: 45000,
    description: "Tập truyện dài về chú mèo máy Doraemon",
    category: "Thiếu nhi",
    imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop",
    isbn: "978-604-2-17890-1",
    publishedDate: "1979-01-01",
    stock: 50,
    rating: 4.9,
    publisher: "NXB Kim Đồng",
    reviewCount: 5000,
    isNew: false,
    isBestseller: true
  },
  {
    id: 18,
    title: "The Art of War",
    author: "Sun Tzu",
    price: 89000,
    originalPrice: 110000,
    description: "Binh pháp cổ điển về chiến lược và chiến thuật",
    category: "Lịch sử",
    imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
    isbn: "978-0-14-044772-9",
    publishedDate: "500-01-01",
    stock: 30,
    rating: 4.6,
    publisher: "Penguin Classics",
    reviewCount: 2800,
    isNew: false,
    isBestseller: true
  },
  {
    id: 19,
    title: "Tư duy nhanh và chậm",
    author: "Daniel Kahneman",
    price: 195000,
    originalPrice: 240000,
    description: "Khám phá cách bộ não con người ra quyết định",
    category: "Tâm lý",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
    isbn: "978-0-37-437563-7",
    publishedDate: "2011-10-25",
    stock: 20,
    rating: 4.5,
    publisher: "Farrar, Straus and Giroux",
    reviewCount: 1950,
    isNew: false,
    isBestseller: true
  },
  {
    id: 20,
    title: "Làm chủ cảm xúc",
    author: "Lê Văn D",
    price: 85000,
    description: "Hướng dẫn quản lý và kiểm soát cảm xúc",
    category: "Tâm lý",
    imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop",
    isbn: "978-604-2-18901-2",
    publishedDate: "2023-01-20",
    stock: 40,
    rating: 4.2,
    publisher: "NXB Tâm lý học",
    reviewCount: 720,
    isNew: true,
    isBestseller: false
  },
  {
    id: 21,
    title: "React.js Complete Guide",
    author: "Maximilian Schwarzmüller",
    price: 245000,
    originalPrice: 295000,
    description: "Hướng dẫn học React.js từ cơ bản đến nâng cao",
    category: "Công nghệ",
    imageUrl: "https://images.unsplash.com/photo-1518932945647-7a1c969f8be2?w=300&h=400&fit=crop",
    isbn: "978-1-78-934567-8",
    publishedDate: "2023-02-15",
    stock: 15,
    rating: 4.7,
    publisher: "Packt Publishing",
    reviewCount: 1200,
    isNew: true,
    isBestseller: true
  },
  {
    id: 22,
    title: "Kinh tế học vĩ mô",
    author: "Paul Krugman",
    price: 165000,
    originalPrice: 200000,
    description: "Nguyên lý kinh tế học vĩ mô hiện đại",
    category: "Kinh tế",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
    isbn: "978-1-42-922789-3",
    publishedDate: "2019-08-12",
    stock: 25,
    rating: 4.3,
    publisher: "Worth Publishers",
    reviewCount: 980,
    isNew: false,
    isBestseller: false
  },
  {
    id: 23,
    title: "Conan Thám Tử Lừng Danh",
    author: "Gosho Aoyama",
    price: 35000,
    description: "Truyện trinh thám về thám tử nhỏ tuổi Conan",
    category: "Thiếu nhi",
    imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
    isbn: "978-604-2-19012-3",
    publishedDate: "1994-01-01",
    stock: 60,
    rating: 4.8,
    publisher: "NXB Kim Đồng",
    reviewCount: 4500,
    isNew: false,
    isBestseller: true
  },
  {
    id: 24,
    title: "Machine Learning Cơ Bản",
    author: "Vũ Hữu Tiệp",
    price: 195000,
    originalPrice: 245000,
    description: "Giới thiệu machine learning từ cơ bản",
    category: "Công nghệ",
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=400&fit=crop",
    isbn: "978-604-2-20123-4",
    publishedDate: "2022-11-10",
    stock: 18,
    rating: 4.5,
    publisher: "NXB Khoa học và Kỹ thuật",
    reviewCount: 850,
    isNew: true,
    isBestseller: true
  },
  {
    id: 25,
    title: "Đầu tư chứng khoán",
    author: "Warren Buffett",
    price: 155000,
    originalPrice: 185000,
    description: "Bí quyết đầu tư chứng khoán thành công",
    category: "Kinh tế",
    imageUrl: "https://images.unsplash.com/photo-1518932945647-7a1c969f8be2?w=300&h=400&fit=crop",
    isbn: "978-0-07-166977-7",
    publishedDate: "2008-03-17",
    stock: 32,
    rating: 4.6,
    publisher: "McGraw-Hill",
    reviewCount: 1680,
    isNew: false,
    isBestseller: true
  }
];

let nextId = Math.max(...books.map(b => b.id)) + 1;

export interface BookFormData {
  title: string;
  author: string;
  price: number;
  originalPrice?: number;
  description: string;
  category: string;
  imageUrl: string;
  isbn: string;
  publishedDate: string;
  stock: number;
  publisher: string;
  isNew?: boolean;
  isBestseller?: boolean;
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
  sortBy?: 'title' | 'price' | 'rating' | 'publishedDate';
  sortOrder?: 'asc' | 'desc';
}

export const bookService = {
  // Get all books
  getAllBooks: async (): Promise<Book[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...books];
  },

  // Get books with pagination
  getBooks: async (query: BookQuery = {}): Promise<PaginatedResponse<Book>> => {
    await new Promise(resolve => setTimeout(resolve, 300));

    const {
      page = 1,
      limit = 5, // Giảm xuống 5 để test pagination tốt hơn
      search = '',
      category = '',
      sortBy = 'id',
      sortOrder = 'desc'
    } = query;

    let filteredBooks = [...books];

    // Filter by search
    if (search) {
      const lowercaseQuery = search.toLowerCase();
      filteredBooks = filteredBooks.filter(book =>
        book.title.toLowerCase().includes(lowercaseQuery) ||
        book.author.toLowerCase().includes(lowercaseQuery) ||
        book.description.toLowerCase().includes(lowercaseQuery) ||
        book.category.toLowerCase().includes(lowercaseQuery)
      );
    }

    // Filter by category
    if (category) {
      filteredBooks = filteredBooks.filter(book =>
        book.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Sort
    filteredBooks.sort((a, b) => {
      let aValue: any = a[sortBy as keyof Book];
      let bValue: any = b[sortBy as keyof Book];

      if (sortBy === 'publishedDate') {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    // Pagination
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
  },

  // Get books by category
  getBooksByCategory: async (category: string): Promise<Book[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return books.filter(book => 
      book.category.toLowerCase() === category.toLowerCase()
    );
  },

  // Get book by ID
  getBookById: async (id: number): Promise<Book | null> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return books.find(book => book.id === id) || null;
  },

  // Add new book
  addBook: async (bookData: BookFormData): Promise<Book> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newBook: Book = {
      id: nextId++,
      ...bookData,
      rating: 0,
      reviewCount: 0,
      isNew: bookData.isNew || true,
      isBestseller: bookData.isBestseller || false
    };

    books.unshift(newBook); // Add to beginning forNewest first
    return newBook;
  },

  // Update book
  updateBook: async (id: number, bookData: Partial<BookFormData>): Promise<Book | null> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const index = books.findIndex(book => book.id === id);
    if (index === -1) return null;

    books[index] = { ...books[index], ...bookData };
    return books[index];
  },

  // Delete book
  deleteBook: async (id: number): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const index = books.findIndex(book => book.id === id);
    if (index === -1) return false;

    books.splice(index, 1);
    return true;
  },

  // Search books
  searchBooks: async (query: string): Promise<Book[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const lowercaseQuery = query.toLowerCase();
    return books.filter(book =>
      book.title.toLowerCase().includes(lowercaseQuery) ||
      book.author.toLowerCase().includes(lowercaseQuery) ||
      book.description.toLowerCase().includes(lowercaseQuery) ||
      book.category.toLowerCase().includes(lowercaseQuery)
    );
  }
};