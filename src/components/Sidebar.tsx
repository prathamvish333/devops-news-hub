import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Clock } from "lucide-react";
import TechStackSection from "./TechStackSection";

const trendingNews = [
  "Kubernetes 1.30 Released with Major Performance Improvements",
  "AWS Announces New Cost Optimization Tools for EKS",
  "Docker Desktop Update Brings Enhanced Security Features",
  "Terraform 2.0: What's New in Infrastructure as Code",
  "GitOps Best Practices for Enterprise Deployments",
];

const Sidebar = () => {
  return (
    <aside className="space-y-6">
      <TechStackSection />
      
      <Card className="border-border">
        <CardHeader className="pb-3">
          <CardTitle className="font-serif text-lg flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-accent" />
            Trending Now
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {trendingNews.map((news, index) => (
              <li key={index} className="flex gap-3 group cursor-pointer">
                <span className="text-2xl font-serif font-bold text-muted-foreground/50">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <p className="text-sm font-medium leading-snug group-hover:text-primary transition-colors">
                  {news}
                </p>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      
      <Card className="border-border bg-secondary">
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="h-4 w-4 text-primary" />
            <span className="font-semibold text-sm">Last Updated</span>
          </div>
          <p className="text-muted-foreground text-sm">
            {new Date().toLocaleString('en-US', {
              dateStyle: 'medium',
              timeStyle: 'short'
            })}
          </p>
        </CardContent>
      </Card>
    </aside>
  );
};

export default Sidebar;