import { Briefcase, Landmark, Shield, Gift, Phone, Key, Lightbulb, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { safetyTips } from '@/lib/translations';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  briefcase: Briefcase,
  landmark: Landmark,
  shield: Shield,
  gift: Gift,
  phone: Phone,
  key: Key,
  alert: AlertCircle,
};

const SafetyTips = () => {
  const { t, language } = useLanguage();
  const tips = safetyTips[language];

  // Add a new tip about emergency contacts
  const emergencyContacts = [
    { name: 'South African Police Service', number: '10111' },
    { name: 'National Anti-Fraud Hotline', number: '0800 701 701' },
    { name: 'South African Banking Risk Centre', number: '0800 020 080' },
  ];

  return (
    <section id="tips" className="min-h-screen flex items-center py-20 pt-24">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-success/10 rounded-2xl mb-6">
              <Lightbulb className="w-8 h-8 text-success" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('tips.title')}</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t('tips.subtitle')}
            </p>
          </div>

          {/* Emergency Contacts Card */}
          <Card className="mb-8 bg-accent/10 border-accent/30">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="w-6 h-6 text-accent" />
                <h3 className="text-lg font-semibold">Emergency Contacts</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {emergencyContacts.map((contact, index) => (
                  <div key={index} className="p-4 bg-background/50 rounded-lg border border-border">
                    <p className="font-medium text-sm">{contact.name}</p>
                    <p className="text-lg font-bold text-accent mt-1">{contact.number}</p>
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Save these numbers! Report scams immediately to help protect others.
              </p>
            </CardContent>
          </Card>

          {/* Tips Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tips.map((tip, index) => {
              const IconComponent = iconMap[tip.icon] || Shield;
              const severity = index < 2 ? 'high' : index < 4 ? 'medium' : 'low';
              
              return (
                <Card
                  key={index}
                  className="card-gradient border-border hover:border-primary/30 transition-all duration-300 group animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                          <IconComponent className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg leading-tight">{tip.title}</CardTitle>
                          <Badge 
                            variant="outline" 
                            className={`mt-2 text-xs ${
                              severity === 'high' ? 'bg-destructive/10 text-destructive border-destructive/30' :
                              severity === 'medium' ? 'bg-warning/10 text-warning border-warning/30' :
                              'bg-success/10 text-success border-success/30'
                            }`}
                          >
                            {severity === 'high' ? 'HIGH PRIORITY' : severity === 'medium' ? 'MEDIUM' : 'GENERAL'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm leading-relaxed">
                      {tip.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Quick Stats */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 bg-secondary/30 rounded-xl">
              <div className="text-2xl font-bold text-primary">94%</div>
              <div className="text-xs text-muted-foreground">Scams Prevented</div>
            </div>
            <div className="p-4 bg-secondary/30 rounded-xl">
              <div className="text-2xl font-bold text-success">50K+</div>
              <div className="text-xs text-muted-foreground">Links Checked</div>
            </div>
            <div className="p-4 bg-secondary/30 rounded-xl">
              <div className="text-2xl font-bold text-accent">11</div>
              <div className="text-xs text-muted-foreground">Languages</div>
            </div>
            <div className="p-4 bg-secondary/30 rounded-xl">
              <div className="text-2xl font-bold text-warning">24/7</div>
              <div className="text-xs text-muted-foreground">Protection</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SafetyTips;