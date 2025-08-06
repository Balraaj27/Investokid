import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, RefreshCw, ExternalLink, Clock, Search, Filter } from 'lucide-react';
import { useFinancialNews } from '../hooks/useFinancialNews';

const NewsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSource, setSelectedSource] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const newsPerPage = 12;

  const { 
    news, 
    loading, 
    error,
    lastUpdate, 
    refetch 
  } = useFinancialNews(300000); // 5 minutes auto-refresh

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter news based on search and source
  const filteredNews = news.filter(article => {
    const matchesSearch = searchTerm === '' || 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSource = selectedSource === 'All' || article.source === selectedSource;
    
    return matchesSearch && matchesSource;
  });

  // Pagination
  const totalPages = Math.ceil(filteredNews.length / newsPerPage);
  const startIndex = (currentPage - 1) * newsPerPage;
  const currentNews = filteredNews.slice(startIndex, startIndex + newsPerPage);

  const sources = ['All', 'Moneycontrol', 'Economic Times', 'LiveMint', 'Business Standard'];

  const getSourceColors = (source: string) => {
    const colors = {
      'Moneycontrol': 'from-red-500 to-orange-500',
      'Economic Times': 'from-blue-500 to-indigo-500',
      'LiveMint': 'from-green-500 to-emerald-500',
      'Business Standard': 'from-purple-500 to-violet-500'
    };
    return colors[source as keyof typeof colors] || 'from-gray-500 to-gray-600';
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit',
      timeZone: 'Asia/Kolkata'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Home
            </button>
          </div>
          
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              📰 Financial News Center
            </h1>
            <p className="text-xl text-blue-100 mb-6">
              Latest updates from India's top financial news sources
            </p>
            
            {/* Stats */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-blue-100">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                <div className={`w-2 h-2 rounded-full animate-pulse ${error ? 'bg-yellow-400' : 'bg-green-400'}`}></div>
                <span className="font-medium">{news.length} News Articles</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                <Clock className="h-4 w-4" />
                <span className="font-medium">
                  Updated: {lastUpdate ? formatTime(lastUpdate) : 'Never'}
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                <span className="font-medium">4 Live Sources</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search news..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Source Filter */}
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-500" />
              <select
                value={selectedSource}
                onChange={(e) => {
                  setSelectedSource(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {sources.map(source => (
                  <option key={source} value={source}>{source}</option>
                ))}
              </select>
            </div>

            {/* Refresh Button */}
            <button
              onClick={refetch}
              disabled={loading}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              {loading ? 'Updating...' : 'Refresh'}
            </button>
          </div>

          {/* Results Info */}
          <div className="mt-4 text-sm text-gray-600">
            Showing {currentNews.length} of {filteredNews.length} articles
            {searchTerm && ` for "${searchTerm}"`}
            {selectedSource !== 'All' && ` from ${selectedSource}`}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
              <span className="text-sm text-yellow-800">
                Using fallback news data - {error}
              </span>
            </div>
          </div>
        )}

        {/* News Grid */}
        {loading && news.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(12)].map((_, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
                <div className="h-2 bg-gray-200 rounded-full mb-4"></div>
                <div className="h-6 bg-gray-200 rounded mb-3"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-20"></div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {currentNews.map((article, index) => {
                const sourceColor = getSourceColors(article.source);
                
                return (
                  <article 
                    key={index} 
                    className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
                  >
                    {/* Source Header */}
                    <div className={`h-2 bg-gradient-to-r ${sourceColor}`}></div>
                    
                    <div className="p-6">
                      {/* Source and Time */}
                      <div className="flex items-center justify-between mb-4">
                        <span className={`inline-flex items-center px-3 py-1 text-xs font-bold text-white bg-gradient-to-r ${sourceColor} rounded-full shadow-lg`}>
                          <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                          {article.source}
                        </span>
                        <div className="flex items-center text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-full">
                          <Clock className="w-3 h-3 mr-1" />
                          {article.publishedAt}
                        </div>
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors leading-tight">
                        {article.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                        {article.description}
                      </p>
                      
                      {/* Read More */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <a
                          href={article.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-semibold group-hover:gap-2 gap-1 transition-all duration-200"
                        >
                          Read Full Story
                          <ExternalLink className="w-3 h-3 transition-transform group-hover:scale-110" />
                        </a>
                        <div className="flex items-center text-xs text-gray-400">
                          <div className={`w-1 h-1 rounded-full mr-1 animate-pulse ${
                            error ? 'bg-yellow-400' : 'bg-green-400'
                          }`}></div>
                          {error ? 'Demo' : 'Live'}
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const page = i + Math.max(1, currentPage - 2);
                  if (page > totalPages) return null;
                  
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        currentPage === page
                          ? 'bg-blue-600 text-white'
                          : 'bg-white border border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
                
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}

            {/* No Results */}
            {filteredNews.length === 0 && !loading && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📰</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No news found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search terms or filter settings
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedSource('All');
                    setCurrentPage(1);
                  }}
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default NewsPage;