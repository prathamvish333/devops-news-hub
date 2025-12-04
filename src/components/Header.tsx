import logo from "@/assets/logo.png";
import { Search, Menu, Linkedin, Github, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import DevOpsButtons from "./DevOpsButtons";
import { Link } from "react-router-dom";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Tech", path: "/" },
  { name: "Cloud", path: "/" },
  { name: "DevOps", path: "/" },
  { name: "About", path: "/about" },
];

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
          <Link to="/" className="flex-shrink-0">
            <img src={logo} alt="Yashasvi Duniya" className="h-10 md:h-12" />
          </Link>
          
          {/* Navigation - center */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.name} to={item.path}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-foreground hover:text-primary hover:bg-secondary font-medium"
                >
                  {item.name}
                </Button>
              </Link>
            ))}
          </nav>
          
          {/* Right side - Social & Actions */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 text-muted-foreground hover:text-[#0A66C2] hover:bg-[#0A66C2]/10"
                onClick={() => window.open("https://www.linkedin.com/in/prathamvishwakarma/", "_blank")}
                title="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 text-muted-foreground hover:text-foreground hover:bg-secondary"
                onClick={() => window.open("https://github.com/prathamvishwakarma", "_blank")}
                title="GitHub"
              >
                <Github className="h-4 w-4" />
              </Button>
              <Link to="/about">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs border-primary text-primary hover:bg-primary hover:text-primary-foreground gap-1.5"
                >
                  <FileText className="h-3.5 w-3.5" />
                  Resume
                </Button>
              </Link>
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