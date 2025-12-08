import { useState } from 'react';
import { Search, Shield, AlertTriangle, XCircle, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface AnalysisResult {
  status: 'safe' | 'warning' | 'danger';
  summary: string;
  details: string[];
  riskLevel: number;
}

const LinkChecker = () => {
  const { t, language } = useLanguage();
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const analyzeInput = async () => {
    if (!input.trim()) {
      toast.error('Please enter a link or message to check');
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const { data, error } = await supabase.functions.invoke('analyze-threat', {
        body: { content: input, language },
      });

      if (error) {
        throw error;
      }

      setResult(data);
    } catch (error) {
      console.error('Error analyzing:', error);
      toast.error('Failed to analyze. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'safe':
        return {
          icon: CheckCircle,
          color: 'text-success',
          bgColor: 'bg-success/10',
          borderColor: 'border-success/30',
          glowClass: 'glow-success',
        };
      case 'warning':
        return {
          icon: AlertTriangle,
          color: 'text-warning',
          bgColor: 'bg-warning/10',
          borderColor: 'border-warning/30',
          glowClass: 'glow-primary',
        };
      case 'danger':
        return {
          icon: XCircle,
          color: 'text-destructive',
          bgColor: 'bg-destructive/10',
          borderColor: 'border-destructive/30',
          glowClass: 'glow-danger',
        };
      default:
        return {
          icon: Shield,
          color: 'text-muted-foreground',
          bgColor: 'bg-muted',
          borderColor: 'border-border',
          glowClass: '',
        };
    }
  };

  return (
    <section id="check" className="min-h-screen flex items-center py-20 pt-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-6">
              <Search className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('check.title')}</h2>
            <p className="text-muted-foreground text-lg">{t('check.subtitle')}</p>
          </div>

          {/* Input Card */}
          <Card className="card-gradient border-border mb-8">
            <CardContent className="pt-6">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t('check.placeholder')}
                className="min-h-32 bg-background/50 border-border resize-none font-mono text-sm"
              />
              <Button
                onClick={analyzeInput}
                disabled={loading || !input.trim()}
                className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    {t('check.analyzing')}
                  </>
                ) : (
                  <>
                    <Shield className="w-5 h-5 mr-2" />
                    {t('check.button')}
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          {result && (
            <Card className={`animate-fade-in ${getStatusConfig(result.status).borderColor} border-2`}>
              <CardHeader className={getStatusConfig(result.status).bgColor}>
                <div className="flex items-center gap-4">
                  {(() => {
                    const StatusIcon = getStatusConfig(result.status).icon;
                    return (
                      <div className={`p-3 rounded-xl ${getStatusConfig(result.status).bgColor} ${getStatusConfig(result.status).glowClass}`}>
                        <StatusIcon className={`w-8 h-8 ${getStatusConfig(result.status).color}`} />
                      </div>
                    );
                  })()}
                  <div>
                    <CardTitle className={getStatusConfig(result.status).color}>
                      {result.status === 'safe' && t('check.safe')}
                      {result.status === 'warning' && t('check.warning')}
                      {result.status === 'danger' && t('check.danger')}
                    </CardTitle>
                    <CardDescription className="text-base mt-1">
                      Risk Level: {result.riskLevel}/10
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-foreground mb-4">{result.summary}</p>
                {result.details.length > 0 && (
                  <ul className="space-y-2">
                    {result.details.map((detail, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
};

export default LinkChecker;
