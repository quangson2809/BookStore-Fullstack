import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Banner.css';

interface BannerSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  ctaText: string;
  ctaLink: string;
  backgroundColor: string;
}

const bannerSlides: BannerSlide[] = [
  {
    id: "1",
    title: "Khuyến mãi đặc biệt",
    subtitle: "Giảm giá lên đến 50%",
    description: "Hàng ngàn đầu sách văn học, kinh tế, thiếu nhi với giá ưu đãi nhất",
    imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop",
    ctaText: "Mua ngay",
    ctaLink: "/books?feature=promotion",
    backgroundColor: "bg-gradient-primary",
  },
  {
    id: "2",
    title: "Sách mới 2024",
    subtitle: "Những tác phẩm hot nhất",
    description: "Cập nhật những cuốn sách mới nhất từ các tác giả nổi tiếng trong và ngoài nước",
    imageUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&h=400&fit=crop",
    ctaText: "Khám phá",
    ctaLink: "/books?feature=new",
    backgroundColor: "bg-gradient-secondary",
  },
  {
    id: "3",
    title: "Bestsellers",
    subtitle: "Top sách bán chạy nhất",
    description: "Những cuốn sách được yêu thích nhất, đánh giá cao từ độc giả Việt Nam",
    imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&h=400&fit=crop",
    ctaText: "Xem ngay",
    ctaLink: "/books?feature=bestseller",
    backgroundColor: "bg-gradient-accent",
  },
];

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length);
  };

  const currentBanner = bannerSlides[currentSlide];

  return (
    <div className="banner-container">
      <div className={`banner-card ${currentBanner.backgroundColor}`}>
        <div className="banner-content">
          {/* Content */}
          <div className="banner-text">
            <div className="banner-text-content">
              <h2 className="banner-title">{currentBanner.title}</h2>
              <h3 className="banner-subtitle">{currentBanner.subtitle}</h3>
              <p className="banner-description">{currentBanner.description}</p>
              <Link to={currentBanner.ctaLink} className="banner-cta">
                {currentBanner.ctaText}
              </Link>
            </div>
          </div>

          {/* Image */}
          <div className="banner-image">
            <img
              src={currentBanner.imageUrl}
              alt={currentBanner.title}
              className="banner-img"
            />
          </div>
        </div>

        {/* Navigation arrows */}
        <button
          className="banner-nav banner-nav-left"
          onClick={prevSlide}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15,18 9,12 15,6"></polyline>
          </svg>
        </button>
        <button
          className="banner-nav banner-nav-right"
          onClick={nextSlide}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9,18 15,12 9,6"></polyline>
          </svg>
        </button>

        {/* Dots indicator */}
        <div className="banner-dots">
          {bannerSlides.map((_, index) => (
            <button
              key={index}
              className={`banner-dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;