import avatar1 from '@/assets/avatars/avatar-1.png';
import avatar2 from '@/assets/avatars/avatar-2.png';
import avatar3 from '@/assets/avatars/avatar-3.png';
import avatar4 from '@/assets/avatars/avatar-4.png';
import avatar5 from '@/assets/avatars/avatar-5.png';
import avatar6 from '@/assets/avatars/avatar-6.png';

export const AVATARS = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6];

export const getRandomAvatar = (): string => {
  const randomIndex = Math.floor(Math.random() * AVATARS.length);
  return AVATARS[randomIndex];
};

export const getAvatarByIndex = (index: number): string => {
  return AVATARS[index % AVATARS.length];
};
