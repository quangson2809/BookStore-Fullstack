import { useState } from 'react';
import { Link } from 'react-router-dom';
import BookCard from '../BookCard';
import type { Book } from '../../types/Book';
import './FeaturedBooksByCategory.css';

// Mock data cho từng category (giữ nguyên...)
const featuredBooksByCategory = {
  "van-hoc": [
    {
      id: 101,
      title: "Tôi Thấy Hoa Vàng Trên Cỏ Xanh",
      author: "Nguyễn Nhật Ánh",
      price: 75000,
      description: "Tác phẩm kinh điển của văn học Việt Nam về tuổi thơ miền quê",
      category: "Văn học",
      imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
      isbn: "978-604-2-12346-7",
      publishedDate: "2022-08-20",
      stock: 32,
      rating: 4.9
    },
    {
      id: 102,
      title: "Mắt Biếc",
      author: "Nguyễn Nhật Ánh",
      price: 68000,
      description: "Câu chuyện tình yêu đầu đời trong sáng và đẹp đẽ",
      category: "Văn học",
      imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop",
      isbn: "978-604-2-12347-8",
      publishedDate: "2023-03-10",
      stock: 28,
      rating: 4.7
    },
    {
      id: 103,
      title: "Dế Mèn Phiêu Lưu Ký",
      author: "Tô Hoài",
      price: 55000,
      description: "Tác phẩm kinh điển dành cho thiếu nhi Việt Nam",
      category: "Văn học",
      imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
      isbn: "978-604-2-12348-9",
      publishedDate: "2022-12-05",
      stock: 67,
      rating: 4.6
    },
    {
      id: 104,
      title: "Số Đỏ",
      author: "Vũ Trọng Phụng",
      price: 82000,
      description: "Tiểu thuyết hiện thực phê phán sâu sắc",
      category: "Văn học",
      imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop",
      isbn: "978-604-2-12349-0",
      publishedDate: "2023-01-15",
      stock: 45,
      rating: 4.5
    }
  ],
  "kinh-te": [
    {
      id: 201,
      title: "Đầu Tư Chứng Khoán Thông Minh",
      author: "Benjamin Graham",
      price: 180000,
      description: "Hướng dẫn đầu tư chứng khoán an toàn và hiệu quả",
      category: "Kinh tế",
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
      isbn: "978-604-2-12350-1",
      publishedDate: "2023-01-08",
      stock: 22,
      rating: 4.7
    },
    {
      id: 202,
      title: "Khởi Nghiệp Tinh Gọn",
      author: "Eric Ries",
      price: 95000,
      description: "Phương pháp khởi nghiệp hiệu quả cho thời đại số",
      category: "Kinh tế",
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
      isbn: "978-604-2-12351-2",
      publishedDate: "2022-11-20",
      stock: 55,
      rating: 4.4
    },
    {
      id: 203,
      title: "Quản Trị Hiệu Quả",
      author: "Peter Drucker",
      price: 110000,
      description: "Những nguyên tắc quản trị cơ bản cho nhà lãnh đạo",
      category: "Kinh tế",
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
      isbn: "978-604-2-12352-3",
      publishedDate: "2023-04-12",
      stock: 41,
      rating: 4.6
    },
    {
      id: 204,
      title: "Tư Duy Nhanh Và Chậm",
      author: "Daniel Kahneman",
      price: 135000,
      description: "Khám phá cách bộ não đưa ra quyết định",
      category: "Kinh tế",
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
      isbn: "978-604-2-12353-4",
      publishedDate: "2023-02-20",
      stock: 38,
      rating: 4.8
    }
  ],
  "cong-nghe": [
    {
      id: 301,
      title: "Trí Tuệ Nhân Tạo Ứng Dụng",
      author: "Trần Thị B",
      price: 165000,
      description: "Khám phá ứng dụng AI trong cuộc sống và công việc",
      category: "Công nghệ",
      imageUrl: "https://images.unsplash.com/photo-1518932945647-7a1c969f8be2?w=300&h=400&fit=crop",
      isbn: "978-604-2-12354-5",
      publishedDate: "2023-03-22",
      stock: 28,
      rating: 4.5
    },
    {
      id: 302,
      title: "Blockchain và Cryptocurrency",
      author: "Lê Văn C",
      price: 135000,
      description: "Hiểu về công nghệ blockchain và tiền điện tử",
      category: "Công nghệ",
      imageUrl: "https://images.unsplash.com/photo-1518932945647-7a1c969f8be2?w=300&h=400&fit=crop",
      isbn: "978-604-2-12355-6",
      publishedDate: "2022-12-18",
      stock: 42,
      rating: 4.2
    },
    {
      id: 303,
      title: "Phát Triển Web Hiện Đại",
      author: "Phạm Văn D",
      price: 155000,
      description: "Xây dựng ứng dụng web với React, Node.js và MongoDB",
      category: "Công nghệ",
      imageUrl: "https://images.unsplash.com/photo-1518932945647-7a1c969f8be2?w=300&h=400&fit=crop",
      isbn: "978-604-2-12356-7",
      publishedDate: "2023-06-10",
      stock: 31,
      rating: 4.4
    },
    {
      id: 304,
      title: "Machine Learning Cơ Bản",
      author: "Nguyễn Văn E",
      price: 175000,
      description: "Nhập môn machine learning và deep learning",
      category: "Công nghệ",
      imageUrl: "https://images.unsplash.com/photo-1518932945647-7a1c969f8be2?w=300&h=400&fit=crop",
      isbn: "978-604-2-12357-8",
      publishedDate: "2023-05-15",
      stock: 25,
      rating: 4.3
    }
  ]
};

