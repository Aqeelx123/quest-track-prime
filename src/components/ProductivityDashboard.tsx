import { DailyStats } from '@/types/productivity';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Target, Flame, Award } from 'lucide-react';

interface ProductivityDashboardProps {
  stats: DailyStats;
  categoryBreakdown: { category: string; points: number }[];
}

export const ProductivityDashboard = ({ stats, categoryBreakdown }: ProductivityDashboardProps) => {
  const scoreColor = stats.productivityScore >= 80 ? 'text-[hsl(var(--legendary))]' :
                     stats.productivityScore >= 60 ? 'text-[hsl(var(--rare))]' :
                     stats.productivityScore >= 40 ? 'text-[hsl(var(--uncommon))]' :
                     'text-[hsl(var(--common))]';

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-primary pixel-border pixel-shadow">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription className="text-[10px] text-primary-foreground/80">SCORE</CardDescription>
              <Target className="h-3 w-3 text-primary-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className={`text-xl font-bold ${scoreColor}`}>
              {stats.productivityScore}%
            </div>
            <Progress value={stats.productivityScore} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card className="pixel-border pixel-shadow">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription className="text-[10px]">POINTS</CardDescription>
              <Award className="h-3 w-3 text-[hsl(var(--rare))]" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{stats.totalPoints}</div>
            <p className="text-[8px] text-muted-foreground mt-1">
              /500
            </p>
          </CardContent>
        </Card>

        <Card className="pixel-border pixel-shadow">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription className="text-[10px]">TASKS</CardDescription>
              <TrendingUp className="h-3 w-3 text-[hsl(var(--uncommon))]" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{stats.tasksCompleted}</div>
            <p className="text-[8px] text-muted-foreground mt-1">
              {stats.categoriesActive} cats
            </p>
          </CardContent>
        </Card>

        <Card className="pixel-border pixel-shadow">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription className="text-[10px]">STREAK</CardDescription>
              <Flame className="h-3 w-3 text-[hsl(var(--legendary))]" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-[hsl(var(--legendary))]">
              {stats.streak}D
            </div>
            <p className="text-[8px] text-muted-foreground mt-1">
              {stats.streak > 0 ? `+${(stats.streak * 5).toFixed(0)}%` : 'Start!'}
            </p>
          </CardContent>
        </Card>
      </div>

      {categoryBreakdown.length > 0 && (
        <Card className="pixel-border pixel-shadow">
          <CardHeader>
            <CardTitle className="text-xs">CATEGORIES</CardTitle>
            <CardDescription className="text-[10px]">Today's breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {categoryBreakdown.map(({ category, points }) => {
                const percentage = (points / stats.totalPoints) * 100;
                return (
                  <div key={category}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px]">{category}</span>
                      <span className="text-[10px] text-muted-foreground">{points}</span>
                    </div>
                    <Progress value={percentage} className="h-2" />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
