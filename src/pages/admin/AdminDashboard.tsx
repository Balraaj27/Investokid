import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import DashboardOverview from '../../components/admin/DashboardOverview';
import ArticleManagement from '../../components/admin/ArticleManagement';
import NewsManagement from '../../components/admin/NewsManagement';
import UserManagement from '../../components/admin/UserManagement';
import UpdatesManagement from '../../components/admin/UpdatesManagement';
import AnalyticsView from '../../components/admin/AnalyticsView';
import SettingsView from '../../components/admin/SettingsView';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Check authentication
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token && !location.pathname.includes('/admin/login')) {
      navigate('/admin/login');
    }
  }, [navigate, location]);

  // Don't render dashboard if not authenticated
  const token = localStorage.getItem('adminToken');
  if (!token) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-64">
        {/* Header */}
        <AdminHeader onMenuClick={() => setSidebarOpen(true)} />
        
        {/* Page Content */}
        <main className="flex-1 p-6">
          <Routes>
            <Route path="/dashboard" element={<DashboardOverview />} />
            <Route path="/articles" element={<ArticleManagement />} />
            <Route path="/news" element={<NewsManagement />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/updates" element={<UpdatesManagement />} />
            <Route path="/analytics" element={<AnalyticsView />} />
            <Route path="/settings" element={<SettingsView />} />
            <Route path="/" element={<DashboardOverview />} />
          </Routes>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;