import React from 'react';
import { Link } from 'react-router-dom';
import type { Book } from '../../types/Book';
import './BookCard.css';

interface BookCardProps {
    book: Book;
}

const BookCard = ({ book }: BookCardProps) => {
    // Calculate discount percentage if there's an original price
    const discountPercentage = book.originalPrice && book.originalPrice > book.price
        ? Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100)
        : 0;

    // Generate star rating
    const renderStars = (rating: number) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(
                <span key={i} className="star filled">★</span>
            );
        }

        if (hasHalfStar) {
            stars.push(
                <span key="half" className="star half">★</span>
            );
        }

        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars.push(
                <span key={`empty-${i}`} className="star empty">★</span>
            );
        }

        return stars;
    };

    // Generate review count
    const reviewCount = book.reviewCount || Math.floor(Math.random() * 500) + 100;

    // Generate stock count
    const stockCount = book.stock || book.quantity || Math.floor(Math.random() * 50) + 10;

    return (
        <Link to={`/books/${book.id}`} className="book-card-link">
            <div className="book-card">
                {/* Image container with discount badge only */}
                <div className="book-image-container">
                    <img
                        src={book.imageUrl}
                        alt={book.title}
                        className="book-image"
                    />

                    {/* Chỉ hiển thị % giảm giá */}
                    {discountPercentage > 0 && (
                        <div className="book-badges">
                            <span className="badge discount">-{discountPercentage}%</span>
                        </div>
                    )}
                </div>

                {/* Book info */}
                <div className="book-info">
                    <h3 className="book-title">{book.title || book.name}</h3>

                    <div className="book-author">
                        <span className="author-label">Tác giả: </span>
                        <span className="author-name">{book.author}</span>
                    </div>

                    <div className="book-publisher">
                        <span className="publisher-label">NXB: </span>
                        <span className="publisher-name">{book.publisher || `NXB ${book.category}`}</span>
                    </div>

                    {/* Rating */}
                    <div className="book-rating">
                        <div className="stars">
                            {renderStars(book.rating || 4.5)}
                        </div>
                        <span className="rating-count">({reviewCount})</span>
                    </div>

                    {/* Price section */}
                    <div className="book-price-section">
                        <div className="price-container">
                            <span className="current-price">{book.price.toLocaleString('vi-VN')}₫</span>
                            {book.originalPrice && book.originalPrice > book.price && (
                                <span className="original-price">{book.originalPrice.toLocaleString('vi-VN')}₫</span>
                            )}
                        </div>
                        <div className="stock-info">
                            Còn {stockCount}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default BookCard;