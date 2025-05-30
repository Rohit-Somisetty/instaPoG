
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, TrendingUp, Star, DollarSign, Building, Trophy, Globe, Heart, Microscope } from "lucide-react";

interface Article {
  id: string;
  title: string;
  preview: string;
  thumbnail: string;
  source: string;
  date: string;
}

interface NewsCategory {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  color: string;
  gradient: string;
  articles: Article[];
}

interface NewsGridProps {
  onArticleClick: (article: Article, category: string) => void;
}

const NewsGrid = ({ onArticleClick }: NewsGridProps) => {
  const [selectedCategory, setSelectedCategory] = useState("technology");

  const newsCategories: NewsCategory[] = [
    {
      id: "technology",
      name: "Technology",
      icon: TrendingUp,
      color: "text-blue-600",
      gradient: "from-blue-500 to-cyan-500",
      articles: [
        {
          id: "1",
          title: "AI Revolution in 2025: GPT-5 Changes Everything",
          preview: "Latest breakthrough in artificial intelligence promises to transform how we work and interact with technology across all industries...",
          thumbnail: "/lovable-uploads/467feebf-707c-4337-8287-2bacf1fe9a3e.png",
          source: "TechCrunch",
          date: "2024-12-27"
        },
        {
          id: "2",
          title: "Quantum Computing Reaches New Milestone",
          preview: "Scientists achieve unprecedented quantum stability, bringing us closer to practical quantum computers for everyday use...",
          thumbnail: "/lovable-uploads/467feebf-707c-4337-8287-2bacf1fe9a3e.png",
          source: "MIT Technology Review",
          date: "2024-12-26"
        },
        {
          id: "3",
          title: "Apple Announces Revolutionary Neural Processing Chips",
          preview: "The new M4 Pro chips feature advanced neural engines that can process AI workloads 10x faster than previous generations...",
          thumbnail: "/lovable-uploads/467feebf-707c-4337-8287-2bacf1fe9a3e.png",
          source: "Apple Insider",
          date: "2024-12-25"
        }
      ]
    },
    {
      id: "celebrities",
      name: "Celebrities",
      icon: Star,
      color: "text-pink-600",
      gradient: "from-pink-500 to-rose-500",
      articles: [
        {
          id: "4",
          title: "Hollywood Stars Embrace Virtual Reality",
          preview: "A-list actors are pioneering new forms of entertainment in the metaverse, creating immersive experiences for fans...",
          thumbnail: "/lovable-uploads/467feebf-707c-4337-8287-2bacf1fe9a3e.png",
          source: "Entertainment Weekly",
          date: "2024-12-27"
        },
        {
          id: "5",
          title: "Taylor Swift's Impact on Global Music Industry",
          preview: "The pop superstar's latest tour breaks records and reshapes how artists connect with audiences worldwide...",
          thumbnail: "/lovable-uploads/467feebf-707c-4337-8287-2bacf1fe9a3e.png",
          source: "Rolling Stone",
          date: "2024-12-26"
        }
      ]
    },
    {
      id: "environment",
      name: "Environment",
      icon: Globe,
      color: "text-green-600",
      gradient: "from-green-500 to-emerald-500",
      articles: [
        {
          id: "6",
          title: "Carbon Capture Technology Scales Up",
          preview: "New breakthrough makes atmospheric carbon removal economically viable, offering hope for climate change mitigation...",
          thumbnail: "/lovable-uploads/467feebf-707c-4337-8287-2bacf1fe9a3e.png",
          source: "Nature",
          date: "2024-12-27"
        },
        {
          id: "7",
          title: "Renewable Energy Surpasses Coal Globally",
          preview: "Solar and wind power generation reaches historic milestone, accounting for over 50% of global electricity production...",
          thumbnail: "/lovable-uploads/467feebf-707c-4337-8287-2bacf1fe9a3e.png",
          source: "Environmental Science",
          date: "2024-12-25"
        }
      ]
    },
    {
      id: "finance",
      name: "Finance",
      icon: DollarSign,
      color: "text-yellow-600",
      gradient: "from-yellow-500 to-orange-500",
      articles: [
        {
          id: "8",
          title: "Digital Currency Adoption Reaches 70%",
          preview: "Central bank digital currencies see massive adoption across global markets, transforming international trade...",
          thumbnail: "/lovable-uploads/467feebf-707c-4337-8287-2bacf1fe9a3e.png",
          source: "Bloomberg",
          date: "2024-12-26"
        },
        {
          id: "9",
          title: "AI Trading Algorithms Show 40% Better Performance",
          preview: "Machine learning systems are revolutionizing stock market predictions and investment strategies...",
          thumbnail: "/lovable-uploads/467feebf-707c-4337-8287-2bacf1fe9a3e.png",
          source: "Financial Times",
          date: "2024-12-24"
        }
      ]
    },
    {
      id: "politics",
      name: "Politics",
      icon: Building,
      color: "text-red-600",
      gradient: "from-red-500 to-pink-500",
      articles: [
        {
          id: "10",
          title: "Global Climate Summit Reaches Historic Agreement",
          preview: "World leaders unite on unprecedented environmental legislation, setting binding targets for carbon neutrality...",
          thumbnail: "/lovable-uploads/467feebf-707c-4337-8287-2bacf1fe9a3e.png",
          source: "Reuters",
          date: "2024-12-25"
        }
      ]
    },
    {
      id: "sports",
      name: "Sports",
      icon: Trophy,
      color: "text-purple-600",
      gradient: "from-purple-500 to-indigo-500",
      articles: [
        {
          id: "11",
          title: "AI Coaches Revolutionize Athletic Training",
          preview: "Machine learning algorithms optimize player performance like never before, analyzing biomechanics in real-time...",
          thumbnail: "/lovable-uploads/467feebf-707c-4337-8287-2bacf1fe9a3e.png",
          source: "ESPN",
          date: "2024-12-27"
        }
      ]
    },
    {
      id: "science",
      name: "Science",
      icon: Microscope,
      color: "text-teal-600",
      gradient: "from-teal-500 to-cyan-500",
      articles: [
        {
          id: "12",
          title: "CRISPR Gene Therapy Shows Breakthrough Results",
          preview: "Revolutionary treatment successfully cures genetic disorders in clinical trials, opening new medical frontiers...",
          thumbnail: "/lovable-uploads/467feebf-707c-4337-8287-2bacf1fe9a3e.png",
          source: "Science Journal",
          date: "2024-12-26"
        }
      ]
    },
    {
      id: "world",
      name: "World",
      icon: Globe,
      color: "text-indigo-600",
      gradient: "from-indigo-500 to-purple-500",
      articles: [
        {
          id: "13",
          title: "Global Internet Access Reaches 95% Coverage",
          preview: "Satellite internet initiatives bring connectivity to remote regions, bridging the digital divide worldwide...",
          thumbnail: "/lovable-uploads/467feebf-707c-4337-8287-2bacf1fe9a3e.png",
          source: "World News",
          date: "2024-12-25"
        }
      ]
    },
    {
      id: "health",
      name: "Health",
      icon: Heart,
      color: "text-emerald-600",
      gradient: "from-emerald-500 to-green-500",
      articles: [
        {
          id: "14",
          title: "Personalized Medicine Revolution Through AI",
          preview: "AI-powered drug discovery creates personalized treatments based on individual genetic profiles...",
          thumbnail: "/lovable-uploads/467feebf-707c-4337-8287-2bacf1fe9a3e.png",
          source: "Medical News Today",
          date: "2024-12-27"
        }
      ]
    }
  ];

  const selectedCategoryData = newsCategories.find(cat => cat.id === selectedCategory);

  return (
    <section id="news" className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Latest News
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Stay updated with trending stories across all categories with our AI-powered news aggregation
          </p>
        </div>

        <div className="flex gap-8">
          {/* Left Sidebar - Category Filter */}
          <div className="w-80 bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20 h-fit sticky top-8">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Content Filter</h3>
              <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            </div>
            
            <div className="space-y-2">
              {newsCategories.map((category) => {
                const IconComponent = category.icon;
                const isSelected = selectedCategory === category.id;
                
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 group ${
                      isSelected 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105' 
                        : 'hover:bg-gray-100 text-gray-700 hover:scale-102'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                      isSelected 
                        ? 'bg-white/20' 
                        : `bg-gradient-to-r ${category.gradient}`
                    }`}>
                      <IconComponent className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-white'}`} />
                    </div>
                    <span className="font-medium">{category.name}</span>
                    <div className={`ml-auto w-2 h-2 rounded-full transition-all ${
                      isSelected ? 'bg-white' : 'bg-transparent'
                    }`}></div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Content Area */}
          <div className="flex-1">
            {selectedCategoryData && (
              <>
                <div className="mb-8">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${selectedCategoryData.gradient} rounded-xl flex items-center justify-center`}>
                      <selectedCategoryData.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{selectedCategoryData.name}</h3>
                      <p className="text-gray-600">Latest updates and trending stories</p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-6">
                  {selectedCategoryData.articles.map((article, index) => (
                    <Card 
                      key={article.id} 
                      className="group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 bg-white/90 backdrop-blur-sm border-0 shadow-lg overflow-hidden"
                      onClick={() => onArticleClick(article, selectedCategoryData.name)}
                    >
                      <div className="flex gap-4 p-6">
                        <div className="flex-shrink-0">
                          <img
                            src={article.thumbnail}
                            alt={article.title}
                            className="w-32 h-24 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors mb-2 line-clamp-2">
                            {article.title}
                          </h4>
                          <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                            {article.preview}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <Badge variant="secondary" className="text-xs bg-gray-100 hover:bg-gray-200">
                                {article.source}
                              </Badge>
                              <span className="text-xs text-gray-500 flex items-center">
                                <Calendar className="w-3 h-3 mr-1" />
                                {article.date}
                              </span>
                            </div>
                            <div className={`w-1 h-8 bg-gradient-to-b ${selectedCategoryData.gradient} rounded-full opacity-60 group-hover:opacity-100 transition-opacity`}></div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsGrid;
