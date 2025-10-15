import learningIcon from '@/assets/icons/learning.png';
import fitnessIcon from '@/assets/icons/fitness.png';
import wellnessIcon from '@/assets/icons/wellness.png';
import creativityIcon from '@/assets/icons/creativity.png';
import productivityIcon from '@/assets/icons/productivity.png';
import lifeSkillsIcon from '@/assets/icons/life-skills.png';
import socialIcon from '@/assets/icons/social.png';
import culturalIcon from '@/assets/icons/cultural.png';

export const CATEGORY_ICONS: Record<string, string> = {
  'Learning': learningIcon,
  'Fitness': fitnessIcon,
  'Wellness': wellnessIcon,
  'Creativity': creativityIcon,
  'Productivity': productivityIcon,
  'Life Skills': lifeSkillsIcon,
  'Social': socialIcon,
  'Cultural Consumption': culturalIcon,
};

export const getCategoryIcon = (category: string): string => {
  return CATEGORY_ICONS[category] || learningIcon;
};
