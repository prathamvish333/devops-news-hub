import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Cloud, Database, GitBranch, Monitor, Server, Shield, 
  Container, Workflow, BarChart3, Lock
} from "lucide-react";

const techStack = [
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
  { name: "Vault", icon: Lock, category: "Secrets" },
];

const TechStackSection = () => {
  return (
    <Card className="border-border">
      <CardHeader className="pb-3">
        <CardTitle className="font-serif text-lg flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          DevOps Tech Stack
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {techStack.map((tech) => (
            <Badge
              key={tech.name}
              variant="secondary"
              className="px-3 py-1.5 flex items-center gap-1.5 hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
            >
              <tech.icon className="h-3 w-3" />
              {tech.name}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TechStackSection;