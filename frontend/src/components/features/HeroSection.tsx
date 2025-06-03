import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Link, Sparkles, Zap } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface HeroSectionProps {
  onGenerateFromUrl: (url: string) => Promise<void>;
  isGenerating: boolean;
}

const HeroSection = ({ onGenerateFromUrl, isGenerating }: HeroSectionProps) => {
  const [url, setUrl] = useState("");

  const handleGenerate = async () => {
    if (!url.trim()) {
      toast({
        title: "URL Required",
        description: "Please enter a valid article URL",
        variant: "destructive",
      });
      return;
    }

    await onGenerateFromUrl(url);
  };

  return (
    <div className="relative min-h-screen bg-white flex items-center justify-center pt-16">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-8 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Transform Articles into Instagram Posts
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
              Generate engaging Instagram captions from any article. Just paste the URL and let AI do the magic.
            </p>
          </div>
          <div className="w-full max-w-2xl space-y-2">
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Input
                className="flex-1"
                placeholder="Paste article URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                disabled={isGenerating}
              />
              <Button
                className="min-[400px]:w-[180px]"
                onClick={handleGenerate}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-background"></div>
                    <span>Generating...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    <span>Generate</span>
                  </div>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
