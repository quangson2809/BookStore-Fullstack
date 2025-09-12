import React from 'react';
import './AdminHeader.css';

interface AdminHeaderProps {
  onLogout: () => void;
  onToggleSidebar: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ onLogout, onToggleSidebar }) => {
  // Get admin username from localStorage
  const adminUsername = localStorage.getItem('adminUsername') || 'Admin';

  return (
    <header className="admin-header">
      <div className="header-left">
        <button className="sidebar-toggle" onClick={onToggleSidebar}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>
        <h1>Bảng điều khiển</h1>
      </div>

      <div className="header-right">
        {/* Admin info and logout */}
        <div className="admin-section">
          <span className="admin-name">Xin chào, {adminUsername}</span>
          <button className="logout-btn" onClick={onLogout}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16,17 21,12 16,7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Đăng xuất
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;