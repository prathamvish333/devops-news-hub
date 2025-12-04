import logo from "@/assets/logo.png";
import { Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import DevOpsButtons from "./DevOpsButtons";

const navItems = [
  "Home", "India", "World", "Tech", "Business", "Sports", "Entertainment", "Lifestyle"
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
      {/* Top bar */}
      <div className="container flex items-center justify-between py-2 text-sm text-muted-foreground">
        <span>{currentDate}</span>
        <div className="flex items-center gap-4">
          <DevOpsButtons />
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            Sign In
          </Button>
        </div>
      </div>
      
      {/* Logo section */}
      <div className="container py-4 flex items-center justify-center border-y border-border">
        <img src={logo} alt="Yashasvi Duniya" className="h-12 md:h-16" />
      </div>
      
      {/* Navigation */}
      <nav className="container">
        <div className="flex items-center justify-between py-2">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          
          <ul className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item}>
                <Button
                  variant="ghost"
                  className="text-foreground hover:text-primary hover:bg-secondary font-medium"
                >
                  {item}
                </Button>
              </li>
            ))}
          </ul>
          
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Header;