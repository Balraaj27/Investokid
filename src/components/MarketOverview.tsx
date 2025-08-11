import React from 'react';
import { TrendingUp, TrendingDown, RefreshCw, ExternalLink } from 'lucide-react';
import { useNews } from '../hooks/useNews';
import { useNavigate } from 'react-router-dom';

const MarketOverview: React.FC = () => {
  React.useEffect(() => {
    // Load TradingView widget script with new configuration
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      "symbols": [
        {
          "proName": "BSE:SENSEX",
          "title": "Sensex"
        },
        {
          "proName": "NSE:NIFTY",
          "title": "Nifty 50"
        },
        {
          "proName": "NSE:BANKNIFTY",
          "title": "Bank Nifty"
        }
      ],
      "showSymbolLogo": true,
      "colorTheme": "light",
      "isTransparent": false,
      "displayMode": "adaptive",
      "locale": "en"
    });
    
    const widgetContainer = document.querySelector('.tradingview-widget-container__widget');
    if (widgetContainer) {
      widgetContainer.appendChild(script);
    }
    
    return () => {
      // Cleanup script on unmount
      if (widgetContainer && widgetContainer.contains(script)) {
        widgetContainer.removeChild(script);
      }
    };
  }, []);

  const navigate = useNavigate();
  
  const { 
    news, 
    loading: newsLoading, 
    error: newsError,
    lastUpdate: newsLastUpdate, 
    refetch: refreshNews 
  } = useNews({ status: 'active', limit: 6 });

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit',
      timeZone: 'Asia/Kolkata'
    });
  };

  return (
    <section id="market-overview" className="py-24 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <TrendingUp className="h-4 w-4" />
            Real-Time Intelligence
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight">Market Intelligence</h2>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-light">
            Professional-grade market data and breaking financial news from India's most trusted sources, 
            updated in real-time for informed decision making.
          </p>
        </div>

        {/* Market Data Section */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4">Live Indian Market Indexes</h3>
            <p className="text-lg text-slate-600 font-light">Real-time data powered by TradingView</p>
          </div>
          
          {/* TradingView Widget */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100 overflow-hidden">
            {/* TradingView Widget BEGIN */}
            <div className="tradingview-widget-container">
              <div className="tradingview-widget-container__widget"></div>
            </div>
            {/* TradingView Widget END */}
            
            {/* Fallback for when TradingView doesn't load */}
            <div className="text-center py-8 text-slate-500">
              <div className="animate-pulse">
                <div className="h-4 bg-slate-200 rounded w-3/4 mx-auto mb-2"></div>
                <div className="h-4 bg-slate-200 rounded w-1/2 mx-auto"></div>
              </div>
              <p className="mt-4 text-sm">Loading live market data...</p>
            </div>
          </div>
        </div>

        {/* Financial News Section */}
        <div>
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3 tracking-tight">📰 Breaking Financial News</h3>
              <p className="text-slate-600 font-light text-lg">Stay ahead with real-time updates from India's most trusted financial publications</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={refreshNews}
                disabled={newsLoading}
                className="flex items-center px-6 py-3 bg-blue-50 text-blue-700 hover:bg-blue-100 hover:text-blue-800 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              >
                <RefreshCw className={`w-4 h-4 mr-1 ${newsLoading ? 'animate-spin' : ''}`} />
                {newsLoading ? 'Updating...' : 'Refresh News'}
              </button>
              <div className="text-sm text-slate-500 bg-slate-100 px-4 py-3 rounded-xl font-medium">
                {newsLoading ? (
                  <span className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse mr-2 shadow-lg shadow-blue-500/50"></div>
                    Loading news...
                  </span>
                ) : (
                  <span>🕒 Updated: {newsLastUpdate ? formatTime(newsLastUpdate) : 'Never'}</span>
                )}
              </div>
            </div>
          </div>

          {/* Debug Info for News Updates */}
          {newsError && (
            <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-amber-500 rounded-full mr-2 shadow-lg shadow-amber-500/50"></div>
                <span className="text-sm text-amber-800 font-medium">
                  Using fallback news data - {newsError}
                </span>
              </div>
            </div>
          )}

          {newsLoading && news.length === 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-xl p-8 animate-pulse">
                  <div className="flex items-start justify-between mb-4">
                    <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                    <div className="h-4 bg-gray-200 rounded w-16"></div>
                  </div>
                  <div className="h-6 bg-gray-200 rounded mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {news.slice(0, 6).map((article, index) => {
                const sourceColors = {
                  'Moneycontrol': 'from-red-500 to-orange-500',
                  'Economic Times': 'from-blue-500 to-indigo-500',
                  'LiveMint': 'from-green-500 to-emerald-500',
                  'Business Standard': 'from-purple-500 to-violet-500'
                };
                const sourceColor = sourceColors[article.source as keyof typeof sourceColors] || 'from-gray-500 to-gray-600';
                
                return (
                  <article 
                    key={index} 
                    className="group bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 overflow-hidden border border-slate-100 hover:border-slate-200"
                  >
                    {/* News Header */}
                    <div className={`h-1.5 bg-gradient-to-r ${sourceColor}`}></div>
                    
                    <div className="p-8">
                      {/* Source and Time */}
                      <div className="flex items-center justify-between mb-6">
                        <span className={`inline-flex items-center px-4 py-2 text-xs font-bold text-white bg-gradient-to-r ${sourceColor} rounded-full shadow-xl`}>
                          <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse shadow-lg"></div>
                          {article.source}
                        </span>
                        <div className="flex items-center text-xs text-slate-500 bg-slate-100 px-3 py-2 rounded-full font-medium">
                          <div className="w-1 h-1 bg-gray-400 rounded-full mr-1"></div>
                          {article.publishedAt}
                        </div>
                      </div>
                      
                      {/* News Title */}
                      <h4 className="text-xl font-bold text-slate-900 mb-4 line-clamp-2 group-hover:text-blue-600 transition-colors leading-tight tracking-tight">
                        {article.title}
                      </h4>
                      
                      {/* News Description */}
                      <p className="text-slate-600 text-sm mb-6 line-clamp-3 leading-relaxed font-light">
                        {article.description}
                      </p>
                      
                      {/* Read More Link */}
                      <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                        <a
                          href={article.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-bold group-hover:gap-3 gap-2 transition-all duration-300"
                        >
                          Read Full Story
                          <ExternalLink className="w-4 h-4 transition-transform group-hover:scale-110" />
                        </a>
                        <div className="flex items-center text-xs text-slate-400 font-medium">
                          <div className={`w-1 h-1 rounded-full mr-1 animate-pulse ${
                            newsError ? 'bg-amber-400 shadow-amber-400/50' : 'bg-emerald-400 shadow-emerald-400/50'
                          } shadow-lg`}></div>
                          {newsError ? 'Demo' : 'Live'}
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
          
          {/* View All News Button */}
          {news.length > 6 && (
            <div className="text-center mt-12">
              <button 
                onClick={() => navigate('/news')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-full font-bold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-3xl text-lg"
              >
                View All {news.length} News Stories
              </button>
            </div>
          )}
          
          {/* News Sources Footer */}
          <div className="mt-16 p-10 bg-gradient-to-r from-slate-50 to-blue-50 rounded-3xl border border-slate-200">
            <div className="text-center">
              <h4 className="text-2xl font-bold text-slate-900 mb-6 tracking-tight">📡 Trusted News Sources</h4>
              <div className="flex flex-wrap items-center justify-center gap-6">
                {['Moneycontrol', 'Economic Times', 'LiveMint', 'Business Standard'].map((source, index) => (
                  <div key={index} className="flex items-center bg-white px-5 py-3 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full mr-3 animate-pulse shadow-lg shadow-emerald-400/50"></div>
                    <span className="text-sm font-bold text-slate-700">{source}</span>
                  </div>
                ))}
              </div>
              <p className="text-slate-600 mt-6 font-light text-lg">
                Real-time intelligence from India's most authoritative financial publications
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketOverview;