import { useState } from 'react';
import { Link } from 'react-router-dom';
import './AuthForms.css';

interface LoginFormProps {
  onSuccess?: () => void;
}

const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Mock login - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (phone && password) {
        alert('Đăng nhập thành công!');
        onSuccess?.();
      } else {
        alert('Số điện thoại hoặc mật khẩu không chính xác');
      }
    } catch (error) {
      alert('Có lỗi xảy ra khi đăng nhập');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-card">
      <div className="login-header">
        <h1 className="login-title">Đăng nhập</h1>
        <p className="login-description">Đăng nhập vào tài khoản của bạn</p>
      </div>
      
      <div className="login-content">
        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-form-group">
            <label htmlFor="phone" className="login-form-label">Số điện thoại</label>
            <input
              id="phone"
              type="tel"
              placeholder="0123456789"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-form-input login-password-input"
                required
              />
              <button
                type="button"
                className="login-password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
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