import React from 'react';
import './UserManagement.css';

const UserManagement: React.FC = () => {
  return (
    <div className="user-management">
      <div className="management-header">
        <h2>Quản lý người dùng</h2>
        <button className="add-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Thêm người dùng
        </button>
      </div>
      
      <div className="management-content">
        <p>Trang quản lý người dùng đang được phát triển...</p>
      </div>
    </div>
  );
};

export default UserManagement;