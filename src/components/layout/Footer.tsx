import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-muted/20">
      {/* Primary Footer content */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          
          {/* Brand/About section */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="flex items-center space-x-2">
              <span className="font-black text-2xl tracking-tighter bg-gradient-to-r from-primary to-violet-600 bg-clip-text text-transparent">
                SPSU
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Sir Padampat Singhania University is committed to academic excellence, innovative research, and preparing leaders of tomorrow through holistic and premium quality education.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 rounded-full border border-border hover:bg-primary hover:text-primary-foreground text-muted-foreground transition-all duration-200" aria-label="Facebook">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
                </svg>
              </a>
              <a href="#" className="p-2 rounded-full border border-border hover:bg-primary hover:text-primary-foreground text-muted-foreground transition-all duration-200" aria-label="Twitter">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="#" className="p-2 rounded-full border border-border hover:bg-primary hover:text-primary-foreground text-muted-foreground transition-all duration-200" aria-label="Instagram">
                <svg className="h-4 w-4 stroke-current fill-none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a href="#" className="p-2 rounded-full border border-border hover:bg-primary hover:text-primary-foreground text-muted-foreground transition-all duration-200" aria-label="LinkedIn">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick links: Academics */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">Academics</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/academics" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Departments
                </Link>
              </li>
              <li>
                <Link to="/faculty" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Faculty Directory
                </Link>
              </li>
              <li>
                <Link to="/academics#programs" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Academic Offerings
                </Link>
              </li>
              <li>
                <Link to="/placements" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Placement Reports
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick links: Admissions */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">Admissions</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/admissions" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  How to Apply
                </Link>
              </li>
              <li>
                <Link to="/admissions#scholarships" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Scholarships
                </Link>
              </li>
              <li>
                <Link to="/admissions#fees" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Fee Structure
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Enquiry Form
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick links: Contacts & Location */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">Contact Info</h4>
            <ul className="space-y-3.5">
              <li className="flex items-start space-x-3 text-sm text-muted-foreground">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Udaipur-Chittorgarh Road, Bhatewar, Udaipur, Rajasthan, India - 313601</span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                <span>+91 294 2660000</span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                <span>admissions@spsu.ac.in</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="mt-16 pt-8 border-t border-border/40 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground text-center md:text-left">
            &copy; {currentYear} Sir Padampat Singhania University. All rights reserved.
          </p>
          <div className="flex space-x-6 text-xs text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Use</a>
            <a href="#" className="hover:text-primary transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
