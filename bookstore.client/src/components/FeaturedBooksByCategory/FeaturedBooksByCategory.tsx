import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BookCard from '../BookCard';
import { bookService } from '../../services/bookService';
import type { Book } from '../../types/Book';
import './FeaturedBooksByCategory.css';

interface CategoryFeaturedBooksProps {
  categorySlug: string;
  categoryName: string;
  maxBooks?: number;
}

function CategoryFeaturedBooks({ categorySlug, categoryName, maxBooks = 6 }: CategoryFeaturedBooksProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategoryBooks = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Fetch books by category name
        const categoryBooks = await bookService.getBooksByCategory(categoryName);
        
        // Limit to maxBooks
        const limitedBooks = categoryBooks.slice(0, maxBooks);
        
        setBooks(limitedBooks);
      } catch (err) {
        console.error(`Error fetching books for ${categoryName}:`, err);
        setError('Không thể tải sách');
        setBooks([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategoryBooks();
  }, [categorySlug, maxBooks, categoryName]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, books.length - 3));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.max(1, books.length - 3)) % Math.max(1, books.length - 3));
  };

  if (isLoading) {
    return (
      <div className="category-featured-books">
        <div className="category-featured-header">
          <div>
            <h3 className="category-featured-title">{categoryName}</h3>
            <p className="category-featured-subtitle">Đang tải...</p>
          </div>
        </div>
        <div className="loading-skeleton">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="skeleton-card"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="category-featured-books">
        <div className="category-featured-header">
          <div>
            <h3 className="category-featured-title">{categoryName}</h3>
            <p className="category-featured-subtitle error-text">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="category-featured-books">
        <div className="category-featured-header">
          <div>
            <h3 className="category-featured-title">{categoryName}</h3>
            <p className="category-featured-subtitle">Chưa có sách trong danh mục này</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="category-featured-books">
      <div className="category-featured-header">
        <div>
          <h3 className="category-featured-title">{categoryName}</h3>
          <p className="category-featured-subtitle">
            Những cuốn sách nổi bật nhất trong danh mục ({books.length} sách)
          </p>
        </div>
        <div className="category-nav-buttons">
          <button 
            className="nav-button" 
            onClick={prevSlide} 
            disabled={books.length <= 4}
            aria-label="Sách trước"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15,18 9,12 15,6"></polyline>
            </svg>
          </button>
          <button 
            className="nav-button" 
            onClick={nextSlide} 
            disabled={books.length <= 4}
            aria-label="Sách tiếp theo"
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
          {books.map((book) => (
            <div key={book.id} className="book-slide">
              <BookCard book={book} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const FeaturedBooksByCategory = () => {
  // Danh mục phải khớp với tên category trong database
  const categories = [
    { slug: "van-hoc", name: "Văn học" },
    { slug: "khoa-hoc", name: "Khoa học" },
    { slug: "lap-trinh", name: "Lập trình" },
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