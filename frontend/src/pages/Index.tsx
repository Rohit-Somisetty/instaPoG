import { useState } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/features/HeroSection";
import NewsGrid from "../components/features/NewsGrid";
import ArticleModal from "../components/features/ArticleModal";
import ContentGeneration from "../components/features/ContentGeneration";
import { generateFromUrl } from "../lib/news-service";
import { toast } from "../hooks/use-toast";
import { GenerateContentResponse } from "../lib/api-service";
import type { RssItem } from "@/lib/rss-service";

const Index = () => {
  const [selectedArticle, setSelectedArticle] = useState<RssItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showContentGeneration, setShowContentGeneration] = useState(false);
  const [generatedArticle, setGeneratedArticle] = useState<RssItem | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleArticleClick = (article: RssItem, category: string) => {
    setSelectedArticle(article);
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleCreatePost = (article: RssItem) => {
    setGeneratedArticle(article);
    setShowContentGeneration(true);
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
      
      if (!response) {
        throw new Error('No response received from the server');
      }

      const processedArticle: RssItem = {
        id: Date.now().toString(),
        title: url,
        description: "Content extracted from URL",
        link: url,
        pubDate: new Date().toISOString(),
        source: new URL(url).hostname,
        image: "/placeholder.svg",
        summary: response.summary,
        instagramPost: response.instagramPost
      };
      
      setGeneratedArticle(processedArticle);
      setShowContentGeneration(true);
      
      setTimeout(() => {
        const element = document.getElementById('summary');
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 100);

      toast({
        title: "Content Generated",
        description: "Your article has been processed successfully",
      });
    } catch (error) {
      console.error('Generation error:', error);
      toast({
        title: "Error Processing URL",
        description: error instanceof Error ? error.message : "Failed to process the URL. Please try again.",
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
      <NewsGrid onArticleSelect={handleArticleClick} />
      
      <ArticleModal
        article={selectedArticle}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreatePost={handleCreatePost}
        category={selectedCategory}
      />
      
      {generatedArticle && (
        <ContentGeneration
          article={generatedArticle}
          isVisible={showContentGeneration}
        />
      )}
    </div>
  );
};

export default Index;