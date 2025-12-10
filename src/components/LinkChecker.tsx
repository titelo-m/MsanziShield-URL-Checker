import { useState, useEffect } from 'react';
import { Search, Shield, AlertTriangle, XCircle, CheckCircle, Loader2, Clock, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface AnalysisResult {
  status: 'safe' | 'warning' | 'danger';
  summary: string;
  details: string[];
  riskLevel: number;
}

interface CheckHistory {
  id: string;
  input: string;
  result: AnalysisResult;
  timestamp: Date;
  inputType: 'url' | 'phone' | 'text';
}

const LinkChecker = () => {
  const { t, language } = useLanguage();
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [checkHistory, setCheckHistory] = useState<CheckHistory[]>([]);

  // Load history from localStorage when component mounts
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem('mzanzishield_check_history');
      if (savedHistory) {
        const parsed = JSON.parse(savedHistory);
        // Convert string dates back to Date objects
        const historyWithDates = parsed.map((item: any) => ({
          ...item,
          timestamp: new Date(item.timestamp),
        }));
        setCheckHistory(historyWithDates.slice(0, 5)); // Keep only last 5 items
      }
    } catch (error) {
      console.log('No saved history found or error loading history');
    }
  }, []);

  // Save history to localStorage
  const saveHistory = (history: CheckHistory[]) => {
    try {
      localStorage.setItem('mzanzishield_check_history', JSON.stringify(history));
    } catch (error) {
      console.error('Error saving history:', error);
    }
  };

  // Detect what type of input the user entered
  const analyzeInputType = (input: string): 'url' | 'phone' | 'text' => {
    const trimmed = input.trim().toLowerCase();
    
    // Simple URL detection
    if (trimmed.includes('http://') || trimmed.includes('https://') || 
        (trimmed.includes('.') && (trimmed.includes('www') || trimmed.includes('com') || trimmed.includes('co.za')))) {
      return 'url';
    }
    
    // South African phone number detection (simple pattern)
    const phonePattern = /(\+27|27|0)[\s-]?\d{2}[\s-]?\d{3}[\s-]?\d{4}/;
    if (phonePattern.test(trimmed)) {
      return 'phone';
    }
    
    return 'text';
  };

  // Main function to analyze input
  const analyzeInput = async () => {
    const trimmedInput = input.trim();
    
    // Validate input
    if (!trimmedInput) {
      toast.error('Please enter a link or message to check');
      return;
    }

    if (trimmedInput.length < 3) {
      toast.error('Please enter at least 3 characters');
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      // Call the existing Supabase function
      const { data, error } = await supabase.functions.invoke('analyze-threat', {
        body: { content: trimmedInput, language },
      });

      if (error) {
        throw error;
      }

      setResult(data);
      
      // Determine input type
      const inputType = analyzeInputType(trimmedInput);
      
      // Create new history item
      const newHistoryItem: CheckHistory = {
        id: Date.now().toString(),
        input: trimmedInput.length > 40 ? trimmedInput.substring(0, 40) + '...' : trimmedInput,
        result: data,
        timestamp: new Date(),
        inputType,
      };
      
      // Update history (keep max 5 items)
      const updatedHistory = [newHistoryItem, ...checkHistory.slice(0, 4)];
      setCheckHistory(updatedHistory);
      saveHistory(updatedHistory);
      
      // Show input type info to user
      const typeLabels = {
        'url': 'URL',
        'phone': 'Phone Number', 
        'text': 'Text Message'
      };
      
      toast.info(`Analyzed as ${typeLabels[inputType]}`, {
        description: `Status: ${data.status.toUpperCase()}`,
      });
      
    } catch (error) {
      console.error('Error analyzing:', error);
      toast.error('Failed to analyze. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Clear all history
  const clearHistory = () => {
    setCheckHistory([]);
    localStorage.removeItem('mzanzishield_check_history');
    toast.success('History cleared');
  };

  // Remove single item from history
  const removeHistoryItem = (id: string) => {
    const updatedHistory = checkHistory.filter(item => item.id !== id);
    setCheckHistory(updatedHistory);
    saveHistory(updatedHistory);
    toast.success('Item removed from history');
  };

  // Get configuration for status display
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

  // Get badge for input type
  const getInputTypeBadge = (type: string) => {
    switch (type) {
      case 'url': return <Badge variant="outline" className="text-xs bg-blue-500/10">URL</Badge>;
      case 'phone': return <Badge variant="outline" className="text-xs bg-green-500/10">PHONE</Badge>;
      default: return <Badge variant="outline" className="text-xs bg-gray-500/10">TEXT</Badge>;
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
            <Card className={`animate-fade-in ${getStatusConfig(result.status).borderColor} border-2 mb-6`}>
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

          {/* Check History */}
          {checkHistory.length > 0 && (
            <Card className="animate-fade-in">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-muted-foreground" />
                    <CardTitle className="text-lg">Recent Checks</CardTitle>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearHistory}
                    className="h-8 text-xs"
                  >
                    Clear All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {checkHistory.map((item) => {
                    const statusConfig = getStatusConfig(item.result.status);
                    const HistoryIcon = statusConfig.icon;
                    
                    return (
                      <div
                        key={item.id}
                        className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors group"
                      >
                        <div className={`p-2 rounded-lg ${statusConfig.bgColor}`}>
                          <HistoryIcon className={`w-4 h-4 ${statusConfig.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            {getInputTypeBadge(item.inputType)}
                            <p className="text-sm font-medium truncate">{item.input}</p>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {item.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                        <Badge variant="outline" className={statusConfig.color}>
                          {item.result.riskLevel}/10
                        </Badge>
                        <button
                          onClick={() => removeHistoryItem(item.id)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-destructive/10 rounded"
                        >
                          <Trash2 className="w-3 h-3 text-muted-foreground" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
};

export default LinkChecker;