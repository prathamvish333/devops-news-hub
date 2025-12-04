import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Linkedin, Github, Mail, MapPin, Briefcase,
  Cloud, Database, GitBranch, Monitor, Server, 
  Container, Workflow, BarChart3, Lock, Code
} from "lucide-react";

const skills = [
  { name: "Docker", icon: Container, category: "Containerization" },
  { name: "Kubernetes", icon: Cloud, category: "Orchestration" },
  { name: "AWS", icon: Server, category: "Cloud" },
  { name: "Terraform", icon: Workflow, category: "IaC" },
  { name: "Jenkins", icon: GitBranch, category: "CI/CD" },
  { name: "ArgoCD", icon: GitBranch, category: "GitOps" },
  { name: "Prometheus", icon: BarChart3, category: "Monitoring" },
  { name: "Grafana", icon: Monitor, category: "Visualization" },
  { name: "PostgreSQL", icon: Database, category: "Database" },
  { name: "Ansible", icon: Workflow, category: "Automation" },
  { name: "Linux", icon: Server, category: "OS" },
  { name: "Python", icon: Code, category: "Programming" },
  { name: "FastAPI", icon: Code, category: "Backend" },
  { name: "Git", icon: GitBranch, category: "Version Control" },
  { name: "Vault", icon: Lock, category: "Secrets" },
];

const experience = [
  {
    role: "DevOps Engineer",
    company: "Tech Company",
    duration: "2023 - Present",
    description: "Building and maintaining CI/CD pipelines, managing Kubernetes clusters, and implementing infrastructure as code."
  },
  {
    role: "Cloud Engineer",
    company: "Cloud Solutions Inc",
    duration: "2022 - 2023",
    description: "Designed and deployed scalable cloud infrastructure on AWS using Terraform and CloudFormation."
  }
];

const certifications = [
  "AWS Certified Solutions Architect",
  "Certified Kubernetes Administrator (CKA)",
  "HashiCorp Certified Terraform Associate",
  "Docker Certified Associate"
];

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-12">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start mb-12">
            <div className="w-40 h-40 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-5xl font-serif font-bold">
              PV
            </div>
            <div className="text-center md:text-left flex-1">
              <h1 className="text-4xl font-serif font-bold mb-2">Pratham Vishwakarma</h1>
              <p className="text-xl text-muted-foreground mb-4">DevOps Engineer</p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  India
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Briefcase className="h-3 w-3" />
                  Open to Opportunities
                </Badge>
              </div>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-2">
                <Button
                  variant="default"
                  size="sm"
                  className="gap-2"
                  onClick={() => window.open("https://www.linkedin.com/in/prathamvishwakarma/", "_blank")}
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={() => window.open("https://github.com/prathamvishwakarma", "_blank")}
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={() => window.location.href = "mailto:pratham@example.com"}
                >
                  <Mail className="h-4 w-4" />
                  Email
                </Button>
              </div>
            </div>
          </div>
          
          {/* About Section */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-serif font-bold mb-4">About Me</h2>
              <p className="text-muted-foreground leading-relaxed">
                Passionate DevOps Engineer with expertise in building and maintaining scalable infrastructure. 
                I specialize in Kubernetes, CI/CD pipelines, Infrastructure as Code, and cloud platforms. 
                This website is a demonstration of a 3-tier application architecture showcasing my DevOps skills 
                with React frontend, FastAPI backend, and PostgreSQL database, all deployed using modern DevOps practices.
              </p>
            </CardContent>
          </Card>
          
          {/* Skills Section */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-serif font-bold mb-4">Technical Skills</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge
                    key={skill.name}
                    variant="secondary"
                    className="px-3 py-2 flex items-center gap-2 text-sm hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                  >
                    <skill.icon className="h-4 w-4" />
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Experience Section */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-serif font-bold mb-4">Experience</h2>
              <div className="space-y-6">
                {experience.map((exp, index) => (
                  <div key={index} className="border-l-2 border-primary pl-4">
                    <h3 className="font-semibold text-lg">{exp.role}</h3>
                    <p className="text-primary font-medium">{exp.company}</p>
                    <p className="text-sm text-muted-foreground mb-2">{exp.duration}</p>
                    <p className="text-muted-foreground">{exp.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Certifications Section */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-serif font-bold mb-4">Certifications</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {certifications.map((cert, index) => (
                  <div key={index} className="flex items-center gap-2 p-3 bg-secondary rounded-lg">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <BarChart3 className="h-4 w-4 text-primary" />
                    </div>
                    <span className="font-medium text-sm">{cert}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Project Architecture */}
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-serif font-bold mb-4">Project Architecture</h2>
              <p className="text-muted-foreground mb-4">
                This demo news website demonstrates a complete 3-tier application architecture:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-secondary rounded-lg text-center">
                  <Code className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <h3 className="font-semibold">Frontend</h3>
                  <p className="text-sm text-muted-foreground">React + TypeScript + Tailwind CSS</p>
                </div>
                <div className="p-4 bg-secondary rounded-lg text-center">
                  <Server className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <h3 className="font-semibold">Backend</h3>
                  <p className="text-sm text-muted-foreground">FastAPI + Python</p>
                </div>
                <div className="p-4 bg-secondary rounded-lg text-center">
                  <Database className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <h3 className="font-semibold">Database</h3>
                  <p className="text-sm text-muted-foreground">PostgreSQL</p>
                </div>
              </div>
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground text-center">
                  <strong>DevOps Stack:</strong> Docker • Kubernetes • ArgoCD • Jenkins • Terraform • Prometheus • Grafana
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutPage;