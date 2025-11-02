import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import BookCard from '../BookCard';
import { bookService } from '../../services/bookService';
import type { Book, BookDetail as BookDetailType } from '../../types/Book';
import './BookDetail.css';

interface BookDetailProps {
    book: Book;
    relatedBooks?: Book[];
}

const BookDetail = ({ book: initialBook, relatedBooks = [] }: BookDetailProps) => {
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const [activeTab, setActiveTab] = useState('description');
    const [currentSlide, setCurrentSlide] = useState(0);
    const [bookDetail, setBookDetail] = useState<BookDetailType | null>(null);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();

    // Fetch full book details from API
    useEffect(() => {
        const fetchBookDetail = async () => {
            setLoading(true);
            try {
                const detail = await bookService.getBookDetail(initialBook.id);
                setBookDetail(detail);
            } catch (error) {
                console.error('Error fetching book detail:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBookDetail();
    }, [initialBook.id]);

    // Carousel settings
    const booksPerSlide = 5;
    const totalSlides = Math.ceil(relatedBooks.length / booksPerSlide);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    };

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            addToCart(initialBook);
        }
        alert(`Đã thêm ${quantity} cuốn "${initialBook.title}" vào giỏ hàng!`);
    };

    const handleAddToWishlist = () => {
        alert(`Đã thêm "${initialBook.title}" vào danh sách yêu thích!`);
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: initialBook.title,
                text: initialBook.description,
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Đã sao chép liên kết vào clipboard!');
        }
    };

    const discountPercentage = initialBook.originalPrice
        ? Math.round(((initialBook.originalPrice - initialBook.price) / initialBook.originalPrice) * 100)
        : 0;

    // Get images from API or use default
    const images = bookDetail?.imageUrls && bookDetail.imageUrls.length > 0
        ? bookDetail.imageUrls
        : [initialBook.imageUrl || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&h=800&fit=crop'];

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <span
                key={i}
                className={`star ${i < Math.floor(rating) ? 'filled' : ''}`}
            >
                ★
            </span>
        ));
    };

    // Mock reviews data
    const reviews = [
        {
            id: "1",
            userName: "Nguyễn Văn A",
            rating: 5,
            comment: "Cuốn sách rất hay, nội dung phong phú và dễ hiểu. Tôi rất hài lòng với chất lượng sản phẩm.",
            date: "2023-11-15",
        },
        {
            id: "2",
            userName: "Trần Thị B",
            rating: 4,
            comment: "Sách được đóng gói cẩn thận, giao hàng nhanh. Nội dung tốt nhưng có một số chỗ hơi khó hiểu.",
            date: "2023-11-10",
        },
        {
            id: "3",
            userName: "Lê Văn C",
            rating: 5,
            comment: "Đây là cuốn sách tuyệt vời! Tôi đã học được rất nhiều điều bổ ích. Chắc chắn sẽ giới thiệu cho bạn bè.",
            date: "2023-11-05",
        },
    ];

    // Mock rating distribution
    const ratingDistribution = [
        { stars: 5, count: 800, percentage: 64 },
        { stars: 4, count: 300, percentage: 24 },
        { stars: 3, count: 100, percentage: 8 },
        { stars: 2, count: 30, percentage: 2.4 },
        { stars: 1, count: 20, percentage: 1.6 },
    ];

    if (loading) {
        return (
            <div className="book-detail">
                <div className="container">
                    <div className="loading-spinner">
                        <div className="spinner"></div>
                        <p>Đang tải chi tiết sách...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="book-detail">
            <div className="container">
                {/* Breadcrumb */}
                <nav className="breadcrumb">
                    <Link to="/">Trang chủ</Link>
                    <span>/</span>
                    <Link to={`/books?category=${initialBook.category?.toLowerCase() || ''}`}>
                        {initialBook.category || 'Sách'}
                    </Link>
                    <span>/</span>
                    <span>{initialBook.title}</span>
                </nav>

                {/* Main Product Layout */}
                <div className="product-layout">
                    {/* Left Column - Images from API */}
                    <div className="product-images">
                        <div className="main-image">
                            <img
                                src={images[selectedImage]}
                                alt={initialBook.title}
                                className="main-book-image"
                            />
                            {initialBook.originalPrice && discountPercentage > 0 && (
                                <span className="discount-badge">-{discountPercentage}%</span>
                            )}
                        </div>

                        {/* Thumbnail Gallery */}
                        {images.length > 1 && (
                            <div className="thumbnail-gallery">
                                {images.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                                    >
                                        <img src={image} alt={`${initialBook.title} ${index + 1}`} />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right Column - Product Info from API */}
                    <div className="product-info">
                        <h1 className="product-title">{bookDetail?.name || initialBook.title}</h1>
                        <p className="product-author">
                            Tác giả: {bookDetail?.author || initialBook.author || 'Đang cập nhật'}
                        </p>

                        {/* Rating */}
                        <div className="rating-section">
                            <div className="stars">
                                {renderStars(initialBook.rating || 4.5)}
                            </div>
                            <span className="rating-value">{initialBook.rating?.toFixed(1) || '4.5'}</span>
                            <span className="review-count">({initialBook.reviewCount || 0} đánh giá)</span>
                        </div>

                        {/* Badges */}
                        <div className="product-badges">
                            {initialBook.isNew && <span className="badge new">Mới bán</span>}
                            {(bookDetail?.quantity || initialBook.stock || 0) > 0 && (
                                <span className="badge in-stock">Còn hàng</span>
                            )}
                        </div>

                        {/* Price from API */}
                        <div className="price-section">
                            <span className="current-price">
                                {(bookDetail?.salePrice || initialBook.price).toLocaleString('vi-VN')}đ
                            </span>
                            {(bookDetail?.originalPrice || initialBook.originalPrice) && (
                                <span className="original-price">
                                    {(bookDetail?.originalPrice || initialBook.originalPrice)!.toLocaleString('vi-VN')}đ
                                </span>
                            )}
                        </div>
                        <p className="stock-info">
                            Còn lại: {bookDetail?.quantity || initialBook.stock || 0} cuốn
                        </p>

                        {/* Quantity and Actions */}
                        <div className="purchase-section">
                            <div className="quantity-section">
                                <span className="quantity-label">Số lượng:</span>
                                <div className="quantity-controls">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        disabled={quantity <= 1}
                                    >
                                        -
                                    </button>
                                    <span className="quantity-value">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(Math.min(bookDetail?.quantity || initialBook.stock || 999, quantity + 1))}
                                        disabled={quantity >= (bookDetail?.quantity || initialBook.stock || 999)}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <div className="action-buttons">
                                <button className="add-to-cart-btn" onClick={handleAddToCart}>
                                    🛒 Thêm vào giỏ hàng
                                </button>
                                <button className="wishlist-btn" onClick={handleAddToWishlist}>
                                    ♡
                                </button>
                                <button className="share-btn" onClick={handleShare}>
                                    📤
                                </button>
                            </div>
                        </div>

                        {/* Features */}
                        <div className="features-section">
                            <div className="feature">
                                <div className="feature-icon">🚚</div>
                                <div className="feature-content">
                                    <p>Miễn phí vận chuyển</p>
                                    <small>Đơn hàng từ 200.000đ</small>
                                </div>
                            </div>
                            <div className="feature">
                                <div className="feature-icon">🛡️</div>
                                <div className="feature-content">
                                    <p>Bảo hành chất lượng</p>
                                    <small>Đổi trả trong 7 ngày</small>
                                </div>
                            </div>
                            <div className="feature">
                                <div className="feature-icon">📞</div>
                                <div className="feature-content">
                                    <p>Hỗ trợ 24/7</p>
                                    <small>Tư vấn miễn phí</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs Section */}
                <div className="product-tabs">
                    <div className="tabs-header">
                        <button
                            className={`tab ${activeTab === 'description' ? 'active' : ''}`}
                            onClick={() => setActiveTab('description')}
                        >
                            Mô tả sản phẩm
                        </button>
                        <button
                            className={`tab ${activeTab === 'specifications' ? 'active' : ''}`}
                            onClick={() => setActiveTab('specifications')}
                        >
                            Thông số kỹ thuật
                        </button>
                        <button
                            className={`tab ${activeTab === 'reviews' ? 'active' : ''}`}
                            onClick={() => setActiveTab('reviews')}
                        >
                            Đánh giá ({initialBook.reviewCount || 0})
                        </button>
                    </div>

                    <div className="tabs-content">
                        {activeTab === 'description' && (
                            <div className="tab-content">
                                <div className="description-box">
                                    <p>{initialBook.description}</p>
                                    <div className="highlights">
                                        <h4>Thông tin chi tiết:</h4>
                                        <ul>
                                            <li>Tác giả: {bookDetail?.author || 'Đang cập nhật'}</li>
                                            <li>Nhà xuất bản: {bookDetail?.publisher || 'Đang cập nhật'}</li>
                                            <li>Số trang: {bookDetail?.pageNumber || 'Đang cập nhật'}</li>
                                            <li>Ngôn ngữ: {bookDetail?.language || 'Tiếng Việt'}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'specifications' && (
                            <div className="tab-content">
                                <div className="specifications-container">
                                    <div className="spec-section">
                                        <div className="spec-item">
                                            <span className="spec-label">ISBN:</span>
                                            <span className="spec-value">{bookDetail?.isbn || initialBook.isbn || 'Đang cập nhật'}</span>
                                        </div>
                                        <div className="spec-item">
                                            <span className="spec-label">Nhà xuất bản:</span>
                                            <span className="spec-value">{bookDetail?.publisher || initialBook.publisher || 'Đang cập nhật'}</span>
                                        </div>
                                        <div className="spec-item">
                                            <span className="spec-label">Ngày xuất bản:</span>
                                            <span className="spec-value">
                                                {bookDetail?.publicTime
                                                    ? new Date(bookDetail.publicTime).toLocaleDateString('vi-VN')
                                                    : initialBook.publishedDate
                                                        ? new Date(initialBook.publishedDate).toLocaleDateString('vi-VN')
                                                        : 'Đang cập nhật'
                                                }
                                            </span>
                                        </div>
                                        <div className="spec-item">
                                            <span className="spec-label">Số trang:</span>
                                            <span className="spec-value">
                                                {bookDetail?.pageNumber ? `${bookDetail.pageNumber} trang` : 'Đang cập nhật'}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="spec-section">
                                        <div className="spec-item">
                                            <span className="spec-label">Ngôn ngữ:</span>
                                            <span className="spec-value">{bookDetail?.language || initialBook.language || 'Tiếng Việt'}</span>
                                        </div>
                                        <div className="spec-item">
                                            <span className="spec-label">Danh mục:</span>
                                            <span className="spec-value">{bookDetail?.categoryName || initialBook.category || 'Đang cập nhật'}</span>
                                        </div>
                                        <div className="spec-item">
                                            <span className="spec-label">Tác giả:</span>
                                            <span className="spec-value">{bookDetail?.author || initialBook.author || 'Đang cập nhật'}</span>
                                        </div>
                                        <div className="spec-item">
                                            <span className="spec-label">Tình trạng:</span>
                                            <span className="spec-value">
                                                {(bookDetail?.quantity || initialBook.stock || 0) > 0 ? 'Còn hàng' : 'Hết hàng'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'reviews' && (
                            <div className="tab-content">
                                <div className="reviews-container">
                                    {/* Rating Summary */}
                                    <div className="rating-summary-box">
                                        <div className="overall-rating-section">
                                            <div className="rating-score">
                                                <span className="rating-number">{initialBook.rating?.toFixed(1) || '4.5'}</span>
                                                <div className="rating-stars">
                                                    {renderStars(initialBook.rating || 4.5)}
                                                </div>
                                                <p className="rating-text">{initialBook.reviewCount || 0} đánh giá</p>
                                            </div>
                                        </div>

                                        <div className="rating-breakdown">
                                            {ratingDistribution.map((item) => (
                                                <div key={item.stars} className="rating-bar-item">
                                                    <span className="star-label">{item.stars}</span>
                                                    <span className="star-icon">⭐</span>
                                                    <div className="progress-bar">
                                                        <div
                                                            className="progress-fill"
                                                            style={{ width: `${item.percentage}%` }}
                                                        ></div>
                                                    </div>
                                                    <span className="rating-count">{item.count}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Individual Reviews */}
                                    <div className="reviews-list">
                                        {reviews.map((review) => (
                                            <div key={review.id} className="review-card">
                                                <div className="review-header">
                                                    <div className="reviewer-info">
                                                        <h4 className="reviewer-name">{review.userName}</h4>
                                                        <div className="review-rating">
                                                            {renderStars(review.rating)}
                                                        </div>
                                                    </div>
                                                    <span className="review-date">
                                                        {new Date(review.date).toLocaleDateString('vi-VN')}
                                                    </span>
                                                </div>
                                                <p className="review-text">{review.comment}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Related Books Carousel */}
                {relatedBooks.length > 0 && (
                    <div className="related-books">
                        <div className="related-books-header">
                            <h2>Sách liên quan</h2>
                            <div className="carousel-controls">
                                <button
                                    className="carousel-btn prev"
                                    onClick={prevSlide}
                                    disabled={totalSlides <= 1}
                                >
                                    ←
                                </button>
                                <button
                                    className="carousel-btn next"
                                    onClick={nextSlide}
                                    disabled={totalSlides <= 1}
                                >
                                    →
                                </button>
                            </div>
                        </div>

                        <div className="carousel-container">
                            <div className="carousel-wrapper">
                                <div
                                    className="carousel-track"
                                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                                >
                                    {Array.from({ length: totalSlides }, (_, slideIndex) => (
                                        <div key={slideIndex} className="carousel-slide">
                                            {relatedBooks
                                                .slice(slideIndex * booksPerSlide, (slideIndex + 1) * booksPerSlide)
                                                .map((relatedBook) => (
                                                    <div key={relatedBook.id} className="carousel-item">
                                                        <BookCard book={relatedBook} />
                                                    </div>
                                                ))}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Dots indicator */}
                            {totalSlides > 1 && (
                                <div className="carousel-dots">
                                    {Array.from({ length: totalSlides }, (_, index) => (
                                        <button
                                            key={index}
                                            className={`dot ${index === currentSlide ? 'active' : ''}`}
                                            onClick={() => setCurrentSlide(index)}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookDetail;