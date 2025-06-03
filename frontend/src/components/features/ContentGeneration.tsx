import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Download, Share2, Sparkles, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { generateContent } from "@/lib/api-service";
import { RssItem } from "@/lib/rss-service";

interface ContentGenerationProps {
    article: RssItem;
    isVisible: boolean;
}

export default function ContentGeneration({ article, isVisible }: ContentGenerationProps) {
    const [generating, setGenerating] = useState(false);
    const [summary, setSummary] = useState(article.summary || "");
    const [instagramPost, setInstagramPost] = useState(article.instagramPost || "");

    const handleGenerate = async () => {
        try {
            setGenerating(true);
            const result = await generateContent({
                title: article.title,
                preview: article.description,
                source: article.source
            });
            setSummary(result.summary);
            setInstagramPost(result.instagramPost);
            toast({
                title: "Success",
                description: "Content generated successfully!",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to generate content. Please try again.",
                variant: "destructive",
            });
        } finally {
            setGenerating(false);
        }
    };

    const copyToClipboard = async (text: string, type: string) => {
        try {
            await navigator.clipboard.writeText(text);
            toast({
                title: "Copied!",
                description: `${type} copied to clipboard`,
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to copy to clipboard",
                variant: "destructive",
            });
        }
    };

    if (!isVisible) return null;

    return (
        <div className="space-y-4 animate-in slide-in-from-right">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Generated Content</h3>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={handleGenerate}
                    disabled={generating}
                >
                    {generating ? (
                        <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Generating...
                        </>
                    ) : (
                        <>
                            <Sparkles className="w-4 h-4 mr-2" />
                            Regenerate
                        </>
                    )}
                </Button>
            </div>

            {(summary || instagramPost) && (
                <div className="grid gap-4 md:grid-cols-2">
                    <Card className="p-4 space-y-3">
                        <div className="flex items-center justify-between">
                            <h4 className="font-medium">Summary</h4>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => copyToClipboard(summary, "Summary")}
                            >
                                <Copy className="w-4 h-4" />
                            </Button>
                        </div>
                        <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                            {summary}
                        </p>
                    </Card>

                    <Card className="p-4 space-y-3">
                        <div className="flex items-center justify-between">
                            <h4 className="font-medium">Instagram Post</h4>
                            <div className="flex gap-2">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => copyToClipboard(instagramPost, "Instagram post")}
                                >
                                    <Copy className="w-4 h-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                        // Open Instagram sharing (could be enhanced with Instagram Graph API)
                                        window.open("https://instagram.com", "_blank");
                                    }}
                                >
                                    <Share2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                        <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                            {instagramPost}
                        </p>
                    </Card>
                </div>
            )}

            {!summary && !instagramPost && !generating && (
                <Card className="p-8 text-center">
                    <Sparkles className="w-8 h-8 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">
                        Click "Regenerate" to create new content for this article
                    </p>
                </Card>
            )}
        </div>
    );
}
