import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Clock, User, ChevronLeft, ChevronRight, BookOpen, TrendingUp, Shield, PieChart, Coins, Zap } from 'lucide-react';

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

const Cryptocurrency: React.FC = () => {
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
      title: "Coinbase Pro Trading",
      description: "Professional cryptocurrency trading platform with advanced features",
      cta: "Start Trading",
      discount: "$10 Free Bitcoin",
      color: "from-purple-600 to-blue-500",
      icon: "₿"
    },
    {
      title: "Binance Exchange",
      description: "World's largest cryptocurrency exchange with 350+ coins",
      cta: "Join Binance",
      discount: "0% Trading Fees",
      color: "from-yellow-600 to-orange-500",
      icon: "🚀"
    },
    {
      title: "Crypto Masterclass",
      description: "Complete cryptocurrency investing course for beginners to advanced",
      cta: "Enroll Now",
      discount: "70% OFF Limited Time",
      color: "from-green-600 to-teal-500",
      icon: "🎓"
    }
  ];

  const allPosts: Post[] = [
    {
      id: 1,
      title: "What is Bitcoin? A Beginner's Guide",
      excerpt: "Learn the fundamentals of Bitcoin, how it works, and why it's considered digital gold.",
      content: "Bitcoin is a decentralized digital currency that operates without a central authority...",
      author: "Alex Chen",
      readTime: "10 min read",
      date: "Dec 15, 2024",
      category: "Bitcoin",
      image: "from-orange-500 to-yellow-600"
    },
    {
      id: 2,
      title: "Understanding Blockchain Technology",
      excerpt: "Discover how blockchain technology works and its applications beyond cryptocurrency.",
      content: "Blockchain is a distributed ledger technology that maintains a continuously growing list...",
      author: "Sarah Kim",
      readTime: "12 min read",
      date: "Dec 12, 2024",
      category: "Blockchain",
      image: "from-blue-500 to-purple-600"
    },
    {
      id: 3,
      title: "Ethereum and Smart Contracts",
      excerpt: "Learn about Ethereum's blockchain platform and how smart contracts revolutionize finance.",
      content: "Ethereum is a decentralized platform that runs smart contracts and decentralized applications...",
      author: "Michael Rodriguez",
      readTime: "11 min read",
      date: "Dec 10, 2024",
      category: "Ethereum",
      image: "from-purple-500 to-indigo-600"
    },
    {
      id: 4,
      title: "DeFi: Decentralized Finance Explained",
      excerpt: "Explore the world of decentralized finance and how it's changing traditional banking.",
      content: "DeFi refers to financial services built on blockchain technology that operate without intermediaries...",
      author: "Jennifer Davis",
      readTime: "9 min read",
      date: "Dec 8, 2024",
      category: "DeFi",
      image: "from-green-500 to-teal-600"
    },
    {
      id: 5,
      title: "NFTs: Non-Fungible Tokens Guide",
      excerpt: "Understand what NFTs are, how they work, and their potential applications.",
      content: "NFTs are unique digital assets that represent ownership of specific items or content...",
      author: "David Wilson",
      readTime: "8 min read",
      date: "Dec 5, 2024",
      category: "NFTs",
      image: "from-pink-500 to-purple-600"
    },
    {
      id: 6,
      title: "Cryptocurrency Wallets: Hot vs Cold",
      excerpt: "Learn about different types of crypto wallets and how to keep your assets secure.",
      content: "Cryptocurrency wallets are digital tools that store your private keys and allow you to manage...",
      author: "Lisa Thompson",
      readTime: "10 min read",
      date: "Dec 3, 2024",
      category: "Security",
      image: "from-cyan-500 to-blue-600"
    },
    {
      id: 7,
      title: "Altcoins: Beyond Bitcoin",
      excerpt: "Discover popular alternative cryptocurrencies and their unique features.",
      content: "Altcoins are alternative cryptocurrencies to Bitcoin, each with unique features and use cases...",
      author: "Robert Martinez",
      readTime: "11 min read",
      date: "Dec 1, 2024",
      category: "Altcoins",
      image: "from-indigo-500 to-purple-600"
    },
    {
      id: 8,
      title: "Crypto Trading Strategies",
      excerpt: "Learn proven strategies for trading cryptocurrencies and managing risk.",
      content: "Successful crypto trading requires understanding market dynamics and risk management...",
      author: "Amanda Foster",
      readTime: "13 min read",
      date: "Nov 28, 2024",
      category: "Trading",
      image: "from-red-500 to-pink-600"
    },
    {
      id: 9,
      title: "Staking and Yield Farming",
      excerpt: "Earn passive income with your crypto through staking and yield farming strategies.",
      content: "Staking and yield farming are ways to earn rewards by participating in blockchain networks...",
      author: "James Johnson",
      readTime: "9 min read",
      date: "Nov 25, 2024",
      category: "Staking",
      image: "from-teal-500 to-green-600"
    },
    {
      id: 10,
      title: "Crypto Regulations Around the World",
      excerpt: "Understand the regulatory landscape for cryptocurrencies in different countries.",
      content: "Cryptocurrency regulations vary significantly across different jurisdictions worldwide...",
      author: "Maria Garcia",
      readTime: "10 min read",
      date: "Nov 22, 2024",
      category: "Regulation",
      image: "from-yellow-500 to-orange-600"
    },
    {
      id: 11,
      title: "Mining Cryptocurrency: A Complete Guide",
      excerpt: "Learn how cryptocurrency mining works and whether it's profitable in 2024.",
      content: "Cryptocurrency mining is the process of validating transactions and adding them to the blockchain...",
      author: "Chris Anderson",
      readTime: "12 min read",
      date: "Nov 20, 2024",
      category: "Mining",
      image: "from-emerald-500 to-teal-600"
    },
    {
      id: 12,
      title: "Future of Cryptocurrency",
      excerpt: "Explore predictions and trends shaping the future of digital currencies.",
      content: "The cryptocurrency landscape continues to evolve with new technologies and adoption...",
      author: "Rachel Green",
      readTime: "11 min read",
      date: "Nov 18, 2024",
      category: "Future Trends",
      image: "from-violet-500 to-purple-600"
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
      case 'Bitcoin':
        return Coins;
      case 'Blockchain':
        return Shield;
      case 'Trading':
        return TrendingUp;
      default:
        return Zap;
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
      <div className="relative bg-gradient-to-br from-purple-600 via-pink-600 to-indigo-800 text-white py-24 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-cyan-400/20 rounded-full blur-lg animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-green-400/20 rounded-full blur-md animate-pulse"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Breadcrumb */}
          <div className="flex items-center justify-center gap-2 text-purple-200 mb-6">
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
            <span className="text-yellow-400 font-medium">Cryptocurrency</span>
          </div>
          
          {/* Main Hero Content */}
          <div className="relative z-10">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent">
              Cryptocurrency
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 max-w-4xl mx-auto mb-8 leading-relaxed">
              Explore digital assets, blockchain technology, and crypto investment strategies
            </p>

            {/* Feature Highlights */}
            <div className="flex flex-wrap items-center justify-center gap-6 mb-12 text-purple-100">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                <Coins className="h-5 w-5 text-yellow-400" />
                <span className="font-medium">{allPosts.length} Crypto Guides</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                <User className="h-5 w-5 text-yellow-400" />
                <span className="font-medium">Crypto Experts</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                <Clock className="h-5 w-5 text-yellow-400" />
                <span className="font-medium">8-13 min reads</span>
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
                🚀 Enter the Crypto Universe
              </h2>
              <p className="text-purple-100 mb-6 text-lg">
                Start your cryptocurrency journey with trusted platforms and expert education
              </p>
              <button
                onClick={() => window.scrollTo({ top: 600, behavior: 'smooth' })}
                className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-300 transform hover:scale-105 transition-all duration-200 inline-flex items-center gap-3 shadow-2xl"
              >
                Explore Crypto World
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
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Coins className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Free Crypto Tracker
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Download our portfolio tracking spreadsheet
                  </p>
                  <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-xl font-semibold text-sm hover:bg-purple-700 transition-colors">
                    Download Now
                  </button>
                </div>
              </div>

              {/* Newsletter Signup */}
              <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-6 shadow-lg text-white">
                <div className="text-center">
                  <div className="text-2xl mb-3">🚀</div>
                  <h3 className="text-lg font-bold mb-2">
                    Crypto Alerts
                  </h3>
                  <p className="text-white/90 text-sm mb-4">
                    Get daily crypto news and price alerts
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
                : 'bg-white text-gray-700 hover:bg-purple-50 hover:text-purple-600 shadow-lg hover:shadow-xl'
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
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-purple-50 hover:text-purple-600'
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
                : 'bg-white text-gray-700 hover:bg-purple-50 hover:text-purple-600 shadow-lg hover:shadow-xl'
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
            className="bg-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-purple-700 transition-all duration-200 inline-flex items-center gap-2"
          >
            Back to Top
            <ArrowRight className="h-4 w-4 rotate-[-90deg]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cryptocurrency;