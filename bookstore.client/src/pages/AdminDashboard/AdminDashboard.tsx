import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

  const handleLogout = () => {
    // Clear all admin-related data
    localStorage.removeItem('adminToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('adminUsername');
    
    // Show confirmation
    const confirmLogout = window.confirm('Bạn có chắc chắn muốn đăng xuất?');
    if (confirmLogout) {
      navigate('/admin/login');
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