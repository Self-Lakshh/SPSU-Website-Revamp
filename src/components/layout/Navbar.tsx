import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, User, ShieldAlert } from 'lucide-react';

interface SubLink {
  name: string;
  path: string;
}

interface NavLink {
  name: string;
  path?: string;
  subLinks?: SubLink[];
}

const navLinks: NavLink[] = [
  {
    name: 'Academics',
    subLinks: [
      { name: 'Departments', path: '/academics' },
      { name: 'Faculty Directory', path: '/faculty' },
      { name: 'Academic Offerings', path: '/academics#programs' },
    ],
  },
  {
    name: 'Admissions',
    subLinks: [
      { name: 'Overview', path: '/admissions' },
      { name: 'Scholarships', path: '/admissions#scholarships' },
      { name: 'Fee Structure', path: '/admissions#fees' },
    ],
  },
  { name: 'Placements', path: '/placements' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'News & Events', path: '/news' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const { user, initialize } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = initialize();
    return () => unsubscribe();
  }, [initialize]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center space-x-2">
          <motion.span 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-black text-2xl tracking-tighter bg-gradient-to-r from-primary to-violet-600 bg-clip-text text-transparent"
          >
            SPSU
          </motion.span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => {
            const hasSubLinks = !!link.subLinks;
            return (
              <div 
                key={link.name} 
                className="relative group"
                onMouseEnter={() => hasSubLinks && setActiveDropdown(link.name)}
                onMouseLeave={() => hasSubLinks && setActiveDropdown(null)}
              >
                {link.path ? (
                  <Link
                    to={link.path}
                    className={`text-sm font-semibold tracking-wide transition-colors duration-200 hover:text-primary ${
                      location.pathname === link.path ? 'text-primary' : 'text-foreground/80'
                    }`}
                  >
                    {link.name}
                  </Link>
                ) : (
                  <button
                    className={`flex items-center text-sm font-semibold tracking-wide transition-colors duration-200 hover:text-primary focus:outline-none ${
                      activeDropdown === link.name ? 'text-primary' : 'text-foreground/80'
                    }`}
                  >
                    {link.name}
                    <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                      activeDropdown === link.name ? 'rotate-180' : ''
                    }`} />
                  </button>
                )}

                {/* Submenu Dropdown */}
                {hasSubLinks && (
                  <AnimatePresence>
                    {activeDropdown === link.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-0 mt-2 w-56 rounded-xl border border-border bg-card p-2 shadow-lg shadow-muted/50"
                      >
                        {link.subLinks?.map((sub) => (
                          <Link
                            key={sub.name}
                            to={sub.path}
                            className="block rounded-lg px-4 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            );
          })}
        </nav>

        {/* Action Button & Mobile Trigger */}
        <div className="flex items-center space-x-4">
          {user ? (
            <Link
              to="/admin/dashboard"
              className="hidden sm:flex items-center space-x-1.5 px-4 py-2 border rounded-full text-xs font-semibold hover:bg-muted transition-colors"
            >
              <ShieldAlert className="h-3.5 w-3.5 text-primary" />
              <span>Admin Console</span>
            </Link>
          ) : (
            <Link
              to="/admin/login"
              className="hidden sm:flex items-center space-x-1 px-4 py-2 bg-primary text-primary-foreground rounded-full text-xs font-semibold shadow-md shadow-primary/10 hover:bg-primary/95 transition-all hover:-translate-y-0.5"
            >
              <User className="h-3.5 w-3.5" />
              <span>Portal Login</span>
            </Link>
          )}

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1.5 rounded-lg border border-border hover:bg-muted lg:hidden"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden border-t bg-background overflow-hidden"
          >
            <div className="container mx-auto px-4 py-6 space-y-4">
              {navLinks.map((link) => {
                return (
                  <div key={link.name} className="space-y-2">
                    {link.path ? (
                      <Link
                        to={link.path}
                        className={`block text-base font-semibold ${
                          location.pathname === link.path ? 'text-primary' : 'text-foreground'
                        }`}
                      >
                        {link.name}
                      </Link>
                    ) : (
                      <div>
                        <button
                          onClick={() => toggleDropdown(link.name)}
                          className="flex w-full items-center justify-between text-base font-semibold text-foreground focus:outline-none"
                        >
                          <span>{link.name}</span>
                          <ChevronDown className={`h-4 w-4 transition-transform ${
                            activeDropdown === link.name ? 'rotate-180' : ''
                          }`} />
                        </button>
                        {activeDropdown === link.name && (
                          <div className="mt-2 pl-4 border-l space-y-2 py-1">
                            {link.subLinks?.map((sub) => (
                              <Link
                                key={sub.name}
                                to={sub.path}
                                className="block text-sm font-medium text-muted-foreground hover:text-foreground"
                              >
                                {sub.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}

              <div className="pt-4 border-t flex flex-col gap-2">
                {user ? (
                  <Link
                    to="/admin/dashboard"
                    className="flex w-full items-center justify-center space-x-1.5 px-4 py-2.5 border rounded-lg text-sm font-semibold hover:bg-muted"
                  >
                    <ShieldAlert className="h-4 w-4 text-primary" />
                    <span>Admin Console</span>
                  </Link>
                ) : (
                  <Link
                    to="/admin/login"
                    className="flex w-full items-center justify-center space-x-1 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold shadow-md"
                  >
                    <User className="h-4 w-4" />
                    <span>Portal Login</span>
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
