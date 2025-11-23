import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

interface HeroSectionProps {
  onStart: () => void;
}

const HeroSection = ({ onStart }: HeroSectionProps) => {
  const handleStart = () => {
    onStart();
    document.getElementById('url-builder')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-card to-background animate-gradient" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1),transparent_50%)]" />
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 space-y-8">
        <div className="space-y-4 animate-fade-in">
          <h1 className="text-8xl md:text-9xl font-black tracking-tighter">
            <span className="gradient-text">HTTP</span>
            <br />
            <span className="text-foreground">BISTRO</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-light tracking-wide">
            Serving the World Wide Web since 1989
          </p>
        </div>
        
        <Button
          onClick={handleStart}
          size="lg"
          className="neon-glow hover:neon-glow-pink transition-all duration-300 text-lg px-8 py-6 rounded-full font-semibold bg-primary hover:bg-secondary"
        >
          Start Learning
        </Button>
        
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-primary" />
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
    </section>
  );
};

export default HeroSection;
