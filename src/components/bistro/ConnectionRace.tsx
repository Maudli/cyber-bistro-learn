import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { PlayCircle, Trophy } from 'lucide-react';

const ConnectionRace = () => {
  const [isRacing, setIsRacing] = useState(false);
  const [http10Progress, setHttp10Progress] = useState(0);
  const [http11Progress, setHttp11Progress] = useState(0);
  const [winner, setWinner] = useState<string | null>(null);

  const startRace = () => {
    setIsRacing(true);
    setWinner(null);
    setHttp10Progress(0);
    setHttp11Progress(0);

    // HTTP 1.0 - Non-Persistent (jerky steps)
    let step10 = 0;
    const interval10 = setInterval(() => {
      step10 += 20;
      setHttp10Progress(step10);
      if (step10 >= 100) {
        clearInterval(interval10);
      }
    }, 600);

    // HTTP 1.1 - Persistent (smooth and fast)
    let progress11 = 0;
    const interval11 = setInterval(() => {
      progress11 += 10;
      setHttp11Progress(progress11);
      if (progress11 >= 100) {
        clearInterval(interval11);
        setWinner('HTTP 1.1');
        setIsRacing(false);
      }
    }, 100);
  };

  return (
    <section className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-5xl font-bold gradient-text">Connection Race</h2>
          <p className="text-lg text-muted-foreground">
            Persistent vs Non-Persistent Connections - Watch the speed difference!
          </p>
        </div>

        <Card className="glass-card p-8 space-y-8">
          <div className="space-y-6">
            {/* HTTP 1.0 */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-destructive">HTTP 1.0</h3>
                  <p className="text-sm text-muted-foreground">Non-Persistent • Open → Fetch → Close → Repeat</p>
                </div>
                {winner === 'HTTP 1.1' && http10Progress < 100 && (
                  <span className="text-destructive text-sm">Still loading...</span>
                )}
              </div>
              <Progress value={http10Progress} className="h-8 bg-muted/50" />
              <div className="text-right font-code text-primary">{http10Progress}%</div>
            </div>

            {/* HTTP 1.1 */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-primary">HTTP 1.1</h3>
                  <p className="text-sm text-muted-foreground">Persistent • Open → Fetch All → Close</p>
                </div>
                {winner === 'HTTP 1.1' && (
                  <div className="flex items-center gap-2 text-primary animate-pulse">
                    <Trophy className="w-5 h-5" />
                    <span className="font-bold">Winner!</span>
                  </div>
                )}
              </div>
              <Progress value={http11Progress} className="h-8 bg-muted/50" />
              <div className="text-right font-code text-primary">{http11Progress}%</div>
            </div>
          </div>

          <div className="text-center">
            <Button
              onClick={startRace}
              disabled={isRacing}
              size="lg"
              className="neon-glow hover:neon-glow-pink transition-all bg-primary hover:bg-secondary"
            >
              <PlayCircle className="w-5 h-5 mr-2" />
              {isRacing ? 'Racing...' : 'Start Race'}
            </Button>
          </div>

          {winner && (
            <div className="glass-card p-6 bg-primary/10 border-primary/50">
              <p className="text-center text-foreground">
                <span className="font-bold text-primary">HTTP 1.1</span> is{' '}
                <span className="font-bold text-secondary">~5x faster</span> because it keeps the connection open,
                eliminating the overhead of repeatedly establishing new connections.
              </p>
            </div>
          )}
        </Card>
      </div>
    </section>
  );
};

export default ConnectionRace;
