import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './Header.css';

const mainCategories = [
  { id: "1", name: "Văn học", slug: "van-hoc" },
  { id: "2", name: "Kinh tế", slug: "kinh-te" },
  { id: "3", name: "Thiếu nhi", slug: "thieu-nhi" },
  { id: "4", name: "Khoa học", slug: "khoa-hoc" },
  { id: "5", name: "Công nghệ", slug: "cong-nghe" },
  { id: "6", name: "Tâm lý", slug: "tam-ly" },
  { id: "7", name: "Lịch sử", slug: "lich-su" },
  { id: "8", name: "Ngoại ngữ", slug: "ngoai-ngu" },
  { id: "9", name: "Y học", slug: "y-hoc" },
  { id: "10", name: "Luật", slug: "luat" },
  { id: "11", name: "Nghệ thuật", slug: "nghe-thuat" },
  { id: "12", name: "Thể thao", slug: "the-thao" },
  { id: "13", name: "Du lịch", slug: "du-lich" },
  { id: "14", name: "Nấu ăn", slug: "nau-an" },
  { id: "15", name: "Tôn giáo", slug: "ton-giao" },
  { id: "16", name: "Triết học", slug: "triet-hoc" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { state } = useCart();
  const itemCount = state.items.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bookstore-header">
      {/* Top bar */}
      <div className="bookstore-top-bar">
        <div className="bookstore-container">
          <div className="bookstore-top-bar-content">
            <div className="bookstore-top-bar-left">
              <span>📞 Hotline: 1900-1234</span>
              <span>📧 support@bookstore.vn</span>
            </div>
            <div className="bookstore-top-bar-right">
              <Link to="/about" className="bookstore-top-bar-link">
                Về chúng tôi
              </Link>
              <Link to="/contact" className="bookstore-top-bar-link">
                Liên hệ
              </Link>
              <Link to="/help" className="bookstore-top-bar-link">
                Trợ giúp
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="bookstore-main-header">
        <div className="bookstore-container">
          <div className="bookstore-header-content">
            {/* Logo */}
            <Link to="/" className="bookstore-logo">
              <svg className="bookstore-logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
              </svg>
              <span className="bookstore-logo-text">BookStore VN</span>
            </Link>

            {/* Search bar */}
            <div className="bookstore-search-section">
              <form className="bookstore-search-form">
                <input
                  type="text"
                  className="bookstore-search-input"
                  placeholder="Tìm kiếm sách, tác giả, nhà xuất bản..."
                />
                <button type="submit" className="bookstore-search-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="m21 21-4.35-4.35"/>
                  </svg>
                </button>
              </form>
            </div>

            {/* Right side actions */}
            <div className="bookstore-header-actions">
              {/* Cart */}
              <Link to="/cart" className="bookstore-cart-link">
                <div className="bookstore-cart-button">
                  <svg className="bookstore-action-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="9" cy="21" r="1"/>
                    <circle cx="20" cy="21" r="1"/>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                  </svg>
                  {itemCount > 0 && (
                    <span className="bookstore-cart-badge">
                      {itemCount}
                    </span>
                  )}
                  <span className="bookstore-action-text">Giỏ hàng</span>
                </div>
              </Link>

              {/* Auth buttons - THEO MẪU HỌ YÊU CẦU */}
              <div className="bookstore-auth-buttons">
                <Link to="/login" className="bookstore-login-btn">
                  <svg className="bookstore-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                  <span>Đăng nhập</span>
                </Link>
                <Link to="/register" className="bookstore-register-btn">
                  Đăng ký
                </Link>
              </div>

              {/* Mobile menu toggle */}
              <button 
                className="bookstore-mobile-menu-toggle" 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <svg className="bookstore-menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                ) : (
                  <svg className="bookstore-menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="3" y1="6" x2="21" y2="6"/>
                    <line x1="3" y1="12" x2="21" y2="12"/>
                    <line x1="3" y1="18" x2="21" y2="18"/>
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Category navigation */}
      <div className="bookstore-category-section">
        <div className="bookstore-container">
          <div className="bookstore-category-menu">
            {/* Dropdown với TẤT CẢ danh mục */}
            <div className="bookstore-category-dropdown">
              <span className="bookstore-category-trigger">
                📋 Danh mục sách
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6,9 12,15 18,9"></polyline>
                </svg>
              </span>
              <div className="bookstore-category-dropdown-content">
                {mainCategories.map((category) => (
                  <Link
                    key={category.id}
                    to={`/books?category=${category.slug}`}
                    className="bookstore-category-dropdown-item"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Hiển thị chỉ một số category chính */}
            {mainCategories.slice(0, 4).map((category) => (
              <Link
                key={category.id}
                to={`/books?category=${category.slug}`}
                className="bookstore-category-item"
              >
                {category.name}
              </Link>
            ))}
            
            {/* Ẩn bớt trên màn hình nhỏ */}
            <Link to="/books?category=cong-nghe" className="bookstore-category-item bookstore-hide-on-small">
              Công nghệ
            </Link>
            <Link to="/books?category=tam-ly" className="bookstore-category-item bookstore-hide-on-small">
              Tâm lý
            </Link>
            
            {/* Special categories */}
            <Link to="/books?feature=bestseller" className="bookstore-category-item bookstore-special">
              🔥 Bán chạy
            </Link>
            <Link to="/books?feature=new" className="bookstore-category-item bookstore-special">
              ⭐ Mới nhất
            </Link>
            <Link to="/books?feature=promotion" className="bookstore-category-item bookstore-special">
              🎉 Khuyến mãi
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="bookstore-mobile-menu">
          <div className="bookstore-container">
            <div className="bookstore-mobile-content">
              <div className="bookstore-mobile-categories">
                {mainCategories.map((category) => (
                  <Link
                    key={category.id}
                    to={`/books?category=${category.slug}`}
                    className="bookstore-mobile-category-item"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                ))}
              </div>

              {/* Mobile auth */}
              <div className="bookstore-mobile-auth">
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <button className="bookstore-mobile-auth-button bookstore-outline">
                    Đăng nhập
                  </button>
                </Link>
                <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                  <button className="bookstore-mobile-auth-button">
                    Đăng ký
                  </button>
                </Link>
              </div>

              <div className="bookstore-mobile-links">
                <Link to="/about" onClick={() => setIsMenuOpen(false)}>
                  Về chúng tôi
                </Link>
                <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                  Liên hệ
                </Link>
                <Link to="/help" onClick={() => setIsMenuOpen(false)}>
                  Trợ giúp
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;