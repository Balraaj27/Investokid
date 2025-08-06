import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Clock, User, Share2, Bookmark, Eye, ThumbsUp, MessageCircle, Calendar, Tag, ChevronRight, Play, Download, ExternalLink } from 'lucide-react';

const BlogPost: React.FC = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(247);
  const [hasLiked, setHasLiked] = useState(false);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [postData, setPostData] = useState<any>(null);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Simulate loading post data based on slug
    // In a real app, this would fetch from an API
    const mockPostData = {
      title: slug?.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') || 'What is Investing? A Beginner\'s Complete Guide',
      category: determineCategory(slug),
      author: 'Sarah Johnson',
      readTime: '8 min read',
      date: 'Dec 15, 2024',
      views: '12.5K'
    };
    setPostData(mockPostData);
  }, []);

  const determineCategory = (slug?: string) => {
    if (!slug) return 'Investment Basics';
    if (slug.includes('technical') || slug.includes('chart') || slug.includes('indicator')) return 'Technical Analysis';
    if (slug.includes('budget') || slug.includes('retirement') || slug.includes('planning')) return 'Financial Planning';
    if (slug.includes('crypto') || slug.includes('bitcoin') || slug.includes('blockchain')) return 'Cryptocurrency';
    return 'Investment Basics';
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Technical Analysis':
        return 'from-green-600 via-teal-600 to-emerald-800';
      case 'Financial Planning':
        return 'from-orange-600 via-red-600 to-pink-800';
      case 'Cryptocurrency':
        return 'from-purple-600 via-pink-600 to-indigo-800';
      default:
        return 'from-blue-600 via-purple-600 to-indigo-800';
    }
  };

  const getCategoryPath = (category: string) => {
    switch (category) {
      case 'Technical Analysis':
        return '/technical-analysis';
      case 'Financial Planning':
        return '/financial-planning';
      case 'Cryptocurrency':
        return '/cryptocurrency';
      default:
        return '/investment-basics';
    }
  };

  // Rotate inline ads
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAdIndex((prev) => (prev + 1) % inlineAds.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const inlineAds = [
    {
      title: "Start Investing with Robinhood",
      description: "Commission-free stock trading for beginners. Get your first stock free!",
      cta: "Get Free Stock",
      discount: "Up to $200 Bonus",
      color: "from-green-600 to-emerald-500",
      icon: "💰"
    },
    {
      title: "Learn with Coursera",
      description: "Financial Markets course by Yale University. Top-rated by 500K+ students.",
      cta: "Start Learning",
      discount: "7-Day Free Trial",
      color: "from-blue-600 to-indigo-500",
      icon: "🎓"
    },
    {
      title: "Track with Personal Capital",
      description: "Free investment tracking and portfolio analysis tools.",
      cta: "Analyze Portfolio",
      discount: "100% Free Tools",
      color: "from-purple-600 to-violet-500",
      icon: "📊"
    }
  ];

  const sidebarAds = [
    {
      title: "Investment Calculator",
      description: "Calculate compound returns",
      cta: "Try Free",
      color: "from-blue-500 to-cyan-500",
      icon: "🧮"
    },
    {
      title: "Stock Screener Pro",
      description: "Find winning stocks easily",
      cta: "Start Screening",
      color: "from-green-500 to-teal-500",
      icon: "🔍"
    },
    {
      title: "Portfolio Tracker",
      description: "Monitor your investments",
      cta: "Track Now",
      color: "from-orange-500 to-red-500",
      icon: "📈"
    }
  ];

  const relatedPosts = [
    {
      title: "Understanding Risk vs Return",
      readTime: "6 min read",
      image: "from-red-500 to-orange-600"
    },
    {
      title: "Diversification Strategies",
      readTime: "7 min read",
      image: "from-green-500 to-teal-600"
    },
    {
      title: "The Power of Compound Interest",
      readTime: "5 min read",
      image: "from-yellow-500 to-orange-600"
    }
  ];

  const handleLike = () => {
    if (!hasLiked) {
      setLikes(likes + 1);
      setHasLiked(true);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'What is Investing? A Beginner\'s Complete Guide',
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      // Show notification
      if ((window as any).showNotification) {
        (window as any).showNotification({
          type: 'success',
          message: 'Link copied to clipboard!'
        });
      }
    }
  };

  const getPostDescription = (category?: string) => {
    switch (category) {
      case 'Technical Analysis':
        return 'Master chart patterns, indicators, and technical analysis techniques for better trading decisions with this comprehensive guide.';
      case 'Financial Planning':
        return 'Learn essential budgeting, retirement planning, and wealth building strategies to secure your financial future.';
      case 'Cryptocurrency':
        return 'Explore digital assets, blockchain technology, and crypto investment strategies in this detailed beginner\'s guide.';
      default:
        return 'Learn the fundamental concepts of investing, why it\'s important, and how to get started with your first investment in this comprehensive beginner\'s guide.';
    }
  };

  const getAuthorTitle = (category?: string) => {
    switch (category) {
      case 'Technical Analysis':
        return 'Senior Technical Analyst';
      case 'Financial Planning':
        return 'Certified Financial Planner';
      case 'Cryptocurrency':
        return 'Crypto Investment Specialist';
      default:
        return 'Senior Investment Advisor';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Hero Section */}
      <div className={`relative bg-gradient-to-br ${getCategoryColor(postData?.category || 'Investment Basics')} text-white py-16`}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-white/70 mb-6">
            <button
              onClick={() => navigate('/')}
              className="hover:text-white transition-colors"
            >
              Home
            </button>
            <ChevronRight className="h-4 w-4" />
            <button
              onClick={() => navigate(getCategoryPath(postData?.category || 'Investment Basics'))}
              className="hover:text-white transition-colors"
            >
              {postData?.category || 'Investment Basics'}
            </button>
            <ChevronRight className="h-4 w-4" />
            <span className="text-yellow-400">{postData?.title?.split(':')[0] || 'What is Investing?'}</span>
          </div>

          {/* Back Button */}
          <button
            onClick={() => navigate(getCategoryPath(postData?.category || 'Investment Basics'))}
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to {postData?.category || 'Investment Basics'}
          </button>

          {/* Post Header */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-bold">
                Fundamentals
              </span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                Beginner Friendly
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {postData?.title || 'What is Investing? A Beginner\'s Complete Guide'}
            </h1>

            <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">
              {getPostDescription(postData?.category)}
            </p>

            {/* Author & Meta Info */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-white/70">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-white">{postData?.author || 'Sarah Johnson'}</div>
                  <div className="text-sm">{getAuthorTitle(postData?.category)}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{postData?.date || 'Dec 15, 2024'}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{postData?.readTime || '8 min read'}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  <span>{postData?.views || '12.5K views'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Article Content */}
          <div className="lg:col-span-3">
            <article className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              {/* Social Actions */}
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200">
                <div className="flex items-center gap-4">
                  <button
                    onClick={handleLike}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                      hasLiked 
                        ? 'bg-red-50 text-red-600' 
                        : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600'
                    }`}
                  >
                    <ThumbsUp className={`h-4 w-4 ${hasLiked ? 'fill-current' : ''}`} />
                    <span className="font-medium">{likes}</span>
                  </button>
                  <button
                    onClick={handleShare}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-all"
                  >
                    <Share2 className="h-4 w-4" />
                    <span className="font-medium">Share</span>
                  </button>
                  <button
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                      isBookmarked 
                        ? 'bg-yellow-50 text-yellow-600' 
                        : 'bg-gray-100 text-gray-600 hover:bg-yellow-50 hover:text-yellow-600'
                    }`}
                  >
                    <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
                    <span className="font-medium">Save</span>
                  </button>
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <MessageCircle className="h-4 w-4" />
                  <span>23 comments</span>
                </div>
              </div>

              {/* Table of Contents */}
              <div className="bg-blue-50 rounded-xl p-6 mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Tag className="h-5 w-5 text-blue-600" />
                  Table of Contents
                </h3>
                <ul className="space-y-2">
                  <li><a href="#what-is-investing" className="text-blue-600 hover:text-blue-800 transition-colors">1. What is Investing?</a></li>
                  <li><a href="#why-invest" className="text-blue-600 hover:text-blue-800 transition-colors">2. Why Should You Invest?</a></li>
                  <li><a href="#types-of-investments" className="text-blue-600 hover:text-blue-800 transition-colors">3. Types of Investments</a></li>
                  <li><a href="#getting-started" className="text-blue-600 hover:text-blue-800 transition-colors">4. How to Get Started</a></li>
                  <li><a href="#common-mistakes" className="text-blue-600 hover:text-blue-800 transition-colors">5. Common Mistakes to Avoid</a></li>
                  <li><a href="#next-steps" className="text-blue-600 hover:text-blue-800 transition-colors">6. Next Steps</a></li>
                </ul>
              </div>

              {/* Article Content */}
              <div className="prose prose-lg max-w-none">
                <section id="what-is-investing" className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">What is Investing?</h2>
                  
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Investing is the act of allocating money or capital to an endeavor with the expectation of obtaining additional income or profit. Unlike saving, where you simply store money in a bank account, investing involves putting your money to work in various financial instruments, businesses, or assets that have the potential to grow in value over time.
                  </p>

                  <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 mb-8">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">💡 Key Insight</h4>
                    <p className="text-gray-700">
                      The fundamental principle of investing is simple: you're trading money today for the possibility of having more money in the future. This involves taking calculated risks with the goal of generating returns that exceed what you'd earn from traditional savings accounts.
                    </p>
                  </div>

                  <p className="text-gray-700 leading-relaxed mb-6">
                    When you invest, you become a stakeholder in the growth potential of companies, real estate, commodities, or other assets. The returns you receive can come in various forms, including dividends, interest payments, rental income, or capital appreciation when you sell an asset for more than you paid for it.
                  </p>

                  {/* Featured Image Placeholder */}
                  <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-8 text-center text-white mb-8">
                    <div className="text-4xl mb-4">📈</div>
                    <h4 className="text-xl font-semibold mb-2">Investment Growth Visualization</h4>
                    <p className="text-blue-100">Interactive chart showing compound growth over time would go here</p>
                  </div>
                </section>

                {/* Inline Advertisement */}
                <div className="my-12">
                  <div className="text-center mb-4">
                    <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                      Sponsored
                    </span>
                  </div>
                  <div className={`bg-gradient-to-r ${inlineAds[currentAdIndex].color} rounded-2xl p-8 text-white text-center shadow-xl`}>
                    <div className="text-4xl mb-4">{inlineAds[currentAdIndex].icon}</div>
                    <div className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-full text-sm font-bold inline-block mb-4">
                      {inlineAds[currentAdIndex].discount}
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{inlineAds[currentAdIndex].title}</h3>
                    <p className="text-white/90 mb-6 max-w-md mx-auto">{inlineAds[currentAdIndex].description}</p>
                    <button className="bg-white text-gray-900 px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all duration-200 inline-flex items-center gap-2">
                      {inlineAds[currentAdIndex].cta}
                      <ExternalLink className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <section id="why-invest" className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Should You Invest?</h2>
                  
                  <p className="text-gray-700 leading-relaxed mb-6">
                    There are several compelling reasons why investing is crucial for building long-term wealth and financial security:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-green-50 rounded-xl p-6">
                      <h4 className="text-lg font-semibold text-green-800 mb-3">🚀 Wealth Building</h4>
                      <p className="text-green-700">
                        Investing allows your money to grow exponentially through compound returns, potentially turning modest savings into substantial wealth over time.
                      </p>
                    </div>
                    <div className="bg-blue-50 rounded-xl p-6">
                      <h4 className="text-lg font-semibold text-blue-800 mb-3">🛡️ Inflation Protection</h4>
                      <p className="text-blue-700">
                        Investments typically outpace inflation, preserving and growing your purchasing power while cash in savings accounts loses value over time.
                      </p>
                    </div>
                    <div className="bg-purple-50 rounded-xl p-6">
                      <h4 className="text-lg font-semibold text-purple-800 mb-3">🎯 Goal Achievement</h4>
                      <p className="text-purple-700">
                        Whether it's retirement, buying a home, or funding education, investing helps you reach major financial milestones faster.
                      </p>
                    </div>
                    <div className="bg-orange-50 rounded-xl p-6">
                      <h4 className="text-lg font-semibold text-orange-800 mb-3">💰 Passive Income</h4>
                      <p className="text-orange-700">
                        Many investments generate regular income through dividends, interest, or rental payments, creating additional cash flow.
                      </p>
                    </div>
                  </div>

                  {/* Video Placeholder */}
                  <div className="bg-gray-900 rounded-xl p-8 text-center text-white mb-8">
                    <Play className="h-16 w-16 mx-auto mb-4 text-yellow-400" />
                    <h4 className="text-xl font-semibold mb-2">The Power of Compound Interest</h4>
                    <p className="text-gray-300 mb-4">Watch this 5-minute video to understand how compound interest can transform your financial future</p>
                    <button className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-xl font-semibold hover:bg-yellow-300 transition-colors">
                      Watch Video
                    </button>
                  </div>
                </section>

                <section id="types-of-investments" className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Types of Investments</h2>
                  
                  <p className="text-gray-700 leading-relaxed mb-6">
                    There are numerous investment options available, each with different risk levels, potential returns, and time horizons. Here are the most common types:
                  </p>

                  <div className="space-y-6 mb-8">
                    <div className="border border-gray-200 rounded-xl p-6">
                      <h4 className="text-xl font-semibold text-gray-900 mb-3">📊 Stocks (Equities)</h4>
                      <p className="text-gray-700 mb-3">
                        Stocks represent ownership shares in publicly traded companies. When you buy stock, you become a partial owner of that company and benefit from its growth and profits.
                      </p>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium text-green-600">Pros:</span>
                            <ul className="text-gray-600 mt-1">
                              <li>• High growth potential</li>
                              <li>• Dividend income</li>
                              <li>• Liquidity</li>
                            </ul>
                          </div>
                          <div>
                            <span className="font-medium text-red-600">Cons:</span>
                            <ul className="text-gray-600 mt-1">
                              <li>• Higher volatility</li>
                              <li>• Market risk</li>
                              <li>• Requires research</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-6">
                      <h4 className="text-xl font-semibold text-gray-900 mb-3">🏛️ Bonds</h4>
                      <p className="text-gray-700 mb-3">
                        Bonds are debt securities where you lend money to governments or corporations in exchange for regular interest payments and the return of principal at maturity.
                      </p>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium text-green-600">Pros:</span>
                            <ul className="text-gray-600 mt-1">
                              <li>• Steady income</li>
                              <li>• Lower risk</li>
                              <li>• Portfolio diversification</li>
                            </ul>
                          </div>
                          <div>
                            <span className="font-medium text-red-600">Cons:</span>
                            <ul className="text-gray-600 mt-1">
                              <li>• Lower returns</li>
                              <li>• Interest rate risk</li>
                              <li>• Inflation risk</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-6">
                      <h4 className="text-xl font-semibold text-gray-900 mb-3">🏠 Real Estate</h4>
                      <p className="text-gray-700 mb-3">
                        Real estate investing involves purchasing property to generate rental income or profit from appreciation. This can include residential, commercial, or industrial properties.
                      </p>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium text-green-600">Pros:</span>
                            <ul className="text-gray-600 mt-1">
                              <li>• Rental income</li>
                              <li>• Appreciation potential</li>
                              <li>• Tax benefits</li>
                            </ul>
                          </div>
                          <div>
                            <span className="font-medium text-red-600">Cons:</span>
                            <ul className="text-gray-600 mt-1">
                              <li>• High capital requirement</li>
                              <li>• Illiquid</li>
                              <li>• Management intensive</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Download Resource */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center mb-12">
                  <Download className="h-12 w-12 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-3">Free Investment Starter Kit</h3>
                  <p className="text-blue-100 mb-6 max-w-md mx-auto">
                    Download our comprehensive PDF guide with investment checklists, calculators, and templates to get started.
                  </p>
                  <button className="bg-white text-blue-600 px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all duration-200 inline-flex items-center gap-2">
                    Download Free Kit
                    <Download className="h-4 w-4" />
                  </button>
                </div>

                <section id="getting-started" className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Get Started</h2>
                  
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Starting your investment journey doesn't have to be overwhelming. Follow these step-by-step guidelines to begin investing with confidence:
                  </p>

                  <div className="space-y-6 mb-8">
                    {[
                      {
                        step: "1",
                        title: "Set Clear Financial Goals",
                        description: "Define what you're investing for - retirement, a house, education, or general wealth building. Your goals will determine your investment strategy and timeline."
                      },
                      {
                        step: "2", 
                        title: "Build an Emergency Fund",
                        description: "Before investing, ensure you have 3-6 months of expenses saved in a high-yield savings account for unexpected situations."
                      },
                      {
                        step: "3",
                        title: "Choose Your Investment Account",
                        description: "Open a brokerage account, IRA, or 401(k). Consider tax-advantaged accounts first to maximize your investment growth."
                      },
                      {
                        step: "4",
                        title: "Start with Index Funds",
                        description: "Begin with low-cost, diversified index funds that track the overall market. They're perfect for beginners and require minimal research."
                      },
                      {
                        step: "5",
                        title: "Automate Your Investments",
                        description: "Set up automatic monthly contributions to take advantage of dollar-cost averaging and build consistent investing habits."
                      }
                    ].map((item, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                          {item.step}
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h4>
                          <p className="text-gray-700">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <section id="common-mistakes" className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Common Mistakes to Avoid</h2>
                  
                  <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
                    <h4 className="text-lg font-semibold text-red-800 mb-3">⚠️ Warning: Avoid These Pitfalls</h4>
                    <p className="text-red-700">
                      Even experienced investors make mistakes. Learning about common pitfalls can save you thousands of dollars and years of frustration.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {[
                      {
                        title: "Trying to Time the Market",
                        description: "Attempting to predict market highs and lows is nearly impossible. Time in the market beats timing the market."
                      },
                      {
                        title: "Lack of Diversification", 
                        description: "Putting all your money in one stock or sector increases risk. Spread investments across different assets."
                      },
                      {
                        title: "Emotional Investing",
                        description: "Making decisions based on fear or greed often leads to buying high and selling low."
                      },
                      {
                        title: "Ignoring Fees",
                        description: "High fees can significantly reduce returns over time. Always consider expense ratios and trading costs."
                      }
                    ].map((mistake, index) => (
                      <div key={index} className="border border-gray-200 rounded-xl p-6">
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">{mistake.title}</h4>
                        <p className="text-gray-700">{mistake.description}</p>
                      </div>
                    ))}
                  </div>
                </section>

                <section id="next-steps" className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Next Steps</h2>
                  
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Now that you understand the basics of investing, it's time to take action. Remember, the best time to start investing was yesterday, but the second-best time is today.
                  </p>

                  <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8 mb-8">
                    <h4 className="text-xl font-semibold text-gray-900 mb-4">🎯 Your Action Plan</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        Open an investment account with a reputable broker
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        Start with a small amount you're comfortable with
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        Invest in a broad market index fund
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        Set up automatic monthly contributions
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        Continue learning about investing
                      </li>
                    </ul>
                  </div>
                </section>

                {/* Conclusion */}
                <div className="bg-gray-50 rounded-xl p-8 mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Conclusion</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Investing is one of the most powerful tools for building long-term wealth and achieving financial freedom. While it may seem intimidating at first, starting with the basics and gradually expanding your knowledge will set you on the path to financial success. Remember, every expert was once a beginner, and the most important step is simply getting started.
                  </p>
                </div>
              </div>

              {/* Author Bio */}
              <div className="border-t border-gray-200 pt-8 mt-12">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <User className="h-8 w-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">Sarah Johnson</h4>
                    <p className="text-gray-600 mb-3">
                      Sarah is a Senior Investment Advisor with over 15 years of experience in financial planning and wealth management. She holds a CFA designation and has helped thousands of individuals start their investment journey.
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>📧 sarah@investokid.com</span>
                      <span>🐦 @SarahInvests</span>
                      <span>💼 LinkedIn</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Related Posts */}
              <div className="border-t border-gray-200 pt-8 mt-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedPosts.map((post, index) => (
                    <div key={index} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                      <div className={`h-32 bg-gradient-to-br ${post.image}`}></div>
                      <div className="p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">{post.title}</h4>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Clock className="h-3 w-3" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-6">
              {/* Newsletter Signup */}
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
                <h3 className="text-lg font-bold mb-3">📧 Stay Updated</h3>
                <p className="text-blue-100 text-sm mb-4">
                  Get weekly investment tips and market insights delivered to your inbox.
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 rounded-lg text-gray-900 text-sm"
                  />
                  <button className="w-full bg-white text-blue-600 py-2 px-4 rounded-lg font-semibold text-sm hover:bg-gray-100 transition-colors">
                    Subscribe Free
                  </button>
                </div>
              </div>

              {/* Sidebar Ads */}
              {sidebarAds.map((ad, index) => (
                <div
                  key={index}
                  className={`bg-gradient-to-br ${ad.color} rounded-2xl p-6 text-white hover:scale-105 transition-transform cursor-pointer`}
                >
                  <div className="text-center">
                    <div className="text-3xl mb-3">{ad.icon}</div>
                    <h3 className="text-lg font-bold mb-2">{ad.title}</h3>
                    <p className="text-white/90 text-sm mb-4">{ad.description}</p>
                    <button className="w-full bg-white text-gray-900 py-2 px-4 rounded-xl font-bold text-sm hover:bg-gray-100 transition-colors">
                      {ad.cta}
                    </button>
                  </div>
                </div>
              ))}

              {/* Popular Posts */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">📈 Popular Posts</h3>
                <div className="space-y-4">
                  {[
                    "The Power of Compound Interest",
                    "Dollar-Cost Averaging Strategy", 
                    "Building Your First Portfolio",
                    "Understanding Market Volatility"
                  ].map((title, index) => (
                    <div key={index} className="flex items-start gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm font-bold flex-shrink-0">
                        {index + 1}
                      </div>
                      <span className="text-sm text-gray-700 hover:text-blue-600 transition-colors">{title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;