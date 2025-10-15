import { useState } from 'react';
import { UserProfile } from '@/types/productivity';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Plus, User } from 'lucide-react';

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
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Create Your Profile</CardTitle>
          <CardDescription>Start tracking your productivity journey</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Enter your name"
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
            autoFocus
          />
          <div className="flex gap-2">
            <Button onClick={handleCreate} className="flex-1">
              Create Profile
            </Button>
            {profiles.length > 0 && (
              <Button variant="outline" onClick={() => setIsCreating(false)}>
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
            className={`cursor-pointer transition-all hover:shadow-md ${
              currentUserId === profile.id ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => onSelectUser(profile.id)}
          >
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">{profile.name}</CardTitle>
                  <CardDescription>
                    {profile.selectedTasks.length} tasks configured
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
        <Card
          className="cursor-pointer transition-all hover:shadow-md border-dashed"
          onClick={() => setIsCreating(true)}
        >
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                <Plus className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <CardTitle className="text-lg">Add Profile</CardTitle>
                <CardDescription>Create a new user</CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};