interface CategoryFeaturedBooksProps {
  categorySlug: string;
  categoryName: string;
  maxBooks?: number;
}

function CategoryFeaturedBooks({ categorySlug, categoryName, maxBooks = 4 }: CategoryFeaturedBooksProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const books = (featuredBooksByCategory[categorySlug as keyof typeof featuredBooksByCategory] || []).slice(0, maxBooks);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, books.length - 3));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.max(1, books.length - 3)) % Math.max(1, books.length - 3));
  };

  if (books.length === 0) return null;

  return (
    <div className="category-featured-books">
      <div className="category-featured-header">
        <div>
          <h3 className="category-featured-title">{categoryName}</h3>
          <p className="category-featured-subtitle">Những cuốn sách nổi bật nhất trong danh mục</p>
        </div>
        <div className="category-nav-buttons">
          <button 
            className="nav-button" 
            onClick={prevSlide} 
            disabled={books.length <= 4}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15,18 9,12 15,6"></polyline>
            </svg>
          </button>
          <button 
            className="nav-button" 
            onClick={nextSlide} 
            disabled={books.length <= 4}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9,18 15,12 9,6"></polyline>
            </svg>
          </button>
        </div>
      </div>

      <div className="books-slider-container">
        <div
          className="books-slider"
          style={{ transform: `translateX(-${currentIndex * 25}%)` }}
        >
          {books.map((book, index) => (
            <div key={book.id} className="book-slide">
              <BookCard 
                book={book} 
                showDiscount={index % 3 === 0} // Show discount on every 3rd book
                isNew={index % 4 === 1} // Show "Mới bật" on some books
                isBestseller={index % 5 === 2} // Show "Nổi bật" on some books
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const FeaturedBooksByCategory = () => {
  const categories = [
    { slug: "van-hoc", name: "Văn học" },
    { slug: "kinh-te", name: "Kinh tế" },
    { slug: "cong-nghe", name: "Công nghệ" },
  ];

  return (
    <section className="featured-by-category-section">
      <div className="container">
        <div className="section-header">
          <h1 className="main-title">Sách nổi bật theo thể loại</h1>
          <p className="main-subtitle">
            Khám phá những cuốn sách được yêu thích nhất trong từng danh mục, được chọn lọc kỹ càng bởi đội ngũ chuyên gia
          </p>
        </div>

        {categories.map((category) => (
          <CategoryFeaturedBooks
            key={category.slug}
            categorySlug={category.slug}
            categoryName={category.name}
            maxBooks={6}
          />
        ))}

        <div className="view-all-section">
          <Link to="/books" className="view-all-button">
            Xem tất cả sách
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBooksByCategory;