'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  TrendingUp, 
  Users, 
  ArrowRightLeft, 
  DollarSign,
  Calendar,
  BarChart3,
  PieChart,
  LineChart
} from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

interface AnalyticsData {
  totalTransfers: number;
  activeTransfers: number;
  completedTransfers: number;
  totalRevenue: number;
  avgTransferValue: number;
  topSkills: Array<{ skill: string; demand: number; avgSalary: number }>;
  monthlyStats: Array<{ month: string; transfers: number; revenue: number }>;
  departmentStats: Array<{ department: string; developers: number; transfers: number }>;
}

// Mock analytics data
const mockAnalyticsData: AnalyticsData = {
  totalTransfers: 127,
  activeTransfers: 23,
  completedTransfers: 104,
  totalRevenue: 2850000,
  avgTransferValue: 22440,
  topSkills: [
    { skill: 'React', demand: 95, avgSalary: 85000 },
    { skill: 'Node.js', demand: 87, avgSalary: 82000 },
    { skill: 'Python', demand: 83, avgSalary: 88000 },
    { skill: 'TypeScript', demand: 79, avgSalary: 86000 },
    { skill: 'AWS', demand: 76, avgSalary: 92000 },
  ],
  monthlyStats: [
    { month: 'Jan', transfers: 12, revenue: 268000 },
    { month: 'Feb', transfers: 15, revenue: 342000 },
    { month: 'Mar', transfers: 18, revenue: 401000 },
    { month: 'Apr', transfers: 14, revenue: 315000 },
    { month: 'May', transfers: 20, revenue: 445000 },
    { month: 'Jun', transfers: 22, revenue: 496000 },
  ],
  departmentStats: [
    { department: 'Frontend', developers: 28, transfers: 45 },
    { department: 'Backend', developers: 32, transfers: 38 },
    { department: 'Full Stack', developers: 24, transfers: 34 },
    { department: 'DevOps', developers: 18, transfers: 10 },
  ],
};

export default function AnalyticsPage() {
  const { currentUser } = useAppStore();
  const [timeRange, setTimeRange] = useState('6months');
  const [selectedMetric, setSelectedMetric] = useState('transfers');

  if (currentUser.role !== 'company') {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="flex items-center justify-center py-8">
            <p className="text-muted-foreground">Analytics are only available for company accounts.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const data = mockAnalyticsData;

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Track your talent acquisition performance and market insights
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">1 Month</SelectItem>
              <SelectItem value="3months">3 Months</SelectItem>
              <SelectItem value="6months">6 Months</SelectItem>
              <SelectItem value="1year">1 Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Transfers</CardTitle>
            <ArrowRightLeft className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalTransfers}</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Transfers</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.activeTransfers}</div>
            <p className="text-xs text-muted-foreground">
              +4 from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${(data.totalRevenue / 1000000).toFixed(1)}M
            </div>
            <p className="text-xs text-muted-foreground">
              +18% from last quarter
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Transfer Value</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${data.avgTransferValue.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              +5% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="skills">Skills Demand</TabsTrigger>
          <TabsTrigger value="trends">Market Trends</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="h-5 w-5" />
                  Transfer Activity
                </CardTitle>
                <CardDescription>
                  Monthly transfer volume over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.monthlyStats.map((stat, index) => (
                    <div key={stat.month} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="text-sm font-medium">{stat.month}</div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge variant="secondary">{stat.transfers} transfers</Badge>
                        <div className="text-sm font-medium">
                          ${(stat.revenue / 1000).toFixed(0)}K
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Transfer Status
                </CardTitle>
                <CardDescription>
                  Current status breakdown
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Completed</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-secondary rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ width: `${(data.completedTransfers / data.totalTransfers) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{data.completedTransfers}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Active</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-secondary rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${(data.activeTransfers / data.totalTransfers) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{data.activeTransfers}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="skills" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Skills in Demand</CardTitle>
              <CardDescription>
                Most requested skills and their market rates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.topSkills.map((skill, index) => (
                  <div key={skill.skill} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="text-lg font-bold text-muted-foreground">
                        #{index + 1}
                      </div>
                      <div>
                        <div className="font-medium">{skill.skill}</div>
                        <div className="text-sm text-muted-foreground">
                          {skill.demand}% demand
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">
                        ${skill.avgSalary.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">avg salary</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Market Trends
              </CardTitle>
              <CardDescription>
                Insights and predictions for the talent market
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <h4 className="font-medium">Growing Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {['AI/ML', 'Blockchain', 'Edge Computing', 'WebAssembly'].map((tech) => (
                      <Badge key={tech} variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        {tech} ↗️
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">High Demand Roles</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Senior Frontend', 'DevOps Engineer', 'Data Scientist', 'Security Expert'].map((role) => (
                      <Badge key={role} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        {role} 🔥
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="departments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Department Statistics</CardTitle>
              <CardDescription>
                Performance breakdown by development teams
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.departmentStats.map((dept) => (
                  <div key={dept.department} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-medium">{dept.department}</div>
                      <div className="text-sm text-muted-foreground">
                        {dept.developers} developers
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{dept.transfers} transfers</div>
                      <div className="text-sm text-muted-foreground">
                        {((dept.transfers / dept.developers) * 100).toFixed(0)}% rate
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
