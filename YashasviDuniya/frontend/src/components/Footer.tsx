import { Link } from 'react-router-dom'
import { Github, Linkedin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">Y</span>
              </div>
              <span className="font-heading font-bold text-xl">Yashasvi Duniya</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-md">
              A modern news portal inspired by the layout and design of NDTV, built as a production-style 
              3-tier microservice application with React, FastAPI, and PostgreSQL.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-heading font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/category/India" className="text-muted-foreground hover:text-primary">India</Link></li>
              <li><Link to="/category/World" className="text-muted-foreground hover:text-primary">World</Link></li>
              <li><Link to="/category/Business" className="text-muted-foreground hover:text-primary">Business</Link></li>
              <li><Link to="/category/Tech" className="text-muted-foreground hover:text-primary">Tech</Link></li>
              <li><Link to="/category/Sports" className="text-muted-foreground hover:text-primary">Sports</Link></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-heading font-semibold mb-4">Connect</h3>
            <div className="flex gap-4">
              <a
                href="https://github.com/prathamvish333"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="h-6 w-6" />
              </a>
              <a
                href="https://linkedin.com/in/prathamvishwakarma"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Yashasvi Duniya. All rights reserved.</p>
          <p className="mt-2">
            This project is a demo and not affiliated with NDTV. All news content is original.
          </p>
        </div>
      </div>
    </footer>
  )
}
