import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, Loader2, CheckCircle2, XCircle, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

type HTTPMethod = 'GET' | 'POST' | 'DELETE';

interface Response {
  status: number;
  message: string;
  color: string;
}

const HTTPSimulator = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [packetMoving, setPacketMoving] = useState(false);
  const [response, setResponse] = useState<Response | null>(null);

  const responses: Record<HTTPMethod, Response> = {
    GET: {
      status: 200,
      message: 'OK - Your food is ready!',
      color: 'text-green-400',
    },
    POST: {
      status: 201,
      message: 'Created - Compliment received!',
      color: 'text-blue-400',
    },
    DELETE: {
      status: 404,
      message: 'Not Found - Cannot return what we never served!',
      color: 'text-red-400',
    },
  };

  const handleRequest = (method: HTTPMethod) => {
    setPacketMoving(true);
    setResponse(null);
    
    setTimeout(() => {
      setIsLoading(true);
      setPacketMoving(false);
    }, 1000);

    setTimeout(() => {
      setIsLoading(false);
      const res = responses[method];
      setResponse(res);
      
      toast(res.message, {
        description: `Status Code: ${res.status}`,
        icon: res.status === 200 || res.status === 201 ? <CheckCircle2 /> : <XCircle />,
      });
    }, 2500);
  };

  return (
    <section className="container mx-auto px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-5xl font-bold gradient-text">The Waiter</h2>
          <p className="text-lg text-muted-foreground">
            HTTP requests carry your orders between client and server
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <Card className="glass-card p-6">
            <h3 className="text-2xl font-bold text-primary mb-4">Client (Table)</h3>
            <div className="space-y-4">
              <Button
                onClick={() => handleRequest('GET')}
                className="w-full bg-primary/20 hover:bg-primary/30 border border-primary/50 neon-glow"
                disabled={isLoading || packetMoving}
              >
                GET (Order Food)
              </Button>
              <Button
                onClick={() => handleRequest('POST')}
                className="w-full bg-secondary/20 hover:bg-secondary/30 border border-secondary/50 neon-glow-pink"
                disabled={isLoading || packetMoving}
              >
                POST (Send Compliment)
              </Button>
              <Button
                onClick={() => handleRequest('DELETE')}
                className="w-full bg-destructive/20 hover:bg-destructive/30 border border-destructive/50"
                disabled={isLoading || packetMoving}
              >
                DELETE (Return Food)
              </Button>
            </div>
          </Card>

          <Card className="glass-card p-6 flex items-center justify-center relative overflow-hidden">
            {packetMoving && (
              <div className="absolute left-0 animate-slide-in">
                <ArrowRight className="w-12 h-12 text-primary animate-pulse" />
              </div>
            )}
            {!packetMoving && !isLoading && !response && (
              <div className="text-center text-muted-foreground">
                <ArrowRight className="w-12 h-12 mx-auto mb-2 opacity-30" />
                <p className="text-sm">Click a method to start</p>
              </div>
            )}
          </Card>

          <Card className="glass-card p-6">
            <h3 className="text-2xl font-bold text-secondary mb-4">Server (Kitchen)</h3>
            <div className="h-full flex items-center justify-center">
              {isLoading && (
                <div className="text-center space-y-4">
                  <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto" />
                  <p className="text-muted-foreground">Processing...</p>
                </div>
              )}
              {response && (
                <div className="text-center space-y-4 animate-scale-in">
                  {response.status === 200 || response.status === 201 ? (
                    <CheckCircle2 className={`w-12 h-12 mx-auto ${response.color}`} />
                  ) : (
                    <XCircle className={`w-12 h-12 mx-auto ${response.color}`} />
                  )}
                  <div>
                    <p className={`text-2xl font-bold ${response.color}`}>{response.status}</p>
                    <p className="text-foreground/80 mt-2">{response.message}</p>
                  </div>
                </div>
              )}
              {!isLoading && !response && (
                <div className="text-center text-muted-foreground">
                  <RefreshCw className="w-12 h-12 mx-auto mb-2 opacity-30" />
                  <p className="text-sm">Waiting for requests</p>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HTTPSimulator;
