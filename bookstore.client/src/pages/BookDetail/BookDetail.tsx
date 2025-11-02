import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BookDetailComponent from '../../components/BookDetail';
import { bookService } from '../../services/bookService';
import type { Book } from '../../types/Book';
import './BookDetail.css';

const BookDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [book, setBook] = useState<Book | null>(null);
    const [relatedBooks, setRelatedBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) {
            setError('ID sách không hợp lệ');
            setLoading(false);
            return;
        }

        const fetchBookData = async () => {
            setLoading(true);
            setError(null);

            try {
                const bookId = parseInt(id);

                if (isNaN(bookId)) {
                    throw new Error('ID sách không hợp lệ');
                }

                // Fetch book detail from API
                const bookData = await bookService.getBookById(bookId);

                if (!bookData) {
                    throw new Error('Không tìm thấy sách');
                }

                setBook(bookData);

                // Fetch related books from same category
                if (bookData.category) {
                    const categoryBooks = await bookService.getBooksByCategory(bookData.category);

                    // Filter out current book and limit to 8 books
                    const related = categoryBooks
                        .filter(b => b.id !== bookId)
                        .slice(0, 8);

                    // If not enough books in same category, fetch all books
                    if (related.length < 8) {
                        const allBooks = await bookService.getAllBooks();
                        const otherBooks = allBooks
                            .filter(b => b.id !== bookId && b.category !== bookData.category)
                            .slice(0, 8 - related.length);

                        setRelatedBooks([...related, ...otherBooks]);
                    } else {
                        setRelatedBooks(related);
                    }
                } else {
                    // No category, just get random books
                    const allBooks = await bookService.getAllBooks();
                    const related = allBooks
                        .filter(b => b.id !== bookId)
                        .slice(0, 8);

                    setRelatedBooks(related);
                }
            } catch (err) {
                console.error('Error fetching book:', err);
                setError(err instanceof Error ? err.message : 'Có lỗi xảy ra khi tải thông tin sách');
                setBook(null);
            } finally {
                setLoading(false);
            }
        };

        fetchBookData();
    }, [id]);

    if (loading) {
        return (
            <div className="book-detail-page">
                <div className="container">
                    <div className="loading-spinner">
                        <div className="spinner"></div>
                        <p>Đang tải thông tin sách...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !book) {
        return (
            <div className="book-detail-page">
                <div className="container">
                    <div className="not-found">
                        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="15" y1="9" x2="9" y2="15" />
                            <line x1="9" y1="9" x2="15" y2="15" />
                        </svg>
                        <h1>{error || 'Không tìm thấy sách'}</h1>
                        <p>Sách bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
                        <div className="not-found-actions">
                            <button onClick={() => navigate('/books')} className="btn-primary">
                                Xem tất cả sách
                            </button>
                            <button onClick={() => navigate('/')} className="btn-secondary">
                                Về trang chủ
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="book-detail-page">
            <BookDetailComponent book={book} relatedBooks={relatedBooks} />
        </div>
    );
};

export default BookDetail;