
import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import NewsGrid from "@/components/NewsGrid";
import ArticleModal from "@/components/ArticleModal";
import ContentGeneration from "@/components/ContentGeneration";

interface Article {
  id: string;
  title: string;
  preview: string;
  thumbnail: string;
  source: string;
  date: string;
}

const Index = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showContentGeneration, setShowContentGeneration] = useState(false);
  const [generatedArticle, setGeneratedArticle] = useState<Article | null>(null);

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

  const handleGenerateFromUrl = (url: string) => {
    // Create a mock article from URL
    const mockArticle: Article = {
      id: "url-" + Date.now(),
      title: "Article from Custom URL",
      preview: "Content extracted from the provided URL will be processed by our AI...",
      thumbnail: "/lovable-uploads/467feebf-707c-4337-8287-2bacf1fe9a3e.png",
      source: "Custom URL",
      date: new Date().toISOString().split('T')[0]
    };
    
    setGeneratedArticle(mockArticle);
    setShowContentGeneration(true);
    
    // Smooth scroll to the content generation section
    setTimeout(() => {
      document.getElementById('summary')?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection onGenerateFromUrl={handleGenerateFromUrl} />
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
