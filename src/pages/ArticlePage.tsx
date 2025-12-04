import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const articles: Record<string, {
  title: string;
  category: string;
  image: string;
  content: string;
  author: string;
  date: string;
}> = {
  "ci-cd-pipeline-argocd-kubernetes": {
    title: "Complete CI/CD Pipeline Implementation with ArgoCD and Kubernetes",
    category: "DevOps",
    image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=1200&h=600&fit=crop",
    author: "Pratham Vishwakarma",
    date: "December 4, 2024",
    content: `
      <p>In modern software development, Continuous Integration and Continuous Deployment (CI/CD) pipelines are essential for delivering high-quality software rapidly and reliably. This article explores how to implement a complete CI/CD pipeline using ArgoCD and Kubernetes.</p>
      
      <h2>What is ArgoCD?</h2>
      <p>ArgoCD is a declarative, GitOps continuous delivery tool for Kubernetes. It automates the deployment of the desired application states in the specified target environments.</p>
      
      <h2>Key Benefits</h2>
      <ul>
        <li>Automated deployment of applications to specified target environments</li>
        <li>Support for multiple config management/templating tools</li>
        <li>Ability to manage and deploy to multiple clusters</li>
        <li>SSO Integration (OIDC, OAuth2, LDAP, SAML 2.0, GitHub, GitLab, Microsoft)</li>
        <li>Multi-tenancy and RBAC policies for authorization</li>
      </ul>
      
      <h2>Implementation Steps</h2>
      <p>1. <strong>Install ArgoCD on Kubernetes</strong> - Deploy ArgoCD to your Kubernetes cluster using kubectl or Helm.</p>
      <p>2. <strong>Configure Git Repository</strong> - Connect your application's Git repository to ArgoCD.</p>
      <p>3. <strong>Define Application Manifests</strong> - Create Kubernetes manifests or Helm charts for your application.</p>
      <p>4. <strong>Set Up Sync Policies</strong> - Configure automatic or manual sync policies based on your requirements.</p>
      <p>5. <strong>Monitor Deployments</strong> - Use ArgoCD's UI to monitor application health and sync status.</p>
    `
  },
  "microservices-docker-kubernetes": {
    title: "Building Scalable Microservices Architecture with Docker and Kubernetes",
    category: "Tech",
    image: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=1200&h=600&fit=crop",
    author: "Pratham Vishwakarma",
    date: "December 4, 2024",
    content: `
      <p>Microservices architecture has become the standard for building scalable, maintainable applications. Combined with Docker and Kubernetes, you can achieve unprecedented levels of scalability and reliability.</p>
      
      <h2>Why Microservices?</h2>
      <p>Microservices allow you to break down complex applications into smaller, independent services that can be developed, deployed, and scaled independently.</p>
      
      <h2>Docker for Containerization</h2>
      <p>Docker provides lightweight, portable containers that package your application and its dependencies together, ensuring consistency across environments.</p>
      
      <h2>Kubernetes for Orchestration</h2>
      <p>Kubernetes automates deployment, scaling, and management of containerized applications, making it easier to run microservices at scale.</p>
    `
  },
  "terraform-best-practices": {
    title: "Infrastructure as Code: Terraform Best Practices for Production",
    category: "Cloud",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=600&fit=crop",
    author: "Pratham Vishwakarma",
    date: "December 4, 2024",
    content: `
      <p>Infrastructure as Code (IaC) has revolutionized how we manage cloud resources. Terraform, by HashiCorp, is one of the most popular IaC tools available today.</p>
      
      <h2>Best Practices</h2>
      <ul>
        <li>Use remote state storage with state locking</li>
        <li>Implement proper module structure</li>
        <li>Use variables and outputs effectively</li>
        <li>Implement proper tagging strategies</li>
        <li>Use workspaces for environment separation</li>
      </ul>
    `
  },
  "prometheus-grafana-monitoring": {
    title: "Monitoring Kubernetes Clusters with Prometheus and Grafana",
    category: "Monitoring",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop",
    author: "Pratham Vishwakarma",
    date: "December 4, 2024",
    content: `
      <p>Effective monitoring is crucial for maintaining healthy Kubernetes clusters. Prometheus and Grafana together provide a powerful monitoring and visualization stack.</p>
      
      <h2>Prometheus</h2>
      <p>Prometheus is an open-source monitoring and alerting toolkit designed for reliability and scalability.</p>
      
      <h2>Grafana</h2>
      <p>Grafana provides beautiful dashboards and visualizations for your metrics data.</p>
    `
  },
  "postgresql-performance": {
    title: "PostgreSQL Performance Tuning for High-Traffic Applications",
    category: "Database",
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=1200&h=600&fit=crop",
    author: "Pratham Vishwakarma",
    date: "December 4, 2024",
    content: `
      <p>PostgreSQL is a powerful, enterprise-class database. Proper tuning can significantly improve performance for high-traffic applications.</p>
      
      <h2>Key Tuning Areas</h2>
      <ul>
        <li>Connection pooling with PgBouncer</li>
        <li>Index optimization</li>
        <li>Query analysis with EXPLAIN ANALYZE</li>
        <li>Memory configuration</li>
        <li>Vacuum and maintenance settings</li>
      </ul>
    `
  },
  "fastapi-rest-apis": {
    title: "FastAPI: Building High-Performance REST APIs with Python",
    category: "Backend",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1200&h=600&fit=crop",
    author: "Pratham Vishwakarma",
    date: "December 4, 2024",
    content: `
      <p>FastAPI is a modern, fast web framework for building APIs with Python. It's designed for high performance and easy development.</p>
      
      <h2>Key Features</h2>
      <ul>
        <li>Fast to code and run</li>
        <li>Automatic API documentation</li>
        <li>Type hints and validation</li>
        <li>Async support</li>
        <li>Production-ready</li>
      </ul>
    `
  }
};

const ArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? articles[slug] : null;

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-16 text-center">
          <h1 className="text-2xl font-serif font-bold mb-4">Article Not Found</h1>
          <Link to="/">
            <Button>Back to Home</Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
        
        <article className="max-w-4xl mx-auto">
          <Badge className="bg-accent text-accent-foreground mb-4">{article.category}</Badge>
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4 leading-tight">
            {article.title}
          </h1>
          
          <div className="flex items-center gap-4 text-muted-foreground text-sm mb-6">
            <span className="flex items-center gap-1">
              <User className="h-4 w-4" />
              {article.author}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {article.date}
            </span>
          </div>
          
          <div className="aspect-[16/9] rounded-lg overflow-hidden mb-8">
            <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
          </div>
          
          <div 
            className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-foreground prose-p:text-foreground/80 prose-li:text-foreground/80 prose-strong:text-foreground"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default ArticlePage;