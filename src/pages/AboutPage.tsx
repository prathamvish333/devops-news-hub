import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Linkedin, Github, Mail, MapPin, Briefcase, GraduationCap,
  Cloud, Database, GitBranch, Monitor, Server, 
  Container, Workflow, BarChart3, Lock, Code, Terminal
} from "lucide-react";

const skills = [
  { name: "Docker", icon: Container, category: "Containerization" },
  { name: "Kubernetes", icon: Cloud, category: "Orchestration" },
  { name: "AWS", icon: Server, category: "Cloud" },
  { name: "Azure", icon: Cloud, category: "Cloud" },
  { name: "Terraform", icon: Workflow, category: "IaC" },
  { name: "Jenkins", icon: GitBranch, category: "CI/CD" },
  { name: "ArgoCD", icon: GitBranch, category: "GitOps" },
  { name: "Prometheus", icon: BarChart3, category: "Monitoring" },
  { name: "Grafana", icon: Monitor, category: "Visualization" },
  { name: "PostgreSQL", icon: Database, category: "Database" },
  { name: "MongoDB", icon: Database, category: "Database" },
  { name: "Ansible", icon: Workflow, category: "Automation" },
  { name: "Linux", icon: Terminal, category: "OS" },
  { name: "Python", icon: Code, category: "Programming" },
  { name: "FastAPI", icon: Code, category: "Backend" },
  { name: "React", icon: Code, category: "Frontend" },
  { name: "Git", icon: GitBranch, category: "Version Control" },
  { name: "Vault", icon: Lock, category: "Secrets" },
  { name: "Nginx", icon: Server, category: "Web Server" },
  { name: "Shell Scripting", icon: Terminal, category: "Automation" },
];

const experience = [
  {
    role: "DevOps Engineer",
    company: "Tech Company",
    duration: "2023 - Present",
    description: "Building and maintaining CI/CD pipelines using Jenkins and ArgoCD. Managing Kubernetes clusters on AWS EKS. Implementing Infrastructure as Code with Terraform. Setting up monitoring with Prometheus and Grafana."
  },
  {
    role: "Cloud Engineer",
    company: "Cloud Solutions Inc",
    duration: "2022 - 2023",
    description: "Designed and deployed scalable cloud infrastructure on AWS using Terraform and CloudFormation. Managed containerized applications with Docker and Kubernetes. Implemented security best practices."
  },
  {
    role: "Junior DevOps Engineer",
    company: "Startup XYZ",
    duration: "2021 - 2022",
    description: "Assisted in building CI/CD pipelines. Managed Linux servers. Wrote automation scripts in Python and Bash. Learned containerization with Docker."
  }
];

const certifications = [
  "AWS Certified Solutions Architect",
  "Certified Kubernetes Administrator (CKA)",
  "HashiCorp Certified Terraform Associate",
  "Docker Certified Associate",
  "Azure Fundamentals (AZ-900)",
];

const education = [
  {
    degree: "Bachelor of Technology",
    field: "Computer Science & Engineering",
    institution: "University Name",
    year: "2021"
  }
];

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-12">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start mb-12">
            <div className="w-40 h-40 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground text-5xl font-serif font-bold shadow-xl">
              PV
            </div>
            <div className="text-center md:text-left flex-1">
              <h1 className="text-4xl font-serif font-bold mb-2">Pratham Vishwakarma</h1>
              <p className="text-xl text-primary font-medium mb-4">DevOps Engineer</p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  India
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Briefcase className="h-3 w-3" />
                  Open to Opportunities
                </Badge>
                <Badge className="bg-green-500/20 text-green-700 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Available
                </Badge>
              </div>
              
              <p className="text-muted-foreground mb-4 max-w-lg">
                Passionate about building scalable infrastructure, automating deployments, and implementing DevOps best practices.
              </p>
              
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
                  onClick={() => window.open("https://github.com/prathamvish333", "_blank")}
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
          <Card className="mb-8 border-l-4 border-l-primary">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-serif font-bold mb-4">About Me</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                I'm a passionate DevOps Engineer with expertise in building and maintaining scalable infrastructure. 
                I specialize in Kubernetes, CI/CD pipelines, Infrastructure as Code, and cloud platforms like AWS and Azure.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                This website is a demonstration of a <strong>3-tier application architecture</strong> showcasing my DevOps skills 
                with <strong>React frontend, FastAPI backend, and PostgreSQL database</strong>, all deployed using modern DevOps practices 
                including Docker, Kubernetes, ArgoCD, Jenkins, Terraform, and monitoring with Prometheus & Grafana.
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
              <h2 className="text-2xl font-serif font-bold mb-6">Experience</h2>
              <div className="space-y-6">
                {experience.map((exp, index) => (
                  <div key={index} className="border-l-2 border-primary pl-4 pb-4">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="font-semibold text-lg">{exp.role}</h3>
                      <Badge variant="outline" className="text-xs">{exp.duration}</Badge>
                    </div>
                    <p className="text-primary font-medium mb-2">{exp.company}</p>
                    <p className="text-muted-foreground text-sm">{exp.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Education Section */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-serif font-bold mb-4">Education</h2>
              {education.map((edu, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <GraduationCap className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{edu.degree}</h3>
                    <p className="text-primary">{edu.field}</p>
                    <p className="text-sm text-muted-foreground">{edu.institution} • {edu.year}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
          
          {/* Certifications Section */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-serif font-bold mb-4">Certifications</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {certifications.map((cert, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-secondary rounded-lg">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <BarChart3 className="h-5 w-5 text-primary" />
                    </div>
                    <span className="font-medium text-sm">{cert}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Project Architecture */}
          <Card className="border-2 border-primary/20">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-serif font-bold mb-4">Project Architecture</h2>
              <p className="text-muted-foreground mb-6">
                This demo news website demonstrates a complete 3-tier application architecture:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 rounded-lg text-center">
                  <Code className="h-10 w-10 mx-auto mb-3 text-blue-600" />
                  <h3 className="font-semibold text-lg">Frontend</h3>
                  <p className="text-sm text-muted-foreground">React + TypeScript</p>
                  <p className="text-sm text-muted-foreground">Tailwind CSS</p>
                </div>
                <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 rounded-lg text-center">
                  <Server className="h-10 w-10 mx-auto mb-3 text-green-600" />
                  <h3 className="font-semibold text-lg">Backend</h3>
                  <p className="text-sm text-muted-foreground">FastAPI + Python</p>
                  <p className="text-sm text-muted-foreground">REST APIs</p>
                </div>
                <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 rounded-lg text-center">
                  <Database className="h-10 w-10 mx-auto mb-3 text-purple-600" />
                  <h3 className="font-semibold text-lg">Database</h3>
                  <p className="text-sm text-muted-foreground">PostgreSQL</p>
                  <p className="text-sm text-muted-foreground">Persistent Storage</p>
                </div>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-center mb-2 font-semibold">DevOps Stack</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {["Docker", "Kubernetes", "ArgoCD", "Jenkins", "Terraform", "Prometheus", "Grafana", "AWS"].map((tech) => (
                    <Badge key={tech} variant="secondary">{tech}</Badge>
                  ))}
                </div>
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