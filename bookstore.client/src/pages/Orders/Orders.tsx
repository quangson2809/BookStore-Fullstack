import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { orderService, type OrderDetailResponse } from '@/services/orderService';
import './Orders.css';

const Orders: React.FC = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState<OrderDetailResponse[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadOrders();
    }, [user]);

    const loadOrders = async () => {
        if (!user) {
            setIsLoading(false);
            return;
        }

        try {
            setIsLoading(true);
            setError(null);
            const data = await orderService.getOrdersByUserId(user.id);
            setOrders(data);
        } catch (err) {
            console.error('Error loading orders:', err);
            setError('Không th? t?i danh sách ??n hàng');
        } finally {
            setIsLoading(false);
        }
    };

    const getStatusBadge = (status: string) => {
        const statusMap: Record<string, { label: string; className: string }> = {
            Pending: { label: 'Ch? xác nh?n', className: 'pending' },
            Processing: { label: '?ang x? lý', className: 'processing' },
            Shipping: { label: '?ang giao', className: 'shipping' },
            Done: { label: '?ã giao', className: 'done' },
            Cancelled: { label: '?ã h?y', className: 'cancelled' }
        };

        const statusInfo = statusMap[status] || { label: status, className: 'default' };
        return <span className={`status-badge ${statusInfo.className}`}>{statusInfo.label}</span>;
    };

    if (!user) {
        return (
            <div className="orders-page">
                <div className="container">
                    <div className="empty-state">
                        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M9 2v6m6-6v6M4 10h16M3 6h18a1 1 0 011 1v12a1 1 0 01-1 1H3a1 1 0 01-1-1V7a1 1 0 011-1z" />
                        </svg>
                        <p>Vui lòng ??ng nh?p ?? xem ??n hàng</p>
                    </div>
                </div>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="orders-page">
                <div className="container">
                    <h1>??n hàng c?a tôi</h1>
                    <div className="loading-state">
                        <p>?ang t?i ??n hàng...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="orders-page">
                <div className="container">
                    <h1>??n hàng c?a tôi</h1>
                    <div className="error-state">
                        <p>{error}</p>
                        <button onClick={loadOrders} className="btn-retry">Th? l?i</button>
                    </div>
                </div>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="orders-page">
                <div className="container">
                    <h1>??n hàng c?a tôi</h1>
                    <div className="empty-state">
                        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <circle cx="9" cy="21" r="1" />
                            <circle cx="20" cy="21" r="1" />
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                        </svg>
                        <p>B?n ch?a có ??n hàng nào</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="orders-page">
            <div className="container">
                <h1>??n hàng c?a tôi</h1>

                <div className="orders-list">
                    {orders.map((order) => (
                        <div key={order.ordersId} className="order-card">
                            <div className="order-header">
                                <div className="order-info">
                                    <span className="order-id">??n hàng #{order.ordersId}</span>
                                    {order.createTime && (
                                        <span className="order-date">
                                            Ngày ??t: {new Date(order.createTime).toLocaleDateString('vi-VN')}
                                        </span>
                                    )}
                                </div>
                                {getStatusBadge(order.ordersStatus)}
                            </div>

                            <div className="order-customer-info">
                                <div className="info-row">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                        <circle cx="12" cy="7" r="4" />
                                    </svg>
                                    <span>{order.fullName}</span>
                                </div>
                                <div className="info-row">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                    </svg>
                                    <span>{order.phone}</span>
                                </div>
                                <div className="info-row">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                        <circle cx="12" cy="10" r="3" />
                                    </svg>
                                    <span>{order.address}</span>
                                </div>
                            </div>

                            <div className="order-items">
                                {order.orderDetails.map((item) => (
                                    <div key={item.id} className="order-item">
                                        {item.imageLink && (
                                            <img 
                                                src={item.imageLink} 
                                                alt={item.name} 
                                                className="order-item-image"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop';
                                                }}
                                            />
                                        )}
                                        <div className="order-item-details">
                                            <h4>{item.name}</h4>
                                            <p>S? l??ng: {item.quantity}</p>
                                        </div>
                                        <div className="order-item-price">
                                            {item.totalPrice.toLocaleString('vi-VN')}?
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="order-footer">
                                <div className="order-total">
                                    <span>T?ng ti?n:</span>
                                    <span className="total-amount">
                                        {order.toalPrice.toLocaleString('vi-VN')}?
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Orders;
