import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsCard from "@/components/NewsCard";
import Sidebar from "@/components/Sidebar";
import { Badge } from "@/components/ui/badge";

const featuredNews = {
  title: "Complete CI/CD Pipeline Implementation with ArgoCD and Kubernetes",
  category: "DevOps",
  image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&h=450&fit=crop",
  timeAgo: "2 hours ago",
};

const newsItems = [
  {
    title: "Building Scalable Microservices Architecture with Docker and Kubernetes",
    category: "Tech",
    image: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=300&h=200&fit=crop",
    timeAgo: "3 hours ago",
  },
  {
    title: "Infrastructure as Code: Terraform Best Practices for Production",
    category: "Cloud",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=300&h=200&fit=crop",
    timeAgo: "4 hours ago",
  },
  {
    title: "Monitoring Kubernetes Clusters with Prometheus and Grafana",
    category: "Monitoring",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop",
    timeAgo: "5 hours ago",
  },
  {
    title: "PostgreSQL Performance Tuning for High-Traffic Applications",
    category: "Database",
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=300&h=200&fit=crop",
    timeAgo: "6 hours ago",
  },
  {
    title: "FastAPI: Building High-Performance REST APIs with Python",
    category: "Backend",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=300&h=200&fit=crop",
    timeAgo: "7 hours ago",
  },
  {
    title: "AWS EKS vs GKE: Choosing the Right Kubernetes Platform",
    category: "Cloud",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=300&h=200&fit=crop",
    timeAgo: "8 hours ago",
  },
];

const breakingNews = [
  "New Kubernetes Release",
  "AWS Price Drop",
  "Docker Security Update",
  "GitHub Copilot Features",
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Breaking News Ticker */}
      <div className="bg-accent text-accent-foreground">
        <div className="container py-2 flex items-center gap-4 overflow-hidden">
          <Badge variant="secondary" className="bg-accent-foreground text-accent font-bold shrink-0">
            LIVE
          </Badge>
          <div className="flex gap-8 animate-marquee whitespace-nowrap">
            {breakingNews.map((news, index) => (
              <span key={index} className="text-sm font-medium">
                • {news}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      <main className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Featured Article */}
            <NewsCard {...featuredNews} featured />
            
            {/* Latest News Section */}
            <section>
              <h2 className="font-serif text-2xl font-bold mb-6 pb-2 border-b-2 border-primary">
                Latest News
              </h2>
              <div className="space-y-0">
                {newsItems.map((news, index) => (
                  <NewsCard key={index} {...news} />
                ))}
              </div>
            </section>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Sidebar />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;