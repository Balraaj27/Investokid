import React from 'react';
import { useArticles } from '../../hooks/useArticles';
import { useNews } from '../../hooks/useNews';
import { useUsers } from '../../hooks/useUsers';
import { usePlatformUpdates } from '../../hooks/usePlatformUpdates';
import { 
  Users, 
  FileText, 
  Newspaper, 
  TrendingUp, 
  Eye, 
  MessageCircle,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

const DashboardOverview: React.FC = () => {
  // Use backend data
  const { articles } = useArticles();
  const { news } = useNews();
  const { users } = useUsers();
  const { updates } = usePlatformUpdates();

  // Calculate real stats from backend data
  const totalViews = articles.reduce((sum, article) => sum + article.views, 0) +
                    news.reduce((sum, item) => sum + item.views, 0) +
                    updates.reduce((sum, update) => sum + update.views, 0);

  const stats = [
    {
      title: 'Total Users',
      value: users.length.toLocaleString(),
      change: '+12.5%',
      trend: 'up',
      icon: Users,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Published Articles',
      value: articles.filter(a => a.status === 'published').length.toString(),
      change: '+8.2%',
      trend: 'up',
      icon: FileText,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'News Items',
      value: news.filter(n => n.status === 'active' || n.status === 'featured').length.toString(),
      change: '+15.3%',
      trend: 'up',
      icon: Newspaper,
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Page Views',
      value: totalViews > 1000 ? `${Math.floor(totalViews / 1000)}K` : totalViews.toString(),
      change: '-2.1%',
      trend: 'down',
      icon: Eye,
      color: 'from-orange-500 to-orange-600'
    }
  ];

  // Get recent articles from backend
  const recentArticles = articles
    .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
    .slice(0, 3)
    .map(article => ({
      title: article.title,
      author: article.author,
      date: new Date(article.updated_at).toLocaleDateString(),
      status: article.status.charAt(0).toUpperCase() + article.status.slice(1),
      views: article.views > 1000 ? `${(article.views / 1000).toFixed(1)}K` : article.views.toString()
    }));

  // Generate recent activity from backend data
  const recentActivity = [
    ...users.slice(0, 2).map(user => ({
      action: 'New user registered',
      user: user.email,
      time: new Date(user.created_at).toLocaleDateString(),
      type: 'user'
    })),
    ...articles.filter(a => a.status === 'published').slice(0, 2).map(article => ({
      action: 'Article published',
      user: article.author,
      time: new Date(article.updated_at).toLocaleDateString(),
      type: 'content'
    })),
    ...news.slice(0, 1).map(item => ({
      action: 'News item updated',
      user: item.author,
      time: new Date(item.updated_at).toLocaleDateString(),
      type: 'news'
    }))
  ].slice(0, 4);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your platform.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                <div className="flex items-center mt-2">
                  {stat.trend === 'up' ? (
                    <ArrowUp className="h-4 w-4 text-green-500" />
                  ) : (
                    <ArrowDown className="h-4 w-4 text-red-500" />
                  )}
                  <span className={`text-sm font-medium ml-1 ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">vs last month</span>
                </div>
              </div>
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Articles */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Articles</h2>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentArticles.map((article, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 line-clamp-1">{article.title}</h3>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                    <span>By {article.author}</span>
                    <span>{article.date}</span>
                    <div className="flex items-center space-x-1">
                      <Eye className="h-3 w-3" />
                      <span>{article.views}</span>
                    </div>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  article.status === 'Published' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {article.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  activity.type === 'user' ? 'bg-blue-100' :
                  activity.type === 'content' ? 'bg-green-100' :
                  activity.type === 'engagement' ? 'bg-purple-100' :
                  'bg-orange-100'
                }`}>
                  {activity.type === 'user' && <Users className="h-4 w-4 text-blue-600" />}
                  {activity.type === 'content' && <FileText className="h-4 w-4 text-green-600" />}
                  {activity.type === 'engagement' && <MessageCircle className="h-4 w-4 text-purple-600" />}
                  {activity.type === 'news' && <Newspaper className="h-4 w-4 text-orange-600" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-500">{activity.user} • {activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="flex items-center space-x-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
            <FileText className="h-5 w-5 text-blue-600" />
            <span className="font-medium text-blue-900">Create Article</span>
          </button>
          <button className="flex items-center space-x-3 p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
            <Newspaper className="h-5 w-5 text-green-600" />
            <span className="font-medium text-green-900">Add News</span>
          </button>
          <button className="flex items-center space-x-3 p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
            <Users className="h-5 w-5 text-purple-600" />
            <span className="font-medium text-purple-900">Manage Users</span>
          </button>
          <button className="flex items-center space-x-3 p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors">
            <TrendingUp className="h-5 w-5 text-orange-600" />
            <span className="font-medium text-orange-900">View Analytics</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;