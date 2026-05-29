import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RootLayout from './components/layout/RootLayout';
import AdminLayout from './components/layout/AdminLayout';
import ProtectedRoute from './components/shared/ProtectedRoute';

// Public Pages
import HomePage from './pages/HomePage';
import AdmissionsPage from './pages/AdmissionsPage';
import PlacementsPage from './pages/PlacementsPage';
import AcademicsPage from './pages/AcademicsPage';
import FacultyPage from './pages/FacultyPage';
import FacultyDetailPage from './pages/FacultyDetailPage';
import GalleryPage from './pages/GalleryPage';
import NewsPage from './pages/NewsPage';
import EventsPage from './pages/EventsPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';

// Admin / CMS Pages
import LoginPage from './pages/admin/LoginPage';
import DashboardPage from './pages/admin/DashboardPage';
import NewsCMS from './pages/admin/NewsCMS';
import EventsCMS from './pages/admin/EventsCMS';
import FacultyCMS from './pages/admin/FacultyCMS';
import GalleryCMS from './pages/admin/GalleryCMS';
import EnquiriesCMS from './pages/admin/EnquiriesCMS';
import SettingsCMS from './pages/admin/SettingsCMS';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path="admissions" element={<AdmissionsPage />} />
          <Route path="placements" element={<PlacementsPage />} />
          <Route path="academics" element={<AcademicsPage />} />
          <Route path="faculty" element={<FacultyPage />} />
          <Route path="faculty/:id" element={<FacultyDetailPage />} />
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="news" element={<NewsPage />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* Auth / Admin Login */}
        <Route path="/admin/login" element={<LoginPage />} />

        {/* Admin Dashboard / CMS Routes (Protected) */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['Super Admin', 'Admin', 'Editor']}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="news" element={<NewsCMS />} />
          <Route path="events" element={<EventsCMS />} />
          <Route path="faculty" element={<FacultyCMS />} />
          <Route path="gallery" element={<GalleryCMS />} />
          <Route path="enquiries" element={<EnquiriesCMS />} />
          <Route path="settings" element={<SettingsCMS />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
