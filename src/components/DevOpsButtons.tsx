import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const DevOpsButtons = () => {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        className="text-xs border-primary text-primary hover:bg-primary hover:text-primary-foreground"
        onClick={() => window.open("https://argocd.example.com", "_blank")}
      >
        <ExternalLink className="h-3 w-3 mr-1" />
        ArgoCD
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="text-xs border-accent text-accent hover:bg-accent hover:text-accent-foreground"
        onClick={() => window.open("https://grafana.example.com", "_blank")}
      >
        <ExternalLink className="h-3 w-3 mr-1" />
        Grafana
      </Button>
    </div>
  );
};

export default DevOpsButtons;