import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  Calendar,
  User,
  Clock,
  Zap,
  Save,
  X,
  Star,
  Sparkles
} from 'lucide-react';

interface UpdateItem {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  status: 'draft' | 'published' | 'archived';
  publishDate: string;
  readTime: string;
  views: number;
  isPinned: boolean;
  isNew: boolean;
  tags: string[];
}

const UpdatesManagement: React.FC = () => {
  const [updates, setUpdates] = useState<UpdateItem[]>([
    {
      id: 1,
      title: "New Advanced Portfolio Analytics Dashboard",
      excerpt: "Introducing comprehensive portfolio analysis tools with risk metrics, performance tracking, and detailed asset allocation insights.",
      content: "We're excited to announce the launch of our new Advanced Portfolio Analytics Dashboard...",
      author: "Investokid Team",
      category: "Feature Release",
      status: "published",
      publishDate: "2024-12-18",
      readTime: "3 min read",
      views: 2500,
      isPinned: true,
      isNew: true,
      tags: ["portfolio", "analytics", "dashboard"]
    },
    {
      id: 2,
      title: "Enhanced Mobile App Experience",
      excerpt: "Redesigned mobile interface with improved navigation, faster loading times, and new touch-friendly financial calculators.",
      content: "Our mobile app has received a major update focusing on user experience...",
      author: "Development Team",
      category: "App Update",
      status: "published",
      publishDate: "2024-12-15",
      readTime: "2 min read",
      views: 1800,
      isPinned: false,
      isNew: true,
      tags: ["mobile", "app", "ui"]
    },
    {
      id: 3,
      title: "Real-time Market Data Integration",
      excerpt: "Now featuring live market data from NSE and BSE with real-time price updates and advanced charting capabilities.",
      content: "We've integrated real-time market data to provide you with the most current information...",
      author: "Data Team",
      category: "Platform Enhancement",
      status: "published",
      publishDate: "2024-12-12",
      readTime: "4 min read",
      views: 3200,
      isPinned: false,
      isNew: false,
      tags: ["market data", "real-time", "charts"]
    },
    {
      id: 4,
      title: "Security Enhancement: Two-Factor Authentication",
      excerpt: "Enhanced account security with mandatory 2FA implementation and advanced encryption protocols.",
      content: "Security is our top priority. We've implemented two-factor authentication...",
      author: "Security Team",
      category: "Security Update",
      status: "draft",
      publishDate: "2024-12-20",
      readTime: "3 min read",
      views: 0,
      isPinned: false,
      isNew: false,
      tags: ["security", "2fa", "authentication"]
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingUpdate, setEditingUpdate] = useState<UpdateItem | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const updatesPerPage = 10;

  const categories = [
    'Feature Release', 'App Update', 'Platform Enhancement', 'Security Update', 
    'Performance Update', 'Content Update', 'Developer Update', 'AI Enhancement',
    'Community Feature', 'Crypto Update', 'UI Update', 'Tax Feature'
  ];
  const statuses = ['draft', 'published', 'archived'];

  // Filter updates
  const filteredUpdates = updates.filter(update => {
    const matchesSearch = update.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         update.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         update.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || update.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || update.category === filterCategory;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Sort updates (pinned first, then by date)
  const sortedUpdates = filteredUpdates.sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
  });

  // Pagination
  const totalPages = Math.ceil(sortedUpdates.length / updatesPerPage);
  const startIndex = (currentPage - 1) * updatesPerPage;
  const currentUpdates = sortedUpdates.slice(startIndex, startIndex + updatesPerPage);

  const handleCreateUpdate = () => {
    setEditingUpdate({
      id: 0,
      title: '',
      excerpt: '',
      content: '',
      author: 'Investokid Team',
      category: categories[0],
      status: 'draft',
      publishDate: new Date().toISOString().split('T')[0],
      readTime: '3 min read',
      views: 0,
      isPinned: false,
      isNew: true,
      tags: []
    });
    setShowModal(true);
  };

  const handleEditUpdate = (update: UpdateItem) => {
    setEditingUpdate({ ...update });
    setShowModal(true);
  };

  const handleSaveUpdate = () => {
    if (!editingUpdate) return;

    if (editingUpdate.id === 0) {
      // Create new update
      const newUpdate = {
        ...editingUpdate,
        id: Math.max(...updates.map(u => u.id)) + 1
      };
      setUpdates([newUpdate, ...updates]);
    } else {
      // Update existing update
      setUpdates(updates.map(u => u.id === editingUpdate.id ? editingUpdate : u));
    }

    setShowModal(false);
    setEditingUpdate(null);
  };

  const handleDeleteUpdate = (id: number) => {
    if (window.confirm('Are you sure you want to delete this update?')) {
      setUpdates(updates.filter(u => u.id !== id));
    }
  };

  const handleStatusChange = (id: number, newStatus: UpdateItem['status']) => {
    setUpdates(updates.map(u => 
      u.id === id ? { ...u, status: newStatus } : u
    ));
  };

  const handlePinToggle = (id: number) => {
    setUpdates(updates.map(u => 
      u.id === id ? { ...u, isPinned: !u.isPinned } : u
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'archived':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Feature Release': 'text-blue-600',
      'App Update': 'text-green-600',
      'Platform Enhancement': 'text-purple-600',
      'Security Update': 'text-red-600',
      'Performance Update': 'text-orange-600',
      'Content Update': 'text-teal-600'
    };
    return colors[category as keyof typeof colors] || 'text-gray-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Updates Management</h1>
          <p className="text-gray-600 mt-2">Manage platform updates and announcements</p>
        </div>
        <button
          onClick={handleCreateUpdate}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Plus className="h-5 w-5" />
          Create Update
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Updates</p>
              <p className="text-3xl font-bold text-gray-900">{updates.length}</p>
            </div>
            <Zap className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Published</p>
              <p className="text-3xl font-bold text-green-600">{updates.filter(u => u.status === 'published').length}</p>
            </div>
            <Eye className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pinned</p>
              <p className="text-3xl font-bold text-yellow-600">{updates.filter(u => u.isPinned).length}</p>
            </div>
            <Star className="h-8 w-8 text-yellow-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Views</p>
              <p className="text-3xl font-bold text-purple-600">{updates.reduce((sum, u) => sum + u.views, 0).toLocaleString()}</p>
            </div>
            <Eye className="h-8 w-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search updates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            {statuses.map(status => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>

          {/* Category Filter */}
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Updates Table */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Update</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Author</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Views</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentUpdates.map((update) => (
                <tr key={update.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <div className="text-sm font-medium text-gray-900 line-clamp-1">{update.title}</div>
                        {update.isPinned && (
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        )}
                        {update.isNew && (
                          <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-1 rounded-full">
                            NEW
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-500 line-clamp-2">{update.excerpt}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-500">{update.readTime}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{update.author}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-sm font-medium ${getCategoryColor(update.category)}`}>
                      {update.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={update.status}
                      onChange={(e) => handleStatusChange(update.id, e.target.value as UpdateItem['status'])}
                      className={`text-xs font-medium px-2 py-1 rounded-full border-0 ${getStatusColor(update.status)}`}
                    >
                      {statuses.map(status => (
                        <option key={status} value={status}>
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900">{update.views.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Calendar className="h-3 w-3" />
                      {new Date(update.publishDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handlePinToggle(update.id)}
                        className={`p-1 ${update.isPinned ? 'text-yellow-600' : 'text-gray-400 hover:text-yellow-600'}`}
                        title={update.isPinned ? 'Unpin' : 'Pin'}
                      >
                        <Star className={`h-4 w-4 ${update.isPinned ? 'fill-current' : ''}`} />
                      </button>
                      <button
                        onClick={() => handleEditUpdate(update)}
                        className="text-blue-600 hover:text-blue-800 p-1"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteUpdate(update.id)}
                        className="text-red-600 hover:text-red-800 p-1"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Showing {startIndex + 1} to {Math.min(startIndex + updatesPerPage, sortedUpdates.length)} of {sortedUpdates.length} updates
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-gray-200 rounded-lg disabled:opacity-50"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded-lg ${
                    currentPage === page
                      ? 'bg-blue-600 text-white'
                      : 'border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border border-gray-200 rounded-lg disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      {showModal && editingUpdate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingUpdate.id === 0 ? 'Create New Update' : 'Edit Update'}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={editingUpdate.title}
                  onChange={(e) => setEditingUpdate({ ...editingUpdate, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter update title"
                />
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt</label>
                <textarea
                  value={editingUpdate.excerpt}
                  onChange={(e) => setEditingUpdate({ ...editingUpdate, excerpt: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Brief description of the update"
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                <textarea
                  value={editingUpdate.content}
                  onChange={(e) => setEditingUpdate({ ...editingUpdate, content: e.target.value })}
                  rows={10}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Full update content (Markdown supported)"
                />
              </div>

              {/* Meta Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
                  <input
                    type="text"
                    value={editingUpdate.author}
                    onChange={(e) => setEditingUpdate({ ...editingUpdate, author: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Author name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={editingUpdate.category}
                    onChange={(e) => setEditingUpdate({ ...editingUpdate, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={editingUpdate.status}
                    onChange={(e) => setEditingUpdate({ ...editingUpdate, status: e.target.value as UpdateItem['status'] })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {statuses.map(status => (
                      <option key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Publish Date</label>
                  <input
                    type="date"
                    value={editingUpdate.publishDate}
                    onChange={(e) => setEditingUpdate({ ...editingUpdate, publishDate: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Read Time</label>
                  <input
                    type="text"
                    value={editingUpdate.readTime}
                    onChange={(e) => setEditingUpdate({ ...editingUpdate, readTime: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., 3 min read"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isPinned"
                    checked={editingUpdate.isPinned}
                    onChange={(e) => setEditingUpdate({ ...editingUpdate, isPinned: e.target.checked })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="isPinned" className="ml-2 block text-sm text-gray-900">
                    Pin this update
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isNew"
                    checked={editingUpdate.isNew}
                    onChange={(e) => setEditingUpdate({ ...editingUpdate, isNew: e.target.checked })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="isNew" className="ml-2 block text-sm text-gray-900">
                    Mark as new
                  </label>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex items-center justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveUpdate}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Save className="h-4 w-4" />
                {editingUpdate.id === 0 ? 'Create Update' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdatesManagement;