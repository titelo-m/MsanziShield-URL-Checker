import { useState } from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import LinkChecker from '@/components/LinkChecker';
import PasswordChecker from '@/components/PasswordChecker';
import SafetyTips from '@/components/SafetyTips';
import ReportScam from '@/components/ReportScam';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    // Smooth scroll to section
    if (section === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
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
        <main>{renderSection()}</main>
        
        {/* Footer */}
        <footer className="border-t border-border py-8 mt-auto">
          <div className="container mx-auto px-4 text-center">
            <p className="text-muted-foreground text-sm">
              © 2024 MzanziShield. Protecting South Africans online.
            </p>
            <p className="text-muted-foreground/60 text-xs mt-2">
              Built with 🛡️ for Cybertech Hackathon
            </p>
          </div>
        </footer>
      </div>
    </LanguageProvider>
  );
};

export default Index;
