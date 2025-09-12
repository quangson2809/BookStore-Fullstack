import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../../components/Auth/LoginForm';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    navigate('/');
  };

  return (
    <div className="auth-page">
      <main className="auth-main">
        <div className="auth-container">
          <LoginForm onSuccess={handleLoginSuccess} />
        </div>
      </main>
    </div>
  );
};

export default Login;