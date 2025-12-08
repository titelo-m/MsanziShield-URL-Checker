import { Briefcase, Landmark, Shield, Gift, Phone, Key, Lightbulb } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { safetyTips } from '@/lib/translations';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  briefcase: Briefcase,
  landmark: Landmark,
  shield: Shield,
  gift: Gift,
  phone: Phone,
  key: Key,
};

const SafetyTips = () => {
  const { t, language } = useLanguage();
  const tips = safetyTips[language];

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

          {/* Tips Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tips.map((tip, index) => {
              const IconComponent = iconMap[tip.icon] || Shield;
              return (
                <Card
                  key={index}
                  className="card-gradient border-border hover:border-primary/30 transition-all duration-300 group animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg leading-tight">{tip.title}</CardTitle>
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
        </div>
      </div>
    </section>
  );
};

export default SafetyTips;
