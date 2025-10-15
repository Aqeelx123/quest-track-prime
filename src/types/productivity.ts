export type Rarity = 'common' | 'uncommon' | 'rare' | 'legendary';

export type Category = 'Learning' | 'Fitness' | 'Creativity' | 'Wellness' | 'Productivity' | 'Social';

export interface Task {
  id: string;
  name: string;
  category: Category;
  basePoints: number;
  defaultRarity: Rarity;
  supportsDuration: boolean;
}

export interface UserTask {
  taskId: string;
  customRarity: Rarity;
}

export interface UserProfile {
  id: string;
  name: string;
  selectedTasks: UserTask[];
  createdAt: string;
}

export interface TaskLog {
  id: string;
  userId: string;
  taskId: string;
  completedAt: string; // ISO date string
  duration?: number; // in minutes
  rarity: Rarity;
  pointsEarned: number;
}

export interface DailyStats {
  date: string;
  totalPoints: number;
  productivityScore: number; // 0-100
  tasksCompleted: number;
  categoriesActive: number;
  streak: number;
}

// Rarity multipliers
export const RARITY_MULTIPLIERS: Record<Rarity, number> = {
  common: 1,
  uncommon: 1.5,
  rare: 2,
  legendary: 3,
};

// Duration multiplier: 1 + (duration_in_hours * 0.2)
// Example: 30 min = 1.1x, 60 min = 1.2x, 2 hours = 1.4x
export const calculateDurationMultiplier = (durationMinutes?: number): number => {
  if (!durationMinutes || durationMinutes <= 0) return 1;
  return 1 + ((durationMinutes / 60) * 0.2);
};

// Streak bonus: 1 + (streak_days * 0.05), capped at 1.5x
export const calculateStreakMultiplier = (streakDays: number): number => {
  const multiplier = 1 + (streakDays * 0.05);
  return Math.min(multiplier, 1.5);
};

// Main points calculation formula:
// points = basePoints * rarityMultiplier * durationMultiplier * streakMultiplier
export const calculateTaskPoints = (
  basePoints: number,
  rarity: Rarity,
  durationMinutes?: number,
  streakDays: number = 0
): number => {
  const rarityMultiplier = RARITY_MULTIPLIERS[rarity];
  const durationMultiplier = calculateDurationMultiplier(durationMinutes);
  const streakMultiplier = calculateStreakMultiplier(streakDays);
  
  return Math.round(basePoints * rarityMultiplier * durationMultiplier * streakMultiplier);
};

// Daily productivity score (0-100 scale)
// Based on total points vs. expected daily target
// Target: 500 points = 100% productivity
export const DAILY_TARGET_POINTS = 500;

export const calculateProductivityScore = (totalPoints: number): number => {
  const score = (totalPoints / DAILY_TARGET_POINTS) * 100;
  return Math.min(Math.round(score), 100);
};
