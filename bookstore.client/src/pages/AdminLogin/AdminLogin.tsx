import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';
import axios from 'axios';
interface AdminLoginRequest {
    Username: string;
    Password: string;
}

const AdminLogin = () => {
    const [formData, setFormData] = useState<AdminLoginRequest>({
        Username: '',
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
            const response = await axios.post('http://localhost:5121/api/admin/Auth/login', formData);
            // Mock admin login - replace with actual API call
            //await new Promise(resolve => setTimeout(resolve, 1000));

            const { success,token, message } = response.data;
            // Mock validation - admin credentials
            if (success) {
                // Store admin token/session
                localStorage.setItem('adminToken', 'mock-admin-token');
                localStorage.setItem('userRole', 'admin');
                localStorage.setItem('adminUsername', formData.Username);

                alert(message);
                navigate('/admin/dashboard'); // Redirect to admin dashboard
            } else {
                setError(message);
            }
        } catch (error) {
            setError('Có lỗi xảy ra khi đăng nhập');
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (field: keyof AdminLoginRequest, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (error) setError(''); // Clear error when user types
    };

    return (
        <div className="admin-login-page">
            <div className="admin-login-container">
                {/* Header Section */}
                <div className="admin-login-header">
                    <div className="admin-logo">
                        <div className="logo-icon">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                            </svg>
                        </div>
                        <span className="logo-text">BookStore Admin</span>
                    </div>
                    <h1 className="admin-title">Đăng nhập quản trị</h1>
                    <p className="admin-subtitle">Truy cập vào hệ thống quản lý</p>
                </div>

                {/* Login Form */}
                <div className="admin-login-card">
                    <form onSubmit={handleSubmit} className="admin-form">
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

                        <div className="form-group">
                            <label htmlFor="admin-username" className="form-label">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                    <circle cx="12" cy="7" r="4" />
                                </svg>
                                Tên đăng nhập
                            </label>
                            <input
                                id="admin-username"
                                type="text"
                                placeholder="Nhập tên đăng nhập"
                                value={formData.Username}
                                onChange={(e) => handleInputChange('Username', e.target.value)}
                                className="form-input"
                                required
                                autoComplete="Username"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="admin-password" className="form-label">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                    <circle cx="12" cy="16" r="1" />
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                </svg>
                                Mật khẩu
                            </label>
                            <div className="password-container">
                                <input
                                    id="admin-password"
                                    type={showPassword ? 'text' : 'Password'}
                                    placeholder="Nhập mật khẩu"
                                    value={formData.Password}
                                    onChange={(e) => handleInputChange('Password', e.target.value)}
                                    className="form-input password-input"
                                    required
                                    autoComplete="current-password"
                                />
                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                                >
                                    {showPassword ? (
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                                            <line x1="1" y1="1" x2="23" y2="23" />
                                        </svg>
                                    ) : (
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                            <circle cx="12" cy="12" r="3" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="admin-submit-btn"
                            disabled={isLoading || !formData.Username || !formData.Password}
                        >
                            {isLoading ? (
                                <>
                                    <div className="loading-spinner"></div>
                                    Đang đăng nhập...
                                </>
                            ) : (
                                <>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                                        <polyline points="10,17 15,12 10,7" />
                                        <line x1="15" y1="12" x2="3" y2="12" />
                                    </svg>
                                    Đăng nhập
                                </>
                            )}
                        </button>
                    </form>

                    {/* Demo Credentials */}
                    <div className="demo-credentials">
                        <h4>Thông tin đăng nhập demo:</h4>
                        <div className="demo-info">
                            <p><strong>Tên đăng nhập:</strong> admin</p>
                            <p><strong>Mật khẩu:</strong> admin123</p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="admin-footer">
                    <p>&copy; 2024 BookStore Vietnam. Hệ thống quản trị.</p>
                    <a href="/" className="back-to-site">
                        ← Về trang chủ
                    </a>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;