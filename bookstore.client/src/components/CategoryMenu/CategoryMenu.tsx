import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CategoryMenu.css';

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface CategoryMenuProps {
  categories: Category[];
}

const CategoryMenu: React.FC<CategoryMenuProps> = ({ categories }) => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  return (
    <nav className="category-nav">
      <div className="category-list">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/category/${category.slug}`}
            className={`category-item ${hoveredCategory === category.id ? 'hovered' : ''}`}
            onMouseEnter={() => setHoveredCategory(category.id)}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            {category.name}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default CategoryMenu;