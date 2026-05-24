
import { useState } from 'react';
import TopNavBar from './components/TopNavBar';
import HeroSection from './components/HeroSection';
import TrustedBySection from './components/TrustedBySection';
import ServicesSection from './components/ServicesSection';
import ProcessSection from './components/ProcessSection';
import InsightsSection from './components/InsightsSection';
import ContactSection from './components/ContactSection';
import LoginPage from './components/LoginPage';
import Footer from './components/Footer';
import Dashboard from './components/admin/Dashboard';

function App() {
  // Routing State: 'landing' | 'login' | 'dashboard'
  const [view, setView] = useState('landing');

  // Handle successful login
  const handleLoginSuccess = () => {
    setView('dashboard');
  };

  if (view === 'dashboard') {
    return <Dashboard onLogout={() => setView('landing')} />;
  }

  return (
    <div className="bg-dark text-white">
      <TopNavBar 
        onLoginClick={() => setView('login')} 
        onPortalClick={() => setView('dashboard')}
      />
      {view === 'login' ? (
        <LoginPage 
          onClose={() => setView('landing')} 
          onLoginSuccess={handleLoginSuccess}
        />
      ) : (
        <main className="pt-5">
          <HeroSection />
          <TrustedBySection />
          <ServicesSection />
          <ProcessSection />
          <InsightsSection />
          <ContactSection />
        </main>
      )}
      <Footer />
    </div>
  );
}

export default App;
