import { Task } from '@/types/productivity';

export const PREDEFINED_TASKS: Task[] = [
  // Learning
  {
    id: 'coding',
    name: 'Coding/Programming',
    category: 'Learning',
    basePoints: 100,
    defaultRarity: 'uncommon',
    supportsDuration: true,
  },
  {
    id: 'reading',
    name: 'Reading (Books/Articles)',
    category: 'Learning',
    basePoints: 80,
    defaultRarity: 'common',
    supportsDuration: true,
  },
  {
    id: 'online-course',
    name: 'Online Course/Tutorial',
    category: 'Learning',
    basePoints: 90,
    defaultRarity: 'uncommon',
    supportsDuration: true,
  },
  {
    id: 'language-learning',
    name: 'Language Learning',
    category: 'Learning',
    basePoints: 85,
    defaultRarity: 'uncommon',
    supportsDuration: true,
  },
  
  // Fitness
  {
    id: 'exercise',
    name: 'Exercise/Workout',
    category: 'Fitness',
    basePoints: 120,
    defaultRarity: 'rare',
    supportsDuration: true,
  },
  {
    id: 'running',
    name: 'Running/Jogging',
    category: 'Fitness',
    basePoints: 110,
    defaultRarity: 'uncommon',
    supportsDuration: true,
  },
  {
    id: 'yoga',
    name: 'Yoga/Stretching',
    category: 'Fitness',
    basePoints: 90,
    defaultRarity: 'uncommon',
    supportsDuration: true,
  },
  
  // Creativity
  {
    id: 'drawing',
    name: 'Drawing/Painting',
    category: 'Creativity',
    basePoints: 95,
    defaultRarity: 'uncommon',
    supportsDuration: true,
  },
  {
    id: 'music-practice',
    name: 'Music Practice',
    category: 'Creativity',
    basePoints: 100,
    defaultRarity: 'rare',
    supportsDuration: true,
  },
  {
    id: 'writing',
    name: 'Creative Writing',
    category: 'Creativity',
    basePoints: 90,
    defaultRarity: 'uncommon',
    supportsDuration: true,
  },
  
  // Wellness
  {
    id: 'meditation',
    name: 'Meditation',
    category: 'Wellness',
    basePoints: 70,
    defaultRarity: 'common',
    supportsDuration: true,
  },
  {
    id: 'journaling',
    name: 'Journaling',
    category: 'Wellness',
    basePoints: 60,
    defaultRarity: 'common',
    supportsDuration: false,
  },
  {
    id: 'meal-prep',
    name: 'Healthy Meal Prep',
    category: 'Wellness',
    basePoints: 80,
    defaultRarity: 'uncommon',
    supportsDuration: false,
  },
  
  // Productivity
  {
    id: 'cleaning',
    name: 'Cleaning/Organizing',
    category: 'Productivity',
    basePoints: 75,
    defaultRarity: 'common',
    supportsDuration: true,
  },
  {
    id: 'planning',
    name: 'Planning/Goal Setting',
    category: 'Productivity',
    basePoints: 65,
    defaultRarity: 'common',
    supportsDuration: false,
  },
  {
    id: 'deep-work',
    name: 'Deep Work Session',
    category: 'Productivity',
    basePoints: 150,
    defaultRarity: 'legendary',
    supportsDuration: true,
  },
  
  // Social
  {
    id: 'networking',
    name: 'Professional Networking',
    category: 'Social',
    basePoints: 85,
    defaultRarity: 'uncommon',
    supportsDuration: false,
  },
  {
    id: 'mentoring',
    name: 'Mentoring/Teaching Others',
    category: 'Social',
    basePoints: 110,
    defaultRarity: 'rare',
    supportsDuration: true,
  },
];
