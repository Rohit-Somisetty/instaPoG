import { useState } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/features/HeroSection";
import NewsGrid from "../components/features/NewsGrid";
import ArticleModal from "../components/features/ArticleModal";
import ContentGeneration from "../components/features/ContentGeneration";
import { generateFromUrl } from "../lib/news-service";
import { toast } from "../hooks/use-toast";

interface Article {
  id: string;
  title: string;
  preview: string;
  thumbnail: string;
  source: string;
  date: string;
  generatedContent?: {
    summary: string;
    instagramPost: string;
  };
}

const Index = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showContentGeneration, setShowContentGeneration] = useState(false);
  const [generatedArticle, setGeneratedArticle] = useState<Article | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleArticleClick = (article: Article, category: string) => {
    setSelectedArticle(article);
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleCreatePost = (article: Article) => {
    setGeneratedArticle(article);
    setShowContentGeneration(true);
    // Smooth scroll to the content generation section
    setTimeout(() => {
      document.getElementById('summary')?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
  };

  const handleGenerateFromUrl = async (url: string) => {
    try {
      setIsGenerating(true);
      const response = await generateFromUrl(url);
      
      const processedArticle: Article = {
        id: "url-" + Date.now(),
        title: response.title || "Article from URL",
        preview: response.preview || "Content extracted from the provided URL",
        thumbnail: response.thumbnail || "/lovable-uploads/467feebf-707c-4337-8287-2bacf1fe9a3e.png",
        source: url,
        date: new Date().toISOString().split('T')[0],
        generatedContent: {
          summary: response.summary,
          instagramPost: response.instagramPost
        }
      };
      
      setGeneratedArticle(processedArticle);
      setShowContentGeneration(true);
      
      // Smooth scroll to the content generation section
      setTimeout(() => {
        document.getElementById('summary')?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);

      toast({
        title: "Content Generated",
        description: "Your article has been processed successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process the URL. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection onGenerateFromUrl={handleGenerateFromUrl} isGenerating={isGenerating} />
      <NewsGrid onArticleClick={handleArticleClick} />
      
      <ArticleModal
        article={selectedArticle}
        category={selectedCategory}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreatePost={handleCreatePost}
      />
      
      <ContentGeneration
        article={generatedArticle}
        isVisible={showContentGeneration}
      />
    </div>
  );
};

export default Index;