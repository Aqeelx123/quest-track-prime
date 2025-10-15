import { useState } from 'react';
import { UserProfile, TaskLog, calculateTaskPoints } from '@/types/productivity';
import { PREDEFINED_TASKS } from '@/data/predefinedTasks';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Circle, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { getCategoryIcon } from '@/utils/categoryIcons';

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
      <Card className="bg-primary pixel-border pixel-shadow">
        <CardHeader>
          <CardTitle className="text-sm text-primary-foreground">TODAY</CardTitle>
          <CardDescription className="text-[10px] text-primary-foreground/80">
            {format(new Date(), 'MMM d yyyy')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] text-primary-foreground/80">Progress</p>
              <p className="text-xl font-bold text-primary-foreground">
                {completedCount}/{userTasks.length}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-primary-foreground/80">Streak</p>
              <p className="text-xl font-bold text-secondary">
                {currentStreak}D
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
            <Card key={task.id} className={`pixel-border ${completed ? 'bg-success/5 border-success' : 'pixel-shadow'}`}>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <img 
                    src={getCategoryIcon(task.category)} 
                    alt={task.category}
                    className="h-8 w-8 mt-1"
                  />
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
                      <h4 className={`text-[10px] ${completed ? 'line-through text-muted-foreground' : ''}`}>
                        {task.name}
                      </h4>
                      <Badge variant="outline" className={`text-[8px] px-1 py-0 ${rarityColor} border-current`}>
                        {task.customRarity}
                      </Badge>
                      <Badge variant="secondary" className="text-[8px] px-1 py-0">
                        {pointsPreview}
                      </Badge>
                    </div>

                    {task.supportsDuration && !completed && (
                      <div className="flex items-center gap-2 mt-2">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <Input
                          type="number"
                          placeholder="min"
                          value={durations[task.id] || ''}
                          onChange={(e) => setDurations(prev => ({ ...prev, [task.id]: e.target.value }))}
                          className="w-24 h-6 pixel-border text-[10px]"
                          min="1"
                        />
                        <span className="text-[8px] text-muted-foreground">
                          +{((durations[task.id] ? parseInt(durations[task.id]) : 0) / 60 * 20).toFixed(0)}%
                        </span>
                      </div>
                    )}
                  </div>

                  {!completed && (
                    <Button
                      onClick={() => handleComplete(task.id, task.supportsDuration)}
                      size="sm"
                      className="pixel-border text-[10px]"
                    >
                      Done
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
