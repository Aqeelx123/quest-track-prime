import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sparkles, Zap, Trophy } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-16 h-16 bg-primary animate-pulse pixel-border" />
        <div className="absolute bottom-20 right-20 w-20 h-20 bg-secondary animate-pulse pixel-border" style={{ animationDelay: '1s' }} />
        <div className="absolute top-40 right-40 w-12 h-12 bg-accent animate-pulse pixel-border" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-40 left-40 w-14 h-14 bg-primary animate-pulse pixel-border" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="relative z-10 text-center space-y-12 px-6 max-w-2xl">
        {/* Icon decoration */}
        <div className="flex justify-center gap-8 mb-4">
          <div className="bg-primary/20 p-4 pixel-border pixel-shadow animate-bounce" style={{ animationDelay: '0s', animationDuration: '2s' }}>
            <Trophy className="h-8 w-8 text-primary" />
          </div>
          <div className="bg-secondary/20 p-4 pixel-border pixel-shadow animate-bounce" style={{ animationDelay: '0.3s', animationDuration: '2s' }}>
            <Sparkles className="h-8 w-8 text-secondary" />
          </div>
          <div className="bg-accent/20 p-4 pixel-border pixel-shadow animate-bounce" style={{ animationDelay: '0.6s', animationDuration: '2s' }}>
            <Zap className="h-8 w-8 text-accent" />
          </div>
        </div>

        {/* Main title */}
        <div className="space-y-4">
          <h1 className="text-6xl md:text-8xl font-pixel text-primary pixel-shadow-lg tracking-wider leading-tight">
            PRODUCTIVE
          </h1>
          <div className="flex items-center justify-center gap-3">
            <div className="h-1 w-16 bg-secondary pixel-border" />
            <span className="text-4xl md:text-6xl font-pixel text-secondary animate-pulse">
              x1.5
            </span>
            <div className="h-1 w-16 bg-secondary pixel-border" />
          </div>
        </div>

        {/* Subtitle */}
        <p className="text-xs md:text-sm text-muted-foreground tracking-widest uppercase">
          Level up your daily productivity
        </p>

        {/* Start button */}
        <div className="pt-8">
          <Button
            onClick={() => navigate('/app')}
            size="lg"
            className="text-lg md:text-xl px-12 py-8 h-auto pixel-border pixel-shadow hover:scale-105 transition-transform font-pixel bg-gradient-to-br from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
          >
            START
          </Button>
        </div>

        {/* Decorative stats */}
        <div className="grid grid-cols-3 gap-4 pt-8 max-w-md mx-auto">
          <div className="bg-card/50 p-4 pixel-border">
            <div className="text-2xl font-pixel text-primary">100+</div>
            <div className="text-[10px] text-muted-foreground">TASKS</div>
          </div>
          <div className="bg-card/50 p-4 pixel-border">
            <div className="text-2xl font-pixel text-secondary">8</div>
            <div className="text-[10px] text-muted-foreground">CATEGORIES</div>
          </div>
          <div className="bg-card/50 p-4 pixel-border">
            <div className="text-2xl font-pixel text-accent">∞</div>
            <div className="text-[10px] text-muted-foreground">GROWTH</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
