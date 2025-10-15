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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription>Productivity Score</CardDescription>
              <Target className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-bold ${scoreColor}`}>
              {stats.productivityScore}%
            </div>
            <Progress value={stats.productivityScore} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription>Total Points</CardDescription>
              <Award className="h-4 w-4 text-[hsl(var(--rare))]" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalPoints}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Target: 500 points
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription>Tasks Completed</CardDescription>
              <TrendingUp className="h-4 w-4 text-[hsl(var(--uncommon))]" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.tasksCompleted}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {stats.categoriesActive} categories active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription>Current Streak</CardDescription>
              <Flame className="h-4 w-4 text-[hsl(var(--legendary))]" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[hsl(var(--legendary))]">
              {stats.streak}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {stats.streak > 0 ? `+${(stats.streak * 5).toFixed(0)}% bonus` : 'Start your streak!'}
            </p>
          </CardContent>
        </Card>
      </div>

      {categoryBreakdown.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Category Breakdown</CardTitle>
            <CardDescription>Points earned by category today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {categoryBreakdown.map(({ category, points }) => {
                const percentage = (points / stats.totalPoints) * 100;
                return (
                  <div key={category}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{category}</span>
                      <span className="text-sm text-muted-foreground">{points} pts</span>
                    </div>
                    <Progress value={percentage} />
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
