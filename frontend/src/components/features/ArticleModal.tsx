import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Calendar, ExternalLink, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { RssItem } from "@/lib/rss-service";
import { formatRelativeTime } from "@/lib/rss-service";
import ContentGeneration from "./ContentGeneration";

interface ArticleModalProps {
  article: RssItem | null;
  isOpen: boolean;
  onClose: () => void;
}

const ArticleModal = ({ article, isOpen, onClose }: ArticleModalProps) => {
  const [showGeneration, setShowGeneration] = useState(false);

  if (!isOpen || !article) return null;

  const handleGenerateClick = () => {
    setShowGeneration(true);
  };

  const handleClose = () => {
    setShowGeneration(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={handleClose}
      />
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-background p-6 rounded-lg shadow-lg">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">{article.title}</h2>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {formatRelativeTime(article.pubDate)}
              </div>
              <Badge variant="outline">{article.source}</Badge>
              <Badge>{article.category}</Badge>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={handleClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="space-y-6">
          {article.image && (
            <img
              src={article.image}
              alt={article.title}
              className="w-full aspect-video object-cover rounded-lg"
            />
          )}

          <div className="prose prose-sm max-w-none dark:prose-invert">
            <p>{article.description}</p>
          </div>

          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => window.open(article.link, "_blank")}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Read Full Article
              </Button>
              <Button
                onClick={handleGenerateClick}
                disabled={showGeneration}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                {showGeneration ? "Generating Content" : "Generate Content"}
              </Button>
            </div>
          </div>

          <ContentGeneration
            article={article}
            isVisible={showGeneration}
          />
        </div>
      </div>
    </div>
  );
};

export default ArticleModal;
