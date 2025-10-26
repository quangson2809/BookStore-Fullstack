import React, { useState } from 'react';
import './CheckoutModal.css';

interface CheckoutItem {
    id: number;
    title: string;
    quantity: number;
    price: number;
    imageUrl: string;
}

interface CheckoutModalProps {
    isOpen: boolean;
    onClose: () => void;
    items: CheckoutItem[];
    total: number;
    onConfirm: (shippingInfo: ShippingInfo) => void;
}

export interface ShippingInfo {
    fullName: string;
    phone: string;
    email: string;
    address: string;
    ward: string;
    district: string;
    city: string;
    note?: string;
    paymentMethod: 'cod' | 'banking';
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, items, total, onConfirm }) => {
    const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
        fullName: 'Nguyễn Văn A',
        phone: '0123456789',
        email: 'nguyenvana@email.com',
        address: '',
        ward: '',
        district: '',
        city: '',
        note: '',
        paymentMethod: 'cod'
    });

    const [errors, setErrors] = useState<Partial<Record<keyof ShippingInfo, string>>>({});

    const cities = [
        'Hồ Chí Minh',
        'Hà Nội',
        'Đà Nẵng',
        'Cần Thơ',
        'Hải Phòng',
        'Biên Hòa',
        'Nha Trang',
        'Huế'
    ];

    const handleChange = (field: keyof ShippingInfo, value: string) => {
        setShippingInfo(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: Partial<Record<keyof ShippingInfo, string>> = {};

        if (!shippingInfo.address.trim()) {
            newErrors.address = 'Vui lòng nhập địa chỉ';
        }
        if (!shippingInfo.ward.trim()) {
            newErrors.ward = 'Vui lòng nhập phường/xã';
        }
        if (!shippingInfo.district.trim()) {
            newErrors.district = 'Vui lòng nhập quận/huyện';
        }
        if (!shippingInfo.city) {
            newErrors.city = 'Vui lòng chọn tỉnh/thành phố';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            onConfirm(shippingInfo);
        }
    };

    if (!isOpen) return null;

    const shippingFee = 0;
    const finalTotal = total + shippingFee;

    return (
        <div className="checkout-modal-overlay" onClick={onClose}>
            <div className="checkout-modal" onClick={(e) => e.stopPropagation()}>
                <div className="checkout-modal-header">
                    <h2>Xác nhận đơn hàng</h2>
                    <button className="close-button" onClick={onClose}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>

                <div className="checkout-modal-body">
                    <form onSubmit={handleSubmit}>
                        {/* Thông tin khách hàng */}
                        <div className="checkout-section">
                            <h3 className="section-title">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                    <circle cx="12" cy="7" r="4" />
                                </svg>
                                Thông tin khách hàng
                            </h3>

                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label">Họ và tên *</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        value={shippingInfo.fullName}
                                        onChange={(e) => handleChange('fullName', e.target.value)}
                                        readOnly
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Số điện thoại *</label>
                                    <input
                                        type="tel"
                                        className="form-input"
                                        value={shippingInfo.phone}
                                        onChange={(e) => handleChange('phone', e.target.value)}
                                        readOnly
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-input"
                                    value={shippingInfo.email}
                                    onChange={(e) => handleChange('email', e.target.value)}
                                    readOnly
                                />
                            </div>
                        </div>

                        {/* Địa chỉ giao hàng */}
                        <div className="checkout-section">
                            <h3 className="section-title">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                    <circle cx="12" cy="10" r="3" />
                                </svg>
                                Địa chỉ giao hàng
                            </h3>

                            <div className="form-group">
                                <label className="form-label">Địa chỉ cụ thể *</label>
                                <input
                                    type="text"
                                    className={`form-input ${errors.address ? 'error' : ''}`}
                                    placeholder="Số nhà, tên đường..."
                                    value={shippingInfo.address}
                                    onChange={(e) => handleChange('address', e.target.value)}
                                />
                                {errors.address && <span className="error-message">{errors.address}</span>}
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label">Phường/Xã *</label>
                                    <input
                                        type="text"
                                        className={`form-input ${errors.ward ? 'error' : ''}`}
                                        placeholder="Nhập phường/xã"
                                        value={shippingInfo.ward}
                                        onChange={(e) => handleChange('ward', e.target.value)}
                                    />
                                    {errors.ward && <span className="error-message">{errors.ward}</span>}
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Quận/Huyện *</label>
                                    <input
                                        type="text"
                                        className={`form-input ${errors.district ? 'error' : ''}`}
                                        placeholder="Nhập quận/huyện"
                                        value={shippingInfo.district}
                                        onChange={(e) => handleChange('district', e.target.value)}
                                    />
                                    {errors.district && <span className="error-message">{errors.district}</span>}
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Tỉnh/Thành phố *</label>
                                <select
                                    className={`form-input ${errors.city ? 'error' : ''}`}
                                    value={shippingInfo.city}
                                    onChange={(e) => handleChange('city', e.target.value)}
                                >
                                    <option value="">Chọn tỉnh/thành phố</option>
                                    {cities.map(city => (
                                        <option key={city} value={city}>{city}</option>
                                    ))}
                                </select>
                                {errors.city && <span className="error-message">{errors.city}</span>}
                            </div>

                            <div className="form-group">
                                <label className="form-label">Ghi chú (Tùy chọn)</label>
                                <textarea
                                    className="form-input"
                                    rows={3}
                                    placeholder="Ghi chú thêm về địa chỉ giao hàng..."
                                    value={shippingInfo.note}
                                    onChange={(e) => handleChange('note', e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Phương thức thanh toán */}
                        <div className="checkout-section">
                            <h3 className="section-title">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                                    <line x1="1" y1="10" x2="23" y2="10" />
                                </svg>
                                Phương thức thanh toán
                            </h3>

                            <div className="payment-methods">
                                <label className={`payment-option ${shippingInfo.paymentMethod === 'cod' ? 'active' : ''}`}>
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="cod"
                                        checked={shippingInfo.paymentMethod === 'cod'}
                                        onChange={(e) => handleChange('paymentMethod', e.target.value)}
                                    />
                                    <div className="payment-option-content">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <line x1="12" y1="1" x2="12" y2="23" />
                                            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                                        </svg>
                                        <div>
                                            <strong>Thanh toán khi nhận hàng (COD)</strong>
                                            <small>Thanh toán bằng tiền mặt khi nhận hàng</small>
                                        </div>
                                    </div>
                                </label>

                                <label className={`payment-option ${shippingInfo.paymentMethod === 'banking' ? 'active' : ''}`}>
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="banking"
                                        checked={shippingInfo.paymentMethod === 'banking'}
                                        onChange={(e) => handleChange('paymentMethod', e.target.value)}
                                    />
                                    <div className="payment-option-content">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                                            <line x1="1" y1="10" x2="23" y2="10" />
                                        </svg>
                                        <div>
                                            <strong>Chuyển khoản ngân hàng</strong>
                                            <small>Chuyển khoản qua Internet Banking/QR Code</small>
                                        </div>
                                    </div>
                                </label>
                            </div>
                        </div>

                        {/* Đơn hàng */}
                        <div className="checkout-section">
                            <h3 className="section-title">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="9" cy="21" r="1" />
                                    <circle cx="20" cy="21" r="1" />
                                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                                </svg>
                                Thông tin đơn hàng
                            </h3>

                            <div className="order-items">
                                {items.map((item) => (
                                    <div key={item.id} className="order-item">
                                        <img src={item.imageUrl} alt={item.title} className="item-image" />
                                        <div className="item-details">
                                            <h4>{item.title}</h4>
                                            <p className="item-quantity">Số lượng: {item.quantity}</p>
                                        </div>
                                        <div className="item-price">
                                            {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="order-summary">
                                <div className="summary-row">
                                    <span>Tạm tính:</span>
                                    <span>{total.toLocaleString('vi-VN')}đ</span>
                                </div>
                                <div className="summary-row">
                                    <span>Phí vận chuyển:</span>
                                    <span className="free-shipping">Miễn phí</span>
                                </div>
                                <div className="summary-row total">
                                    <span>Tổng cộng:</span>
                                    <span className="total-amount">{finalTotal.toLocaleString('vi-VN')}đ</span>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="checkout-modal-footer">
                    <button type="button" className="btn-cancel" onClick={onClose}>
                        Hủy
                    </button>
                    <button type="submit" className="btn-confirm" onClick={handleSubmit}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                            <polyline points="22,4 12,14.01 9,11.01" />
                        </svg>
                        Xác nhận đặt hàng
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CheckoutModal;