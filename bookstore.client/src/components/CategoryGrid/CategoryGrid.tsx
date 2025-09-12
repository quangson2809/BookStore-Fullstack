import { Link } from 'react-router-dom';
import './CategoryGrid.css';

interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  bookCount: number;
  isPopular?: boolean;
}

const categories: CategoryItem[] = [
  {
    id: "1",
    name: "Văn học",
    slug: "van-hoc",
    description: "Tiểu thuyết, thơ ca, truyện ngắn",
    imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop",
    bookCount: 1250,
    isPopular: true,
  },
  {
    id: "2",
    name: "Kinh tế",
    slug: "kinh-te",
    description: "Quản trị, đầu tư, khởi nghiệp",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop",
    bookCount: 890,
    isPopular: true,
  },
  {
    id: "3",
    name: "Thiếu nhi",
    slug: "thieu-nhi",
    description: "Truyện tranh, sách giáo dục",
    imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=200&fit=crop",
    bookCount: 650,
    isPopular: true,
  },
  {
    id: "4",
    name: "Khoa học",
    slug: "khoa-hoc",
    description: "Vật lý, hóa học, sinh học",
    imageUrl: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=300&h=200&fit=crop",
    bookCount: 420,
  },
  {
    id: "5",
    name: "Công nghệ",
    slug: "cong-nghe",
    description: "Lập trình, AI, blockchain",
    imageUrl: "https://images.unsplash.com/photo-1518932945647-7a1c969f8be2?w=300&h=200&fit=crop",
    bookCount: 380,
    isPopular: true,
  },
  {
    id: "6",
    name: "Tâm lý",
    slug: "tam-ly",
    description: "Phát triển bản thân, tâm lý học",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop",
    bookCount: 320,
  },
  {
    id: "7",
    name: "Lịch sử",
    slug: "lich-su",
    description: "Lịch sử Việt Nam, thế giới",
    imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop",
    bookCount: 280,
  },
  {
    id: "8",
    name: "Ngoại ngữ",
    slug: "ngoai-ngu",
    description: "Tiếng Anh, Nhật, Hàn, Trung",
    imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=200&fit=crop",
    bookCount: 450,
  },
];

const CategoryGrid = () => {
  return (
    <section className="category-grid-section">
      <div className="container">
        <div className="category-header">
          <h2 className="category-title">Danh mục sách</h2>
          <p className="category-description">
            Khám phá hàng ngàn đầu sách được phân loại theo chủ đề, phù hợp với mọi độ tuổi và sở thích
          </p>
        </div>

        <div className="category-grid">
          {categories.map((category) => (
            <Link key={category.id} to={`/books?category=${category.slug}`} className="category-card-link">
              <div className="category-card">
                <div className="category-image-container">
                  <img
                    src={category.imageUrl}
                    alt={category.name}
                    className="category-image"
                  />
                  {category.isPopular && (
                    <span className="category-badge">Phổ biến</span>
                  )}
                </div>
                <div className="category-content">
                  <h3 className="category-name">{category.name}</h3>
                  <p className="category-desc">{category.description}</p>
                  <div className="category-footer">
                    <span className="category-count">{category.bookCount.toLocaleString()} sách</span>
                    <span className="category-link-text">Xem tất cả →</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;