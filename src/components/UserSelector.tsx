import { useState } from 'react';
import { UserProfile } from '@/types/productivity';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { getAvatarByIndex } from '@/utils/avatars';

interface UserSelectorProps {
  profiles: UserProfile[];
  currentUserId: string | null;
  onSelectUser: (userId: string) => void;
  onCreateUser: (name: string) => void;
}

export const UserSelector = ({ profiles, currentUserId, onSelectUser, onCreateUser }: UserSelectorProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [newUserName, setNewUserName] = useState('');

  const handleCreate = () => {
    if (newUserName.trim()) {
      onCreateUser(newUserName.trim());
      setNewUserName('');
      setIsCreating(false);
    }
  };

  if (profiles.length === 0 || isCreating) {
    return (
      <Card className="w-full max-w-md mx-auto pixel-border pixel-shadow">
        <CardHeader>
          <CardTitle className="text-sm">Create Profile</CardTitle>
          <CardDescription className="text-xs">Start your journey</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Enter name"
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
            autoFocus
            className="pixel-border text-xs"
          />
          <div className="flex gap-2">
            <Button onClick={handleCreate} className="flex-1 pixel-border text-xs">
              Create
            </Button>
            {profiles.length > 0 && (
              <Button variant="outline" onClick={() => setIsCreating(false)} className="pixel-border text-xs">
                Cancel
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {profiles.map((profile) => (
          <Card
            key={profile.id}
            className={`cursor-pointer transition-all pixel-border pixel-shadow hover:translate-y-[-2px] ${
              currentUserId === profile.id ? 'ring-4 ring-accent' : ''
            }`}
            onClick={() => onSelectUser(profile.id)}
          >
            <CardHeader>
              <div className="flex items-center gap-3">
                <Avatar className="h-16 w-16 border-4 border-primary">
                  <AvatarImage 
                    src={getAvatarByIndex(profile.avatarIndex)} 
                    alt={profile.name}
                  />
                  <AvatarFallback className="text-xs">{profile.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-xs">{profile.name}</CardTitle>
                  <CardDescription className="text-[10px]">
                    {profile.selectedTasks.length} tasks
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
        <Card
          className="cursor-pointer transition-all pixel-border pixel-shadow hover:translate-y-[-2px] border-dashed"
          onClick={() => setIsCreating(true)}
        >
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="h-16 w-16 border-4 border-dashed border-muted-foreground flex items-center justify-center">
                <Plus className="h-8 w-8 text-muted-foreground" />
              </div>
              <div>
                <CardTitle className="text-xs">Add Profile</CardTitle>
                <CardDescription className="text-[10px]">New user</CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};
