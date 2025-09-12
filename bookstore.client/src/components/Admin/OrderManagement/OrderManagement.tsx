import React from 'react';
import './OrderManagement.css';

const OrderManagement: React.FC = () => {
  return (
    <div className="order-management">
      <div className="management-header">
        <h2>Quản lý đơn hàng</h2>
        <div className="header-actions">
          <button className="filter-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46"/>
            </svg>
            Lọc
          </button>
          <button className="export-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7,10 12,15 17,10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Xuất Excel
          </button>
        </div>
      </div>
      
      <div className="management-content">
        <p>Trang quản lý đơn hàng đang được phát triển...</p>
      </div>
    </div>
  );
};

export default OrderManagement;