import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import './AuthForms.css';

interface CustomerSignupRequest {
    FirstName: string;
    LastName: string;
    PhoneNumber: string;
    Password: string;
    Email: string;
}

interface StatusResponse {
    success: boolean;
    message: string;
}

interface ErrorResponse {
    message: string;
}

const RegisterForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Validation
        if (formData.password !== formData.confirmPassword) {
            setError('Mật khẩu xác nhận không khớp');
            return;
        }

        if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.password) {
            setError('Vui lòng điền đầy đủ thông tin');
            return;
        }

        // Validate phone number format (basic)
        if (!/^[0-9]{10}$/.test(formData.phone)) {
            setError('Số điện thoại phải có 10 chữ số');
            return;
        }

        // Validate email format
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            setError('Email không hợp lệ');
            return;
        }

        // Validate password length
        if (formData.password.length < 6) {
            setError('Mật khẩu phải có ít nhất 6 ký tự');
            return;
        }

        setIsLoading(true);

        try {
            const requestData: CustomerSignupRequest = {
                FirstName: formData.firstName,
                LastName: formData.lastName,
                PhoneNumber: formData.phone,
                Password: formData.password,
                Email: formData.email
            };

            const response = await axios.post<StatusResponse>(
                'http://localhost:5121/api/Auth/customer/signup',
                requestData
            );

            if (response.data.success) {
                alert('Đăng ký thành công! Vui lòng đăng nhập.');
                navigate('/login');
            } else {
                setError(response.data.message || 'Đăng ký thất bại');
            }
        } catch (err) {
            const error = err as AxiosError<ErrorResponse>;
            if (error.response?.data?.message) {
                setError(error.response.data.message);
            } else if (error.message) {
                setError(error.message);
            } else {
                setError('Có lỗi xảy ra khi đăng ký. Vui lòng thử lại.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const updateFormData = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (error) setError('');
    };

    return (
        <div className="auth-card">
            <div className="auth-header">
                <h1 className="auth-title">Đăng ký</h1>
                <p className="auth-description">Tạo tài khoản mới</p>
            </div>

            <div className="auth-content">
                <form onSubmit={handleSubmit} className="auth-form">
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

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="firstName" className="form-label">Họ *</label>
                            <input
                                id="firstName"
                                placeholder="Nguyễn"
                                value={formData.firstName}
                                onChange={(e) => updateFormData('firstName', e.target.value)}
                                className="form-input"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName" className="form-label">Tên *</label>
                            <input
                                id="lastName"
                                placeholder="Văn A"
                                value={formData.lastName}
                                onChange={(e) => updateFormData('lastName', e.target.value)}
                                className="form-input"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Email *</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="your@email.com"
                            value={formData.email}
                            onChange={(e) => updateFormData('email', e.target.value)}
                            className="form-input"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone" className="form-label">Số điện thoại *</label>
                        <input
                            id="phone"
                            type="tel"
                            placeholder="0123456789"
                            value={formData.phone}
                            onChange={(e) => updateFormData('phone', e.target.value)}
                            className="form-input"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password" className="form-label">Mật khẩu *</label>
                        <div className="password-container">
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Nhập mật khẩu (tối thiểu 6 ký tự)"
                                value={formData.password}
                                onChange={(e) => updateFormData('password', e.target.value)}
                                className="form-input"
                                style={{ paddingRight: '45px' }}
                                required
                            />
                            <button
                                type="button"
                                className="password-toggle"
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

                    <div className="form-group">
                        <label htmlFor="confirmPassword" className="form-label">Xác nhận mật khẩu *</label>
                        <div className="password-container">
                            <input
                                id="confirmPassword"
                                type={showConfirmPassword ? 'text' : 'password'}
                                placeholder="Nhập lại mật khẩu"
                                value={formData.confirmPassword}
                                onChange={(e) => updateFormData('confirmPassword', e.target.value)}
                                className="form-input"
                                style={{ paddingRight: '45px' }}
                                required
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                aria-label={showConfirmPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                            >
                                {showConfirmPassword ? (
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

                    <button type="submit" className="auth-submit-btn" disabled={isLoading}>
                        {isLoading ? 'Đang đăng ký...' : 'Đăng ký'}
                    </button>
                </form>

                <div className="auth-divider">
                    <div className="divider-line"></div>
                </div>

                <div className="auth-footer">
                    <span className="auth-footer-text">Đã có tài khoản? </span>
                    <Link to="/login" className="auth-link">
                        Đăng nhập
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;