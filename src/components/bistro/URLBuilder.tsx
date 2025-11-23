import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

const URLBuilder = () => {
  const [protocol, setProtocol] = useState('http');
  const [host, setHost] = useState('www.food.com');
  const [port, setPort] = useState('80');
  const [path, setPath] = useState('/menu/burger');

  const fullURL = `${protocol}://${host}:${port}${path}`;

  return (
    <section id="url-builder" className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-5xl font-bold gradient-text">The Menu Order</h2>
          <p className="text-lg text-muted-foreground">
            A URL is like an address label - it tells the web exactly where to deliver your request
          </p>
        </div>

        {/* Live URL Display */}
        <div className="glass-card p-6 mb-8 neon-glow">
          <div className="font-code text-2xl break-all">
            <span className="text-primary">{protocol}</span>
            <span className="text-foreground">://</span>
            <span className="text-secondary">{host}</span>
            <span className="text-foreground">:</span>
            <span className="text-accent">{port}</span>
            <span className="text-neon-pink">{path}</span>
          </div>
        </div>

        {/* URL Controls */}
        <div className="glass-card p-8 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-primary">Protocol</Label>
              <Select value={protocol} onValueChange={setProtocol}>
                <SelectTrigger className="bg-muted/50 border-primary/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="http">HTTP</SelectItem>
                  <SelectItem value="https">HTTPS</SelectItem>
                  <SelectItem value="ftp">FTP</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-secondary">Host</Label>
              <Input
                value={host}
                onChange={(e) => setHost(e.target.value)}
                className="bg-muted/50 border-secondary/50 font-code"
                placeholder="www.example.com"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-accent">Port</Label>
              <Input
                value={port}
                onChange={(e) => setPort(e.target.value)}
                className="bg-muted/50 border-accent/50 font-code"
                placeholder="80"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-neon-pink">Path</Label>
              <Input
                value={path}
                onChange={(e) => setPath(e.target.value)}
                className="bg-muted/50 border-secondary/50 font-code"
                placeholder="/menu/burger"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default URLBuilder;
