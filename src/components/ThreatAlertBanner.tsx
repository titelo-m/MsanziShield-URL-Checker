import { AlertTriangle, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

interface ThreatAlert {
  id: string;
  title: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
  timestamp: Date;
}

const ThreatAlertBanner = () => {
  const [alerts] = useState<ThreatAlert[]>([
    {
      id: '1',
      title: 'SARS Phishing Campaign Alert',
      description: 'Increased reports of fake SARS refund SMS scams targeting South Africans. Do not click on links from unknown numbers.',
      severity: 'high',
      timestamp: new Date(Date.now() - 3600000),
    },
    {
      id: '2',
      title: 'Job Scam Warning',
      description: 'New WhatsApp job scams asking for R100 registration fees. Legitimate employers never ask for payment upfront.',
      severity: 'medium',
      timestamp: new Date(Date.now() - 7200000),
    },
    {
      id: '3',
      title: 'Banking Phishing Update',
      description: 'Fake FNB and Standard Bank SMS links circulating. Always verify URLs before entering credentials.',
      severity: 'high',
      timestamp: new Date(Date.now() - 10800000),
    },
    {
      id: '4',
      title: 'Lottery Scam Alert',
      description: 'Fake lottery win notifications asking for personal details. Remember: if you didn\'t enter, you didn\'t win.',
      severity: 'medium',
      timestamp: new Date(Date.now() - 14400000),
    },
  ]);
  
  const [currentAlertIndex, setCurrentAlertIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-destructive/15 border-destructive/40 text-destructive';
      case 'medium': return 'bg-warning/15 border-warning/40 text-warning';
      case 'low': return 'bg-accent/15 border-accent/40 text-accent';
      default: return 'bg-secondary';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return '🔴';
      case 'medium': return '🟡';
      case 'low': return '🔵';
      default: return 'ℹ️';
    }
  };

  const handleNext = () => {
    setCurrentAlertIndex((prev) => (prev + 1) % alerts.length);
  };

  const handlePrev = () => {
    setCurrentAlertIndex((prev) => (prev - 1 + alerts.length) % alerts.length);
  };

  const handleDismiss = () => {
    setIsVisible(false);
  };

  if (!isVisible || alerts.length === 0) return null;

  const currentAlert = alerts[currentAlertIndex];

  return (
    <div className="w-full sticky top-16 z-40"> {/* Changed: sticky positioning and reduced spacing */}
      <div className="container mx-auto px-4 py-2"> {/* Changed: py-2 (was py-3) */}
        <Alert className={`relative ${getSeverityColor(currentAlert.severity)} border animate-fade-in shadow-md`}>
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex-shrink-0"> {/* Adjusted margin */}
              <span className="text-lg">{getSeverityIcon(currentAlert.severity)}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                <div className="font-semibold text-sm truncate">{currentAlert.title}</div>
              </div>
              <AlertDescription className="text-sm line-clamp-2">
                {currentAlert.description}
              </AlertDescription>
              <div className="text-xs opacity-75 mt-1">
                Updated {currentAlert.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              {alerts.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handlePrev}
                    className="h-6 w-6"
                    disabled={alerts.length === 1}
                  >
                    <ChevronLeft className="w-3 h-3" />
                  </Button>
                  <span className="text-xs px-1">
                    {currentAlertIndex + 1}/{alerts.length}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleNext}
                    className="h-6 w-6"
                    disabled={alerts.length === 1}
                  >
                    <ChevronRight className="w-3 h-3" />
                  </Button>
                </>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={handleDismiss}
                className="h-6 w-6 ml-1"
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </Alert>
      </div>
    </div>
  );
};

export default ThreatAlertBanner;