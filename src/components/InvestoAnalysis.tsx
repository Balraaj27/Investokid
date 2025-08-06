import React from 'react';
import { Search, TrendingUp, Brain, ArrowRight } from 'lucide-react';

const InvestoAnalysis: React.FC = () => {
  const tools = [
    {
      icon: Search,
      title: 'Stock Screener',
      description: 'Filter stocks based on fundamental and technical criteria to find investment opportunities.',
      features: ['P/E Ratio Analysis', 'Revenue Growth', 'Market Cap Filter'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: TrendingUp,
      title: 'Portfolio Analyzer',
      description: 'Analyze your portfolio performance, risk metrics, and optimization suggestions.',
      features: ['Risk Assessment', 'Diversification', 'Performance Tracking'],
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Brain,
      title: 'AI Insights',
      description: 'Get AI-powered market insights and investment recommendations based on data analysis.',
      features: ['Sentiment Analysis', 'Trend Prediction', 'Risk Scoring'],
      color: 'from-purple-500 to-violet-500'
    }
  ];

  const handleToolLaunch = (toolName: string) => {
    // This would typically open a modal or navigate to the tool
    console.log(`Launching ${toolName}`);
  };

  return (
    <section id="investo-analysis" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Investo Analysis
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professional investment research and analysis tools
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
            >
              <div className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${tool.color} flex items-center justify-center`}>
                    <tool.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {tool.title}
                  </h3>
                </div>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  {tool.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {tool.features.map((feature, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full font-medium"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => handleToolLaunch(tool.title)}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center gap-2 group-hover:gap-3"
                >
                  Launch Tool
                  <ArrowRight className="h-4 w-4 transition-all duration-300" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InvestoAnalysis;