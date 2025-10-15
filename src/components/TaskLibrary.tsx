import { UserTask, Rarity } from '@/types/productivity';
import { PREDEFINED_TASKS } from '@/data/predefinedTasks';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Check, Plus, Trash2 } from 'lucide-react';

interface TaskLibraryProps {
  selectedTasks: UserTask[];
  onToggleTask: (taskId: string, rarity: Rarity) => void;
  onRemoveTask: (taskId: string) => void;
}

const rarityColors: Record<Rarity, string> = {
  common: 'bg-[hsl(var(--common))] text-white',
  uncommon: 'bg-[hsl(var(--uncommon))] text-white',
  rare: 'bg-[hsl(var(--rare))] text-white',
  legendary: 'bg-[hsl(var(--legendary))] text-white',
};

export const TaskLibrary = ({ selectedTasks, onToggleTask, onRemoveTask }: TaskLibraryProps) => {
  const isTaskSelected = (taskId: string) => selectedTasks.some(t => t.taskId === taskId);
  const getTaskRarity = (taskId: string): Rarity | undefined => 
    selectedTasks.find(t => t.taskId === taskId)?.customRarity;

  const categoryGroups = PREDEFINED_TASKS.reduce((acc, task) => {
    if (!acc[task.category]) {
      acc[task.category] = [];
    }
    acc[task.category].push(task);
    return acc;
  }, {} as Record<string, typeof PREDEFINED_TASKS>);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Task Library</h2>
        <p className="text-muted-foreground">
          Select tasks and assign custom rarity levels. Selected: {selectedTasks.length}/{PREDEFINED_TASKS.length}
        </p>
      </div>

      {Object.entries(categoryGroups).map(([category, tasks]) => (
        <Card key={category}>
          <CardHeader>
            <CardTitle>{category}</CardTitle>
            <CardDescription>
              {tasks.filter(t => isTaskSelected(t.id)).length}/{tasks.length} tasks selected
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {tasks.map((task) => {
              const selected = isTaskSelected(task.id);
              const currentRarity = getTaskRarity(task.id) || task.defaultRarity;

              return (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/5 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{task.name}</h4>
                      <Badge variant="outline" className="text-xs">
                        {task.basePoints} pts
                      </Badge>
                      {task.supportsDuration && (
                        <Badge variant="secondary" className="text-xs">
                          Duration
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {selected && (
                      <>
                        <Select
                          value={currentRarity}
                          onValueChange={(value) => onToggleTask(task.id, value as Rarity)}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="common">
                              <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-[hsl(var(--common))]" />
                                Common
                              </div>
                            </SelectItem>
                            <SelectItem value="uncommon">
                              <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-[hsl(var(--uncommon))]" />
                                Uncommon
                              </div>
                            </SelectItem>
                            <SelectItem value="rare">
                              <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-[hsl(var(--rare))]" />
                                Rare
                              </div>
                            </SelectItem>
                            <SelectItem value="legendary">
                              <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-[hsl(var(--legendary))]" />
                                Legendary
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => onRemoveTask(task.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                    {!selected && (
                      <Button
                        size="sm"
                        onClick={() => onToggleTask(task.id, task.defaultRarity)}
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
