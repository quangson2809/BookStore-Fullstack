import React, { useState, useRef } from 'react';
import './ImageUploader.css';

interface ImageUploaderProps {
    value?: File[] | string[];  // Support both File array and string array
    onChange: (files: File[]) => void;
    label?: string;
    required?: boolean;
    maxImages?: number;
    existingImages?: string[];  // URLs from server
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
    value = [],
    onChange,
    label = "Hình ảnh sách",
    required = false,
    maxImages = 5,
    existingImages = []
}) => {
    const [uploading, setUploading] = useState(false);
    const [previews, setPreviews] = useState<string[]>([...existingImages]);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [keptExistingImages, setKeptExistingImages] = useState<string[]>([...existingImages]);
    const [dragOver, setDragOver] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = async (files: FileList) => {
        if (!files.length) return;

        const fileArray = Array.from(files);

        // Check total images
        if (previews.length + fileArray.length > maxImages) {
            alert(`Chỉ được upload tối đa ${maxImages} ảnh`);
            return;
        }

        // Validate file types
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        const invalidFiles = fileArray.filter(file => !allowedTypes.includes(file.type));
        if (invalidFiles.length > 0) {
            alert('Chỉ hỗ trợ file ảnh định dạng JPG, PNG, WEBP');
            return;
        }

        // Validate file sizes (max 5MB each)
        const maxSize = 5 * 1024 * 1024;
        const oversizedFiles = fileArray.filter(file => file.size > maxSize);
        if (oversizedFiles.length > 0) {
            alert('Kích thước mỗi file không được vượt quá 5MB');
            return;
        }

        setUploading(true);

        try {
            // Create previews
            const newPreviews: string[] = [];
            for (const file of fileArray) {
                const preview = URL.createObjectURL(file);
                newPreviews.push(preview);
            }

            const updatedPreviews = [...previews, ...newPreviews];
            const updatedFiles = [...selectedFiles, ...fileArray];

            setPreviews(updatedPreviews);
            setSelectedFiles(updatedFiles);

            // Callback with all files (existing kept as empty, new as File objects)
            onChange(updatedFiles);

            await new Promise(resolve => setTimeout(resolve, 500));
        } catch (error) {
            console.error('Error uploading files:', error);
            alert('Có lỗi khi upload ảnh');
        } finally {
            setUploading(false);
        }
    };

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            handleFileSelect(e.target.files);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);

        if (e.dataTransfer.files) {
            handleFileSelect(e.dataTransfer.files);
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

    const handleRemoveImage = (index: number) => {
        const imageToRemove = previews[index];

        // Check if it's an existing image from server
        const existingIndex = keptExistingImages.indexOf(imageToRemove);

        if (existingIndex !== -1) {
            // Remove from existing images
            const updatedKept = keptExistingImages.filter((_, i) => i !== existingIndex);
            setKeptExistingImages(updatedKept);
        } else {
            // Remove from new files
            const newFileIndex = index - keptExistingImages.length;
            const updatedFiles = selectedFiles.filter((_, i) => i !== newFileIndex);
            setSelectedFiles(updatedFiles);
            onChange(updatedFiles);
        }

        // Remove preview
        const updatedPreviews = previews.filter((_, i) => i !== index);
        setPreviews(updatedPreviews);
    };

    const handleRemoveAll = () => {
        setPreviews([]);
        setSelectedFiles([]);
        setKeptExistingImages([]);
        onChange([]);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="image-uploader">
            <div className="uploader-header">
                <label className="uploader-label">
                    {label} {required && <span className="required">*</span>}
                </label>
                {previews.length > 0 && (
                    <button
                        type="button"
                        className="remove-all-btn"
                        onClick={handleRemoveAll}
                    >
                        Xóa tất cả ({previews.length})
                    </button>
                )}
            </div>

            <div className="uploader-content">
                {/* Image Previews Grid */}
                {previews.length > 0 && (
                    <div className="images-grid">
                        {previews.map((preview, index) => (
                            <div key={index} className="image-preview-item">
                                <img src={preview} alt={`Preview ${index + 1}`} />
                                <button
                                    type="button"
                                    className="remove-image-btn"
                                    onClick={() => handleRemoveImage(index)}
                                >
                                    ×
                                </button>
                                {index < keptExistingImages.length && (
                                    <span className="existing-badge">Có sẵn</span>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* Upload Area */}
                {previews.length < maxImages && (
                    <div
                        className={`upload-area ${dragOver ? 'drag-over' : ''}`}
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <div className="upload-placeholder">
                            {uploading ? (
                                <div className="uploading">
                                    <div className="upload-spinner"></div>
                                    <p>Đang tải ảnh...</p>
                                </div>
                            ) : (
                                <>
                                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                        <circle cx="8.5" cy="8.5" r="1.5" />
                                        <polyline points="21,15 16,10 5,21" />
                                    </svg>
                                    <p className="upload-text">
                                        <span>Kéo thả ảnh vào đây hoặc</span>
                                        <span className="upload-link">chọn file</span>
                                    </p>
                                    <p className="upload-hint">
                                        Hỗ trợ JPG, PNG, WEBP (tối đa 5MB mỗi file)
                                    </p>
                                    <p className="upload-count">
                                        {previews.length}/{maxImages} ảnh
                                    </p>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileInputChange}
                style={{ display: 'none' }}
            />
        </div>
    );
};

export default ImageUploader;