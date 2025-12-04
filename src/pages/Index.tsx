import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsCard from "@/components/NewsCard";
import SmallNewsCard from "@/components/SmallNewsCard";
import Sidebar from "@/components/Sidebar";
import HeroCarousel from "@/components/HeroCarousel";
import NewsTicker from "@/components/NewsTicker";
import { Separator } from "@/components/ui/separator";

const mainNews = [
  {
    title: "Building Scalable Microservices Architecture with Docker and Kubernetes",
    category: "Tech",
    image: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=300&h=200&fit=crop",
    timeAgo: "3 hours ago",
    slug: "microservices-docker-kubernetes"
  },
  {
    title: "Infrastructure as Code: Terraform Best Practices for Production",
    category: "Cloud",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=300&h=200&fit=crop",
    timeAgo: "4 hours ago",
    slug: "terraform-best-practices"
  },
  {
    title: "Monitoring Kubernetes Clusters with Prometheus and Grafana",
    category: "Monitoring",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop",
    timeAgo: "5 hours ago",
    slug: "prometheus-grafana-monitoring"
  },
  {
    title: "PostgreSQL Performance Tuning for High-Traffic Applications",
    category: "Database",
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=300&h=200&fit=crop",
    timeAgo: "6 hours ago",
    slug: "postgresql-performance"
  },
  {
    title: "FastAPI: Building High-Performance REST APIs with Python",
    category: "Backend",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=300&h=200&fit=crop",
    timeAgo: "7 hours ago",
    slug: "fastapi-rest-apis"
  },
];

const gridNews = [
  {
    title: "Jenkins Pipeline Optimization Tips",
    category: "CI/CD",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop",
    timeAgo: "2 hours ago",
    slug: "ci-cd-pipeline-argocd-kubernetes"
  },
  {
    title: "AWS EKS Best Practices 2024",
    category: "Cloud",
    image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=400&h=300&fit=crop",
    timeAgo: "3 hours ago",
    slug: "terraform-best-practices"
  },
  {
    title: "Docker Security Fundamentals",
    category: "Security",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=300&fit=crop",
    timeAgo: "4 hours ago",
    slug: "microservices-docker-kubernetes"
  },
  {
    title: "Ansible Automation Playbooks",
    category: "Automation",
    image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400&h=300&fit=crop",
    timeAgo: "5 hours ago",
    slug: "terraform-best-practices"
  },
];

const moreNews = [
  {
    title: "Linux Kernel 6.0 Performance Analysis",
    category: "Linux",
    image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=400&h=300&fit=crop",
    timeAgo: "1 hour ago",
    slug: "postgresql-performance"
  },
  {
    title: "GitLab vs GitHub Actions Comparison",
    category: "DevOps",
    image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=400&h=300&fit=crop",
    timeAgo: "2 hours ago",
    slug: "ci-cd-pipeline-argocd-kubernetes"
  },
  {
    title: "Helm Charts for Beginners",
    category: "Kubernetes",
    image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=400&h=300&fit=crop",
    timeAgo: "3 hours ago",
    slug: "microservices-docker-kubernetes"
  },
  {
    title: "Service Mesh with Istio",
    category: "Cloud Native",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop",
    timeAgo: "4 hours ago",
    slug: "terraform-best-practices"
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <NewsTicker />
      
      <main className="container py-6">
        {/* Hero Section */}
        <section className="mb-8">
          <HeroCarousel />
        </section>

        {/* Quick News Grid */}
        <section className="mb-8">
          <h2 className="font-serif text-xl font-bold mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-accent rounded-full"></span>
            Top Stories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {gridNews.map((news, index) => (
              <SmallNewsCard key={index} {...news} />
            ))}
          </div>
        </section>

        <Separator className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Latest News Section */}
            <section>
              <h2 className="font-serif text-2xl font-bold mb-6 pb-2 border-b-2 border-primary flex items-center gap-2">
                <span className="w-1.5 h-8 bg-primary rounded-full"></span>
                Latest News
              </h2>
              <div className="space-y-0">
                {mainNews.map((news, index) => (
                  <NewsCard key={index} {...news} />
                ))}
              </div>
            </section>

            {/* More Stories Grid */}
            <section>
              <h2 className="font-serif text-xl font-bold mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-accent rounded-full"></span>
                More Stories
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {moreNews.map((news, index) => (
                  <SmallNewsCard key={index} {...news} />
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