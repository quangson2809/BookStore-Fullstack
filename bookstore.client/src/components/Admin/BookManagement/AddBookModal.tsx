import React, { useState } from 'react';
import { BookFormData, bookService } from '../../../services/bookService';
import ImageUploader from '../../ImageUploader';
import './AddBookModal.css';

interface AddBookModalProps {
  onClose: () => void;
  onSuccess: () => void; // ✅ Changed from onSubmit
}

const categories = [
  { id: 1, name: 'Văn học' },
  { id: 2, name: 'Kinh tế' },
  { id: 3, name: 'Thiếu nhi' },
  { id: 4, name: 'Khoa học' },
  { id: 5, name: 'Công nghệ' },
  { id: 6, name: 'Tâm lý' },
  { id: 7, name: 'Lịch sử' },
  { id: 8, name: 'Ngoại ngữ' }
];

const AddBookModal: React.FC<AddBookModalProps> = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState<BookFormData>({
    name: '',
    isbn: '',
    author: '',
    publisher: '',
    quantity: 0,
    salePrice: 0,
    originalPrice: 0,
    pageNumber: 0,
    publishTime: '',
    categoryId: 1,
    language: 'Tiếng Việt',
    images: []
  });
  const [loading, setLoading] = useState(false);

  const handleImagesChange = (files: File[]) => {
    setFormData(prev => ({ ...prev, images: files }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.isbn || !formData.author || !formData.publisher) {
      alert('Vui lòng điền đầy đủ thông tin bắt buộc');
      return;
    }

    if (!formData.images || formData.images.length === 0) {
      alert('Vui lòng upload ít nhất 1 ảnh');
      return;
    }

    if (formData.salePrice <= 0 || formData.originalPrice <= 0) {
      alert('Giá sách phải lớn hơn 0');
      return;
    }

    if (formData.pageNumber <= 0) {
      alert('Số trang phải lớn hơn 0');
      return;
    }

    setLoading(true);

    try {
      await bookService.addBook(formData);
      alert('Thêm sách thành công!');
      onSuccess(); // ✅ Call onSuccess
      onClose();
    } catch (error) {
      console.error('Error adding book:', error);
      alert('Có lỗi xảy ra khi thêm sách');
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
          <h3>Thêm sách mới</h3>
          <button className="close-btn" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          <div className="form-grid">
            {/* Tên sách */}
            <div className="form-group">
              <label className="form-label">Tên sách *</label>
              <input
                type="text"
                className="form-control"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="Nhập tên sách"
                required
              />
            </div>

            {/* ISBN */}
            <div className="form-group">
              <label className="form-label">ISBN *</label>
              <input
                type="text"
                className="form-control"
                value={formData.isbn}
                onChange={(e) => handleChange('isbn', e.target.value)}
                placeholder="978-0-12-345678-9"
                required
              />
            </div>

            {/* Tác giả */}
            <div className="form-group">
              <label className="form-label">Tác giả *</label>
              <input
                type="text"
                className="form-control"
                value={formData.author}
                onChange={(e) => handleChange('author', e.target.value)}
                placeholder="Nhập tên tác giả"
                required
              />
            </div>

            {/* Nhà xuất bản */}
            <div className="form-group">
              <label className="form-label">Nhà xuất bản *</label>
              <input
                type="text"
                className="form-control"
                value={formData.publisher}
                onChange={(e) => handleChange('publisher', e.target.value)}
                placeholder="Nhập tên nhà xuất bản"
                required
              />
            </div>

            {/* Danh mục */}
            <div className="form-group">
              <label className="form-label">Danh mục *</label>
              <select
                className="form-control"
                value={formData.categoryId}
                onChange={(e) => handleChange('categoryId', parseInt(e.target.value))}
                required
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            {/* Ngôn ngữ */}
            <div className="form-group">
              <label className="form-label">Ngôn ngữ *</label>
              <select
                className="form-control"
                value={formData.language}
                onChange={(e) => handleChange('language', e.target.value)}
                required
              >
                <option value="Tiếng Việt">Tiếng Việt</option>
                <option value="English">English</option>
                <option value="中文">中文</option>
                <option value="日本語">日本語</option>
                <option value="한국어">한국어</option>
              </select>
            </div>

            {/* Số lượng */}
            <div className="form-group">
              <label className="form-label">Số lượng *</label>
              <input
                type="number"
                className="form-control"
                min="0"
                value={formData.quantity || ''}
                onChange={(e) => handleChange('quantity', parseInt(e.target.value) || 0)}
                placeholder="0"
                required
              />
            </div>

            {/* Số trang */}
            <div className="form-group">
              <label className="form-label">Số trang *</label>
              <input
                type="number"
                className="form-control"
                min="1"
                value={formData.pageNumber || ''}
                onChange={(e) => handleChange('pageNumber', parseInt(e.target.value) || 0)}
                placeholder="0"
                required
              />
            </div>

            {/* Giá bán */}
            <div className="form-group">
              <label className="form-label">Giá bán (VNĐ) *</label>
              <input
                type="number"
                className="form-control"
                min="0"
                step="1000"
                value={formData.salePrice || ''}
                onChange={(e) => handleChange('salePrice', parseInt(e.target.value) || 0)}
                placeholder="0"
                required
              />
            </div>

            {/* Giá gốc */}
            <div className="form-group">
              <label className="form-label">Giá gốc (VNĐ) *</label>
              <input
                type="number"
                className="form-control"
                min="0"
                step="1000"
                value={formData.originalPrice || ''}
                onChange={(e) => handleChange('originalPrice', parseInt(e.target.value) || 0)}
                placeholder="0"
                required
              />
            </div>

            {/* Ngày xuất bản */}
            <div className="form-group">
              <label className="form-label">Ngày xuất bản *</label>
              <input
                type="date"
                className="form-control"
                value={formData.publishTime}
                onChange={(e) => handleChange('publishTime', e.target.value)}
                required
              />
            </div>

            {/* Image Upload - Full Width */}
            <div className="form-group image-upload-group">
              <ImageUploader
                value={formData.images}
                onChange={handleImagesChange}
                label="Hình ảnh sách"
                required
                maxImages={5}
              />
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
                <span className="loading-spinner">⏳</span>
                Đang thêm...
              </>
            ) : (
              'Thêm sách'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddBookModal;