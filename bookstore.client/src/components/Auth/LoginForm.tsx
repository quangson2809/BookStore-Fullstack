import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AuthForms.css';
import axios, { AxiosError } from 'axios';

interface CustomerLoginRequest {
    PhoneNumber: string;
    Password: string;
}

interface CustomerLoginResponse {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    cartId: number;
    orderId: number;
    orderIds: number[];
    success: boolean;
    message?: string;
}

interface ErrorResponse {
    message: string;
}

const LoginForm = () => {
    const [formData, setFormData] = useState<CustomerLoginRequest>({
        PhoneNumber: '',
        Password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await axios.post<CustomerLoginResponse>(
                'http://localhost:5121/api/Auth/customer/login',
                formData
            );
            const data = response.data;

            if (data.success) {
                // Lưu thông tin người dùng vào localStorage
                localStorage.setItem('userInfo', JSON.stringify({
                    userId: data.userId,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    phone: data.phone,
                    cartId: data.cartId,
                    orderIds: data.orderIds
                }));
                localStorage.setItem('isLoggedIn', 'true');

                // Trigger page reload để cập nhật header
                window.location.href = '/';
            } else {
                setError(data.message || 'Đăng nhập thất bại');
            }
        } catch (err) {
            const error = err as AxiosError<ErrorResponse>;
            if (error.response?.data?.message) {
                setError(error.response.data.message);
            } else {
                setError('Có lỗi xảy ra khi đăng nhập. Vui lòng thử lại.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (field: keyof CustomerLoginRequest, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (error) setError('');
    };

    return (
        <div className="login-card">
            <div className="login-header">
                <h1 className="login-title">Đăng nhập</h1>
                <p className="login-description">Đăng nhập vào tài khoản của bạn</p>
            </div>

            <div className="login-content">
                <form onSubmit={handleSubmit} className="login-form">
                    {error && (
                        <div className="error-message">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="15" y1="9" x2="9" y2="15" />
                                <line x1="9" y1="9" x2="15" y2="15" />
                            </svg>
                            {error}
                        </div>
                    )}

                    <div className="login-form-group">
                        <label htmlFor="phone" className="login-form-label">Số điện thoại</label>
                        <input
                            id="phone"
                            type="tel"
                            placeholder="0123456789"
                            value={formData.PhoneNumber}
                            onChange={(e) => handleInputChange('PhoneNumber', e.target.value)}
                            className="login-form-input"
                            required
                        />
                    </div>

                    <div className="login-form-group">
                        <label htmlFor="password" className="login-form-label">Mật khẩu</label>
                        <div className="login-password-container">
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Nhập mật khẩu"
                                value={formData.Password}
                                onChange={(e) => handleInputChange('Password', e.target.value)}
                                className="login-form-input login-password-input"
                                required
                            />
                            <button
                                type="button"
                                className="login-password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                            >
                                {showPassword ? (
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                                        <line x1="1" y1="1" x2="23" y2="23" />
                                    </svg>
                                ) : (
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                        <circle cx="12" cy="12" r="3" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    <button type="submit" className="login-submit-btn" disabled={isLoading}>
                        {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                    </button>
                </form>

                <div className="login-footer">
                    <span className="login-footer-text">Chưa có tài khoản? </span>
                    <Link to="/register" className="login-link">
                        Đăng ký ngay
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;