import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const heroSlides = [
  {
    title: "Complete CI/CD Pipeline Implementation with ArgoCD and Kubernetes",
    category: "DevOps",
    image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=1200&h=600&fit=crop",
    slug: "ci-cd-pipeline-argocd-kubernetes"
  },
  {
    title: "Building Scalable Microservices Architecture with Docker and Kubernetes",
    category: "Tech",
    image: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=1200&h=600&fit=crop",
    slug: "microservices-docker-kubernetes"
  },
  {
    title: "Infrastructure as Code: Terraform Best Practices for Production",
    category: "Cloud",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=600&fit=crop",
    slug: "terraform-best-practices"
  },
  {
    title: "Monitoring Kubernetes Clusters with Prometheus and Grafana",
    category: "Monitoring",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop",
    slug: "prometheus-grafana-monitoring"
  },
];

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

  return (
    <div className="relative overflow-hidden rounded-lg">
      <div className="relative aspect-[16/9] md:aspect-[21/9]">
        {heroSlides.map((slide, index) => (
          <Link
            key={slide.slug}
            to={`/article/${slide.slug}`}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8">
              <Badge className="bg-accent text-accent-foreground mb-2 md:mb-3">
                {slide.category}
              </Badge>
              <h2 className="text-xl md:text-3xl lg:text-4xl font-serif font-bold text-card leading-tight">
                {slide.title}
              </h2>
            </div>
          </Link>
        ))}
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/50 hover:bg-background/80 text-foreground"
        onClick={(e) => { e.preventDefault(); prevSlide(); }}
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/50 hover:bg-background/80 text-foreground"
        onClick={(e) => { e.preventDefault(); nextSlide(); }}
      >
        <ChevronRight className="h-5 w-5" />
      </Button>

      {/* Dots Indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide ? "bg-card w-6" : "bg-card/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;