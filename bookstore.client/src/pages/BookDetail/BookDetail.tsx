import { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
// import Header from '../../components/Header'; // ← XÓA DÒNG NÀY
import BookDetailComponent from '../../components/BookDetail';
import type { Book } from '../../types/Book';
import './BookDetail.css';

// Mock data cho test
const mockBooks: Book[] = [
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
    title: "Bến Không Chồng",
    author: "Dương Hương",
    price: 92000,
    originalPrice: 115000,
    description: "Tiểu thuyết về cuộc sống phụ nữ",
    category: "Văn học",
    imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
    isbn: "978-604-2-12349-0",
    publishedDate: "1999-01-01",
    stock: 22,
    rating: 4.5,
    publisher: "NXB Phụ nữ",
    reviewCount: 950,
    isNew: false,
    isBestseller: false
  },
  {
    id: 10,
    title: "Lão Hạc",
    author: "Nam Cao",
    price: 55000,
    description: "Truyện ngắn kinh điển",
    category: "Văn học",
    imageUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop",
    isbn: "978-604-2-12350-6",
    publishedDate: "1943-01-01",
    stock: 40,
    rating: 4.6,
    publisher: "NXB Văn học",
    reviewCount: 1200,
    isNew: false,
    isBestseller: false
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
    isBestseller: false
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
  }
];

const BookDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [relatedBooks, setRelatedBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    // Simulate API call
    const fetchBook = async () => {
      try {
        // Simulate loading time
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const foundBook = mockBooks.find(b => b.id === parseInt(id));
        
        if (foundBook) {
          setBook(foundBook);
          
          // Get related books from same category
          let related = mockBooks.filter(
            b => b.id !== foundBook.id && b.category === foundBook.category
          );
          
          // Nếu không có đủ sách cùng category, lấy thêm sách khác
          if (related.length < 8) {
            const otherBooks = mockBooks.filter(
              b => b.id !== foundBook.id && b.category !== foundBook.category
            );
            related = [...related, ...otherBooks].slice(0, 8);
          }
          
          setRelatedBooks(related);
        }
      } catch (error) {
        console.error('Error fetching book:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) {
    return (
      <div className="book-detail-page">
        {/* XÓA: <Header /> */}
        <div className="container">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Đang tải thông tin sách...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="book-detail-page">
        {/* XÓA: <Header /> */}
        <div className="container">
          <div className="not-found">
            <h1>Không tìm thấy sách</h1>
            <p>Sách bạn đang tìm kiếm không tồn tại.</p>
            <a href="/">Về trang chủ</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="book-detail-page">
      {/* XÓA: <Header /> - Vì đã có trong App.tsx */}
      <BookDetailComponent book={book} relatedBooks={relatedBooks} />
    </div>
  );
};

export default BookDetail;