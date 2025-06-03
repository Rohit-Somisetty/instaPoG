import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, TrendingUp, Star, DollarSign, Building, Trophy, Globe, Heart, Microscope, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchAllRssFeeds, fetchCategoryFeeds, type RssItem } from "@/lib/rss-service";
import { toast } from "@/hooks/use-toast";
import { formatRelativeTime } from "@/lib/rss-service";

interface NewsCategory {
    id: string;
    name: string;
    icon: typeof TrendingUp;
    description: string;
}

const categories: NewsCategory[] = [
    { id: "technology", name: "Technology", icon: TrendingUp, description: "Latest tech news" },
    { id: "business", name: "Business", icon: DollarSign, description: "Business updates" },
    { id: "science", name: "Science", icon: Microscope, description: "Scientific discoveries" },
    { id: "health", name: "Health", icon: Heart, description: "Health and wellness" }
];

interface NewsGridProps {
    onArticleSelect: (article: RssItem, category: string) => void;
}

export default function NewsGrid({ onArticleSelect }: NewsGridProps) {
    const [articles, setArticles] = useState<RssItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadArticles();
    }, [selectedCategory]);

    const loadArticles = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = selectedCategory
                ? await fetchCategoryFeeds(selectedCategory)
                : await fetchAllRssFeeds();
            setArticles(data);
        } catch (err) {
            setError('Failed to load articles');
            toast({
                title: "Error",
                description: "Failed to load articles. Please try again.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleCategoryClick = (categoryId: string) => {
        setSelectedCategory(categoryId === selectedCategory ? null : categoryId);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                <p className="text-red-500">{error}</p>
                <Button onClick={loadArticles}>Retry</Button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
                {categories.map((category) => {
                    const Icon = category.icon;
                    return (
                        <Button
                            key={category.id}
                            variant={selectedCategory === category.id ? "default" : "outline"}
                            className="gap-2"
                            onClick={() => handleCategoryClick(category.id)}
                        >
                            <Icon className="w-4 h-4" />
                            {category.name}
                        </Button>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {articles.map((article) => (
                    <Card
                        key={article.id}
                        className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                        onClick={() => onArticleSelect(article, article.category)}
                    >
                        <div className="aspect-video relative">
                            <img
                                src={article.image || "/placeholder.svg"}
                                alt={article.title}
                                className="object-cover w-full h-full"
                            />
                            <Badge
                                className="absolute top-2 right-2"
                                variant="secondary"
                            >
                                {article.category}
                            </Badge>
                        </div>
                        <div className="p-4 space-y-2">
                            <h3 className="font-semibold line-clamp-2">
                                {article.title}
                            </h3>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                                {article.description}
                            </p>
                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    {formatRelativeTime(article.pubDate)}
                                </div>
                                <Badge variant="outline">
                                    {article.source}
                                </Badge>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {articles.length === 0 && (
                <div className="text-center py-8">
                    <p className="text-muted-foreground">
                        No articles found{selectedCategory ? ` in ${selectedCategory}` : ''}.
                    </p>
                </div>
            )}
        </div>
    );
}
