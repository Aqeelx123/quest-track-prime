import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format, parseISO } from 'date-fns';

interface AnalyticsProps {
  weeklyData: any[];
  monthlyData: any[];
}

export const Analytics = ({ weeklyData, monthlyData }: AnalyticsProps) => {
  const formatWeeklyData = weeklyData.map(d => ({
    ...d,
    name: format(parseISO(d.date), 'EEE'),
  }));

  const formatMonthlyData = monthlyData
    .filter((_, i) => i % 3 === 0) // Show every 3rd day for readability
    .map(d => ({
      ...d,
      name: format(parseISO(d.date), 'MMM d'),
    }));

  return (
    <Card className="pixel-border pixel-shadow">
      <CardHeader>
        <CardTitle className="text-sm">ANALYTICS</CardTitle>
        <CardDescription className="text-[10px]">Productivity over time</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="week">
          <TabsList className="grid w-full grid-cols-2 pixel-border">
            <TabsTrigger value="week" className="text-[10px]">7 Days</TabsTrigger>
            <TabsTrigger value="month" className="text-[10px]">30 Days</TabsTrigger>
          </TabsList>
          
          <TabsContent value="week" className="space-y-4">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={formatWeeklyData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis dataKey="name" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="productivityScore" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    name="Score (%)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={formatWeeklyData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis dataKey="name" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip />
                  <Bar 
                    dataKey="totalPoints" 
                    fill="hsl(var(--uncommon))" 
                    name="Points"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="month" className="space-y-4">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={formatMonthlyData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis dataKey="name" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="productivityScore" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    name="Score (%)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={formatMonthlyData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis dataKey="name" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip />
                  <Bar 
                    dataKey="totalPoints" 
                    fill="hsl(var(--uncommon))" 
                    name="Points"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
