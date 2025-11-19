import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext';
import { Navbar, ProtectedRoute, SmoothScroll } from './components';
import { Home, Login, Admin, Catalog, Contact, Blog } from './pages';
import Transition from './utils/Transition'

const AppContent = () => {
  const location = useLocation();
  const hideNavbarRoutes = ['/login', '/admin'];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen">
      <SmoothScroll />
      {!shouldHideNavbar && (
        <Navbar
          logo='/logo.png'
          logoAlt="Company Logo"
          items={[
            { label: 'Home', href: '/' },
            { label: 'Catalog', href: '/catalog' },
            { label: 'Contact', href: '/contact' }
          ]}
          activeHref={location.pathname}
          className="custom-nav"
          ease="power2.easeOut"
          baseColor="#000000"
          pillColor="#ffffff"
          hoveredPillTextColor="#ffffff"
          pillTextColor="#000000"
        />
      )}
      <Routes>
        <Route element={<Transition />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path='/blog' element={<Blog />} />
          <Route path='/catalog' element={<Catalog />} />
          <Route path='/contact' element={<Contact />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
