import { useState, useEffect } from 'react';
import BookCard from '../BookCard';
import { bookService } from '../../services/bookService';
import type { Book } from '../../types/Book';
import './BookGrid.css';

const BookGrid = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      const allBooks = await bookService.getAllBooks();
      setBooks(allBooks.slice(0, 8)); // Show first 8 books
    } catch (error) {
      console.error('Error loading books:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="book-grid-section">
        <div className="container">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Đang tải sách...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="book-grid-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Sách mới nhất</h2>
          <p className="section-description">
            Khám phá những cuốn sách mới nhất được cập nhật hàng ngày
          </p>
        </div>

        <div className="books-grid">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BookGrid;