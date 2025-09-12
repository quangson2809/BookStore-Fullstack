import React, { useState, useEffect } from 'react';
import BookCard from '@/components/BookCard';
import { Book } from '@/types/Book';
import './BookList.css';

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    // Mock data - replace with API call
    const mockBooks: Book[] = [
      {
        id: 1,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        price: 15.99,
        description: "A classic American novel",
        category: "Fiction",
        imageUrl: "https://covers.openlibrary.org/b/id/7222246-M.jpg",
        isbn: "9780743273565",
        publishedDate: "1925-04-10",
        stock: 25,
        rating: 4.5
      },
      {
        id: 4,
        title: "Clean Code",
        author: "Robert C. Martin",
        price: 29.99,
        description: "A handbook of agile software craftsmanship",
        category: "Technology",
        imageUrl: "https://covers.openlibrary.org/b/id/8228691-M.jpg",
        isbn: "9780132350884",
        publishedDate: "2008-08-01",
        stock: 15,
        rating: 4.6
      },
      // Add more books...
    ];
    setBooks(mockBooks);
    setFilteredBooks(mockBooks);
  }, []);

  useEffect(() => {
    let filtered = books;

    if (searchTerm) {
      filtered = filtered.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(book => book.category === selectedCategory);
    }

    setFilteredBooks(filtered);
  }, [books, searchTerm, selectedCategory]);

  const categories = [...new Set(books.map(book => book.category))];

  return (
    <div className="book-list">
      <div className="container">
        <h1>All Books</h1>
        
        <div className="filters">
          <input
            type="text"
            placeholder="Search books..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="category-select"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className="books-grid">
          {filteredBooks.map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookList;