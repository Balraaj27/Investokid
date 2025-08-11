import React, { useEffect, useState } from 'react';
import { ArrowRight, Play, TrendingUp, DollarSign, BarChart3, PieChart, Target, Zap } from 'lucide-react';
import { useMarketData } from '../hooks/useMarketData';
import { formatCurrency, formatPercentage } from '../services/marketData';

const Hero: React.FC = () => {
  // Use the market data hook
  const { data: marketData, loading: marketLoading, error: marketError, lastUpdate } = useMarketData(
    ['NSEI', 'BSESN', 'NSEBANK'] // Indian market indices
    // No auto-refresh to prevent infinite calls
  );

  const [stats, setStats] = useState({
    users: 0,
    reports: 0,
    returns: 0,
    monitoring: '24/7'
  });

  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);
  
  const features = [
    { icon: BarChart3, title: "Market Analysis", desc: "Real-time insights" },
    { icon: PieChart, title: "Portfolio Tools", desc: "Smart allocation" },
    { icon: Target, title: "Goal Planning", desc: "Achieve targets" },
    { icon: Zap, title: "Quick Learning", desc: "Fast education" }
  ];

  useEffect(() => {
    // Animate counters
    const animateCounter = (target: number, key: 'users' | 'reports' | 'returns') => {
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
      animateCounter(10000, 'users');
      animateCounter(500, 'reports');
      animateCounter(15, 'returns');
    }, 500);

    // Rotate features
    const featureTimer = setInterval(() => {
      setCurrentFeatureIndex((prev) => (prev + 1) % features.length);
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearInterval(featureTimer);
    };
  }, []);

  // Transform market data for display
  const displayMarketData = marketData.map(item => ({
    symbol: item.symbol === 'NSEI' ? 'NIFTY 50' : 
            item.symbol === 'BSESN' ? 'SENSEX' : 
            item.symbol === 'NSEBANK' ? 'BANK NIFTY' : item.symbol,
    price: item.price,
    change: item.changePercent,
    isUp: item.changePercent >= 0
  }));

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M60 60L0 0v60h60zM120 60L60 0v60h60z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      {/* Floating Financial Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-emerald-400/5 to-teal-400/5 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-40 h-40 bg-gradient-to-r from-amber-400/5 to-orange-400/5 rounded-full blur-3xl animate-bounce"></div>
        <div className="absolute bottom-32 left-1/4 w-28 h-28 bg-gradient-to-r from-blue-400/5 to-cyan-400/5 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-24 h-24 bg-gradient-to-r from-violet-400/5 to-purple-400/5 rounded-full blur-lg animate-bounce"></div>
        
        {/* Floating Icons */}
        <div className="absolute top-32 left-1/4 text-emerald-400/15 animate-bounce">
          <TrendingUp className="h-16 w-16" />
        </div>
        <div className="absolute bottom-40 right-1/4 text-amber-400/15 animate-pulse">
          <DollarSign className="h-14 w-14" />
        </div>
        <div className="absolute top-1/2 left-20 text-blue-400/15 animate-bounce">
          <BarChart3 className="h-12 w-12" />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Main Content */}
          <div className="text-center lg:text-left">
            {/* Animated Badge */}
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 backdrop-blur-md border border-emerald-400/20 rounded-full px-6 py-3 mb-8">
              <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50"></div>
              <span className="text-emerald-200 text-sm font-semibold tracking-wide">Live Market Intelligence</span>
              <TrendingUp className="h-4 w-4 text-emerald-400" />
            </div>

            <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight tracking-tight">
              Master <span className="bg-gradient-to-r from-amber-300 via-orange-300 to-rose-300 bg-clip-text text-transparent">Financial</span>
              <br />
              <span className="bg-gradient-to-r from-emerald-300 via-blue-300 to-violet-300 bg-clip-text text-transparent">Excellence</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-10 text-slate-200 leading-relaxed font-light max-w-2xl">
              Transform your financial future with institutional-grade education, real-time market intelligence, 
              and professional investment tools trusted by experts.
            </p>

            {/* Feature Highlights */}
            <div className="flex flex-wrap gap-4 mb-10">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className={`flex items-center gap-3 px-5 py-2.5 rounded-full backdrop-blur-md border transition-all duration-500 ${
                    index === currentFeatureIndex 
                      ? 'bg-amber-400/15 border-amber-400/30 text-amber-200 shadow-lg shadow-amber-400/10' 
                      : 'bg-white/5 border-white/10 text-slate-300'
                  }`}
                >
                  <feature.icon className="h-4 w-4" />
                  <span className="text-sm font-semibold tracking-wide">{feature.title}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-6 mb-12">
              <button
                onClick={() => scrollToSection('learnings')}
                className="bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 px-10 py-4 rounded-full font-bold text-lg hover:from-amber-300 hover:to-orange-400 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 shadow-2xl shadow-amber-500/25 hover:shadow-3xl hover:shadow-amber-500/40"
              >
                Begin Your Journey
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => scrollToSection('market-overview')}
                className="border-2 border-white/20 text-white px-10 py-4 rounded-full font-semibold text-lg hover:bg-white/10 hover:border-white/30 backdrop-blur-md transition-all duration-300 flex items-center justify-center gap-3 hover:shadow-xl"
              >
                <Play className="h-5 w-5 transition-transform group-hover:scale-110" />
                Explore Platform
              </button>
            </div>
          </div>

          {/* Right Side - Market Data & Stats */}
          <div className="space-y-8">
            {/* Live Market Data */}
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-3 h-3 rounded-full animate-pulse ${
                  marketLoading ? 'bg-amber-400 shadow-amber-400/50' : marketError ? 'bg-rose-400 shadow-rose-400/50' : 'bg-emerald-400 shadow-emerald-400/50'
                } shadow-lg`}></div>
                <h3 className="text-xl font-bold text-white tracking-wide">Live Market Intelligence</h3>
                {lastUpdate && (
                  <span className="text-sm text-slate-300 font-medium">
                    Updated: {lastUpdate.toLocaleTimeString()}
                  </span>
                )}
              </div>
              
              {marketError && (
                <div className="text-rose-200 text-sm mb-4 p-3 bg-rose-500/10 rounded-xl border border-rose-500/20">
                  ⚠️ Using demo data - {marketError}
                </div>
              )}
              
              <div className="space-y-4">
                {(displayMarketData.length > 0 ? displayMarketData : [
                  { symbol: 'NIFTY 50', price: 18567.89, change: 1.23, isUp: true },
                  { symbol: 'SENSEX', price: 61234.56, change: 0.87, isUp: true },
                  { symbol: 'BANK NIFTY', price: 45567.12, change: -0.45, isUp: false }
                ]).map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-3 px-4 bg-white/5 rounded-xl border border-white/5">
                    <span className="text-slate-200 font-semibold tracking-wide">{item.symbol}</span>
                    <div className="text-right">
                      <div className="text-white font-bold text-lg">
                        {typeof item.price === 'number' 
                          ? item.price.toLocaleString('en-US', { minimumFractionDigits: 2 })
                          : item.price
                        }
                      </div>
                      <div className={`text-sm font-bold ${item.isUp ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {item.isUp ? '+' : ''}{item.change.toFixed(2)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-lg rounded-xl p-6 border border-blue-400/30">
                <div className="text-3xl font-bold text-blue-300 mb-2">
                  {stats.users >= 10000 ? '50K+' : `${Math.floor(stats.users / 1000)}K+`}
                </div>
                <div className="text-blue-200 text-sm">Students Educated</div>
              </div>
              
              <div className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 backdrop-blur-lg rounded-xl p-6 border border-emerald-400/30">
                <div className="text-3xl font-bold text-green-300 mb-2">
                  {stats.returns}%
                </div>
                <div className="text-green-200 text-sm">Avg. Portfolio Growth</div>
              </div>
              
              <div className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 backdrop-blur-lg rounded-xl p-6 border border-amber-400/30">
                <div className="text-3xl font-bold text-yellow-300 mb-2">
                  {stats.reports}+
                </div>
                <div className="text-yellow-200 text-sm">Expert Articles</div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-lg rounded-xl p-6 border border-purple-400/30">
                <div className="text-3xl font-bold text-purple-300 mb-2">
                  24/7
                </div>
                <div className="text-purple-200 text-sm">Market Analysis</div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
              <div className="flex items-center justify-center gap-8 text-sm text-slate-300 font-medium">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full shadow-lg shadow-emerald-400/50"></div>
                  <span>SEC Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50"></div>
                  <span>Bank-Level Security</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-amber-400 rounded-full shadow-lg shadow-amber-400/50"></div>
                  <span>Expert Verified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;