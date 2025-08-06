import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Calendar, ExternalLink, RefreshCw, Eye, Clock, ArrowRight, BarChart3, Globe, Building2, Newspaper, Loader, FileText, Users, PieChart, Briefcase, Shield, TrendingUp as TrendingUpIcon, Building, Award } from 'lucide-react';
import { useGoogleTrends } from '../hooks/useGoogleTrends';
import { useFinancialNews } from '../hooks/useFinancialNews';
import { formatNewsDate } from '../services/newsService';

interface IPO {
  name: string;
  openDate: string;
  closeDate: string;
  priceRange: string;
  status: 'upcoming' | 'ongoing' | 'closed';
  subscription?: string;
}

interface NewsItem {
  title: string;
  source: string;
  time: string;
  url: string;
}


const TodaysTrends: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  
  // Use hooks for live data
  const { 
    trends: googleTrends, 
    loading: trendsLoading, 
    error: trendsError,
    lastUpdate: trendsLastUpdate, 
    refetch: refetchTrends 
  } = useGoogleTrends(300000); // 5 minutes auto-refresh
  
  const { 
    news: financialNews, 
    loading: newsLoading, 
    error: newsError,
    lastUpdate: newsLastUpdate, 
    refetch: refetchNews 
  } = useFinancialNews(300000); // 5 minutes auto-refresh




  const refreshData = () => {
    refetchTrends();
    refetchNews();
  };


  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit',
      timeZone: 'Asia/Kolkata'
    });
  };

  const getLastUpdateTime = () => {
    const times = [trendsLastUpdate, newsLastUpdate].filter(Boolean);
    if (times.length === 0) return null;
    return new Date(Math.max(...times.map(t => t!.getTime())));
  };
  return (
    <section id="todays-trends" className="py-24 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-emerald-400/10 to-teal-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-orange-400/5 to-pink-400/5 rounded-full blur-2xl animate-bounce"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          {/* Google Trends Badge */}
          <div className="inline-flex items-center gap-4 bg-gradient-to-r from-red-50 via-orange-50 to-yellow-50 backdrop-blur-sm border border-red-200/50 text-red-700 px-8 py-4 rounded-2xl text-lg font-bold mb-6 shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="w-3 h-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-full animate-pulse shadow-lg shadow-red-500/50"></div>
            <Globe className="h-6 w-6 text-red-600" />
            <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent font-extrabold tracking-wide">
              GOOGLE TRENDS
            </span>
            <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full animate-pulse shadow-lg shadow-orange-500/50"></div>
          </div>
          
          {/* Market Intelligence Badge */}
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-50 to-indigo-50 backdrop-blur-sm border border-blue-200/50 text-blue-700 px-6 py-3 rounded-full text-sm font-bold mb-8 shadow-lg">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse shadow-lg shadow-blue-500/50"></div>
            <TrendingUp className="h-5 w-5" />
            <span>Live Market Intelligence</span>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse shadow-lg shadow-blue-500/50"></div>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">
            <span className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
              Today's
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Trends
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-light mb-8">
            Discover what India is searching for in finance and stay ahead with real-time market insights, trending searches, and breaking financial news from trusted sources.
          </p>

          {/* Last Updated & Refresh */}
          <div className="flex items-center justify-center gap-6 mb-12">
            <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-white/50">
              <Clock className="h-4 w-4 text-slate-500" />
              <span className="text-sm text-slate-600 font-medium">
                Last updated: {getLastUpdateTime() ? formatTime(getLastUpdateTime()!) : 'Never'}
              </span>
            </div>
            <button
              onClick={refreshData}
              disabled={trendsLoading || newsLoading}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw className={`h-4 w-4 ${(trendsLoading || newsLoading) ? 'animate-spin' : ''}`} />
              {(trendsLoading || newsLoading) ? 'Updating...' : 'Refresh Data'}
            </button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Google Search Trends */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50 hover:shadow-3xl transition-all duration-500 lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">Trending in India</h3>
                <p className="text-slate-600">Top financial searches today</p>
              </div>
              {trendsError && (
                <div className="ml-auto">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                </div>
              )}
            </div>

            {/* Error Message */}

            {trendsLoading && googleTrends.length === 0 ? (
              <div className="space-y-3">
                {[...Array(5)].map((_, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl animate-pulse">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-slate-200 rounded-full"></div>
                      <div className="h-4 bg-slate-200 rounded w-40"></div>
                    </div>
                    <div className="h-4 bg-slate-200 rounded w-16"></div>
                  </div>
                ))}
              </div>
            ) : (
            <div className="space-y-3">
              {googleTrends.slice(0, 5).map((trend, index) => (
                <a 
                  key={index}
                  href={trend.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <span className="font-medium text-slate-800 group-hover:text-blue-600 transition-colors">{trend.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-500">{formatNewsDate(trend.pubDate)}</span>
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  </div>
                </a>
              ))}
            </div>
            )}

            <div className="mt-6 text-center">
              <a 
                href="https://trends.google.com/trends/trendingsearches/daily?geo=IN" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 font-semibold text-sm flex items-center gap-1 mx-auto"
              >
                View All Trends
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>


          {/* Financial News Headlines */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50 hover:shadow-3xl transition-all duration-500 lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Newspaper className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">Breaking News</h3>
                <p className="text-slate-600">Latest financial headlines</p>
              </div>
              {newsError && (
                <div className="ml-auto">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                </div>
              )}
            </div>

            {/* Error Message */}
            {newsError && (
              <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-xl">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                  <span className="text-sm text-yellow-800">
                    Using fallback data - {newsError}
                  </span>
                </div>
              </div>
            )}

            {newsLoading && financialNews.length === 0 ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, index) => (
                  <div key={index} className="p-4 bg-slate-50 rounded-xl animate-pulse">
                    <div className="h-4 bg-slate-200 rounded mb-2 w-3/4"></div>
                    <div className="flex items-center justify-between">
                      <div className="h-3 bg-slate-200 rounded w-20"></div>
                      <div className="h-3 bg-slate-200 rounded w-16"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
            <div className="space-y-4">
              {financialNews.slice(0, 5).map((news, index) => (
                <a
                  key={index}
                  href={news.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer group"
                >
                  <h4 className="font-semibold text-slate-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {news.title}
                  </h4>
                  <div className="flex items-center justify-between text-sm text-slate-600">
                    <span className="font-medium">{news.source}</span>
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3" />
                      <span>{formatNewsDate(news.pubDate)}</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
            )}

            <div className="mt-6 text-center">
              <button 
                onClick={() => window.location.href = '/news'}
                className="text-orange-600 hover:text-orange-800 font-semibold text-sm flex items-center gap-1 mx-auto"
              >
                View All News
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* NSE Corporate Filings Section */}
        <div className="mt-20 mb-16">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-12 border border-white/50 hover:shadow-3xl transition-all duration-500">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-50 to-red-50 backdrop-blur-sm border border-orange-200/50 text-orange-700 px-6 py-3 rounded-full text-sm font-bold mb-6 shadow-lg">
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse shadow-lg shadow-orange-500/50"></div>
                <Building2 className="h-5 w-5" />
                <span>NSE Corporate Intelligence</span>
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse shadow-lg shadow-orange-500/50"></div>
              </div>
              
              <h3 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                <span className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
                  Corporate Filings
                </span>
                <br />
                <span className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
                  & Disclosures
                </span>
              </h3>
              
              <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-light mb-12">
                Access comprehensive corporate information, regulatory filings, and company disclosures directly from NSE's official database. Stay informed with the latest corporate developments and compliance updates.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {[
                {
                  icon: Calendar,
                  title: "Board Meeting Announcements",
                  description: "Upcoming board meetings and agenda items",
                  color: "from-blue-500 to-cyan-500"
                },
                {
                  icon: PieChart,
                  title: "Dividend Declarations",
                  description: "Dividend announcements and payment schedules",
                  color: "from-green-500 to-emerald-500"
                },
                {
                  icon: BarChart3,
                  title: "Quarterly Results",
                  description: "Financial results and earnings reports",
                  color: "from-purple-500 to-violet-500"
                },
                {
                  icon: TrendingUpIcon,
                  title: "Buyback & Bonus Updates",
                  description: "Share buyback programs and bonus issues",
                  color: "from-orange-500 to-red-500"
                },
                {
                  icon: Shield,
                  title: "Corporate Governance Reports",
                  description: "Governance compliance and board reports",
                  color: "from-indigo-500 to-purple-500"
                },
                {
                  icon: Users,
                  title: "Shareholding Patterns",
                  description: "Promoter and institutional shareholding data",
                  color: "from-teal-500 to-green-500"
                },
                {
                  icon: Briefcase,
                  title: "Mergers & Acquisitions Info",
                  description: "M&A announcements and corporate restructuring",
                  color: "from-pink-500 to-rose-500"
                },
                {
                  icon: FileText,
                  title: "Company Disclosures",
                  description: "Material events and regulatory disclosures",
                  color: "from-amber-500 to-orange-500"
                }
              ].map((feature, index) => (
                <a
                  href="https://www.nseindia.com/companies-listing/corporate-filings-application"
                  target="_blank"
                  rel="noopener noreferrer"
                  key={index}
                  className="group bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-white/50 cursor-pointer block"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed font-light">
                    {feature.description}
                  </p>
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <div className="text-center">
              <a
                href="https://www.nseindia.com/companies-listing/corporate-filings-application"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 text-white px-10 py-4 rounded-2xl font-bold hover:from-orange-700 hover:via-red-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-3xl text-lg"
              >
                <Building2 className="h-6 w-6" />
                Visit NSE Corporate Filings
                <ExternalLink className="h-5 w-5" />
              </a>
              
              <p className="text-sm text-slate-500 mt-4 font-medium">
                Official NSE portal for all corporate filings and disclosures
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-20 relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 rounded-3xl p-12 text-white overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}></div>
          </div>

          <div className="relative z-10 text-center">
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              Stay Ahead of Market Trends
            </h3>
            
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Get real-time updates, trending insights, and breaking news delivered to your inbox every morning.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
              <div className="group">
                <div className="text-3xl font-bold mb-2 bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                  50K+
                </div>
                <div className="text-slate-300 font-medium">Daily Searches</div>
              </div>
              <div className="group">
                <div className="text-3xl font-bold mb-2 bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                  500+
                </div>
                <div className="text-slate-300 font-medium">Market Updates</div>
              </div>
              <div className="group">
                <div className="text-3xl font-bold mb-2 bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                  24/7
                </div>
                <div className="text-slate-300 font-medium">Live Monitoring</div>
              </div>
              <div className="group">
                <div className="text-3xl font-bold mb-2 bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                  Real-time
                </div>
                <div className="text-slate-300 font-medium">Data Updates</div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-slate-300 font-medium">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full shadow-lg shadow-emerald-400/50 animate-pulse"></div>
                <span>Live Market Data</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50 animate-pulse"></div>
                <span>Real-time Trends</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-amber-400 rounded-full shadow-lg shadow-amber-400/50 animate-pulse"></div>
                <span>Breaking News</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full shadow-lg shadow-purple-400/50 animate-pulse"></div>
                <span>Expert Analysis</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TodaysTrends;