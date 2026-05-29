import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { 
  LayoutDashboard, 
  FileText, 
  Calendar, 
  Users, 
  Image, 
  Mail, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  User
} from 'lucide-react';
import PageLoader from '../shared/PageLoader';

interface NavItem {
  name: string;
  path: string;
  icon: any;
}

const navItems: NavItem[] = [
  { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'News & Media', path: '/admin/news', icon: FileText },
  { name: 'Events', path: '/admin/events', icon: Calendar },
  { name: 'Faculty Management', path: '/admin/faculty', icon: Users },
  { name: 'Gallery Albums', path: '/admin/gallery', icon: Image },
  { name: 'Admission Enquiries', path: '/admin/enquiries', icon: Mail },
  { name: 'Site Settings', path: '/admin/settings', icon: Settings },
];

export default function AdminLayout() {
  const { user, loading, logout, initialize } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = initialize();
    return () => unsubscribe();
  }, [initialize]);

  if (loading) {
    return <PageLoader />;
  }

  if (!user) {
    return null; // ProtectedRoute will handle redirect
  }

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="flex h-screen bg-muted/40">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 border-r bg-background">
        <div className="flex h-16 items-center px-6 border-b">
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl text-primary">SPSU Admin</span>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive 
                    ? 'bg-primary text-primary-foreground shadow-sm shadow-primary/20' 
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <Icon className="mr-3 h-4 w-4" />
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2.5 text-sm font-medium text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
          >
            <LogOut className="mr-3 h-4 w-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar Modal */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden bg-background/80 backdrop-blur-sm">
          <div className="relative flex flex-col w-64 max-w-xs bg-background border-r p-4 animate-in slide-in-from-left duration-200">
            <div className="flex items-center justify-between pb-4 border-b">
              <span className="font-bold text-lg text-primary">SPSU Admin</span>
              <button onClick={() => setSidebarOpen(false)} className="p-1 rounded-md hover:bg-muted">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex-1 py-4 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-primary text-primary-foreground' 
                        : 'text-muted-foreground hover:bg-muted'
                    }`}
                  >
                    <Icon className="mr-3 h-4 w-4" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
            <div className="pt-4 border-t">
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2.5 text-sm font-medium text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
              >
                <LogOut className="mr-3 h-4 w-4" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex h-16 items-center justify-between px-6 border-b bg-background">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-1.5 rounded-md hover:bg-muted md:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
          
          <div className="flex items-center space-x-4 ml-auto">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold">{user.displayName}</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">{user.role}</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
              <User className="h-5 w-5 text-primary" />
            </div>
          </div>
        </header>

        {/* Dynamic CMS Views */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
