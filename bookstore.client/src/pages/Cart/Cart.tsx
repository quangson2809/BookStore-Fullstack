import React, { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { useNavigate } from 'react-router-dom';
import { orderService, OrderDetailResponse } from '@/services/orderService';
import CheckoutModal, { ShippingInfo } from '@/components/CheckoutModal';
import './Cart.css';

type TabType = 'cart' | 'pending' | 'completed';

const Cart: React.FC = () => {
    const { state, removeFromCart, updateQuantity, loadCart, resetCart } = useCart();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<TabType>('cart');
    const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
    
    const [pendingOrders, setPendingOrders] = useState<OrderDetailResponse[]>([]);
    const [completedOrders, setCompletedOrders] = useState<OrderDetailResponse[]>([]);
    const [isLoadingOrders, setIsLoadingOrders] = useState(false);

    useEffect(() => {
        if (state.cartId) {
            loadCart();
        }
    }, [state.cartId]);

    useEffect(() => {
        if (activeTab === 'pending' || activeTab === 'completed') {
            loadOrders();
        }
    }, [activeTab]);

    const loadOrders = async () => {
        const userInfo = localStorage.getItem('userInfo');
        if (!userInfo) return;

        try {
            setIsLoadingOrders(true);
            const user = JSON.parse(userInfo);
            const orders = await orderService.getOrdersByUserId(user.userId);
            
            const pending = orders.filter(order => 
                order.ordersStatus === 'Pending' || order.ordersStatus === 'shipping'
            );
            const completed = orders.filter(order => 
                order.ordersStatus === 'Done' || order.ordersStatus === 'completed'
            );
            
            setPendingOrders(pending);
            setCompletedOrders(completed);
        } catch (error) {
            console.error('Error loading orders:', error);
        } finally {
            setIsLoadingOrders(false);
        }
    };

    const handleCheckout = () => {
        if (state.items.length === 0) {
            alert('Giỏ hàng trống!');
            return;
        }
        setIsCheckoutModalOpen(true);
    };

    const handleConfirmCheckout = async (_shippingInfo: ShippingInfo) => {
        resetCart();
        
        if (state.cartId) {
            await loadCart();
        }
        
        setActiveTab('pending');
        await loadOrders();
    };

    const handleConfirmDelivery = async (orderId: number) => {
        if (window.confirm(`Bạn có chắc chắn đã nhận được đơn hàng #${orderId}?`)) {
            try {
                await orderService.confirmOrder(orderId);
                
                alert(`Đơn hàng #${orderId} đã được xác nhận giao thành công!`);
                
                await loadOrders();
                
                setTimeout(() => {
                    setActiveTab('completed');
                }, 500);
            } catch (error) {
                console.error('Error confirming delivery:', error);
                alert('Có lỗi xảy ra khi xác nhận đơn hàng. Vui lòng thử lại.');
            }
        }
    };

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
                                <h3>{item.book.title || item.book.name}</h3>
                                <p>Tác giả: {item.book.author}</p>
                                <p className="item-price">{(item.book.price || item.book.salePrice || 0).toLocaleString('vi-VN')}đ</p>
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
                                {((item.book.price || item.book.salePrice || 0) * item.quantity).toLocaleString('vi-VN')}đ
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

    const renderPendingTab = () => {
        if (isLoadingOrders) {
            return (
                <div className="empty-state">
                    <p>Đang tải đơn hàng...</p>
                </div>
            );
        }

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
                    <div key={order.ordersId} className="order-card">
                        <div className="order-header">
                            <div className="order-info">
                                <span className="order-id">Mã đơn: #{order.ordersId}</span>
                                <span className="order-date">
                                    Ngày đặt: {order.createTime ? new Date(order.createTime).toLocaleDateString('vi-VN') : 'N/A'}
                                </span>
                            </div>
                            <span className="status-badge shipping">Đang giao hàng</span>
                        </div>

                        <div className="order-items">
                            {order.orderDetails?.map((item) => (
                                <div key={item.id} className="order-item">
                                    <img 
                                        src={item.imageLink || 'https://via.placeholder.com/60'} 
                                        alt={item.name} 
                                        className="order-item-image" 
                                    />
                                    <div className="order-item-details">
                                        <h4>{item.name}</h4>
                                        <p>Số lượng: {item.quantity}</p>
                                    </div>
                                    <div className="order-item-price">
                                        {(item.totalPrice || 0).toLocaleString('vi-VN')}đ
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
                                <span>
                                    {order.fullName && `Người nhận: ${order.fullName}`}
                                    {order.phone && ` - ${order.phone}`}
                                </span>
                            </div>
                            <div className="order-total">
                                <span>Tổng tiền:</span>
                                <span className="total-amount">{(order.toalPrice || 0).toLocaleString('vi-VN')}đ</span>
                            </div>
                        </div>

                        <div className="order-actions">
                            <button 
                                className="btn-confirm-delivery"
                                onClick={() => handleConfirmDelivery(order.ordersId)}
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

    const renderCompletedTab = () => {
        if (isLoadingOrders) {
            return (
                <div className="empty-state">
                    <p>Đang tải đơn hàng...</p>
                </div>
            );
        }

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
                    <div key={order.ordersId} className="order-card">
                        <div className="order-header">
                            <div className="order-info">
                                <span className="order-id">Mã đơn: #{order.ordersId}</span>
                                <span className="order-date">
                                    Ngày đặt: {order.createTime ? new Date(order.createTime).toLocaleDateString('vi-VN') : 'N/A'}
                                </span>
                            </div>
                            <span className="status-badge completed">Đã giao hàng</span>
                        </div>

                        <div className="order-items">
                            {order.orderDetails?.map((item) => (
                                <div key={item.id} className="order-item">
                                    <img 
                                        src={item.imageLink || 'https://via.placeholder.com/60'} 
                                        alt={item.name} 
                                        className="order-item-image" 
                                    />
                                    <div className="order-item-details">
                                        <h4>{item.name}</h4>
                                        <p>Số lượng: {item.quantity}</p>
                                    </div>
                                    <div className="order-item-price">
                                        {(item.totalPrice || 0).toLocaleString('vi-VN')}đ
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
                                <span>
                                    {order.fullName && `Người nhận: ${order.fullName}`}
                                    {order.phone && ` - ${order.phone}`}
                                </span>
                            </div>
                            <div className="order-total">
                                <span>Tổng tiền:</span>
                                <span className="total-amount">{(order.toalPrice || 0).toLocaleString('vi-VN')}đ</span>
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
                    title: item.book.title || item.book.name,
                    quantity: item.quantity,
                    price: item.book.price ?? item.book.salePrice,
                    imageUrl: item.book.imageUrl ?? item.book.imageLink ?? ''
                }))}
                total={state.total}
                onConfirm={handleConfirmCheckout}
                cartId={state.cartId ?? undefined}
            />
        </div>
    );
};

export default Cart;