import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Clock, User, ChevronLeft, ChevronRight, Calendar, Zap, Sparkles, Rocket, Star, Bell, Gift, Target } from 'lucide-react';
import { usePlatformUpdates } from '../hooks/usePlatformUpdates';
import type { PlatformUpdate } from '../lib/supabase';

const InvestokidUpdates: React.FC = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const postsPerPage = 9;

  // Use backend data
  const { updates: allUpdates, loading, error } = usePlatformUpdates({ status: 'published' });

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Rotate promotional banners
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAdIndex((prev) => (prev + 1) % promotionalBanners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const promotionalBanners = [
    {
      title: "🚀 New Feature Alert",
      description: "Advanced Portfolio Analytics now available with real-time risk assessment",
      cta: "Explore Now",
      color: "from-blue-600 to-purple-500",
      icon: "🎯"
    },
    {
      title: "📱 Mobile App Update",
      description: "Enhanced user experience with faster performance and new tools",
      cta: "Download Update",
      color: "from-green-600 to-emerald-500",
      icon: "⚡"
    },
    {
      title: "🎉 Platform Milestone",
      description: "Celebrating 250K+ users with exclusive premium features",
      cta: "Join Celebration",
      color: "from-orange-600 to-red-500",
      icon: "🎊"
    }
  ];

  const getUpdateImage = (category: string) => {
    switch (category) {
      case 'Feature Release':
        return 'from-blue-500 to-purple-600';
      case 'App Update':
        return 'from-green-500 to-teal-600';
      case 'Platform Enhancement':
        return 'from-orange-500 to-red-600';
      case 'Security Update':
        return 'from-cyan-500 to-blue-600';
      case 'Content Update':
        return 'from-purple-500 to-pink-600';
      case 'Developer Update':
        return 'from-indigo-500 to-purple-600';
      case 'AI Enhancement':
        return 'from-teal-500 to-green-600';
      case 'Community Feature':
        return 'from-pink-500 to-red-600';
      case 'Performance Update':
        return 'from-yellow-500 to-orange-600';
      case 'Crypto Update':
        return 'from-violet-500 to-purple-600';
      case 'UI Update':
        return 'from-emerald-500 to-teal-600';
      case 'Tax Feature':
        return 'from-red-500 to-pink-600';
      default:
        return 'from-gray-500 to-slate-600';
    }
  };

  const totalPages = Math.ceil(allUpdates.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentUpdates = allUpdates.slice(startIndex, startIndex + postsPerPage);

  const handleUpdateClick = (update: PlatformUpdate) => {
    // Navigate to individual update page (could be implemented later)
    console.log(`Viewing update: ${update.title}`);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Feature Release':
        return Rocket;
      case 'App Update':
        return Sparkles;
      case 'Security Update':
        return Target;
      default:
        return Bell;
    }
  };

  const scrollToSection = (sectionId: string) => {
    navigate('/');
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-800 text-white py-24 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-cyan-400/20 rounded-full blur-lg animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-pink-400/20 rounded-full blur-md animate-pulse"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Breadcrumb */}
          <div className="flex items-center justify-center gap-2 text-emerald-200 mb-6">
            <button
              onClick={() => navigate('/')}
              className="hover:text-white transition-colors"
            >
              Home
            </button>
            <span>/</span>
            <button
              onClick={() => scrollToSection('learnings')}
              className="hover:text-white transition-colors"
            >
              Learnings
            </button>
            <span>/</span>
            <span className="text-yellow-400 font-medium">Investokid Updates</span>
          </div>
          
          {/* Main Hero Content */}
          <div className="relative z-10">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent">
              Investokid Updates
            </h1>
            <p className="text-xl md:text-2xl text-emerald-100 max-w-4xl mx-auto mb-8 leading-relaxed">
              Stay informed about the latest features, improvements, and announcements from the Investokid platform
            </p>

            {/* Feature Highlights */}
            <div className="flex flex-wrap items-center justify-center gap-6 mb-12 text-emerald-100">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                <Zap className="h-5 w-5 text-yellow-400" />
                <span className="font-medium">{allUpdates.length} Platform Updates</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                <User className="h-5 w-5 text-yellow-400" />
                <span className="font-medium">Development Team</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                <Clock className="h-5 w-5 text-yellow-400" />
                <span className="font-medium">2-6 min reads</span>
              </div>
            </div>
          </div>
        </div>

        {/* Promotional Banner Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Side - Call to Action */}
            <div className="text-center lg:text-left">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                🚀 What's New at Investokid
              </h2>
              <p className="text-emerald-100 mb-6 text-lg">
                Discover the latest features and improvements we've built for you
              </p>
              <button
                onClick={() => window.scrollTo({ top: 600, behavior: 'smooth' })}
                className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-300 transform hover:scale-105 transition-all duration-200 inline-flex items-center gap-3 shadow-2xl"
              >
                Explore Updates
                <ArrowRight className="h-6 w-6" />
              </button>
            </div>

            {/* Right Side - Rotating Promotional Banners */}
            <div className="relative">
              <div className={`bg-gradient-to-r ${promotionalBanners[currentAdIndex].color} rounded-2xl p-8 shadow-2xl transform hover:scale-105 transition-all duration-300 border border-white/20 backdrop-blur-sm`}>
                <div className="flex items-start gap-4 mb-6">
                  <div className="text-4xl">{promotionalBanners[currentAdIndex].icon}</div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {promotionalBanners[currentAdIndex].title}
                    </h3>
                    <p className="text-white/90 mb-6 leading-relaxed">
                      {promotionalBanners[currentAdIndex].description}
                    </p>
                    <button className="bg-white text-gray-900 px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all duration-200 flex items-center gap-2 shadow-lg">
                      {promotionalBanners[currentAdIndex].cta}
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Banner Indicators */}
              <div className="flex justify-center gap-2 mt-4">
                {promotionalBanners.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentAdIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentAdIndex ? 'bg-yellow-400' : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-16">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-gray-50"></path>
          </svg>
        </div>
      </div>

      {/* Updates Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content - Updates Grid */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(9)].map((_, index) => (
                  <div key={index} className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
                    <div className="h-48 bg-gray-200 rounded-xl mb-4"></div>
                    <div className="h-6 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
                    <div className="flex justify-between">
                      <div className="h-4 bg-gray-200 rounded w-20"></div>
                      <div className="h-4 bg-gray-200 rounded w-16"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <h3 className="text-lg font-bold text-red-800 mb-2">Backend Connection Error</h3>
                <p className="text-red-700">{error}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentUpdates.map((update) => {
                const CategoryIcon = getCategoryIcon(update.category);
                return (
                  <article
                    key={update.id}
                    onClick={() => handleUpdateClick(update)}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden relative"
                  >
                    {/* Pinned Badge */}
                    {update.isPinned && (
                      <div className="absolute top-2 right-2 z-10">
                        <div className="bg-yellow-400 text-gray-900 p-2 rounded-full shadow-lg">
                          <Star className="h-4 w-4 fill-current" />
                        </div>
                      </div>
                    )}

                    {/* Update Image */}
                    <div className={`h-48 bg-gradient-to-br ${getUpdateImage(update.category)} relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-black/20"></div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                      <div className="absolute top-4 left-4 flex items-center gap-2">
                        <span className="bg-white/90 text-gray-800 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                          <CategoryIcon className="h-3 w-3" />
                          {update.category}
                        </span>
                        {update.is_new && (
                          <span className="bg-emerald-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
                            NEW
                          </span>
                        )}
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <h2 className="text-white font-bold text-lg line-clamp-2">
                          {update.title}
                        </h2>
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
                          <User className="h-4 w-4" />
                          <span>{update.author}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{update.read_time}</span>
                          </div>
                          <span>{new Date(update.publish_date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-6">
              {/* Newsletter Signup */}
              <div className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl p-6 shadow-lg text-white">
                <div className="text-center">
                  <div className="text-2xl mb-3">🔔</div>
                  <h3 className="text-lg font-bold mb-2">
                    Update Notifications
                  </h3>
                  <p className="text-white/90 text-sm mb-4">
                    Get notified about new features and platform updates
                  </p>
                  <div className="space-y-2">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full px-3 py-2 rounded-lg text-gray-900 text-sm"
                    />
                    <button className="w-full bg-white text-emerald-600 py-2 px-4 rounded-lg font-semibold text-sm hover:bg-gray-100 transition-colors">
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>

              {/* Categories */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Update Categories</h3>
                <div className="space-y-2">
                  {[
                    'Feature Release',
                    'App Update',
                    'Security Update',
                    'Performance Update',
                    'Content Update'
                  ].map((category, index) => (
                    <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                      <span className="text-sm text-gray-700">{category}</span>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        {allUpdates.filter(update => update.category === category).length}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Updates */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">🔥 Recent Updates</h3>
                <div className="space-y-4">
                  {allUpdates.slice(0, 3).map((update, index) => (
                    <div key={index} className="flex items-start gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                      <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 text-sm font-bold flex-shrink-0">
                        {index + 1}
                      </div>
                      <div>
                        <span className="text-sm text-gray-700 hover:text-emerald-600 transition-colors line-clamp-2">
                          {update.title}
                        </span>
                        <div className="text-xs text-gray-500 mt-1">{new Date(update.publish_date).toLocaleDateString()}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-4 mt-16">
          <button
            onClick={goToPrevPage}
            disabled={currentPage === 1}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
              currentPage === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 shadow-lg hover:shadow-xl'
            }`}
          >
            <ChevronLeft className="h-5 w-5" />
            Previous
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => {
                  setCurrentPage(page);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`w-10 h-10 rounded-lg font-semibold transition-all duration-200 ${
                  currentPage === page
                    ? 'bg-emerald-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-emerald-50 hover:text-emerald-600'
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
              currentPage === totalPages
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 shadow-lg hover:shadow-xl'
            }`}
          >
            Next
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Page Info */}
        <div className="text-center mt-8 text-gray-600">
          Showing {startIndex + 1}-{Math.min(startIndex + postsPerPage, allUpdates.length)} of {allUpdates.length} updates
        </div>
        
        {/* Back to Top Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-emerald-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-emerald-700 transition-all duration-200 inline-flex items-center gap-2"
          >
            Back to Top
            <ArrowRight className="h-4 w-4 rotate-[-90deg]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvestokidUpdates;