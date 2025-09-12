import React, { useState } from 'react';
import { BookFormData } from '../../../services/bookService';
import ImageUploader from '../../ImageUploader';
import type { Book } from '../../../types/Book';
import './AddBookModal.css';

interface EditBookModalProps {
  book: Book;
  onClose: () => void;
  onSubmit: (bookData: Partial<BookFormData>) => Promise<void>;
}

const categories = [
  'Văn học', 'Kinh tế', 'Thiếu nhi', 'Khoa học', 
  'Công nghệ', 'Tâm lý', 'Lịch sử', 'Ngoại ngữ'
];

const EditBookModal: React.FC<EditBookModalProps> = ({ book, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<BookFormData>({
    title: book.title,
    author: book.author,
    price: book.price,
    originalPrice: book.originalPrice || 0,
    description: book.description,
    category: book.category,
    imageUrl: book.imageUrl,
    isbn: book.isbn,
    publishedDate: book.publishedDate,
    stock: book.stock,
    publisher: book.publisher,
    isNew: book.isNew || false,
    isBestseller: book.isBestseller || false
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.title || !formData.author || !formData.imageUrl || !formData.isbn || !formData.publisher) {
      alert('Vui lòng điền đầy đủ thông tin bắt buộc');
      return;
    }

    if (formData.price <= 0) {
      alert('Giá sách phải lớn hơn 0');
      return;
    }

    if (formData.stock < 0) {
      alert('Số lượng tồn kho không được âm');
      return;
    }

    setLoading(true);

    try {
      const submitData = {
        ...formData,
        originalPrice: formData.originalPrice || undefined
      };
      await onSubmit(submitData);
    } catch (error) {
      console.error('Error updating book:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof BookFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="modal-overlay">
      <div className="modal add-book-modal">
        <div className="modal-header">
          <h3>Chỉnh sửa sách: {book.title}</h3>
          <button className="close-btn" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Tên sách *</label>
              <input
                type="text"
                className="form-control"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Tác giả *</label>
              <input
                type="text"
                className="form-control"
                value={formData.author}
                onChange={(e) => handleChange('author', e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Danh mục *</label>
              <select
                className="form-control"
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
                required
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Nhà xuất bản *</label>
              <input
                type="text"
                className="form-control"
                value={formData.publisher}
                onChange={(e) => handleChange('publisher', e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">ISBN *</label>
              <input
                type="text"
                className="form-control"
                value={formData.isbn}
                onChange={(e) => handleChange('isbn', e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Ngày xuất bản *</label>
              <input
                type="date"
                className="form-control"
                value={formData.publishedDate}
                onChange={(e) => handleChange('publishedDate', e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Giá bán (VNĐ) *</label>
              <input
                type="number"
                className="form-control"
                min="0"
                step="1000"
                value={formData.price || ''}
                onChange={(e) => handleChange('price', parseInt(e.target.value) || 0)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Giá gốc (VNĐ)</label>
              <input
                type="number"
                className="form-control"
                min="0"
                step="1000"
                value={formData.originalPrice || ''}
                onChange={(e) => handleChange('originalPrice', parseInt(e.target.value) || 0)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Số lượng tồn kho *</label>
              <input
                type="number"
                className="form-control"
                min="0"
                value={formData.stock || ''}
                onChange={(e) => handleChange('stock', parseInt(e.target.value) || 0)}
                required
              />
            </div>

            {/* Image Upload - Full Width */}
            <div className="form-group image-upload-group">
              <ImageUploader
                value={formData.imageUrl}
                onChange={(imageUrl) => handleChange('imageUrl', imageUrl)}
                label="Hình ảnh sách"
                required
              />
            </div>

            <div className="form-group full-width">
              <label className="form-label">Mô tả *</label>
              <textarea
                className="form-control"
                rows={4}
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.isNew}
                    onChange={(e) => handleChange('isNew', e.target.checked)}
                  />
                  <span>Sách mới</span>
                </label>
              </div>
            </div>

            <div className="form-group">
              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.isBestseller}
                    onChange={(e) => handleChange('isBestseller', e.target.checked)}
                  />
                  <span>Sách bán chạy</span>
                </label>
              </div>
            </div>
          </div>
        </form>

        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Hủy
          </button>
          <button 
            type="submit" 
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="loading-spinner"></div>
                Đang cập nhật...
              </>
            ) : (
              'Cập nhật'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBookModal;