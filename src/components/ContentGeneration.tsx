
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Download, Share2, Sparkles } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Article {
  id: string;
  title: string;
  preview: string;
  thumbnail: string;
  source: string;
  date: string;
}

interface ContentGenerationProps {
  article: Article | null;
  isVisible: boolean;
}

const ContentGeneration = ({ article, isVisible }: ContentGenerationProps) => {
  if (!isVisible || !article) return null;

  // Mock generated content
  const summary = `This breakthrough in ${article.title.toLowerCase()} represents a major advancement in the field. The research demonstrates significant potential for real-world applications and could transform how we approach similar challenges.

Key highlights include innovative methodology, promising results, and strong industry support. The findings have been validated through rigorous testing and peer review, establishing a solid foundation for future development.

The implications extend beyond immediate applications, potentially influencing related technologies and opening new research directions. Industry experts are particularly excited about the scalability and practical implementation possibilities.`;

  const instagramPost = `🚀 BREAKING: Revolutionary breakthrough in AI technology! 

Scientists have achieved something incredible that could change everything we know about artificial intelligence. This isn't just another tech update - it's a game-changer! 💫

The research team spent 3+ years perfecting this innovation, and the results are mind-blowing. Major companies are already lining up to license this technology! 🔥

What do you think this means for the future? Drop your thoughts below! 👇

#AI #Technology #Innovation #Future #TechNews #Breakthrough #Science #Research #ArtificialIntelligence #TechTrends #2025Tech #FutureTech #AIRevolution #TechUpdate #Innovation2025`;

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: `${type} Copied!`,
      description: "Content copied to clipboard",
    });
  };

  return (
    <section id="summary" className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI-Generated Content
            </span>
          </h2>
          <p className="text-xl text-gray-600">
            Your article has been transformed into engaging content
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Summary Panel */}
          <Card className="p-8 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                <Sparkles className="w-6 h-6 mr-2 text-blue-500" />
                AI Summary
              </h3>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(summary, "Summary")}
                >
                  <Copy className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className="prose prose-lg max-w-none">
              {summary.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-gray-700 leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Generated from: {article.title}</span>
                <span>Words: {summary.split(' ').length}</span>
              </div>
            </div>
          </Card>

          {/* Instagram Post Panel */}
          <Card className="p-8 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                <Share2 className="w-6 h-6 mr-2 text-purple-500" />
                Instagram Post
              </h3>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(instagramPost, "Instagram Post")}
                >
                  <Copy className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-lg p-6 border border-gray-200">
              <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                {instagramPost}
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Character count: {instagramPost.length}/2200</span>
                <span>Hashtags: {(instagramPost.match(/#/g) || []).length}</span>
              </div>
            </div>
          </Card>
        </div>

        <div className="text-center mt-12">
          <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 text-lg">
            Generate Another Post
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ContentGeneration;
