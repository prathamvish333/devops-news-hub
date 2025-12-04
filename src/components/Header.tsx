import logo from "@/assets/logo.png";
import { Search, Menu, Linkedin, Github, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import DevOpsButtons from "./DevOpsButtons";

const navItems = ["Home", "India", "World", "Tech", "Business", "Sports", "Entertainment"];

const Header = () => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <header className="border-b border-border bg-card sticky top-0 z-50">
      {/* Top bar with DevOps buttons */}
      <div className="bg-primary text-primary-foreground">
        <div className="container flex items-center justify-between py-1.5 text-sm">
          <span className="text-primary-foreground/80">{currentDate}</span>
          <DevOpsButtons />
        </div>
      </div>
      
      {/* Main header with logo, nav, and social */}
      <div className="container py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <a href="/" className="flex-shrink-0">
            <img src={logo} alt="Yashasvi Duniya" className="h-10 md:h-12" />
          </a>
          
          {/* Navigation - center */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Button
                key={item}
                variant="ghost"
                size="sm"
                className="text-foreground hover:text-primary hover:bg-secondary font-medium"
              >
                {item}
              </Button>
            ))}
          </nav>
          
          {/* Right side - Social & Actions */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 text-muted-foreground hover:text-[#0A66C2] hover:bg-[#0A66C2]/10"
                onClick={() => window.open("https://linkedin.com/in/yourprofile", "_blank")}
                title="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 text-muted-foreground hover:text-foreground hover:bg-secondary"
                onClick={() => window.open("https://github.com/yourprofile", "_blank")}
                title="GitHub"
              >
                <Github className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-xs border-primary text-primary hover:bg-primary hover:text-primary-foreground gap-1.5"
                onClick={() => window.open("/resume.pdf", "_blank")}
              >
                <FileText className="h-3.5 w-3.5" />
                Resume
              </Button>
            </div>
            
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Search className="h-4 w-4" />
            </Button>
            
            <Button variant="ghost" size="icon" className="lg:hidden h-9 w-9">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;