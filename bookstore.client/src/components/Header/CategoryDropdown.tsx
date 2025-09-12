import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CategoryDropdown.css';

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

const CategoryDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Đóng dropdown khi click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    console.log('Dropdown toggled:', !isOpen); // Debug log
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  return (
    <div className="category-dropdown-wrapper" ref={dropdownRef}>
      <button 
        className="category-dropdown-trigger"
        onClick={toggleDropdown}
        onMouseEnter={() => setIsOpen(true)}
        type="button"
      >
        <span>📋 Danh mục sách</span>
        <svg 
          className={`dropdown-arrow ${isOpen ? 'open' : ''}`}
          width="12" 
          height="12" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
        >
          <polyline points="6,9 12,15 18,9"></polyline>
        </svg>
      </button>
      
      {/* Dropdown Menu */}
      <div 
        className={`category-dropdown-menu ${isOpen ? 'show' : ''}`}
        onMouseLeave={() => setIsOpen(false)}
      >
        <div className="dropdown-header">
          <h4>Tất cả danh mục</h4>
        </div>
        <div className="dropdown-grid">
          {mainCategories.map((category) => (
            <Link
              key={category.id}
              to={`/books?category=${category.slug}`}
              className="dropdown-category-item"
              onClick={closeDropdown}
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryDropdown;