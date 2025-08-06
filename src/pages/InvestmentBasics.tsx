import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Clock, User, ChevronLeft, ChevronRight, BookOpen, TrendingUp, Shield, PieChart } from 'lucide-react';

interface Post {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  readTime: string;
  date: string;
  category: string;
  image: string;
}

const InvestmentBasics: React.FC = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const postsPerPage = 9;

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Rotate affiliate ads
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAdIndex((prev) => (prev + 1) % affiliateAds.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const affiliateAds = [
    {
      title: "Master Trading with TradingView",
      description: "Professional charting platform used by millions of traders worldwide",
      cta: "Start Free Trial",
      discount: "50% OFF Premium",
      color: "from-blue-600 to-cyan-500",
      icon: "📈"
    },
    {
      title: "Invest with Robinhood",
      description: "Commission-free stock trading and investing for beginners",
      cta: "Get Free Stock",
      discount: "Up to $200 Bonus",
      color: "from-green-600 to-emerald-500",
      icon: "💰"
    },
    {
      title: "Learn with Coursera",
      description: "Financial Markets course by Yale University - Top rated",
      cta: "Enroll Now",
      discount: "7-Day Free Trial",
      color: "from-purple-600 to-violet-500",
      icon: "🎓"
    }
  ];

  const allPosts: Post[] = [
    {
      id: 1,
      title: "What is Investing? A Beginner's Complete Guide",
      excerpt: "Learn the fundamental concepts of investing, why it's important, and how to get started with your first investment.",
      content: "Investing is the act of allocating money or capital to an endeavor with the expectation of obtaining additional income or profit...",
      author: "Sarah Johnson",
      readTime: "8 min read",
      date: "Dec 15, 2024",
      category: "Fundamentals",
      image: "from-blue-500 to-purple-600"
    },
    {
      id: 2,
      title: "Understanding Risk vs Return in Investments",
      excerpt: "Discover the relationship between investment risk and potential returns, and how to balance them in your portfolio.",
      content: "The risk-return tradeoff is a fundamental principle in investing that states potential return rises with an increase in risk...",
      author: "Michael Chen",
      readTime: "6 min read",
      date: "Dec 12, 2024",
      category: "Risk Management",
      image: "from-red-500 to-orange-600"
    },
    {
      id: 3,
      title: "Diversification: Don't Put All Eggs in One Basket",
      excerpt: "Learn why diversification is crucial for reducing investment risk and how to build a well-diversified portfolio.",
      content: "Diversification is a risk management strategy that mixes a wide variety of investments within a portfolio...",
      author: "Emily Rodriguez",
      readTime: "7 min read",
      date: "Dec 10, 2024",
      category: "Portfolio Management",
      image: "from-green-500 to-teal-600"
    },
    {
      id: 4,
      title: "Stocks vs Bonds: Understanding the Basics",
      excerpt: "Compare stocks and bonds, their characteristics, risks, and how they fit into different investment strategies.",
      content: "Stocks and bonds are two of the most common types of investments, each with distinct characteristics and risk profiles...",
      author: "David Kim",
      readTime: "9 min read",
      date: "Dec 8, 2024",
      category: "Asset Classes",
      image: "from-purple-500 to-pink-600"
    },
    {
      id: 5,
      title: "The Power of Compound Interest",
      excerpt: "Understand how compound interest works and why Einstein called it the eighth wonder of the world.",
      content: "Compound interest is the addition of interest to the principal sum of a loan or deposit, or in other words, interest on interest...",
      author: "Lisa Thompson",
      readTime: "5 min read",
      date: "Dec 5, 2024",
      category: "Fundamentals",
      image: "from-yellow-500 to-orange-600"
    },
    {
      id: 6,
      title: "Dollar-Cost Averaging: A Smart Investment Strategy",
      excerpt: "Learn about dollar-cost averaging and how this strategy can help reduce the impact of market volatility.",
      content: "Dollar-cost averaging is an investment strategy where you invest a fixed amount of money at regular intervals...",
      author: "Robert Wilson",
      readTime: "6 min read",
      date: "Dec 3, 2024",
      category: "Investment Strategies",
      image: "from-indigo-500 to-blue-600"
    },
    {
      id: 7,
      title: "Understanding Market Volatility",
      excerpt: "Explore what causes market volatility and how investors can navigate through turbulent market conditions.",
      content: "Market volatility refers to the degree of variation in trading prices over time, typically measured by standard deviation...",
      author: "Amanda Foster",
      readTime: "8 min read",
      date: "Dec 1, 2024",
      category: "Market Analysis",
      image: "from-teal-500 to-green-600"
    },
    {
      id: 8,
      title: "Building Your First Investment Portfolio",
      excerpt: "Step-by-step guide to creating your first investment portfolio with proper asset allocation.",
      content: "Building your first investment portfolio can seem daunting, but with proper planning and understanding of basic principles...",
      author: "James Martinez",
      readTime: "10 min read",
      date: "Nov 28, 2024",
      category: "Portfolio Management",
      image: "from-cyan-500 to-blue-600"
    },
    {
      id: 9,
      title: "Investment Fees and How They Impact Returns",
      excerpt: "Learn about different types of investment fees and how they can significantly impact your long-term returns.",
      content: "Investment fees might seem small, but they can have a significant impact on your investment returns over time...",
      author: "Rachel Green",
      readTime: "7 min read",
      date: "Nov 25, 2024",
      category: "Cost Management",
      image: "from-pink-500 to-purple-600"
    },
    {
      id: 10,
      title: "Emergency Fund vs Investment: What Comes First?",
      excerpt: "Understand the importance of building an emergency fund before investing and how to balance both priorities.",
      content: "One of the most common questions new investors ask is whether they should build an emergency fund or start investing first...",
      author: "Mark Davis",
      readTime: "6 min read",
      date: "Nov 22, 2024",
      category: "Financial Planning",
      image: "from-orange-500 to-red-600"
    },
    {
      id: 11,
      title: "Tax-Advantaged Investment Accounts",
      excerpt: "Explore different types of tax-advantaged accounts like 401(k), IRA, and Roth IRA for optimal tax planning.",
      content: "Tax-advantaged investment accounts are special types of accounts that offer tax benefits to encourage long-term saving...",
      author: "Jennifer Lee",
      readTime: "9 min read",
      date: "Nov 20, 2024",
      category: "Tax Planning",
      image: "from-violet-500 to-purple-600"
    },
    {
      id: 12,
      title: "Common Investment Mistakes to Avoid",
      excerpt: "Learn about the most common investment mistakes beginners make and how to avoid them.",
      content: "Even experienced investors make mistakes, but beginners are particularly susceptible to certain common pitfalls...",
      author: "Thomas Anderson",
      readTime: "8 min read",
      date: "Nov 18, 2024",
      category: "Investment Psychology",
      image: "from-red-500 to-pink-600"
    }
  ];

  const totalPages = Math.ceil(allPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = allPosts.slice(startIndex, startIndex + postsPerPage);

  const handlePostClick = (post: Post) => {
    // Navigate to blog post page
    const slug = post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    navigate(`/blog/${slug}`);
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
      case 'Fundamentals':
        return BookOpen;
      case 'Risk Management':
        return Shield;
      case 'Portfolio Management':
        return PieChart;
      default:
        return TrendingUp;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 text-white py-24 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-green-400/20 rounded-full blur-lg animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-pink-400/20 rounded-full blur-md animate-pulse"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Breadcrumb */}
          <div className="flex items-center justify-center gap-2 text-blue-200 mb-6">
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
            <span className="text-yellow-400 font-medium">Investment Basics</span>
          </div>
          
          {/* Main Hero Content */}
          <div className="relative z-10">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent">
              Investment Basics
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto mb-8 leading-relaxed">
              Master the fundamentals of investing with our comprehensive guides, expert insights, and proven strategies
            </p>

            {/* Feature Highlights */}
            <div className="flex flex-wrap items-center justify-center gap-6 mb-12 text-blue-100">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                <BookOpen className="h-5 w-5 text-yellow-400" />
                <span className="font-medium">{allPosts.length} Expert Articles</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                <User className="h-5 w-5 text-yellow-400" />
                <span className="font-medium">Professional Authors</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                <Clock className="h-5 w-5 text-yellow-400" />
                <span className="font-medium">5-10 min reads</span>
              </div>
            </div>
          </div>
        </div>

        {/* Affiliate Advertisement Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Side - Call to Action */}
            <div className="text-center lg:text-left">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                🚀 Accelerate Your Learning Journey
              </h2>
              <p className="text-blue-100 mb-6 text-lg">
                Get started with professional tools and courses recommended by our experts
              </p>
              <button
                onClick={() => window.scrollTo({ top: 600, behavior: 'smooth' })}
                className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-300 transform hover:scale-105 transition-all duration-200 inline-flex items-center gap-3 shadow-2xl"
              >
                Start Reading Articles
                <ArrowRight className="h-6 w-6" />
              </button>
            </div>

            {/* Right Side - Rotating Affiliate Ads */}
            <div className="relative">
              <div className={`bg-gradient-to-r ${affiliateAds[currentAdIndex].color} rounded-2xl p-8 shadow-2xl transform hover:scale-105 transition-all duration-300 border border-white/20 backdrop-blur-sm`}>
                <div className="flex items-start gap-4 mb-6">
                  <div className="text-4xl">{affiliateAds[currentAdIndex].icon}</div>
                  <div className="flex-1">
                    <div className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-bold inline-block mb-3">
                      {affiliateAds[currentAdIndex].discount}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {affiliateAds[currentAdIndex].title}
                    </h3>
                    <p className="text-white/90 mb-6 leading-relaxed">
                      {affiliateAds[currentAdIndex].description}
                    </p>
                    <button className="bg-white text-gray-900 px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all duration-200 flex items-center gap-2 shadow-lg">
                      {affiliateAds[currentAdIndex].cta}
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Ad Indicators */}
              <div className="flex justify-center gap-2 mt-4">
                {affiliateAds.map((_, index) => (
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

      {/* Posts Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content - Posts Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentPosts.map((post) => {
            const CategoryIcon = getCategoryIcon(post.category);
            return (
              <article
                key={post.id}
                onClick={() => handlePostClick(post)}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden"
              >
                {/* Post Image */}
                <div className={`h-48 bg-gradient-to-br ${post.image} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 text-gray-800 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                      <CategoryIcon className="h-3 w-3" />
                      {post.category}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h2 className="text-white font-bold text-lg line-clamp-2">
                      {post.title}
                    </h2>
                  </div>
                </div>

                {/* Post Content */}
                <div className="p-6">
                  <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>

                  {/* Post Meta */}
                  <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{post.readTime}</span>
                      </div>
                      <span>{post.date}</span>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
            </div>
          </div>

          {/* Vertical Ads Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-6">
              {/* Sponsored Label */}
              <div className="text-center">
                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                  Sponsored
                </span>
              </div>

              {/* Vertical Ads */}
              {affiliateAds.map((ad, index) => (
                <div
                  key={index}
                  className={`bg-gradient-to-br ${ad.color} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-white`}
                >
                  <div className="text-center mb-4">
                    <div className="text-3xl mb-2">{ad.icon}</div>
                    <div className="bg-yellow-400 text-gray-900 px-2 py-1 rounded-full text-xs font-bold inline-block mb-3">
                      {ad.discount}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold mb-3 text-center">
                    {ad.title}
                  </h3>
                  
                  <p className="text-white/90 text-sm mb-4 leading-relaxed text-center">
                    {ad.description}
                  </p>
                  
                  <button className="w-full bg-white text-gray-900 py-2 px-4 rounded-xl font-bold text-sm hover:bg-gray-100 transition-all duration-200 flex items-center justify-center gap-2">
                    {ad.cta}
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              ))}

              {/* Additional Promotional Box */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Free Investment Guide
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Download our comprehensive beginner's guide to investing
                  </p>
                  <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors">
                    Download Now
                  </button>
                </div>
              </div>

              {/* Newsletter Signup */}
              <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-6 shadow-lg text-white">
                <div className="text-center">
                  <div className="text-2xl mb-3">📧</div>
                  <h3 className="text-lg font-bold mb-2">
                    Stay Updated
                  </h3>
                  <p className="text-white/90 text-sm mb-4">
                    Get weekly market insights and investment tips
                  </p>
                  <div className="space-y-2">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full px-3 py-2 rounded-lg text-gray-900 text-sm"
                    />
                    <button className="w-full bg-white text-purple-600 py-2 px-4 rounded-lg font-semibold text-sm hover:bg-gray-100 transition-colors">
                      Subscribe
                    </button>
                  </div>
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
                : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 shadow-lg hover:shadow-xl'
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
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600'
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
                : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 shadow-lg hover:shadow-xl'
            }`}
          >
            Next
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Page Info */}
        <div className="text-center mt-8 text-gray-600">
          Showing {startIndex + 1}-{Math.min(startIndex + postsPerPage, allPosts.length)} of {allPosts.length} articles
        </div>
        
        {/* Back to Top Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-all duration-200 inline-flex items-center gap-2"
          >
            Back to Top
            <ArrowRight className="h-4 w-4 rotate-[-90deg]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvestmentBasics;