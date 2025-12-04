import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const DevOpsButtons = () => {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="sm"
        className="text-xs text-primary-foreground/90 hover:text-primary-foreground hover:bg-primary-foreground/10 gap-1"
        onClick={() => window.open("https://argocd.example.com", "_blank")}
      >
        <ExternalLink className="h-3 w-3" />
        ArgoCD
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="text-xs text-primary-foreground/90 hover:text-primary-foreground hover:bg-primary-foreground/10 gap-1"
        onClick={() => window.open("https://grafana.example.com", "_blank")}
      >
        <ExternalLink className="h-3 w-3" />
        Grafana
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="text-xs text-primary-foreground/90 hover:text-primary-foreground hover:bg-primary-foreground/10 gap-1"
        onClick={() => window.open("https://jenkins.example.com", "_blank")}
      >
        <ExternalLink className="h-3 w-3" />
        Jenkins
      </Button>
    </div>
  );
};

export default DevOpsButtons;