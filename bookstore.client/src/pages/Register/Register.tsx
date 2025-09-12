import React from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../../components/Auth/RegisterForm';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();

  const handleRegisterSuccess = () => {
    navigate('/');
  };

  return (
    <div className="auth-page">
      <main className="auth-main">
        <div className="auth-container">
          <RegisterForm onSuccess={handleRegisterSuccess} />
        </div>
      </main>
    </div>
  );
};

export default Register;