
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Calendar, ExternalLink, Sparkles } from "lucide-react";
import { useState } from "react";

interface Article {
  id: string;
  title: string;
  preview: string;
  thumbnail: string;
  source: string;
  date: string;
}

interface ArticleModalProps {
  article: Article | null;
  category: string;
  isOpen: boolean;
  onClose: () => void;
  onCreatePost: (article: Article) => void;
}

const ArticleModal = ({ article, category, isOpen, onClose, onCreatePost }: ArticleModalProps) => {
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isOpen || !article) return null;

  const handleCreatePost = async () => {
    setIsGenerating(true);
    
    // Simulate API call
    setTimeout(() => {
      onCreatePost(article);
      setIsGenerating(false);
      onClose();
    }, 2000);
  };

  // Mock full article content
  const fullContent = `
    ${article.preview}
    
    This groundbreaking development represents a significant milestone in the field. Industry experts believe this could revolutionize the way we approach these challenges in the coming years.
    
    The research team, led by renowned scientists, has been working on this project for over three years. Their findings have been published in several peer-reviewed journals and have received widespread acclaim from the scientific community.
    
    According to the lead researcher, "This breakthrough opens up entirely new possibilities that we never thought possible just a few years ago. The implications for society and technology are immense."
    
    The technology is expected to be commercially available within the next two years, with several major companies already expressing interest in licensing the innovation.
    
    This development comes at a crucial time when the industry is facing unprecedented challenges and opportunities. Many believe this could be the solution that transforms the entire landscape.
  `;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Badge className={`bg-gradient-to-r from-blue-500 to-purple-600 text-white`}>
              {category}
            </Badge>
            <span className="text-sm text-gray-500 flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {article.date}
            </span>
            <Badge variant="outline">{article.source}</Badge>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0 hover:bg-gray-100"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="p-6">
            <img
              src={article.thumbnail}
              alt={article.title}
              className="w-full h-64 object-cover rounded-lg mb-6"
            />
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {article.title}
            </h1>
            
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              {fullContent.split('\n').map((paragraph, index) => (
                paragraph.trim() && (
                  <p key={index} className="mb-4">
                    {paragraph.trim()}
                  </p>
                )
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="flex items-center">
                <ExternalLink className="w-4 h-4 mr-2" />
                View Original
              </Button>
            </div>
            
            <Button
              onClick={handleCreatePost}
              disabled={isGenerating}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 text-lg font-semibold"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Create Post
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleModal;
