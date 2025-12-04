import logo from "@/assets/logo.png";
import { Separator } from "@/components/ui/separator";

const footerLinks = {
  "Quick Links": ["Home", "India", "World", "Tech", "Business"],
  "Categories": ["Sports", "Entertainment", "Lifestyle", "Photos", "Videos"],
  "DevOps": ["ArgoCD Dashboard", "Grafana Metrics", "Jenkins Pipeline", "GitHub Repo"],
};

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground mt-12">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <img src={logo} alt="Yashasvi Duniya" className="h-10 mb-4 brightness-0 invert" />
            <p className="text-primary-foreground/70 text-sm">
              Your trusted source for news and updates. A demo 3-tier application showcasing DevOps best practices.
            </p>
          </div>
          
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-serif font-semibold mb-4">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <Separator className="my-8 bg-primary-foreground/20" />
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-primary-foreground/70">
          <p>© 2024 Yashasvi Duniya. All rights reserved.</p>
          <p>Built with React • FastAPI • PostgreSQL • Kubernetes</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;