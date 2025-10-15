import { TaskLog, DailyStats, calculateProductivityScore, calculateTaskPoints } from '@/types/productivity';
import { PREDEFINED_TASKS } from '@/data/predefinedTasks';
import { getTaskLogsForUser } from './storage';
import { startOfDay, format, subDays, parseISO, differenceInDays } from 'date-fns';

export const calculateStreak = (userId: string, date: Date): number => {
  let streak = 0;
  let checkDate = startOfDay(date);
  
  while (true) {
    const dateStr = format(checkDate, 'yyyy-MM-dd');
    const logs = getTaskLogsForUser(userId, dateStr, dateStr);
    
    if (logs.length === 0) break;
    
    streak++;
    checkDate = subDays(checkDate, 1);
  }
  
  return streak;
};

export const calculateDailyStats = (userId: string, date: Date): DailyStats => {
  const dateStr = format(date, 'yyyy-MM-dd');
  const logs = getTaskLogsForUser(userId, dateStr, dateStr);
  
  const totalPoints = logs.reduce((sum, log) => sum + log.pointsEarned, 0);
  const productivityScore = calculateProductivityScore(totalPoints);
  const tasksCompleted = logs.length;
  
  const categories = new Set(
    logs.map(log => {
      const task = PREDEFINED_TASKS.find(t => t.id === log.taskId);
      return task?.category;
    }).filter(Boolean)
  );
  
  const streak = calculateStreak(userId, date);
  
  return {
    date: dateStr,
    totalPoints,
    productivityScore,
    tasksCompleted,
    categoriesActive: categories.size,
    streak,
  };
};

export const getWeeklyStats = (userId: string, endDate: Date) => {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const date = subDays(endDate, i);
    const stats = calculateDailyStats(userId, date);
    days.push({ date: format(date, 'yyyy-MM-dd'), ...stats });
  }
  return days;
};

export const getMonthlyStats = (userId: string, endDate: Date) => {
  const days = [];
  for (let i = 29; i >= 0; i--) {
    const date = subDays(endDate, i);
    const stats = calculateDailyStats(userId, date);
    days.push({ date: format(date, 'yyyy-MM-dd'), ...stats });
  }
  return days;
};

export const getCategoryBreakdown = (userId: string, date: Date) => {
  const dateStr = format(date, 'yyyy-MM-dd');
  const logs = getTaskLogsForUser(userId, dateStr, dateStr);
  
  const breakdown: Record<string, number> = {};
  
  logs.forEach(log => {
    const task = PREDEFINED_TASKS.find(t => t.id === log.taskId);
    if (task) {
      breakdown[task.category] = (breakdown[task.category] || 0) + log.pointsEarned;
    }
  });
  
  return Object.entries(breakdown).map(([category, points]) => ({
    category,
    points,
  }));
};
