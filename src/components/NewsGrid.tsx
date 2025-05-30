
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, TrendingUp, Star, DollarSign, Building, Trophy } from "lucide-react";

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
  articles: Article[];
}

interface NewsGridProps {
  onArticleClick: (article: Article, category: string) => void;
}

const NewsGrid = ({ onArticleClick }: NewsGridProps) => {
  // Mock data - will be replaced with RSS feeds
  const newsCategories: NewsCategory[] = [
    {
      id: "technology",
      name: "Technology",
      icon: TrendingUp,
      color: "from-blue-500 to-cyan-500",
      articles: [
        {
          id: "1",
          title: "AI Revolution in 2025: GPT-5 Changes Everything",
          preview: "Latest breakthrough in artificial intelligence promises to transform how we work and interact with technology...",
          thumbnail: "/lovable-uploads/467feebf-707c-4337-8287-2bacf1fe9a3e.png",
          source: "TechCrunch",
          date: "2024-12-27"
        },
        {
          id: "2",
          title: "Quantum Computing Reaches New Milestone",
          preview: "Scientists achieve unprecedented quantum stability, bringing us closer to practical quantum computers...",
          thumbnail: "/lovable-uploads/467feebf-707c-4337-8287-2bacf1fe9a3e.png",
          source: "MIT Technology Review",
          date: "2024-12-26"
        }
      ]
    },
    {
      id: "celebrities",
      name: "Celebrities",
      icon: Star,
      color: "from-pink-500 to-rose-500",
      articles: [
        {
          id: "3",
          title: "Hollywood Stars Embrace Virtual Reality",
          preview: "A-list actors are pioneering new forms of entertainment in the metaverse...",
          thumbnail: "/lovable-uploads/467feebf-707c-4337-8287-2bacf1fe9a3e.png",
          source: "Entertainment Weekly",
          date: "2024-12-27"
        }
      ]
    },
    {
      id: "environment",
      name: "Environment",
      icon: TrendingUp,
      color: "from-green-500 to-emerald-500",
      articles: [
        {
          id: "4",
          title: "Carbon Capture Technology Scales Up",
          preview: "New breakthrough makes atmospheric carbon removal economically viable...",
          thumbnail: "/lovable-uploads/467feebf-707c-4337-8287-2bacf1fe9a3e.png",
          source: "Nature",
          date: "2024-12-27"
        }
      ]
    },
    {
      id: "finance",
      name: "Finance",
      icon: DollarSign,
      color: "from-yellow-500 to-orange-500",
      articles: [
        {
          id: "5",
          title: "Digital Currency Adoption Reaches 70%",
          preview: "Central bank digital currencies see massive adoption across global markets...",
          thumbnail: "/lovable-uploads/467feebf-707c-4337-8287-2bacf1fe9a3e.png",
          source: "Bloomberg",
          date: "2024-12-26"
        }
      ]
    },
    {
      id: "politics",
      name: "Politics",
      icon: Building,
      color: "from-red-500 to-pink-500",
      articles: [
        {
          id: "6",
          title: "Global Climate Summit Reaches Historic Agreement",
          preview: "World leaders unite on unprecedented environmental legislation...",
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
      color: "from-purple-500 to-indigo-500",
      articles: [
        {
          id: "7",
          title: "AI Coaches Revolutionize Athletic Training",
          preview: "Machine learning algorithms optimize player performance like never before...",
          thumbnail: "/lovable-uploads/467feebf-707c-4337-8287-2bacf1fe9a3e.png",
          source: "ESPN",
          date: "2024-12-27"
        }
      ]
    }
  ];

  return (
    <section id="news" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Latest News
            </span>
          </h2>
          <p className="text-xl text-gray-600">
            Stay updated with trending stories across all categories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsCategories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Card key={category.id} className="p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white border-0 shadow-lg">
                <div className="flex items-center mb-4">
                  <div className={`w-10 h-10 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center mr-3`}>
                    <IconComponent className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{category.name}</h3>
                </div>
                
                <div className="space-y-4 max-h-80 overflow-y-auto">
                  {category.articles.map((article) => (
                    <div
                      key={article.id}
                      onClick={() => onArticleClick(article, category.name)}
                      className="cursor-pointer group"
                    >
                      <div className="flex gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <img
                          src={article.thumbnail}
                          alt={article.title}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                            {article.title}
                          </h4>
                          <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                            {article.preview}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <Badge variant="secondary" className="text-xs">
                              {article.source}
                            </Badge>
                            <span className="text-xs text-gray-500 flex items-center">
                              <Calendar className="w-3 h-3 mr-1" />
                              {article.date}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default NewsGrid;
