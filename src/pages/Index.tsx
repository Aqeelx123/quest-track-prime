import { useState, useEffect } from 'react';
import { UserProfile, TaskLog, calculateTaskPoints } from '@/types/productivity';
import { PREDEFINED_TASKS } from '@/data/predefinedTasks';
import {
  loadProfiles,
  saveProfiles,
  getCurrentUserId,
  setCurrentUser,
  addTaskLog,
  getTaskLogsForUser,
} from '@/utils/storage';
import { calculateDailyStats, getWeeklyStats, getMonthlyStats, getCategoryBreakdown } from '@/utils/productivityCalculations';
import { UserSelector } from '@/components/UserSelector';
import { TaskLibrary } from '@/components/TaskLibrary';
import { DailyTracker } from '@/components/DailyTracker';
import { ProductivityDashboard } from '@/components/ProductivityDashboard';
import { Analytics } from '@/components/Analytics';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, BarChart3, CheckSquare, Library } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';

const Index = () => {
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('today');

  useEffect(() => {
    const loadedProfiles = loadProfiles();
    setProfiles(loadedProfiles);
    
    const savedUserId = getCurrentUserId();
    if (savedUserId && loadedProfiles.find(p => p.id === savedUserId)) {
      setCurrentUserId(savedUserId);
    }
  }, []);

  const currentUser = profiles.find(p => p.id === currentUserId);

  const handleCreateUser = (name: string) => {
    const newProfile: UserProfile = {
      id: `user_${Date.now()}`,
      name,
      avatarIndex: Math.floor(Math.random() * 6),
      selectedTasks: [],
      createdAt: new Date().toISOString(),
    };
    
    const updatedProfiles = [...profiles, newProfile];
    setProfiles(updatedProfiles);
    saveProfiles(updatedProfiles);
    setCurrentUserId(newProfile.id);
    setCurrentUser(newProfile.id);
    toast.success(`Welcome, ${name}!`);
  };

  const handleSelectUser = (userId: string) => {
    setCurrentUserId(userId);
    setCurrentUser(userId);
    const user = profiles.find(p => p.id === userId);
    toast.success(`Switched to ${user?.name}`);
  };

  const handleToggleTask = (taskId: string, rarity: any) => {
    if (!currentUser) return;

    const updatedUser = { ...currentUser };
    const existingIndex = updatedUser.selectedTasks.findIndex(t => t.taskId === taskId);

    if (existingIndex >= 0) {
      updatedUser.selectedTasks[existingIndex].customRarity = rarity;
    } else {
      updatedUser.selectedTasks.push({ taskId, customRarity: rarity });
    }

    const updatedProfiles = profiles.map(p => p.id === currentUser.id ? updatedUser : p);
    setProfiles(updatedProfiles);
    saveProfiles(updatedProfiles);
    
    const task = PREDEFINED_TASKS.find(t => t.id === taskId);
    toast.success(`${task?.name} set to ${rarity}`);
  };

  const handleRemoveTask = (taskId: string) => {
    if (!currentUser) return;

    const updatedUser = { ...currentUser };
    updatedUser.selectedTasks = updatedUser.selectedTasks.filter(t => t.taskId !== taskId);

    const updatedProfiles = profiles.map(p => p.id === currentUser.id ? updatedUser : p);
    setProfiles(updatedProfiles);
    saveProfiles(updatedProfiles);
    
    const task = PREDEFINED_TASKS.find(t => t.id === taskId);
    toast.success(`${task?.name} removed`);
  };

  const handleCompleteTask = (taskId: string, duration?: number) => {
    if (!currentUser) return;

    const userTask = currentUser.selectedTasks.find(t => t.taskId === taskId);
    if (!userTask) return;

    const task = PREDEFINED_TASKS.find(t => t.id === taskId);
    if (!task) return;

    const today = new Date();
    const dailyStats = calculateDailyStats(currentUser.id, today);
    const streak = dailyStats.streak;

    const points = calculateTaskPoints(
      task.basePoints,
      userTask.customRarity,
      duration,
      streak
    );

    const log: TaskLog = {
      id: `log_${Date.now()}`,
      userId: currentUser.id,
      taskId,
      completedAt: new Date().toISOString(),
      duration,
      rarity: userTask.customRarity,
      pointsEarned: points,
    };

    addTaskLog(log);
    
    toast.success(
      `${task.name} completed! +${points} points`,
      {
        description: duration ? `Duration: ${duration}min | Streak: ${streak} days` : `Streak: ${streak} days`,
      }
    );
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-lg mb-4">PRODUCTIVITY<br/>TRACKER</h1>
            <p className="text-muted-foreground text-[10px]">TRACK YOUR PROGRESS</p>
          </div>
          <UserSelector
            profiles={profiles}
            currentUserId={currentUserId}
            onSelectUser={handleSelectUser}
            onCreateUser={handleCreateUser}
          />
        </div>
      </div>
    );
  }

  const today = new Date();
  const todayLogs = getTaskLogsForUser(currentUser.id, format(today, 'yyyy-MM-dd'), format(today, 'yyyy-MM-dd'));
  const dailyStats = calculateDailyStats(currentUser.id, today);
  const weeklyData = getWeeklyStats(currentUser.id, today);
  const monthlyData = getMonthlyStats(currentUser.id, today);
  const categoryBreakdown = getCategoryBreakdown(currentUser.id, today);

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b-4 border-primary pixel-shadow">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-sm">TRACKER</h1>
              <p className="text-[10px] text-muted-foreground">Player: {currentUser.name}</p>
            </div>
            <Button
              variant="outline"
              onClick={() => setCurrentUserId(null)}
              className="pixel-border text-[10px]"
            >
              <Settings className="h-3 w-3 mr-1" />
              Switch
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-6 pixel-border">
            <TabsTrigger value="today" className="text-[10px]">
              <CheckSquare className="h-3 w-3 mr-1" />
              Today
            </TabsTrigger>
            <TabsTrigger value="analytics" className="text-[10px]">
              <BarChart3 className="h-3 w-3 mr-1" />
              Stats
            </TabsTrigger>
            <TabsTrigger value="tasks" className="text-[10px]">
              <Library className="h-3 w-3 mr-1" />
              Tasks
            </TabsTrigger>
          </TabsList>

          <TabsContent value="today" className="space-y-6">
            <ProductivityDashboard stats={dailyStats} categoryBreakdown={categoryBreakdown} />
            <DailyTracker
              user={currentUser}
              todayLogs={todayLogs}
              currentStreak={dailyStats.streak}
              onCompleteTask={handleCompleteTask}
            />
          </TabsContent>

          <TabsContent value="analytics">
            <Analytics weeklyData={weeklyData} monthlyData={monthlyData} />
          </TabsContent>

          <TabsContent value="tasks">
            <TaskLibrary
              selectedTasks={currentUser.selectedTasks}
              onToggleTask={handleToggleTask}
              onRemoveTask={handleRemoveTask}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
