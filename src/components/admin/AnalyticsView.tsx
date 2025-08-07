import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Eye, 
  FileText, 
  Calendar,
  BarChart3,
  PieChart,
  Activity,
  Globe,
  Smartphone,
  Monitor
} from 'lucide-react';

const AnalyticsView: React.FC = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [activeTab, setActiveTab] = useState('overview');

  const timeRanges = [
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' }
  ];

  const overviewStats = [
    {
      title: 'Total Page Views',
      value: '125,847',
      change: '+12.5%',
      trend: 'up',
      icon: Eye,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Unique Visitors',
      value: '45,231',
      change: '+8.2%',
      trend: 'up',
      icon: Users,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Articles Read',
      value: '89,456',
      change: '+15.3%',
      trend: 'up',
      icon: FileText,
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Bounce Rate',
      value: '32.1%',
      change: '-2.1%',
      trend: 'down',
      icon: Activity,
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const topPages = [
    { page: '/investment-basics', views: 15420, title: 'Investment Basics' },
    { page: '/technical-analysis', views: 12350, title: 'Technical Analysis' },
    { page: '/financial-planning', views: 9870, title: 'Financial Planning' },
    { page: '/cryptocurrency', views: 8540, title: 'Cryptocurrency' },
    { page: '/blog/what-is-investing', views: 7230, title: 'What is Investing?' }
  ];

  const trafficSources = [
    { source: 'Organic Search', visitors: 18500, percentage: 42 },
    { source: 'Direct', visitors: 12300, percentage: 28 },
    { source: 'Social Media', visitors: 7800, percentage: 18 },
    { source: 'Referral', visitors: 3900, percentage: 9 },
    { source: 'Email', visitors: 1300, percentage: 3 }
  ];

  const deviceStats = [
    { device: 'Desktop', users: 25400, percentage: 58 },
    { device: 'Mobile', users: 15200, percentage: 35 },
    { device: 'Tablet', users: 3100, percentage: 7 }
  ];

  const getDeviceIcon = (device: string) => {
    switch (device) {
      case 'Desktop': return Monitor;
      case 'Mobile': return Smartphone;
      case 'Tablet': return Smartphone;
      default: return Monitor;
    }
  };

  const recentActivity = [
    { action: 'New user registration', time: '2 minutes ago', type: 'user' },
    { action: 'Article published: "Market Analysis"', time: '15 minutes ago', type: 'content' },
    { action: 'High traffic spike detected', time: '1 hour ago', type: 'traffic' },
    { action: 'Newsletter sent to 5,000 subscribers', time: '2 hours ago', type: 'email' },
    { action: 'New comment on "Investment Guide"', time: '3 hours ago', type: 'engagement' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600 mt-2">Track your platform's performance and user engagement</p>
        </div>
        <div className="flex items-center gap-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {timeRanges.map(range => (
              <option key={range.value} value={range.value}>{range.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'traffic', label: 'Traffic', icon: Globe },
              { id: 'content', label: 'Content', icon: FileText },
              { id: 'users', label: 'Users', icon: Users }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Overview Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {overviewStats.map((stat, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                        <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                        <div className="flex items-center mt-2">
                          {stat.trend === 'up' ? (
                            <TrendingUp className="h-4 w-4 text-green-500" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-red-500" />
                          )}
                          <span className={`text-sm font-medium ml-1 ${
                            stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {stat.change}
                          </span>
                          <span className="text-sm text-gray-500 ml-1">vs last period</span>
                        </div>
                      </div>
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                        <stat.icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Charts Placeholder */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Page Views Trend</h3>
                  <div className="h-64 bg-white rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">Chart visualization would go here</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">User Engagement</h3>
                  <div className="h-64 bg-white rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <PieChart className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">Engagement metrics chart</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'traffic' && (
            <div className="space-y-6">
              {/* Traffic Sources */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Traffic Sources</h3>
                  <div className="space-y-4">
                    {trafficSources.map((source, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900">{source.source}</div>
                          <div className="text-sm text-gray-500">{source.visitors.toLocaleString()} visitors</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-gray-900">{source.percentage}%</div>
                          <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${source.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Device Breakdown</h3>
                  <div className="space-y-4">
                    {deviceStats.map((device, index) => {
                      const DeviceIcon = getDeviceIcon(device.device);
                      return (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <DeviceIcon className="h-5 w-5 text-gray-600" />
                            <div>
                              <div className="font-medium text-gray-900">{device.device}</div>
                              <div className="text-sm text-gray-500">{device.users.toLocaleString()} users</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-gray-900">{device.percentage}%</div>
                            <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                              <div 
                                className="bg-green-600 h-2 rounded-full" 
                                style={{ width: `${device.percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'content' && (
            <div className="space-y-6">
              {/* Top Pages */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Pages</h3>
                <div className="bg-gray-50 rounded-xl overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Page</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Views</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Performance</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {topPages.map((page, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div>
                              <div className="font-medium text-gray-900">{page.title}</div>
                              <div className="text-sm text-gray-500">{page.page}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="font-medium text-gray-900">{page.views.toLocaleString()}</span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="w-32 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full" 
                                style={{ width: `${(page.views / topPages[0].views) * 100}%` }}
                              ></div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="space-y-6">
              {/* User Activity */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        activity.type === 'user' ? 'bg-blue-100' :
                        activity.type === 'content' ? 'bg-green-100' :
                        activity.type === 'traffic' ? 'bg-purple-100' :
                        activity.type === 'email' ? 'bg-orange-100' :
                        'bg-gray-100'
                      }`}>
                        {activity.type === 'user' && <Users className="h-4 w-4 text-blue-600" />}
                        {activity.type === 'content' && <FileText className="h-4 w-4 text-green-600" />}
                        {activity.type === 'traffic' && <TrendingUp className="h-4 w-4 text-purple-600" />}
                        {activity.type === 'email' && <Globe className="h-4 w-4 text-orange-600" />}
                        {activity.type === 'engagement' && <Activity className="h-4 w-4 text-gray-600" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{activity.action}</p>
                        <p className="text-sm text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsView;