import React, { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { useNavigate } from 'react-router-dom';
import CheckoutModal, { ShippingInfo } from '@/components/CheckoutModal';
import './Cart.css';

type TabType = 'cart' | 'pending' | 'completed';

interface OrderItem {
    title: string;
    author: string;
    quantity: number;
    price: number;
    imageUrl: string;
}

interface Order {
    id: string;
    items: OrderItem[];
    total: number;
    status: string;
    orderDate: string;
    estimatedDelivery?: string;
    deliveredDate?: string;
    shippingInfo?: ShippingInfo;
}

const Cart: React.FC = () => {
    const { state, removeFromCart, updateQuantity, clearCart, loadCart } = useCart();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<TabType>('cart');
    const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

    // Mock orders (sẽ được thay thế bằng API sau)
    const [pendingOrders, setPendingOrders] = useState<Order[]>([]);
    const [completedOrders, setCompletedOrders] = useState<Order[]>([]);

    // Load cart on mount
    useEffect(() => {
        if (state.cartId) {
            loadCart();
        }
    }, []);

    const handleCheckout = () => {
        if (state.items.length === 0) {
            alert('Giỏ hàng trống!');
            return;
        }
        setIsCheckoutModalOpen(true);
    };

    const handleConfirmCheckout = (shippingInfo: ShippingInfo) => {
        const newOrderId = `DH${String(Date.now()).slice(-6)}`;
        const newOrder: Order = {
            id: newOrderId,
            items: state.items.map(item => ({
                title: item.book.title,
                author: item.book.author,
                quantity: item.quantity,
                price: item.book.price,
                imageUrl: item.book.imageUrl
            })),
            total: state.total,
            status: 'shipping',
            orderDate: new Date().toISOString().split('T')[0],
            estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            shippingInfo
        };

        setPendingOrders(prev => [newOrder, ...prev]);
        clearCart();
        setIsCheckoutModalOpen(false);
        alert(`Đặt hàng thành công! Mã đơn hàng: ${newOrderId}`);
        
        setTimeout(() => {
            setActiveTab('pending');
        }, 500);
    };

    const handleConfirmDelivery = (orderId: string) => {
        if (window.confirm(`Bạn có chắc chắn đã nhận được đơn hàng ${orderId}?`)) {
            const orderToMove = pendingOrders.find(order => order.id === orderId);
            
            if (orderToMove) {
                const completedOrder: Order = {
                    ...orderToMove,
                    status: 'completed',
                    deliveredDate: new Date().toISOString().split('T')[0]
                };

                setPendingOrders(prev => prev.filter(order => order.id !== orderId));
                setCompletedOrders(prev => [completedOrder, ...prev]);
                alert(`Đơn hàng ${orderId} đã được xác nhận giao thành công!`);

                setTimeout(() => {
                    setActiveTab('completed');
                }, 1000);
            }
        }
    };

    // Render Giỏ hàng
    const renderCartTab = () => {
        if (state.isLoading) {
            return (
                <div className="empty-state">
                    <p>Đang tải giỏ hàng...</p>
                </div>
            );
        }

        if (!state.cartId) {
            return (
                <div className="empty-state">
                    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <circle cx="9" cy="21" r="1" />
                        <circle cx="20" cy="21" r="1" />
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                    </svg>
                    <p>Vui lòng đăng nhập để xem giỏ hàng</p>
                    <button onClick={() => navigate('/login')} className="continue-shopping">
                        Đăng nhập
                    </button>
                </div>
            );
        }

        if (state.items.length === 0) {
            return (
                <div className="empty-state">
                    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <circle cx="9" cy="21" r="1" />
                        <circle cx="20" cy="21" r="1" />
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                    </svg>
                    <p>Giỏ hàng của bạn đang trống</p>
                    <button onClick={() => navigate('/books')} className="continue-shopping">
                        Tiếp tục mua sắm
                    </button>
                </div>
            );
        }

        return (
            <div className="cart-content">
                <div className="cart-items">
                    {state.items.map((item) => (
                        <div key={item.book.id} className="cart-item">
                            <img src={item.book.imageUrl} alt={item.book.title} className="cart-item-image" />

                            <div className="cart-item-details">
                                <h3>{item.book.title}</h3>
                                <p>Tác giả: {item.book.author}</p>
                                <p className="item-price">{item.book.price.toLocaleString('vi-VN')}đ</p>
                            </div>

                            <div className="cart-item-controls">
                                <div className="quantity-controls">
                                    <button
                                        onClick={() => updateQuantity(item.book.id, item.quantity - 1)}
                                        className="quantity-button"
                                        disabled={state.isLoading}
                                    >
                                        -
                                    </button>
                                    <span className="quantity">{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item.book.id, item.quantity + 1)}
                                        className="quantity-button"
                                        disabled={state.isLoading}
                                    >
                                        +
                                    </button>
                                </div>

                                <button
                                    onClick={() => removeFromCart(item.book.id)}
                                    className="remove-button"
                                    disabled={state.isLoading}
                                >
                                    Xóa
                                </button>
                            </div>

                            <div className="item-total">
                                {(item.book.price * item.quantity).toLocaleString('vi-VN')}đ
                            </div>
                        </div>
                    ))}
                </div>

                <div className="cart-summary">
                    <h2>Tổng đơn hàng</h2>
                    <div className="summary-line">
                        <span>Tạm tính:</span>
                        <span>{state.total.toLocaleString('vi-VN')}đ</span>
                    </div>
                    <div className="summary-line">
                        <span>Phí vận chuyển:</span>
                        <span>Miễn phí</span>
                    </div>
                    <div className="summary-line total">
                        <span>Tổng cộng:</span>
                        <span>{state.total.toLocaleString('vi-VN')}đ</span>
                    </div>

                    <button 
                        onClick={handleCheckout} 
                        className="checkout-button"
                        disabled={state.isLoading}
                    >
                        Đặt hàng
                    </button>

                    <button onClick={() => navigate('/books')} className="continue-shopping">
                        Tiếp tục mua sắm
                    </button>
                </div>
            </div>
        );
    };

    // Render Đơn hàng chờ giao
    const renderPendingTab = () => {
        if (pendingOrders.length === 0) {
            return (
                <div className="empty-state">
                    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="1" y="3" width="15" height="13" />
                        <polygon points="16,8 20,8 23,11 23,16 16,16" />
                        <circle cx="5.5" cy="18.5" r="2.5" />
                        <circle cx="18.5" cy="18.5" r="2.5" />
                    </svg>
                    <p>Không có đơn hàng đang giao</p>
                    <button onClick={() => navigate('/books')} className="continue-shopping">
                        Tiếp tục mua sắm
                    </button>
                </div>
            );
        }

        return (
            <div className="orders-list">
                {pendingOrders.map((order) => (
                    <div key={order.id} className="order-card">
                        <div className="order-header">
                            <div className="order-info">
                                <span className="order-id">Mã đơn: {order.id}</span>
                                <span className="order-date">Ngày đặt: {new Date(order.orderDate).toLocaleDateString('vi-VN')}</span>
                            </div>
                            <span className="status-badge shipping">Đang giao hàng</span>
                        </div>

                        <div className="order-items">
                            {order.items.map((item, index) => (
                                <div key={index} className="order-item">
                                    <img src={item.imageUrl} alt={item.title} className="order-item-image" />
                                    <div className="order-item-details">
                                        <h4>{item.title}</h4>
                                        <p>Tác giả: {item.author}</p>
                                        <p>Số lượng: {item.quantity}</p>
                                    </div>
                                    <div className="order-item-price">
                                        {item.price.toLocaleString('vi-VN')}đ
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="order-footer">
                            <div className="delivery-info">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="1" y="3" width="15" height="13" />
                                    <polygon points="16,8 20,8 23,11 23,16 16,16" />
                                    <circle cx="5.5" cy="18.5" r="2.5" />
                                    <circle cx="18.5" cy="18.5" r="2.5" />
                                </svg>
                                <span>Dự kiến giao: {order.estimatedDelivery ? new Date(order.estimatedDelivery).toLocaleDateString('vi-VN') : 'N/A'}</span>
                            </div>
                            <div className="order-total">
                                <span>Tổng tiền:</span>
                                <span className="total-amount">{order.total.toLocaleString('vi-VN')}đ</span>
                            </div>
                        </div>

                        <div className="order-actions">
                            <button 
                                className="btn-confirm-delivery"
                                onClick={() => handleConfirmDelivery(order.id)}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                                    <polyline points="22,4 12,14.01 9,11.01"/>
                                </svg>
                                Đã nhận hàng
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    // Render Đơn hàng đã giao
    const renderCompletedTab = () => {
        if (completedOrders.length === 0) {
            return (
                <div className="empty-state">
                    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22,4 12,14.01 9,11.01" />
                    </svg>
                    <p>Chưa có đơn hàng nào hoàn thành</p>
                    <button onClick={() => navigate('/books')} className="continue-shopping">
                        Tiếp tục mua sắm
                    </button>
                </div>
            );
        }

        return (
            <div className="orders-list">
                {completedOrders.map((order) => (
                    <div key={order.id} className="order-card">
                        <div className="order-header">
                            <div className="order-info">
                                <span className="order-id">Mã đơn: {order.id}</span>
                                <span className="order-date">Ngày đặt: {new Date(order.orderDate).toLocaleDateString('vi-VN')}</span>
                            </div>
                            <span className="status-badge completed">Đã giao hàng</span>
                        </div>

                        <div className="order-items">
                            {order.items.map((item, index) => (
                                <div key={index} className="order-item">
                                    <img src={item.imageUrl} alt={item.title} className="order-item-image" />
                                    <div className="order-item-details">
                                        <h4>{item.title}</h4>
                                        <p>Tác giả: {item.author}</p>
                                        <p>Số lượng: {item.quantity}</p>
                                    </div>
                                    <div className="order-item-price">
                                        {item.price.toLocaleString('vi-VN')}đ
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="order-footer">
                            <div className="delivery-info">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                    <polyline points="22,4 12,14.01 9,11.01" />
                                </svg>
                                <span>Đã giao: {order.deliveredDate ? new Date(order.deliveredDate).toLocaleDateString('vi-VN') : 'N/A'}</span>
                            </div>
                            <div className="order-total">
                                <span>Tổng tiền:</span>
                                <span className="total-amount">{order.total.toLocaleString('vi-VN')}đ</span>
                            </div>
                        </div>

                        <div className="order-actions">
                            <button className="btn-secondary">Mua lại</button>
                            <button className="btn-primary">Đánh giá</button>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="cart">
            <div className="container">
                <h1>Giỏ hàng & Đơn hàng</h1>

                <div className="cart-tabs">
                    <button
                        className={`tab-button ${activeTab === 'cart' ? 'active' : ''}`}
                        onClick={() => setActiveTab('cart')}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="9" cy="21" r="1" />
                            <circle cx="20" cy="21" r="1" />
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                        </svg>
                        <span>Giỏ hàng</span>
                        {state.items.length > 0 && (
                            <span className="tab-badge">{state.items.length}</span>
                        )}
                    </button>

                    <button
                        className={`tab-button ${activeTab === 'pending' ? 'active' : ''}`}
                        onClick={() => setActiveTab('pending')}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="1" y="3" width="15" height="13" />
                            <polygon points="16,8 20,8 23,11 23,16 16,16" />
                            <circle cx="5.5" cy="18.5" r="2.5" />
                            <circle cx="18.5" cy="18.5" r="2.5" />
                        </svg>
                        <span>Chờ giao hàng</span>
                        {pendingOrders.length > 0 && (
                            <span className="tab-badge">{pendingOrders.length}</span>
                        )}
                    </button>

                    <button
                        className={`tab-button ${activeTab === 'completed' ? 'active' : ''}`}
                        onClick={() => setActiveTab('completed')}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                            <polyline points="22,4 12,14.01 9,11.01" />
                        </svg>
                        <span>Đã giao hàng</span>
                        {completedOrders.length > 0 && (
                            <span className="tab-badge">{completedOrders.length}</span>
                        )}
                    </button>
                </div>

                <div className="tab-content">
                    {activeTab === 'cart' && renderCartTab()}
                    {activeTab === 'pending' && renderPendingTab()}
                    {activeTab === 'completed' && renderCompletedTab()}
                </div>
            </div>

            <CheckoutModal
                isOpen={isCheckoutModalOpen}
                onClose={() => setIsCheckoutModalOpen(false)}
                items={state.items.map(item => ({
                    id: item.book.id,
                    title: item.book.title,
                    quantity: item.quantity,
                    price: item.book.price,
                    imageUrl: item.book.imageUrl
                }))}
                total={state.total}
                onConfirm={handleConfirmCheckout}
            />
        </div>
    );
};

export default Cart;