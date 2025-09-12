import React from 'react';
import './RecentOrders.css';

const RecentOrders: React.FC = () => {
  const orders = [
    {
      id: 'DH001',
      customer: 'Nguyễn Văn A',
      items: ['Nhà Giả Kim', 'Sapiens'],
      total: 245000,
      status: 'pending',
      date: '2024-01-15'
    },
    {
      id: 'DH002',
      customer: 'Trần Thị B',
      items: ['Tôi Thấy Hoa Vàng Trên Cỏ Xanh'],
      total: 85000,
      status: 'completed',
      date: '2024-01-15'
    },
    {
      id: 'DH003',
      customer: 'Lê Văn C',
      items: ['Chiến Tranh và Hòa Bình', 'Nghĩ Giàu Làm Giàu'],
      total: 320000,
      status: 'shipping',
      date: '2024-01-14'
    },
    {
      id: 'DH004',
      customer: 'Phạm Thị D',
      items: ['Lập Trình Python'],
      total: 145000,
      status: 'pending',
      date: '2024-01-14'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'orange';
      case 'completed': return 'green';
      case 'shipping': return 'blue';
      case 'cancelled': return 'red';
      default: return 'gray';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Chờ xử lý';
      case 'completed': return 'Hoàn thành';
      case 'shipping': return 'Đang giao';
      case 'cancelled': return 'Đã hủy';
      default: return status;
    }
  };

  return (
    <div className="recent-orders">
      <div className="section-header">
        <h2>Đơn hàng gần đây</h2>
        <button className="view-all-btn">Xem tất cả</button>
      </div>

      <div className="orders-table">
        <table>
          <thead>
            <tr>
              <th>Mã đơn</th>
              <th>Khách hàng</th>
              <th>Sản phẩm</th>
              <th>Tổng tiền</th>
              <th>Trạng thái</th>
              <th>Ngày đặt</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="order-id">{order.id}</td>
                <td>{order.customer}</td>
                <td className="order-items">
                  {order.items.length > 1 
                    ? `${order.items[0]} +${order.items.length - 1} khác`
                    : order.items[0]
                  }
                </td>
                <td className="order-total">{order.total.toLocaleString('vi-VN')}đ</td>
                <td>
                  <span className={`status-badge ${getStatusColor(order.status)}`}>
                    {getStatusText(order.status)}
                  </span>
                </td>
                <td>{new Date(order.date).toLocaleDateString('vi-VN')}</td>
                <td>
                  <div className="order-actions">
                    <button className="action-btn view">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                    </button>
                    <button className="action-btn edit">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                        <path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrders;