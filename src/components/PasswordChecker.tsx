import { useState, useMemo } from 'react';
import { Key, Eye, EyeOff, CheckCircle, XCircle, AlertTriangle, RefreshCw, Copy } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';

interface PasswordCriteria {
  label: string;
  met: boolean;
}

const PasswordChecker = () => {
  const { t } = useLanguage();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Function to generate a strong password
  const generateStrongPassword = () => {
    const length = 16;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
    let password = "";
    
    // Ensure at least one of each required character type
    password += "ABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(Math.floor(Math.random() * 26));
    password += "abcdefghijklmnopqrstuvwxyz".charAt(Math.floor(Math.random() * 26));
    password += "0123456789".charAt(Math.floor(Math.random() * 10));
    password += "!@#$%^&*()_+~`|}{[]:;?><,./-=".charAt(Math.floor(Math.random() * 32));
    
    // Fill the rest randomly
    for (let i = password.length; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    
    // Shuffle the password
    password = password.split('').sort(() => Math.random() - 0.5).join('');
    
    return password;
  };

  // Handle password generation
  const handleGeneratePassword = () => {
    const newPassword = generateStrongPassword();
    setPassword(newPassword);
    
    // Try to copy to clipboard
    navigator.clipboard.writeText(newPassword).then(() => {
      toast.success('Strong password generated!', {
        description: 'Password has been copied to clipboard',
      });
    }).catch(() => {
      // Fallback if clipboard fails
      toast.success('Strong password generated!', {
        description: 'You can copy it manually',
      });
    });
  };

  // Handle copying password to clipboard
  const handleCopyPassword = () => {
    if (password) {
      navigator.clipboard.writeText(password).then(() => {
        toast.success('Password copied to clipboard!');
      }).catch(() => {
        toast.error('Failed to copy password');
      });
    }
  };

  // Analyze password strength
  const analysis = useMemo(() => {
    const criteria: PasswordCriteria[] = [
      { label: 'At least 8 characters', met: password.length >= 8 },
      { label: 'Contains uppercase letter', met: /[A-Z]/.test(password) },
      { label: 'Contains lowercase letter', met: /[a-z]/.test(password) },
      { label: 'Contains a number', met: /[0-9]/.test(password) },
      { label: 'Contains special character (!@#$%^&*)', met: /[!@#$%^&*(),.?":{}|<>]/.test(password) },
      { label: 'At least 12 characters (recommended)', met: password.length >= 12 },
    ];

    const metCount = criteria.filter((c) => c.met).length;
    const score = Math.round((metCount / criteria.length) * 100);

    let strength: 'weak' | 'medium' | 'strong' = 'weak';
    if (score >= 80) strength = 'strong';
    else if (score >= 50) strength = 'medium';

    return { criteria, score, strength };
  }, [password]);

  // Get configuration based on password strength
  const getStrengthConfig = (strength: string) => {
    switch (strength) {
      case 'strong':
        return {
          label: t('password.strong'),
          color: 'text-success',
          progressColor: 'bg-success',
          icon: CheckCircle,
        };
      case 'medium':
        return {
          label: t('password.medium'),
          color: 'text-warning',
          progressColor: 'bg-warning',
          icon: AlertTriangle,
        };
      default:
        return {
          label: t('password.weak'),
          color: 'text-destructive',
          progressColor: 'bg-destructive',
          icon: XCircle,
        };
    }
  };

  const strengthConfig = getStrengthConfig(analysis.strength);
  const StrengthIcon = strengthConfig.icon;

  return (
    <section id="password" className="min-h-screen flex items-center py-20 pt-24">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-2xl mb-6">
              <Key className="w-8 h-8 text-accent" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('password.title')}</h2>
            <p className="text-muted-foreground text-lg">{t('password.subtitle')}</p>
          </div>

          {/* Password Input Card */}
          <Card className="card-gradient border-border mb-8">
            <CardContent className="pt-6">
              <div className="relative mb-4">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t('password.placeholder')}
                  className="pr-12 bg-background/50 border-border font-mono text-lg py-6"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {/* Generate Password Buttons */}
              <div className="flex gap-2 mb-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleGeneratePassword}
                  className="flex-1"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Generate Strong Password
                </Button>
                {password && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCopyPassword}
                    className="px-4"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                )}
              </div>

              {password && (
                <div className="mt-6 animate-fade-in">
                  {/* Strength Indicator */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <StrengthIcon className={`w-5 h-5 ${strengthConfig.color}`} />
                      <span className={`font-semibold ${strengthConfig.color}`}>
                        {strengthConfig.label}
                      </span>
                    </div>
                    <span className="text-muted-foreground text-sm">{analysis.score}%</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="h-3 bg-secondary rounded-full overflow-hidden mb-6">
                    <div
                      className={`h-full ${strengthConfig.progressColor} transition-all duration-500 ease-out`}
                      style={{ width: `${analysis.score}%` }}
                    />
                  </div>

                  {/* Criteria List */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-muted-foreground mb-3">
                      {t('password.tips')}:
                    </h4>
                    {analysis.criteria.map((criterion, index) => (
                      <div
                        key={index}
                        className={`flex items-center gap-3 text-sm transition-all duration-200 ${
                          criterion.met ? 'text-success' : 'text-muted-foreground'
                        }`}
                      >
                        {criterion.met ? (
                          <CheckCircle className="w-4 h-4 flex-shrink-0" />
                        ) : (
                          <XCircle className="w-4 h-4 flex-shrink-0" />
                        )}
                        {criterion.label}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Tips Card */}
          <Card className="bg-secondary/30 border-border">
            <CardContent className="pt-6">
              <h4 className="font-semibold mb-3 text-foreground">Pro Tips:</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                  Use a passphrase like "MyDogLoves2RunFast!" - easy to remember, hard to crack
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                  Never use the same password for your bank and social media
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                  Enable Two-Factor Authentication (2FA) wherever possible
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                  Consider using a password manager like Bitwarden or 1Password
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PasswordChecker;