import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { CreditCard, Server, Zap } from 'lucide-react';
import { toast } from 'sonner';

const CookiesProxy = () => {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [proxyEnabled, setProxyEnabled] = useState(false);

  const generateVIPPass = () => {
    const id = `VIP-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    setSessionId(id);
    toast.success('VIP Pass Generated!', {
      description: 'The server now remembers you via cookies',
    });
  };

  const handleProxyToggle = (enabled: boolean) => {
    setProxyEnabled(enabled);
    toast(enabled ? 'Proxy Enabled' : 'Proxy Disabled', {
      description: enabled
        ? 'Requests now go through cache for faster responses'
        : 'Requests go directly to the server',
    });
  };

  return (
    <section className="container mx-auto px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-5xl font-bold gradient-text">The VIP Experience</h2>
          <p className="text-lg text-muted-foreground">
            Cookies and Proxies - How the stateless web remembers you
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Cookies Section */}
          <Card className="glass-card p-8 space-y-6">
            <div className="text-center space-y-4">
              <div className="inline-flex p-6 rounded-2xl bg-primary/10">
                <CreditCard className="w-12 h-12 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-primary">Session Cookies</h3>
              <p className="text-muted-foreground">
                HTTP is stateless - cookies help the server remember your session
              </p>
            </div>

            <Button
              onClick={generateVIPPass}
              className="w-full neon-glow hover:neon-glow-pink bg-primary/20 hover:bg-primary/30 border border-primary/50"
            >
              Get VIP Pass
            </Button>

            {sessionId && (
              <div className="glass-card p-6 bg-primary/10 border-primary/50 animate-scale-in space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Session ID:</span>
                  <span className="font-code text-primary font-bold">{sessionId}</span>
                </div>
                <div className="pt-3 border-t border-primary/20">
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    This cookie is stored in your browser and sent with every request, allowing the server to track your session across multiple pages.
                  </p>
                </div>
              </div>
            )}
          </Card>

          {/* Proxy Section */}
          <Card className="glass-card p-8 space-y-6">
            <div className="text-center space-y-4">
              <div className="inline-flex p-6 rounded-2xl bg-secondary/10">
                <Server className="w-12 h-12 text-secondary" />
              </div>
              <h3 className="text-2xl font-bold text-secondary">Proxy Cache</h3>
              <p className="text-muted-foreground">
                Proxies cache responses to serve them faster without hitting the server
              </p>
            </div>

            <div className="flex items-center justify-between glass-card p-4 bg-muted/30">
              <Label htmlFor="proxy-toggle" className="text-foreground">Enable Proxy Cache</Label>
              <Switch
                id="proxy-toggle"
                checked={proxyEnabled}
                onCheckedChange={handleProxyToggle}
              />
            </div>

            {proxyEnabled && (
              <div className="glass-card p-6 bg-secondary/10 border-secondary/50 animate-scale-in space-y-4">
                <div className="flex items-center gap-3">
                  <Zap className="w-8 h-8 text-secondary animate-pulse" />
                  <div>
                    <p className="font-bold text-secondary">Cache Hit!</p>
                    <p className="text-sm text-muted-foreground">Response served instantly from proxy</p>
                  </div>
                </div>
                <div className="pt-3 border-t border-secondary/20">
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    The proxy stores frequently accessed content, reducing server load and improving response times for repeated requests.
                  </p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CookiesProxy;
