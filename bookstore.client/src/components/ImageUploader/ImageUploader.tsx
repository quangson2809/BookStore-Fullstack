import React, { useState, useRef } from 'react';
import './ImageUploader.css';

interface ImageUploaderProps {
  value?: string;
  onChange: (imageUrl: string) => void;
  label?: string;
  required?: boolean;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ 
  value, 
  onChange, 
  label = "Hình ảnh sách",
  required = false 
}) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string>(value || '');
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (file: File) => {
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      alert('Chỉ hỗ trợ file ảnh định dạng JPG, PNG, WEBP');
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      alert('Kích thước file không được vượt quá 5MB');
      return;
    }

    setUploading(true);

    try {
      // Convert to base64 for preview
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target?.result as string;
        setPreview(base64);
        onChange(base64);
      };
      reader.readAsDataURL(file);

      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Có lỗi khi upload ảnh');
    } finally {
      setUploading(false);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleRemoveImage = () => {
    setPreview('');
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="image-uploader">
      <label className="uploader-label">
        {label} {required && <span className="required">*</span>}
      </label>

      <div className="uploader-content">
        {/* Upload Area */}
        <div 
          className={`upload-area ${dragOver ? 'drag-over' : ''} ${preview ? 'has-image' : ''}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
        >
          {preview ? (
            <div className="image-preview">
              <img src={preview} alt="Preview" />
              <div className="image-overlay">
                <button
                  type="button"
                  className="remove-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveImage();
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="3,6 5,6 21,6"/>
                    <path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6m3,0V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2V6"/>
                  </svg>
                  Xóa
                </button>
                <button
                  type="button"
                  className="change-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                    <path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                  </svg>
                  Đổi ảnh
                </button>
              </div>
            </div>
          ) : (
            <div className="upload-placeholder">
              {uploading ? (
                <div className="uploading">
                  <div className="upload-spinner"></div>
                  <p>Đang tải ảnh...</p>
                </div>
              ) : (
                <>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <polyline points="21,15 16,10 5,21"/>
                  </svg>
                  <p className="upload-text">
                    <span>Kéo thả ảnh vào đây hoặc</span>
                    <span className="upload-link">chọn file</span>
                  </p>
                  <p className="upload-hint">
                    Hỗ trợ JPG, PNG, WEBP (tối đa 5MB)
                  </p>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default ImageUploader;