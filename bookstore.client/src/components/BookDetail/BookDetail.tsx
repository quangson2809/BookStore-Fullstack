import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import BookCard from '../BookCard';
import type { Book } from '../../types/Book';
import './BookDetail.css';

interface BookDetailProps {
  book: Book;
  relatedBooks?: Book[];
}

const BookDetail = ({ book, relatedBooks = [] }: BookDetailProps) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const [currentSlide, setCurrentSlide] = useState(0); // State cho carousel
  const { addToCart } = useCart();

  // Carousel settings
  const booksPerSlide = 5;
  const totalSlides = Math.ceil(relatedBooks.length / booksPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const getCurrentBooks = () => {
    const startIndex = currentSlide * booksPerSlide;
    return relatedBooks.slice(startIndex, startIndex + booksPerSlide);
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(book);
    }
    alert(`Đã thêm ${quantity} cuốn "${book.title}" vào giỏ hàng!`);
  };

  const handleAddToWishlist = () => {
    alert(`Đã thêm "${book.title}" vào danh sách yêu thích!`);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: book.title,
        text: book.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Đã sao chép liên kết vào clipboard!');
    }
  };

  const discountPercentage = book.originalPrice
    ? Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100)
    : 0;

  // Mock additional images
  const images = [book.imageUrl, book.imageUrl, book.imageUrl];

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

  // Mock reviews data chi tiết hơn
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

  return (
    <div className="book-detail">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/">Trang chủ</Link>
          <span>/</span>
          <Link to={`/books?category=${book.category.toLowerCase()}`}>{book.category}</Link>
          <span>/</span>
          <span>{book.title}</span>
        </nav>

        {/* Main Product Layout */}
        <div className="product-layout">
          {/* Left Column - Simple Images */}
          <div className="product-images">
            <div className="main-image">
              <img
                src={images[selectedImage]}
                alt={book.title}
                className="main-book-image"
              />
              {book.originalPrice && discountPercentage > 0 && (
                <span className="discount-badge">-{discountPercentage}%</span>
              )}
            </div>

            {/* Thumbnail Gallery */}
            <div className="thumbnail-gallery">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                >
                  <img src={image} alt={`${book.title} ${index + 1}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div className="product-info">
            <h1 className="product-title">{book.title}</h1>
            <p className="product-author">Tác giả: {book.author}</p>

            {/* Rating */}
            <div className="rating-section">
              <div className="stars">
                {renderStars(book.rating)}
              </div>
              <span className="rating-value">{book.rating}</span>
              <span className="review-count">({book.reviewCount} đánh giá)</span>
            </div>

            {/* Badges */}
            <div className="product-badges">
              <span className="badge new">Mới bán</span>
              <span className="badge in-stock">Còn hàng</span>
            </div>

            {/* Price */}
            <div className="price-section">
              <span className="current-price">{book.price.toLocaleString('vi-VN')}đ</span>
              {book.originalPrice && (
                <span className="original-price">{book.originalPrice.toLocaleString('vi-VN')}đ</span>
              )}
            </div>
            <p className="stock-info">Còn lại: {book.stock} cuốn</p>

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
                    onClick={() => setQuantity(Math.min(book.stock, quantity + 1))}
                    disabled={quantity >= book.stock}
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
              Đánh giá ({book.reviewCount})
            </button>
          </div>

          <div className="tabs-content">
            {activeTab === 'description' && (
              <div className="tab-content">
                <div className="description-box">
                  <p>{book.description}</p>
                  <div className="highlights">
                    <h4>Điểm nổi bật:</h4>
                    <ul>
                      <li>Nội dung phong phú, dễ hiểu</li>
                      <li>Được dịch thuật chuyên nghiệp</li>
                      <li>Phù hợp với nhiều độ tuổi</li>
                      <li>Chất lượng in ấn cao cấp</li>
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
                      <span className="spec-value">{book.isbn}</span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-label">Nhà xuất bản:</span>
                      <span className="spec-value">{book.publisher}</span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-label">Ngày xuất bản:</span>
                      <span className="spec-value">
                        {new Date(book.publishedDate).toLocaleDateString('vi-VN')}
                      </span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-label">Số trang:</span>
                      <span className="spec-value">324 trang</span>
                    </div>
                  </div>
                  <div className="spec-section">
                    <div className="spec-item">
                      <span className="spec-label">Ngôn ngữ:</span>
                      <span className="spec-value">Tiếng Việt</span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-label">Danh mục:</span>
                      <span className="spec-value">{book.category}</span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-label">Tác giả:</span>
                      <span className="spec-value">{book.author}</span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-label">Tình trạng:</span>
                      <span className="spec-value">Còn hàng</span>
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
                        <span className="rating-number">{book.rating}</span>
                        <div className="rating-stars">
                          {renderStars(book.rating)}
                        </div>
                        <p className="rating-text">{book.reviewCount} đánh giá</p>
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