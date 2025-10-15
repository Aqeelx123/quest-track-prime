import { UserTask, Rarity } from '@/types/productivity';
import { PREDEFINED_TASKS } from '@/data/predefinedTasks';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2 } from 'lucide-react';
import { getCategoryIcon } from '@/utils/categoryIcons';

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
        <h2 className="text-sm mb-2">TASK LIBRARY</h2>
        <p className="text-muted-foreground text-[10px]">
          Selected: {selectedTasks.length}/{PREDEFINED_TASKS.length}
        </p>
      </div>

      {Object.entries(categoryGroups).map(([category, tasks]) => (
        <Card key={category} className="pixel-border pixel-shadow">
          <CardHeader>
            <div className="flex items-center gap-2">
              <img 
                src={getCategoryIcon(category)} 
                alt={category}
                className="h-8 w-8"
              />
              <div>
                <CardTitle className="text-xs">{category}</CardTitle>
                <CardDescription className="text-[10px]">
                  {tasks.filter(t => isTaskSelected(t.id)).length}/{tasks.length} selected
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {tasks.map((task) => {
              const selected = isTaskSelected(task.id);
              const currentRarity = getTaskRarity(task.id) || task.defaultRarity;

              return (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-3 pixel-border hover:bg-accent/5 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-[10px]">{task.name}</h4>
                      <Badge variant="outline" className="text-[8px] px-1 py-0">
                        {task.basePoints}
                      </Badge>
                      {task.supportsDuration && (
                        <Badge variant="secondary" className="text-[8px] px-1 py-0">
                          TIME
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
                          <SelectTrigger className="w-24 pixel-border text-[10px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="pixel-border">
                            <SelectItem value="common" className="text-[10px]">
                              <div className="flex items-center gap-2">
                                <div className="h-2 w-2 bg-[hsl(var(--common))]" />
                                Common
                              </div>
                            </SelectItem>
                            <SelectItem value="uncommon" className="text-[10px]">
                              <div className="flex items-center gap-2">
                                <div className="h-2 w-2 bg-[hsl(var(--uncommon))]" />
                                Uncommon
                              </div>
                            </SelectItem>
                            <SelectItem value="rare" className="text-[10px]">
                              <div className="flex items-center gap-2">
                                <div className="h-2 w-2 bg-[hsl(var(--rare))]" />
                                Rare
                              </div>
                            </SelectItem>
                            <SelectItem value="legendary" className="text-[10px]">
                              <div className="flex items-center gap-2">
                                <div className="h-2 w-2 bg-[hsl(var(--legendary))]" />
                                Legendary
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => onRemoveTask(task.id)}
                          className="h-8 w-8 pixel-border"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </>
                    )}
                    {!selected && (
                      <Button
                        size="sm"
                        onClick={() => onToggleTask(task.id, task.defaultRarity)}
                        className="pixel-border text-[10px]"
                      >
                        <Plus className="h-3 w-3 mr-1" />
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
