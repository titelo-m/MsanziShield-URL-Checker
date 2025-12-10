import { useState, useEffect } from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import LinkChecker from '@/components/LinkChecker';
import PasswordChecker from '@/components/PasswordChecker';
import SafetyTips from '@/components/SafetyTips';
import ReportScam from '@/components/ReportScam';
import ThreatAlertBanner from '@/components/ThreatAlertBanner';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [showAlertBanner, setShowAlertBanner] = useState(true);

  // Handle smooth scrolling to sections
  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    
    if (section === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(section);
      if (element) {
        const headerHeight = 64; // Header height
        const alertBannerHeight = showAlertBanner ? 56 : 0; // Adjust based on alert visibility
        const totalOffset = headerHeight + alertBannerHeight;
        
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - totalOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  // Close alert banner callback
  const handleAlertClose = () => {
    setShowAlertBanner(false);
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'check':
        return <LinkChecker />;
      case 'password':
        return <PasswordChecker />;
      case 'tips':
        return <SafetyTips />;
      case 'report':
        return <ReportScam />;
      default:
        return <HeroSection onNavigate={handleSectionChange} />;
    }
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        <Header activeSection={activeSection} onSectionChange={handleSectionChange} />
        
        {showAlertBanner && <ThreatAlertBanner />}
        
        <main className={showAlertBanner ? "pt-0" : "pt-2"}> {/* Reduced padding */}
          {renderSection()}
        </main>
        
        <footer className="border-t border-border py-8 mt-12"> {/* Reduced top margin */}
          <div className="container mx-auto px-4 text-center">
            <p className="text-muted-foreground text-sm">
              © 2025 MzanziShield. Protecting South Africans online.
            </p>
            <p className="text-muted-foreground/60 text-xs mt-2">
              Built with 🛡️ for Cybertech Hackathon | Report scams to help others
            </p>
            <div className="flex justify-center gap-4 mt-4 text-xs text-muted-foreground/60">
              <span>Privacy Policy</span>
              <span>•</span>
              <span>Terms of Service</span>
              <span>•</span>
              <span>Contact Us</span>
            </div>
          </div>
        </footer>
      </div>
    </LanguageProvider>
  );
};

export default Index;