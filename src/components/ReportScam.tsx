import { useState } from 'react';
import { Flag, Send, Loader2, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';
import { scamTypes } from '@/lib/translations';
import { toast } from 'sonner';

const ReportScam = () => {
  const { t, language } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    link: '',
    description: '',
    type: '',
  });

  const types = scamTypes[language];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.link.trim() || !formData.type) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);

    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setLoading(false);
    setSubmitted(true);
    toast.success(t('report.success'));

    // Reset after showing success
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ link: '', description: '', type: '' });
    }, 3000);
  };

  if (submitted) {
    return (
      <section id="report" className="min-h-screen flex items-center py-20 pt-24">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="animate-fade-in">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-success/10 rounded-full mb-6 glow-success">
                <CheckCircle className="w-10 h-10 text-success" />
              </div>
              <h2 className="text-3xl font-bold mb-4 text-success">Report Submitted!</h2>
              <p className="text-muted-foreground text-lg">{t('report.success')}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="report" className="min-h-screen flex items-center py-20 pt-24">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-destructive/10 rounded-2xl mb-6">
              <Flag className="w-8 h-8 text-destructive" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('report.title')}</h2>
            <p className="text-muted-foreground text-lg">{t('report.subtitle')}</p>
          </div>

          {/* Report Form */}
          <Card className="card-gradient border-border">
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="link">{t('report.linkLabel')} *</Label>
                  <Input
                    id="link"
                    value={formData.link}
                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                    placeholder="https://suspicious-link.com or +27..."
                    className="bg-background/50 border-border font-mono"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">{t('report.typeLabel')} *</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => setFormData({ ...formData, type: value })}
                  >
                    <SelectTrigger className="bg-background/50 border-border">
                      <SelectValue placeholder="Select type..." />
                    </SelectTrigger>
                    <SelectContent>
                      {types.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">{t('report.descLabel')}</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Tell us more about this scam..."
                    className="min-h-24 bg-background/50 border-border resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground font-semibold py-6"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      {t('report.submit')}
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Community Stats */}
          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-secondary/30 rounded-xl">
              <div className="text-2xl font-bold text-primary">1,247</div>
              <div className="text-xs text-muted-foreground">Scams Reported</div>
            </div>
            <div className="p-4 bg-secondary/30 rounded-xl">
              <div className="text-2xl font-bold text-success">89%</div>
              <div className="text-xs text-muted-foreground">Verified</div>
            </div>
            <div className="p-4 bg-secondary/30 rounded-xl">
              <div className="text-2xl font-bold text-accent">50K+</div>
              <div className="text-xs text-muted-foreground">Users Protected</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReportScam;
