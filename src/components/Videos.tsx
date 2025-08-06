import React from 'react';
import { Play, Eye, Calendar } from 'lucide-react';

interface Video {
  id: number;
  title: string;
  description: string;
  duration: string;
  views: string;
  date: string;
  thumbnail: string;
}

const Videos: React.FC = () => {
  const videos: Video[] = [
    {
      id: 1,
      title: 'Understanding Market Volatility',
      description: 'Learn how to navigate volatile markets and protect your investments during uncertain times.',
      duration: '12:34',
      views: '15K',
      date: '2 days ago',
      thumbnail: 'from-blue-500 to-purple-600'
    },
    {
      id: 2,
      title: 'Technical Analysis Masterclass',
      description: 'Master the art of reading charts and identifying profitable trading opportunities.',
      duration: '18:45',
      views: '23K',
      date: '1 week ago',
      thumbnail: 'from-green-500 to-teal-600'
    },
    {
      id: 3,
      title: 'Building a Diversified Portfolio',
      description: 'Step-by-step guide to creating a well-balanced investment portfolio for long-term growth.',
      duration: '25:12',
      views: '31K',
      date: '2 weeks ago',
      thumbnail: 'from-orange-500 to-red-600'
    },
    {
      id: 4,
      title: 'Cryptocurrency Investment Guide',
      description: 'Everything you need to know about investing in digital assets and blockchain technology.',
      duration: '14:28',
      views: '19K',
      date: '3 weeks ago',
      thumbnail: 'from-purple-500 to-pink-600'
    }
  ];

  const handleVideoClick = (video: Video) => {
    console.log(`Playing: ${video.title}`);
    // This would typically open a video player modal or navigate to video page
  };

  return (
    <section id="videos" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Educational Videos
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn from expert analysis and market insights
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {videos.map((video) => (
            <div
              key={video.id}
              onClick={() => handleVideoClick(video)}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden"
            >
              {/* Video Thumbnail */}
              <div className={`relative h-48 bg-gradient-to-br ${video.thumbnail} flex items-center justify-center`}>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                <Play className="h-12 w-12 text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 z-10" />
                <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-sm font-medium">
                  {video.duration}
                </div>
              </div>

              {/* Video Content */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {video.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {video.description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    <span>{video.views} views</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{video.date}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Videos;