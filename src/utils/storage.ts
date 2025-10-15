import { UserProfile, TaskLog, DailyStats } from '@/types/productivity';

const STORAGE_KEYS = {
  PROFILES: 'productivity_profiles',
  CURRENT_USER: 'productivity_current_user',
  TASK_LOGS: 'productivity_task_logs',
  DAILY_STATS: 'productivity_daily_stats',
} as const;

// User Profile Management
export const saveProfiles = (profiles: UserProfile[]): void => {
  localStorage.setItem(STORAGE_KEYS.PROFILES, JSON.stringify(profiles));
};

export const loadProfiles = (): UserProfile[] => {
  const data = localStorage.getItem(STORAGE_KEYS.PROFILES);
  return data ? JSON.parse(data) : [];
};

export const setCurrentUser = (userId: string): void => {
  localStorage.setItem(STORAGE_KEYS.CURRENT_USER, userId);
};

export const getCurrentUserId = (): string | null => {
  return localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
};

// Task Logs
export const saveTaskLogs = (logs: TaskLog[]): void => {
  localStorage.setItem(STORAGE_KEYS.TASK_LOGS, JSON.stringify(logs));
};

export const loadTaskLogs = (): TaskLog[] => {
  const data = localStorage.getItem(STORAGE_KEYS.TASK_LOGS);
  return data ? JSON.parse(data) : [];
};

export const addTaskLog = (log: TaskLog): void => {
  const logs = loadTaskLogs();
  logs.push(log);
  saveTaskLogs(logs);
};

export const getTaskLogsForUser = (userId: string, startDate?: string, endDate?: string): TaskLog[] => {
  const logs = loadTaskLogs();
  return logs.filter(log => {
    if (log.userId !== userId) return false;
    if (startDate && log.completedAt < startDate) return false;
    if (endDate && log.completedAt > endDate) return false;
    return true;
  });
};

// Daily Stats
export const saveDailyStats = (stats: DailyStats[]): void => {
  localStorage.setItem(STORAGE_KEYS.DAILY_STATS, JSON.stringify(stats));
};

export const loadDailyStats = (): DailyStats[] => {
  const data = localStorage.getItem(STORAGE_KEYS.DAILY_STATS);
  return data ? JSON.parse(data) : [];
};

export const getDailyStatsForUser = (userId: string, dateStr: string): DailyStats | null => {
  const allStats = loadDailyStats();
  return allStats.find(s => s.date === `${userId}_${dateStr}`) || null;
};

export const updateDailyStats = (userId: string, dateStr: string, stats: Omit<DailyStats, 'date'>): void => {
  const allStats = loadDailyStats();
  const key = `${userId}_${dateStr}`;
  const index = allStats.findIndex(s => s.date === key);
  
  const newStats: DailyStats = { ...stats, date: key };
  
  if (index >= 0) {
    allStats[index] = newStats;
  } else {
    allStats.push(newStats);
  }
  
  saveDailyStats(allStats);
};
