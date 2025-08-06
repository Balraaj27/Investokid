import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, BarChart3, Calculator, Coins, ArrowRight, BookOpen, TrendingUp, Shield, PieChart, Users, Award, Clock, Star, Zap, Target, Calendar } from 'lucide-react';

const Learnings: React.FC = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [stats, setStats] = useState({
    readers: 0,
    articles: 0,
    views: 0,
    shares: 0
  });

  // Animate stats on mount
  useEffect(() => {
    const animateCounter = (target: number, key: keyof typeof stats) => {
      let current = 0;
      const increment = target / 100;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setStats(prev => ({ ...prev, [key]: target }));
          clearInterval(timer);
        } else {
          setStats(prev => ({ ...prev, [key]: Math.floor(current) }));
        }
      }, 20);
    };

    const timer = setTimeout(() => {
      animateCounter(250000, 'readers');
      animateCounter(500, 'articles');
      animateCounter(2500000, 'views');
      animateCounter(150000, 'shares');
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const categories = [
    { id: 'all', name: 'All Articles', icon: BookOpen, count: 500 },
    { id: 'basics', name: 'Investment Basics', icon: GraduationCap, count: 150 },
    { id: 'analysis', name: 'Technical Analysis', icon: BarChart3, count: 120 },
    { id: 'planning', name: 'Financial Planning', icon: Calculator, count: 130 },
    { id: 'crypto', name: 'Cryptocurrency', icon: Coins, count: 100 }
  ];

  const learningCards = [
    {
      id: 1,
      icon: GraduationCap,
      title: 'Investment Basics',
      subtitle: 'Essential Knowledge Hub',
      description: 'Comprehensive articles covering investment fundamentals, risk management, and portfolio building strategies.',
      color: 'from-blue-600 via-indigo-600 to-purple-700',
      path: '/investment-basics',
      category: 'basics',
      level: 'Beginner Friendly',
      readTime: '5-8 min reads',
      articles: 150,
      readers: '125K',
      engagement: '4.9★',
      features: ['Risk Assessment', 'Portfolio Building', 'Market Analysis', 'Investment Strategies'],
      recentTopics: ['What is Investing?', 'Risk vs Return', 'Diversification', 'Common Mistakes']
    },
    {
      id: 2,
      icon: BarChart3,
      title: 'Technical Analysis',
      subtitle: 'Advanced Trading Insights',
      description: 'In-depth articles on chart patterns, technical indicators, and professional trading strategies.',
      color: 'from-emerald-600 via-teal-600 to-cyan-700',
      path: '/technical-analysis',
      category: 'analysis',
      level: 'Advanced',
      readTime: '8-12 min reads',
      articles: 120,
      readers: '87K',
      engagement: '4.8★',
      features: ['Chart Patterns', 'Technical Indicators', 'Trading Signals', 'Risk Management'],
      recentTopics: ['Candlestick Patterns', 'Moving Averages', 'RSI & MACD', 'Support & Resistance']
    },
    {
      id: 3,
      icon: Calculator,
      title: 'Financial Planning',
      subtitle: 'Life Planning Guides',
      description: 'Expert articles on budgeting, retirement planning, and comprehensive wealth building strategies.',
      color: 'from-orange-600 via-red-600 to-pink-700',
      path: '/financial-planning',
      category: 'planning',
      level: 'Practical',
      readTime: '7-10 min reads',
      articles: 130,
      readers: '152K',
      engagement: '4.9★',
      features: ['Budgeting', 'Retirement Planning', 'Tax Optimization', 'Estate Planning'],
      recentTopics: ['Emergency Fund', 'Retirement Planning', 'Tax Strategies', 'Estate Planning']
    },
    {
      id: 4,
      icon: Coins,
      title: 'Cryptocurrency',
      subtitle: 'Digital Asset Insights',
      description: 'Latest articles on blockchain technology, digital assets, and cryptocurrency investment strategies.',
      color: 'from-violet-600 via-purple-600 to-fuchsia-700',
      path: '/cryptocurrency',
      category: 'crypto',
      level: 'Emerging Tech',
      readTime: '6-9 min reads',
      articles: 100,
      readers: '98K',
      engagement: '4.7★',
      features: ['Blockchain Tech', 'DeFi Protocols', 'NFT Markets', 'Crypto Trading'],
      recentTopics: ['Bitcoin Basics', 'Ethereum Guide', 'DeFi Explained', 'Crypto Security']
    }
  ];

  const filteredCards = learningCards.filter(card => {
    const matchesCategory = activeCategory === 'all' || card.category === activeCategory;
    const matchesSearch = searchTerm === '' || 
      card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.features.some(feature => feature.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleStartLearning = (card: typeof learningCards[0]) => {
    if (card.path) {
      navigate(card.path);
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner Friendly': return 'bg-green-100 text-green-800';
      case 'Practical': return 'bg-blue-100 text-blue-800';
      case 'Emerging Tech': return 'bg-purple-100 text-purple-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
    <section id="learnings" className="relative py-32 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-emerald-400/10 to-teal-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-orange-400/5 to-pink-400/5 rounded-full blur-2xl animate-bounce"></div>
        
        {/* Floating Icons */}
        <div className="absolute top-20 left-20 text-blue-400/20 animate-bounce">
          <GraduationCap className="h-16 w-16" />
        </div>
        <div className="absolute top-40 right-32 text-emerald-400/20 animate-pulse">
          <BarChart3 className="h-12 w-12" />
        </div>
        <div className="absolute bottom-32 left-1/4 text-orange-400/20 animate-bounce">
          <Calculator className="h-14 w-14" />
        </div>
        <div className="absolute bottom-20 right-20 text-purple-400/20 animate-pulse">
          <Coins className="h-18 w-18" />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-50 to-indigo-50 backdrop-blur-sm border border-blue-200/50 text-blue-700 px-6 py-3 rounded-full text-sm font-bold mb-8 shadow-lg">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse shadow-lg shadow-blue-500/50"></div>
            <BookOpen className="h-5 w-5" />
            <span>Expert Financial Insights & Analysis</span>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse shadow-lg shadow-blue-500/50"></div>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">
            <span className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
              Financial Insights
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Library
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-light mb-12">
            Discover expert-curated articles, in-depth analysis, and actionable insights to transform your financial knowledge. 
            Trusted by 250K+ readers worldwide for reliable financial guidance.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <BookOpen className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Search articles, topics, or strategies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/70 backdrop-blur-lg border border-white/50 rounded-2xl shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500/50 text-slate-700 placeholder-slate-400 text-lg"
              />
            </div>
          </div>
          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div className="group bg-white/70 backdrop-blur-lg rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/50">
              <div className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                {stats.readers >= 250000 ? '250K+' : `${Math.floor(stats.readers / 1000)}K+`}
              </div>
              <div className="text-slate-600 font-medium">Monthly Readers</div>
            </div>
            
            <div className="group bg-white/70 backdrop-blur-lg rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/50">
              <div className="text-3xl font-bold mb-2 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                {stats.articles}+
              </div>
              <div className="text-slate-600 font-medium">Expert Articles</div>
            </div>
            
            <div className="group bg-white/70 backdrop-blur-lg rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/50">
              <div className="text-3xl font-bold mb-2 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                {stats.views >= 2500000 ? '2.5M+' : `${Math.floor(stats.views / 1000000)}M+`}
              </div>
              <div className="text-slate-600 font-medium">Total Views</div>
            </div>
            
            <div className="group bg-white/70 backdrop-blur-lg rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/50">
              <div className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                {stats.shares >= 150000 ? '150K+' : `${Math.floor(stats.shares / 1000)}K+`}
              </div>
              <div className="text-slate-600 font-medium">Article Shares</div>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-semibold transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-2xl scale-105 transform'
                  : 'bg-white/70 backdrop-blur-sm text-slate-700 hover:bg-white/90 hover:scale-105 shadow-xl border border-white/50'
              }`}
            >
              <category.icon className="h-5 w-5" />
              <div className="flex flex-col items-start">
                <span className="text-sm font-bold">{category.name}</span>
                <span className={`text-xs ${activeCategory === category.id ? 'text-white/80' : 'text-slate-500'}`}>
                  {category.count} articles
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Search Results Info */}
        {searchTerm && (
          <div className="text-center mb-8">
            <p className="text-slate-600 bg-white/70 backdrop-blur-sm px-6 py-3 rounded-full inline-block shadow-lg">
              Found {filteredCards.length} articles matching "{searchTerm}"
            </p>
          </div>
        )}

        {/* Learning Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {filteredCards.map((card, index) => (
            <div
              key={card.id}
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className="group relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 border border-white/50 overflow-hidden"
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              {/* Gradient Border */}
              <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`}></div>
              <div className="absolute inset-[2px] bg-white/95 backdrop-blur-xl rounded-3xl"></div>
              
              {/* Card Content */}
              <div className="relative z-10 p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                    <card.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-bold ${getLevelColor(card.level)}`}>
                    {card.level}
                  </div>
                </div>

                {/* Title & Subtitle */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                    {card.title}
                  </h3>
                  <p className="text-sm font-semibold text-slate-500 mb-3">
                    {card.subtitle}
                  </p>
                  <p className="text-slate-600 leading-relaxed font-light">
                    {card.description}
                  </p>
                </div>

                {/* Article Info */}
                <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                  <div className="flex items-center gap-2 text-slate-600">
                    <BookOpen className="h-4 w-4 text-blue-500" />
                    <span>{card.readTime}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <BarChart3 className="h-4 w-4 text-emerald-500" />
                    <span>{card.articles} articles</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <TrendingUp className="h-4 w-4 text-orange-500" />
                    <span>{card.readers}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span>{card.engagement}</span>
                  </div>
                </div>

                {/* Recent Topics */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-slate-700 mb-3">Recent Topics:</h4>
                  <div className="flex flex-wrap gap-2">
                    {card.recentTopics.slice(0, 2).map((topic, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-lg font-medium hover:bg-slate-200 transition-colors cursor-pointer"
                      >
                        {topic}
                      </span>
                    ))}
                    <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-lg font-medium">
                      +{card.recentTopics.length - 2} more
                    </span>
                  </div>
                </div>
                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {card.features.slice(0, 2).map((feature, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full font-medium border border-blue-200/50"
                    >
                      {feature}
                    </span>
                  ))}
                  {card.features.length > 2 && (
                    <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs rounded-full font-medium">
                      +{card.features.length - 2} more
                    </span>
                  )}
                </div>

                {/* CTA Button */}
                <button 
                  onClick={() => handleStartLearning(card)}
                  className={`w-full bg-gradient-to-r ${card.color} text-white py-4 px-6 rounded-2xl font-bold hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 group-hover:gap-4 transform group-hover:scale-105`}
                >
                  <span>Read Articles</span>
                  <ArrowRight className="h-5 w-5 transition-all duration-300 group-hover:translate-x-1" />
                </button>
              </div>

              {/* Hover Effect Overlay */}
              {hoveredCard === card.id && (
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-3xl pointer-events-none"></div>
              )}
            </div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredCards.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-slate-600 mb-4">No articles found matching your search.</p>
            <button onClick={() => setSearchTerm('')} className="text-blue-600 hover:text-blue-800 font-semibold">Clear search</button>
          </div>
        )}
        
        {/* Bottom CTA Section */}
        <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 rounded-3xl p-12 text-white overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}></div>
          </div>

          <div className="relative z-10 text-center">
            <div className="flex items-center justify-center gap-3 mb-8">
              <Award className="h-8 w-8 text-yellow-400" />
              <h3 className="text-3xl md:text-4xl font-bold">
                Join Our Financial Knowledge Community
              </h3>
              <Award className="h-8 w-8 text-yellow-400" />
            </div>
            
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Stay updated with the latest financial insights, expert analysis, and actionable strategies from our community of financial experts.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
              <div className="group">
                <div className="text-3xl font-bold mb-2 bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                  250K+
                </div>
                <div className="text-slate-300 font-medium">Monthly Readers</div>
              </div>
              <div className="group">
                <div className="text-3xl font-bold mb-2 bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                  500+
                </div>
                <div className="text-slate-300 font-medium">Expert Articles</div>
              </div>
              <div className="group">
                <div className="text-3xl font-bold mb-2 bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                  2.5M+
                </div>
                <div className="text-slate-300 font-medium">Article Views</div>
              </div>
              <div className="group">
                <div className="text-3xl font-bold mb-2 bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                  4.8★
                </div>
                <div className="text-slate-300 font-medium">Reader Rating</div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-slate-300 font-medium">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full shadow-lg shadow-emerald-400/50 animate-pulse"></div>
                <span>Expert Verified Content</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50 animate-pulse"></div>
                <span>Daily Updates</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-amber-400 rounded-full shadow-lg shadow-amber-400/50 animate-pulse"></div>
                <span>Trusted by Professionals</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full shadow-lg shadow-purple-400/50 animate-pulse"></div>
                <span>Free Access</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Investokid Updates Section */}
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-50 to-blue-50 backdrop-blur-sm border border-emerald-200/50 text-emerald-700 px-6 py-3 rounded-full text-sm font-bold mb-8 shadow-lg">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-lg shadow-emerald-500/50"></div>
            <Zap className="h-5 w-5" />
            <span>Latest Platform Updates</span>
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-lg shadow-emerald-500/50"></div>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-slate-900 via-emerald-900 to-teal-900 bg-clip-text text-transparent">
              Investokid
            </span>
            <br />
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
              Updates
            </span>
          </h2>
          
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-light">
            Stay informed about the latest features, improvements, and announcements from the Investokid platform
          </p>
        </div>

        {/* Latest Updates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {[
            {
              id: 1,
              title: "New Advanced Portfolio Analytics Dashboard",
              excerpt: "Introducing comprehensive portfolio analysis tools with risk metrics, performance tracking, and detailed asset allocation insights.",
              date: "Dec 18, 2024",
              readTime: "3 min read",
              category: "Feature Release",
              image: "from-blue-500 to-purple-600",
              isNew: true
            },
            {
              id: 2,
              title: "Enhanced Mobile App Experience",
              excerpt: "Redesigned mobile interface with improved navigation, faster loading times, and new touch-friendly financial calculators.",
              date: "Dec 15, 2024",
              readTime: "2 min read",
              category: "App Update",
              image: "from-green-500 to-teal-600",
              isNew: true
            },
            {
              id: 3,
              title: "Real-time Market Data Integration",
              excerpt: "Now featuring live market data from NSE and BSE with real-time price updates and advanced charting capabilities.",
              date: "Dec 12, 2024",
              readTime: "4 min read",
              category: "Platform Enhancement",
              image: "from-orange-500 to-red-600",
              isNew: false
            }
          ].map((update) => (
            <article
              key={update.id}
              onClick={() => navigate('/investokid-updates')}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden border border-gray-100"
            >
              {/* Update Image */}
              <div className={`h-48 bg-gradient-to-br ${update.image} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="bg-white/90 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                    {update.category}
                  </span>
                  {update.isNew && (
                    <span className="bg-emerald-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
                      NEW
                    </span>
                  )}
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-bold text-lg line-clamp-2">
                    {update.title}
                  </h3>
                </div>
              </div>

              {/* Update Content */}
              <div className="p-6">
                <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                  {update.excerpt}
                </p>

                {/* Update Meta */}
                <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{update.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{update.readTime}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Discover More Button */}
        <div className="text-center">
          <button
            onClick={() => navigate('/investokid-updates')}
            className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-10 py-4 rounded-full font-bold hover:from-emerald-700 hover:to-teal-700 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-3xl text-lg inline-flex items-center gap-3"
          >
            Discover More Updates
            <ArrowRight className="h-6 w-6" />
          </button>
        </div>
      </div>
    </section>
    </>
  );
};

export default Learnings;