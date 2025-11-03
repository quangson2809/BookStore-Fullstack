import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import AdminSidebar from '../../components/Admin/AdminSidebar';
import AdminHeader from '../../components/Admin/AdminHeader';
import DashboardStats from '../../components/Admin/DashboardStats';
import RecentOrders from '../../components/Admin/RecentOrders';
import BookManagement from '../../components/Admin/BookManagement';
import UserManagement from '../../components/Admin/UserManagement';
import OrderManagement from '../../components/Admin/OrderManagement';
import './AdminDashboard.css';

type ActiveTab = 'dashboard' | 'books' | 'orders' | 'users' | 'settings';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const navigate = useNavigate();
    const { resetCart } = useCart();

    const handleLogout = () => {
        const confirmLogout = window.confirm('Bạn có chắc chắn muốn đăng xuất?');
        if (confirmLogout) {
            // Clear all admin and user related data
            localStorage.removeItem('adminToken');
            localStorage.removeItem('userRole');
            localStorage.removeItem('adminUsername');
            localStorage.removeItem('userInfo');
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('authToken');
            localStorage.removeItem('userData');

            // Reset cart
            resetCart();

            // Navigate to admin login
            navigate('/admin/login');

            // Show success message
            setTimeout(() => {
                alert('Đã đăng xuất thành công!');
            }, 100);
        }
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return (
                    <div className="dashboard-content">
                        <DashboardStats />
                        <RecentOrders />
                    </div>
                );
            case 'books':
                return <BookManagement />;
            case 'orders':
                return <OrderManagement />;
            case 'users':
                return <UserManagement />;
            case 'settings':
                return (
                    <div className="settings-content">
                        <h2>Cài đặt hệ thống</h2>
                        <p>Trang cài đặt đang được phát triển...</p>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="admin-dashboard">
            <AdminSidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                isOpen={sidebarOpen}
                onToggle={() => setSidebarOpen(!sidebarOpen)}
            />

            <div className={`admin-main ${!sidebarOpen ? 'sidebar-closed' : ''}`}>
                <AdminHeader
                    onLogout={handleLogout}
                    onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
                />

                <main className="admin-content">
                    {renderContent()}
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;