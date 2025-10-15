import { useState } from 'react';
import { UserProfile, TaskLog, Rarity, calculateTaskPoints } from '@/types/productivity';
import { PREDEFINED_TASKS } from '@/data/predefinedTasks';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Circle, Clock } from 'lucide-react';
import { format } from 'date-fns';

interface DailyTrackerProps {
  user: UserProfile;
  todayLogs: TaskLog[];
  currentStreak: number;
  onCompleteTask: (taskId: string, duration?: number) => void;
}

export const DailyTracker = ({ user, todayLogs, currentStreak, onCompleteTask }: DailyTrackerProps) => {
  const [durations, setDurations] = useState<Record<string, string>>({});

  const isTaskCompleted = (taskId: string) => 
    todayLogs.some(log => log.taskId === taskId && 
      format(new Date(log.completedAt), 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
    );

  const handleComplete = (taskId: string, supportsDuration: boolean) => {
    const duration = supportsDuration && durations[taskId] 
      ? parseInt(durations[taskId]) 
      : undefined;
    
    onCompleteTask(taskId, duration);
    setDurations(prev => ({ ...prev, [taskId]: '' }));
  };

  const userTasks = user.selectedTasks.map(ut => {
    const task = PREDEFINED_TASKS.find(t => t.id === ut.taskId);
    return task ? { ...task, customRarity: ut.customRarity } : null;
  }).filter(Boolean);

  const completedCount = userTasks.filter(t => isTaskCompleted(t!.id)).length;

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
        <CardHeader>
          <CardTitle className="text-2xl">Today's Tasks</CardTitle>
          <CardDescription>
            {format(new Date(), 'EEEE, MMMM d, yyyy')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Progress</p>
              <p className="text-3xl font-bold">
                {completedCount}/{userTasks.length}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Current Streak</p>
              <p className="text-3xl font-bold text-[hsl(var(--uncommon))]">
                {currentStreak} {currentStreak === 1 ? 'day' : 'days'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {userTasks.map((task) => {
          if (!task) return null;
          const completed = isTaskCompleted(task.id);
          const pointsPreview = calculateTaskPoints(
            task.basePoints,
            task.customRarity,
            durations[task.id] ? parseInt(durations[task.id]) : undefined,
            currentStreak
          );

          const rarityColor = {
            common: 'text-[hsl(var(--common))]',
            uncommon: 'text-[hsl(var(--uncommon))]',
            rare: 'text-[hsl(var(--rare))]',
            legendary: 'text-[hsl(var(--legendary))]',
          }[task.customRarity];

          return (
            <Card key={task.id} className={completed ? 'bg-success/5 border-success/30' : ''}>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => !completed && handleComplete(task.id, task.supportsDuration)}
                    className="mt-1"
                    disabled={completed}
                  >
                    {completed ? (
                      <CheckCircle2 className="h-6 w-6 text-[hsl(var(--success))]" />
                    ) : (
                      <Circle className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
                    )}
                  </button>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className={`font-medium ${completed ? 'line-through text-muted-foreground' : ''}`}>
                        {task.name}
                      </h4>
                      <Badge variant="outline" className={`text-xs ${rarityColor} border-current`}>
                        {task.customRarity}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {pointsPreview} pts
                      </Badge>
                    </div>

                    {task.supportsDuration && !completed && (
                      <div className="flex items-center gap-2 mt-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <Input
                          type="number"
                          placeholder="Duration (minutes)"
                          value={durations[task.id] || ''}
                          onChange={(e) => setDurations(prev => ({ ...prev, [task.id]: e.target.value }))}
                          className="w-40 h-8"
                          min="1"
                        />
                        <span className="text-xs text-muted-foreground">
                          +{((durations[task.id] ? parseInt(durations[task.id]) : 0) / 60 * 20).toFixed(0)}% bonus
                        </span>
                      </div>
                    )}
                  </div>

                  {!completed && (
                    <Button
                      onClick={() => handleComplete(task.id, task.supportsDuration)}
                      size="sm"
                    >
                      Complete
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
