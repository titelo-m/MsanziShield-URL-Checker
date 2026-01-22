import { useState, useEffect } from 'react';
import { Flag, Send, Loader2, CheckCircle, BarChart3, Eye, Database, Shield, Check, X, Users, AlertTriangle, ThumbsUp } from 'lucide-react';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { scamTypes } from '@/lib/translations';
import { toast } from 'sonner';

interface ScamReport {
  id: string;
  link: string;
  description: string;
  type: string;
  status: 'pending' | 'verified' | 'resolved' | 'false';
  language: string;
  timestamp: number;
  date: string;
  reportsCount: number; // How many times this scam was reported
  verificationScore: number; // 0-100 score based on multiple reports
  similarReports: string[]; // IDs of similar reports
}

const ReportScam = () => {
  const { t, language } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    today: 0,
    verified: 0,
    communityReports: 0,
    verificationRate: 0,
  });
  const [reports, setReports] = useState<ScamReport[]>([]);
  const [formData, setFormData] = useState({
    link: '',
    description: '',
    type: '',
  });

  const types = scamTypes[language];

  // Load reports from localStorage on mount
  useEffect(() => {
    loadReports();
  }, []);

  // Check for similar existing scams when link changes
  useEffect(() => {
    if (formData.link.trim()) {
      checkForSimilarScams(formData.link.trim());
    }
  }, [formData.link]);

  // Load reports from localStorage
  const loadReports = () => {
    try {
      const savedReports = localStorage.getItem('esafemzansi_scam_reports');
      if (savedReports) {
        const parsedReports: ScamReport[] = JSON.parse(savedReports);
        setReports(parsedReports);
        calculateStats(parsedReports);
      }
    } catch (error) {
      console.error('Error loading reports:', error);
    }
  };

  // Calculate stats
  const calculateStats = (reportList: ScamReport[]) => {
    const today = new Date().toDateString();
    const todayCount = reportList.filter(r => 
      new Date(r.timestamp).toDateString() === today
    ).length;
    
    const verifiedCount = reportList.filter(r => 
      r.status === 'verified' || r.verificationScore >= 70
    ).length;
    
    const communityReports = reportList.reduce((sum, r) => sum + r.reportsCount, 0);
    const verificationRate = reportList.length > 0 
      ? Math.round((verifiedCount / reportList.length) * 100)
      : 0;

    setStats({
      total: reportList.length,
      today: todayCount,
      verified: verifiedCount,
      communityReports,
      verificationRate,
    });
  };

  // Check if new link is similar to existing scams
  const checkForSimilarScams = (link: string) => {
    const similar = reports.filter(report => 
      isSimilarLink(report.link, link) || 
      report.link.toLowerCase().includes(link.toLowerCase()) ||
      link.toLowerCase().includes(report.link.toLowerCase())
    );
    
    if (similar.length > 0) {
      toast.info(`⚠️ Similar scam already reported!`, {
        description: `This looks like ${similar.length} previously reported scam(s)`,
        duration: 4000,
      });
    }
  };

  // Simple similarity check for URLs/links
  const isSimilarLink = (link1: string, link2: string) => {
    const clean1 = link1.toLowerCase().replace(/https?:\/\/(www\.)?/, '');
    const clean2 = link2.toLowerCase().replace(/https?:\/\/(www\.)?/, '');
    return clean1.includes(clean2) || clean2.includes(clean1);
  };

  // Find similar reports for a given link
  const findSimilarReports = (link: string): string[] => {
    return reports
      .filter(report => isSimilarLink(report.link, link))
      .map(report => report.id);
  };

  // Calculate verification score based on similar reports
  const calculateVerificationScore = (similarReportIds: string[]): number => {
    if (similarReportIds.length === 0) return 10; // Base score for new report
    
    const similarReports = reports.filter(r => similarReportIds.includes(r.id));
    const totalReportsCount = similarReports.reduce((sum, r) => sum + r.reportsCount, 0);
    
    // Score formula: more similar reports = higher score
    let score = 10 + (similarReports.length * 15) + (totalReportsCount * 5);
    return Math.min(score, 100); // Cap at 100
  };

  // Save report to localStorage
  const saveReport = (report: ScamReport) => {
    try {
      // Check if this is a duplicate or similar report
      const similarReportIds = findSimilarReports(report.link);
      const isDuplicate = reports.some(r => 
        r.link.toLowerCase() === report.link.toLowerCase()
      );

      let updatedReports: ScamReport[];

      if (isDuplicate) {
        // Update existing report: increment reportsCount
        updatedReports = reports.map(r => {
          if (r.link.toLowerCase() === report.link.toLowerCase()) {
            return {
              ...r,
              reportsCount: r.reportsCount + 1,
              verificationScore: Math.min(r.verificationScore + 20, 100),
              similarReports: [...new Set([...r.similarReports, ...similarReportIds])],
              status: r.verificationScore + 20 >= 70 ? 'verified' : r.status
            };
          }
          return r;
        });
        
        toast.success('Duplicate report detected!', {
          description: `Increased confidence score for this scam`,
        });
      } else {
        // New report
        const verificationScore = calculateVerificationScore(similarReportIds);
        const newReportWithScore = {
          ...report,
          reportsCount: 1,
          verificationScore,
          similarReports: similarReportIds,
          status: verificationScore >= 70 ? 'verified' : 'pending'
        };
        
        updatedReports = [newReportWithScore, ...reports];
        
        if (similarReportIds.length > 0) {
          toast.success('Similar scam detected!', {
            description: `This matches ${similarReportIds.length} other report(s)`,
          });
        }
      }

      setReports(updatedReports);
      localStorage.setItem('esafemzansi_scam_reports', JSON.stringify(updatedReports));
      calculateStats(updatedReports);
      
      // Simulate real-time update for other tabs
      window.dispatchEvent(new CustomEvent('scamReportAdded'));
      
    } catch (error) {
      console.error('Error saving report:', error);
      throw error;
    }
  };

  // Manual verification function (for demo purposes)
  const verifyReport = (reportId: string) => {
    const updatedReports = reports.map(report => {
      if (report.id === reportId) {
        return {
          ...report,
          status: 'verified',
          verificationScore: 100,
          reportsCount: report.reportsCount + 1 // Count verification as a "report"
        };
      }
      return report;
    });
    
    setReports(updatedReports);
    localStorage.setItem('esafemzansi_scam_reports', JSON.stringify(updatedReports));
    calculateStats(updatedReports);
    
    toast.success('Report verified!', {
      description: 'This scam is now marked as verified',
    });
  };

  // Mark as false positive
  const markAsFalse = (reportId: string) => {
    const updatedReports = reports.map(report => {
      if (report.id === reportId) {
        return { ...report, status: 'false' };
      }
      return report;
    });
    
    setReports(updatedReports);
    localStorage.setItem('esafemzansi_scam_reports', JSON.stringify(updatedReports));
    calculateStats(updatedReports);
    
    toast.info('Marked as false positive', {
      description: 'Report moved to false positives',
    });
  };

  // Listen for new reports from other tabs
  useEffect(() => {
    const handleNewReport = () => {
      loadReports();
    };
    
    window.addEventListener('scamReportAdded', handleNewReport);
    
    return () => {
      window.removeEventListener('scamReportAdded', handleNewReport);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.link.trim() || !formData.type) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);

    try {
      const newReport: ScamReport = {
        id: Date.now().toString(),
        link: formData.link.trim(),
        description: formData.description.trim() || 'No description provided',
        type: formData.type,
        status: 'pending',
        language,
        timestamp: Date.now(),
        date: new Date().toISOString(),
        reportsCount: 1,
        verificationScore: 10,
        similarReports: [],
      };

      // Save to localStorage
      saveReport(newReport);

      setSubmitted(true);
      toast.success('Report Submitted Successfully!', {
        description: 'Thank you for helping protect the community.',
        duration: 5000,
      });
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ link: '', description: '', type: '' });
      }, 3000);

    } catch (error) {
      console.error('Error submitting report:', error);
      toast.error('Failed to submit report. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getTypeLabel = (typeValue: string) => {
    const type = types.find(t => t.value === typeValue);
    return type ? type.label : typeValue;
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) {
      return `${diffMins} min ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hours ago`;
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else {
      return `${diffDays} days ago`;
    }
  };

  const getStatusBadge = (status: string, score: number) => {
    switch (status) {
      case 'verified':
        return (
          <Badge className="bg-success/20 text-success border-success/30">
            <CheckCircle className="w-3 h-3 mr-1" />
            Verified
          </Badge>
        );
      case 'resolved':
        return (
          <Badge className="bg-accent/20 text-accent border-accent/30">
            <Shield className="w-3 h-3 mr-1" />
            Resolved
          </Badge>
        );
      case 'false':
        return (
          <Badge className="bg-gray-500/20 text-gray-500 border-gray-500/30">
            <X className="w-3 h-3 mr-1" />
            False Positive
          </Badge>
        );
      default:
        return score >= 70 ? (
          <Badge className="bg-warning/20 text-warning border-warning/30">
            <AlertTriangle className="w-3 h-3 mr-1" />
            Likely Scam ({score}%)
          </Badge>
        ) : (
          <Badge variant="outline" className="text-muted-foreground">
            Pending
          </Badge>
        );
    }
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
              <p className="text-muted-foreground text-lg mb-6">
                Thank you for helping protect the community. Your report has been analyzed.
              </p>
              
              <div className="space-y-4 bg-secondary/30 rounded-lg p-6 mb-6">
                <p className="text-sm text-muted-foreground">
                  <Users className="inline w-4 h-4 mr-2 text-primary" />
                  <span className="font-bold text-primary">{stats.total}</span> unique scams in our database
                </p>
                <p className="text-sm text-muted-foreground">
                  <ThumbsUp className="inline w-4 h-4 mr-2 text-success" />
                  <span className="font-bold text-success">{stats.verified}</span> verified scams
                </p>
                <p className="text-sm text-muted-foreground">
                  <AlertTriangle className="inline w-4 h-4 mr-2 text-destructive" />
                  <span className="font-bold text-destructive">{stats.today}</span> reports today
                </p>
                <p className="text-sm text-muted-foreground">
                  <BarChart3 className="inline w-4 h-4 mr-2 text-accent" />
                  <span className="font-bold text-accent">{stats.verificationRate}%</span> verification rate
                </p>
              </div>
              
              <Button
                variant="outline"
                className="mt-6"
                onClick={() => setSubmitted(false)}
              >
                Submit Another Report
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="report" className="min-h-screen flex items-center py-20 pt-24">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-destructive/10 rounded-2xl mb-6">
              <Flag className="w-8 h-8 text-destructive" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('report.title')}</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t('report.subtitle')} Community-powered verification system.
            </p>
          </div>

          {/* Enhanced Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <Card className="bg-secondary/30 border-border">
              <CardContent className="pt-6 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Database className="w-5 h-5 text-primary" />
                  <div className="text-2xl font-bold text-primary">{stats.total}</div>
                </div>
                <div className="text-sm text-muted-foreground">Unique Scams</div>
                <div className="text-xs text-muted-foreground/60 mt-1">Database</div>
              </CardContent>
            </Card>
            
            <Card className="bg-secondary/30 border-border">
              <CardContent className="pt-6 text-center">
                <div className="text-2xl font-bold text-destructive">{stats.today}</div>
                <div className="text-sm text-muted-foreground">Today</div>
                <div className="text-xs text-muted-foreground/60 mt-1">Live Counter</div>
              </CardContent>
            </Card>
            
            <Card className="bg-secondary/30 border-border">
              <CardContent className="pt-6 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Shield className="w-5 h-5 text-success" />
                  <div className="text-2xl font-bold text-success">{stats.verified}</div>
                </div>
                <div className="text-sm text-muted-foreground">Verified</div>
                <div className="text-xs text-muted-foreground/60 mt-1">Confirmed</div>
              </CardContent>
            </Card>
            
            <Card className="bg-secondary/30 border-border">
              <CardContent className="pt-6 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Users className="w-5 h-5 text-accent" />
                  <div className="text-2xl font-bold text-accent">{stats.communityReports}</div>
                </div>
                <div className="text-sm text-muted-foreground">Reports</div>
                <div className="text-xs text-muted-foreground/60 mt-1">Total Submissions</div>
              </CardContent>
            </Card>
            
            <Card className="bg-secondary/30 border-border">
              <CardContent className="pt-6 text-center">
                <div className="text-2xl font-bold text-warning">{stats.verificationRate}%</div>
                <div className="text-sm text-muted-foreground">Accuracy</div>
                <div className="text-xs text-muted-foreground/60 mt-1">Verification Rate</div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="report" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="report" className="flex items-center gap-2">
                <Flag className="w-4 h-4" />
                Report a Scam
              </TabsTrigger>
              <TabsTrigger value="view" className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                View Reports ({reports.length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="report" className="mt-6">
              <Card className="card-gradient border-border">
                <CardContent className="pt-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="link">
                        {t('report.linkLabel')} *
                        <span className="text-xs text-muted-foreground ml-2">
                          (URL, email, WhatsApp number, or phone number)
                        </span>
                      </Label>
                      <Input
                        id="link"
                        value={formData.link}
                        onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                        placeholder="https://scam-site.co.za or scam@email.com or +27..."
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
                          <SelectValue placeholder="Select type of scam..." />
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
                      <Label htmlFor="description">
                        {t('report.descLabel')}
                        <span className="text-xs text-muted-foreground ml-2">
                          (What happened? Any important details?)
                        </span>
                      </Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Tell us more about this scam..."
                        className="min-h-24 bg-background/50 border-border resize-none"
                        rows={4}
                      />
                    </div>

                    <div className="text-xs text-muted-foreground p-3 bg-secondary/30 rounded-lg">
                      <p className="flex items-center gap-2">
                        <span className="text-primary">🤝</span>
                        <span><strong>Community Verification:</strong> Multiple reports increase scam confidence score</span>
                      </p>
                      <p className="flex items-center gap-2 mt-1">
                        <span className="text-success">✅</span>
                        <span>Scams with 70%+ confidence are auto-verified</span>
                      </p>
                      <p className="flex items-center gap-2 mt-1">
                        <span className="text-warning">📊</span>
                        <span>Your report contributes to community protection</span>
                      </p>
                    </div>

                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground font-semibold py-6"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Submitting Report...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          {t('report.submit')} & Help Verify Scams
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="view" className="mt-6">
              <Card>
                <CardContent className="pt-6">
                  {reports.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <p className="mb-4">No reports yet. Be the first to report a scam!</p>
                      <p className="text-sm">Reports are stored locally in your browser.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {reports.map((report) => (
                        <div
                          key={report.id}
                          className="p-4 border rounded-lg hover:border-primary/30 transition-colors group"
                        >
                          <div className="flex flex-col md:flex-row md:items-start gap-4">
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-2 mb-2">
                                <span className="px-2 py-1 text-xs bg-primary/10 text-primary rounded">
                                  {getTypeLabel(report.type)}
                                </span>
                                {getStatusBadge(report.status, report.verificationScore)}
                                <span className="text-xs text-muted-foreground">
                                  {formatDate(report.timestamp)}
                                </span>
                                {report.reportsCount > 1 && (
                                  <Badge variant="outline" className="text-xs">
                                    <Users className="w-3 h-3 mr-1" />
                                    {report.reportsCount} reports
                                  </Badge>
                                )}
                              </div>
                              
                              <div className="mb-3">
                                <p className="text-sm font-medium break-all font-mono">
                                  {report.link}
                                </p>
                              </div>
                              
                              <p className="text-sm text-muted-foreground mb-3">
                                {report.description}
                              </p>
                              
                              {/* Verification Score Bar */}
                              <div className="mb-3">
                                <div className="flex items-center justify-between text-xs mb-1">
                                  <span className="text-muted-foreground">Confidence Score:</span>
                                  <span className="font-medium">{report.verificationScore}%</span>
                                </div>
                                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                                  <div 
                                    className={`h-full ${
                                      report.verificationScore >= 70 ? 'bg-success' : 
                                      report.verificationScore >= 40 ? 'bg-warning' : 'bg-destructive'
                                    }`}
                                    style={{ width: `${report.verificationScore}%` }}
                                  />
                                </div>
                              </div>
                            </div>
                            
                            {/* Action Buttons */}
                            <div className="flex gap-2 md:flex-col">
                              {report.status !== 'verified' && report.status !== 'false' && (
                                <>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => verifyReport(report.id)}
                                    className="text-xs"
                                  >
                                    <Check className="w-3 h-3 mr-1" />
                                    Verify
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => markAsFalse(report.id)}
                                    className="text-xs"
                                  >
                                    <X className="w-3 h-3 mr-1" />
                                    False
                                  </Button>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          {/* How Verification Works */}
          <Card className="mt-8 bg-accent/5 border-accent/20">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Shield className="w-5 h-5 text-accent" />
                How Community Verification Works
              </h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                <div>
                  <div className="font-medium mb-1">1. Multiple Reports</div>
                  <p>When multiple people report the same scam, confidence increases</p>
                </div>
                <div>
                  <div className="font-medium mb-1">2. Auto-Verification</div>
                  <p>Scams with 70%+ confidence score are automatically marked as verified</p>
                </div>
                <div>
                  <div className="font-medium mb-1">3. Manual Verification</div>
                  <p>You can manually verify or mark reports as false positives</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ReportScam;