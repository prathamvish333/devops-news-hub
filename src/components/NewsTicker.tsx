import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";

const tickerNews = [
  "🚀 Kubernetes 1.30 Released with Major Performance Improvements",
  "☁️ AWS Announces New Cost Optimization Tools for EKS",
  "🐳 Docker Desktop Update Brings Enhanced Security Features",
  "📦 Terraform 2.0: What's New in Infrastructure as Code",
  "🔄 GitOps Best Practices for Enterprise Deployments",
  "📊 Prometheus 3.0 Released with New Query Engine",
  "🔒 HashiCorp Vault Enterprise Features Now Available",
];

const NewsTicker = () => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setOffset((prev) => prev + 1);
    }, 50);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-accent text-accent-foreground overflow-hidden">
      <div className="container py-2 flex items-center gap-4">
        <Badge variant="secondary" className="bg-accent-foreground text-accent font-bold shrink-0 animate-pulse">
          LIVE
        </Badge>
        <div className="overflow-hidden flex-1">
          <div
            className="flex gap-16 whitespace-nowrap"
            style={{ transform: `translateX(-${offset % 2000}px)` }}
          >
            {[...tickerNews, ...tickerNews, ...tickerNews].map((news, index) => (
              <span key={index} className="text-sm font-medium">
                {news}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsTicker;