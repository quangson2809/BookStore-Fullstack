import React, { useState, useEffect } from 'react';
import { orderService, type OrderSummary } from '@/services/orderService';
import './OrderManagement.css';

const OrderManagement: React.FC = () => {
    const [orders, setOrders] = useState<OrderSummary[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filter, setFilter] = useState<'all' | 'Pending' | 'Done'>('all');

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const data = await orderService.getAllOrders();
            setOrders(data);
        } catch (err) {
            console.error('Error loading orders:', err);
            setError('Không thể tải danh sách đơn hàng');
        } finally {
            setIsLoading(false);
        }
    };

    const handleConfirmOrder = async (orderId: number) => {
        if (!window.confirm(`Xác nhận đơn hàng #${orderId}?`)) {
            return;
        }

        try {
            const response = await orderService.confirmOrder(orderId);
            if (response.success) {
                alert(response.message);
                await loadOrders(); // Reload orders
            } else {
                alert(response.message || 'Không thể xác nhận đơn hàng');
            }
        } catch (err) {
            console.error('Error confirming order:', err);
            alert('Có lỗi xảy ra khi xác nhận đơn hàng');
        }
    };

    const getStatusBadge = (status: string) => {
        const statusMap: Record<string, { label: string; className: string }> = {
            Pending: { label: 'Chờ xác nhận', className: 'pending' },
            Done: { label: 'Đã xác nhận', className: 'done' },
            Processing: { label: 'Đang xử lý', className: 'processing' },
            Shipping: { label: 'Đang giao', className: 'shipping' },
            Cancelled: { label: 'Đã hủy', className: 'cancelled' }
        };

        const statusInfo = statusMap[status] || { label: status, className: 'default' };
        return <span className={`status-badge ${statusInfo.className}`}>{statusInfo.label}</span>;
    };

    const filteredOrders = filter === 'all' 
        ? orders 
        : orders.filter(order => order.ordersStatus === filter);

    if (isLoading) {
        return (
            <div className="order-management">
                <h2>Quản lý đơn hàng</h2>
                <div className="loading-state">
                    <p>Đang tải đơn hàng...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="order-management">
                <h2>Quản lý đơn hàng</h2>
                <div className="error-state">
                    <p>{error}</p>
                    <button onClick={loadOrders} className="btn-retry">Thử lại</button>
                </div>
            </div>
        );
    }

    return (
        <div className="order-management">
            <div className="management-header">
                <h2>Quản lý đơn hàng</h2>
                <div className="header-actions">
                    <button onClick={loadOrders} className="export-btn">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0118.8-4.3M22 12.5a10 10 0 01-18.8 4.2"/>
                        </svg>
                        Làm mới
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="order-filters">
                <button 
                    className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                    onClick={() => setFilter('all')}
                >
                    Tất cả ({orders.length})
                </button>
                <button 
                    className={`filter-btn ${filter === 'Pending' ? 'active' : ''}`}
                    onClick={() => setFilter('Pending')}
                >
                    Chờ xác nhận ({orders.filter(o => o.ordersStatus === 'Pending').length})
                </button>
                <button 
                    className={`filter-btn ${filter === 'Done' ? 'active' : ''}`}
                    onClick={() => setFilter('Done')}
                >
                    Đã xác nhận ({orders.filter(o => o.ordersStatus === 'Done').length})
                </button>
            </div>

            {filteredOrders.length === 0 ? (
                <div className="empty-state">
                    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <circle cx="9" cy="21" r="1" />
                        <circle cx="20" cy="21" r="1" />
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                    </svg>
                    <p>Không có đơn hàng nào</p>
                </div>
            ) : (
                <div className="management-content">
                    <table className="orders-table">
                        <thead>
                            <tr>
                                <th>Mã đơn</th>
                                <th>Khách hàng</th>
                                <th>Sản phẩm</th>
                                <th>Tổng tiền</th>
                                <th>Trạng thái</th>
                                <th>Ngày tạo</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.map((order) => (
                                <tr key={order.ordersId}>
                                    <td>
                                        <span className="order-id">#{order.ordersId}</span>
                                    </td>
                                    <td>
                                        <span className="customer-name">{order.fullName}</span>
                                    </td>
                                    <td>
                                        <div className="book-names">
                                            {order.booknames.slice(0, 2).map((name, idx) => (
                                                <div key={idx} className="book-name">{name}</div>
                                            ))}
                                            {order.booknames.length > 2 && (
                                                <div className="book-name-more">
                                                    +{order.booknames.length - 2} sách khác
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td>
                                        <span className="order-total">
                                            {order.toalPrice.toLocaleString('vi-VN')}đ
                                        </span>
                                    </td>
                                    <td>
                                        {getStatusBadge(order.ordersStatus)}
                                    </td>
                                    <td>
                                        {order.createTime 
                                            ? new Date(order.createTime).toLocaleDateString('vi-VN')
                                            : 'N/A'
                                        }
                                    </td>
                                    <td>
                                        {order.ordersStatus === 'Pending' && (
                                            <button
                                                onClick={() => handleConfirmOrder(order.ordersId)}
                                                className="btn-confirm"
                                            >
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                                    <polyline points="22,4 12,14.01 9,11.01" />
                                                </svg>
                                                Xác nhận
                                            </button>
                                        )}
                                        {order.ordersStatus === 'Done' && (
                                            <span className="text-muted">Đã xử lý</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default OrderManagement;