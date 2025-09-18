import React, { useState, useEffect } from 'react';
import { bookService, BookFormData, PaginatedResponse } from '../../../services/bookService';
import type { Book } from '../../../types/Book';
import AddBookModal from './AddBookModal';
import EditBookModal from './EditBookModal';
import Pagination from './Pagination';
import './BookManagement.css';

const BookManagement: React.FC = () => {
  const [booksData, setBooksData] = useState<PaginatedResponse<Book>>({
    data: [],
    currentPage: 1,
    totalPages: 0,
    totalItems: 0,
    itemsPerPage: 10
  });
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchInput, setSearchInput] = useState(''); // Separate state for input
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    loadBooks();
  }, [currentPage, searchQuery]); // Remove searchInput from dependencies

  const loadBooks = async () => {
    try {
      setLoading(true);
      const response = await bookService.getBooks({
        page: currentPage,
        limit: 5, // Thay đổi từ 10 thành 5 để test pagination
        search: searchQuery,
        sortBy: 'id',
        sortOrder: 'desc'
      });
      setBooksData(response);
    } catch (error) {
      console.error('Error loading books:', error);
      alert('Có lỗi khi tải danh sách sách');
    } finally {
      setLoading(false);
    }
  };

  const handleAddBook = async (bookData: BookFormData) => {
    try {
      await bookService.addBook(bookData);
      setShowAddModal(false);
      setCurrentPage(1);
      loadBooks();
      alert('Thêm sách thành công!');
    } catch (error) {
      console.error('Error adding book:', error);
      alert('Có lỗi khi thêm sách');
    }
  };

  const handleEditBook = async (bookData: Partial<BookFormData>) => {
    if (!editingBook) return;
    
    try {
      await bookService.updateBook(editingBook.id, bookData);
      setEditingBook(null);
      loadBooks();
      alert('Cập nhật sách thành công!');
    } catch (error) {
      console.error('Error updating book:', error);
      alert('Có lỗi khi cập nhật sách');
    }
  };

  const handleDeleteBook = async (id: number) => {
    if (!confirm('Bạn có chắc chắn muốn xóa sách này?')) return;
    
    try {
      const success = await bookService.deleteBook(id);
      if (success) {
        loadBooks();
        alert('Xóa sách thành công!');
      }
    } catch (error) {
      console.error('Error deleting book:', error);
      alert('Có lỗi khi xóa sách');
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(searchInput);
    setCurrentPage(1);
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN') + 'đ';
  };

  if (loading) {
    return (
      <div className="book-management">
        <div className="loading-container">
          <div className="loading-spinner">
          </div>
          <p>Đang tải danh sách sách...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="book-management">
      <div className="management-header">
        <h2>Quản lý sách ({booksData.totalItems} cuốn)</h2>
        <div className="header-actions">
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Tìm kiếm sách..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35"/>
              </svg>
            </button>
          </form>
          
          <button className="add-btn" onClick={() => setShowAddModal(true)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Thêm sách
          </button>
        </div>
      </div>
        
      <div className="books-table-container">
        <table className="books-table">
          <thead>
            <tr>
              <th>Ảnh</th>
              <th>Thông tin sách</th>
              <th>Tác giả</th>
              <th>Danh mục</th>
              <th>Giá</th>
              <th>Kho</th>
              <th>Đánh giá</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {booksData.data.map((book) => (
              <tr key={book.id}>
                <td>
                  <img 
                    src={book.imageUrl} 
                    alt={book.title}
                    className="book-thumbnail"
                  />
                </td>
                <td>
                  <div className="book-info">
                    <h4>{book.title}</h4>
                    <p className="isbn">ISBN: {book.isbn}</p>
                    <p className="publisher">{book.publisher}</p>
                  </div>
                </td>
                <td>{book.author}</td>
                <td>
                  <span className="category-badge">{book.category}</span>
                </td>
                <td>
                  <div className="price-info">
                    <span className="current-price">{formatPrice(book.price)}</span>
                    {book.originalPrice && (
                      <span className="original-price">{formatPrice(book.originalPrice)}</span>
                    )}
                  </div>
                </td>
                <td>
                  <span className={`stock ${book.stock > 10 ? 'in-stock' : book.stock > 0 ? 'low-stock' : 'out-of-stock'}`}>
                    {book.stock}
                  </span>
                </td>
                <td>
                  <div className="rating-info">
                    <span className="rating">{book.rating} ⭐</span>
                    <span className="reviews">({book.reviewCount})</span>
                  </div>
                </td>
                <td>
                  <div className="status-badges">
                    {book.isNew && <span className="badge new">Mới</span>}
                    {book.isBestseller && <span className="badge bestseller">Bán chạy</span>}
                  </div>
                </td>
                <td>
                  <div className="action-buttons">
                    <button 
                      className="action-btn edit"
                      onClick={() => setEditingBook(book)}
                      title="Sửa"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                        <path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                      </svg>
                    </button>
                    <button 
                      className="action-btn delete"
                      onClick={() => handleDeleteBook(book.id)}
                      title="Xóa"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3,6 5,6 21,6"/>
                        <path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6m3,0V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2V6"/>
                        <line x1="10" y1="11" x2="10" y2="17"/>
                        <line x1="14" y1="11" x2="14" y2="17"/>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {booksData.data.length === 0 && (
          <div className="no-books">
            {searchQuery ? 
              `Không tìm thấy sách nào với từ khóa "${searchQuery}"` : 
              'Chưa có sách nào trong hệ thống'
            }
          </div>
        )}
      </div>

      {/* Pagination */}
      {booksData.totalPages > 1 && (
        <Pagination
          currentPage={booksData.currentPage}
          totalPages={booksData.totalPages}
          onPageChange={handlePageChange}
          totalItems={booksData.totalItems}
          itemsPerPage={booksData.itemsPerPage}
        />
      )}

      {showAddModal && (
        <AddBookModal
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddBook}
        />
      )}

      {editingBook && (
        <EditBookModal
          book={editingBook}
          onClose={() => setEditingBook(null)}
          onSubmit={handleEditBook}
        />
      )}
    </div>
  );
};

export default BookManagement;