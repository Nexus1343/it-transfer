'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Trophy, 
  TrendingUp, 
  Star,
  Award,
  DollarSign,
  ArrowRightLeft,
  Crown,
  Medal,
  Target,
  Users,
  Building2,
  Zap,
  MapPin,
  Eye,
  ChevronRight
} from 'lucide-react';
import { getLeaderboard, mockCompanies, getDeveloperById } from '@/data';
import { LeaderboardEntry } from '@/types';

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState('market_value');
  const [timeRange, setTimeRange] = useState('all_time');

  const leaderboards = {
    market_value: getLeaderboard('market_value'),
    rating: getLeaderboard('rating'),
    achievements: getLeaderboard('achievements'),
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />;
      default:
        return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getRankBadgeVariant = (rank: number) => {
    switch (rank) {
      case 1:
        return "default";
      case 2:
        return "secondary";
      case 3:
        return "outline";
      default:
        return "outline";
    }
  };

  const getMetricIcon = (metric: string) => {
    switch (metric) {
      case 'market_value':
        return <DollarSign className="h-4 w-4" />;
      case 'rating':
        return <Star className="h-4 w-4" />;
      case 'achievements':
        return <Award className="h-4 w-4" />;
      default:
        return <Target className="h-4 w-4" />;
    }
  };

  const formatMetricValue = (metric: string, value: number) => {
    switch (metric) {
      case 'market_value':
        return `$${(value / 1000).toFixed(0)}k`;
      case 'rating':
        return value.toFixed(1);
      case 'achievements':
        return value.toString();
      default:
        return value.toString();
    }
  };

  const renderLeaderboardEntry = (entry: LeaderboardEntry, index: number) => {
    const developer = entry.developer;
    const isTopThree = entry.rank <= 3;

    return (
      <div
        key={entry.developerId}
        className={`flex items-center gap-4 p-4 rounded-lg border transition-all hover:shadow-md ${
          isTopThree ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200' : 'bg-background border-border'
        }`}
      >
        {/* Rank */}
        <div className="flex-shrink-0 w-12 text-center">
          {getRankIcon(entry.rank)}
        </div>

        {/* Avatar */}
        <Avatar className={`${isTopThree ? 'h-14 w-14' : 'h-12 w-12'}`}>
          <AvatarImage src={developer.avatar} alt={`${developer.firstName} ${developer.lastName}`} />
          <AvatarFallback>
            {developer.firstName[0]}{developer.lastName[0]}
          </AvatarFallback>
        </Avatar>

        {/* Developer Info */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className={`font-semibold ${isTopThree ? 'text-lg' : 'text-base'}`}>
              {developer.firstName} {developer.lastName}
            </h3>
            {entry.rank <= 3 && (
              <Badge variant={getRankBadgeVariant(entry.rank)} className="text-xs">
                Top {entry.rank}
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground mb-1">{developer.title}</p>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {developer.location}
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-current text-yellow-500" />
              {developer.ratings.overall.toFixed(1)}
            </div>
            <Badge variant="outline" className="text-xs">
              {developer.availability}
            </Badge>
          </div>
        </div>

        {/* Metric Value */}
        <div className="text-right">
          <div className={`font-bold ${isTopThree ? 'text-xl' : 'text-lg'} text-primary`}>
            {formatMetricValue(entry.metric, entry.value)}
          </div>
          <div className="text-xs text-muted-foreground">
            {entry.metric.replace('_', ' ')}
          </div>
        </div>

        {/* Action */}
        <Button variant="outline" size="sm">
          <Eye className="mr-2 h-4 w-4" />
          View
        </Button>
      </div>
    );
  };

  // Company leaderboard data
  const topCompanies = mockCompanies
    .sort((a, b) => b.stats.totalTransfers - a.stats.totalTransfers)
    .slice(0, 5);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <Trophy className="h-16 w-16 text-yellow-500" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Developer Leaderboard</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Celebrating the top performers in our developer community. 
          Rankings are based on market value, ratings, and achievements.
        </p>
      </div>

      {/* Top Performers Showcase */}
      <Card className="mb-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <Crown className="h-6 w-6 text-yellow-500" />
            Hall of Fame
          </CardTitle>
          <CardDescription>Our top 3 developers across all categories</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {leaderboards.market_value.slice(0, 3).map((entry, index) => {
              const developer = entry.developer;
              const position = index + 1;
              return (
                <Card key={entry.developerId} className={`text-center ${
                  position === 1 ? 'ring-2 ring-yellow-400 bg-gradient-to-br from-yellow-50 to-orange-50' :
                  position === 2 ? 'ring-2 ring-gray-300 bg-gradient-to-br from-gray-50 to-slate-50' :
                  'ring-2 ring-amber-300 bg-gradient-to-br from-amber-50 to-yellow-50'
                }`}>
                  <CardContent className="p-6">
                    <div className="mb-4">
                      {getRankIcon(position)}
                    </div>
                    <Avatar className="h-16 w-16 mx-auto mb-4">
                      <AvatarImage src={developer.avatar} alt={`${developer.firstName} ${developer.lastName}`} />
                      <AvatarFallback className="text-lg">
                        {developer.firstName[0]}{developer.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="font-bold text-lg mb-1">
                      {developer.firstName} {developer.lastName}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">{developer.title}</p>
                    <div className="text-2xl font-bold text-primary mb-2">
                      ${(developer.marketValue.current / 1000).toFixed(0)}k
                    </div>
                    <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
                      <Star className="h-4 w-4 fill-current text-yellow-500" />
                      {developer.ratings.overall.toFixed(1)} rating
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Leaderboard Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <TabsList className="grid w-full md:w-auto grid-cols-3">
            <TabsTrigger value="market_value" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Market Value
            </TabsTrigger>
            <TabsTrigger value="rating" className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              Rating
            </TabsTrigger>
            <TabsTrigger value="achievements" className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              Achievements
            </TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Time Range:</span>
            <Button
              variant={timeRange === 'all_time' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeRange('all_time')}
            >
              All Time
            </Button>
            <Button
              variant={timeRange === 'this_year' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeRange('this_year')}
            >
              This Year
            </Button>
          </div>
        </div>

        <TabsContent value="market_value">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                Market Value Leaders
              </CardTitle>
              <CardDescription>
                Developers ranked by current market value and earning potential
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {leaderboards.market_value.map((entry, index) => renderLeaderboardEntry(entry, index))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rating">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                Top Rated Developers
              </CardTitle>
              <CardDescription>
                Developers with the highest overall performance ratings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {leaderboards.rating.map((entry, index) => renderLeaderboardEntry(entry, index))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-purple-600" />
                Achievement Leaders
              </CardTitle>
              <CardDescription>
                Developers with the most verified achievements and recognitions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {leaderboards.achievements.map((entry, index) => renderLeaderboardEntry(entry, index))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Company Leaderboard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-blue-600" />
            Top Companies
          </CardTitle>
          <CardDescription>
            Most active companies in the transfer market
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topCompanies.map((company, index) => (
              <div key={company.id} className="flex items-center gap-4 p-4 rounded-lg border hover:shadow-md transition-shadow">
                <div className="flex-shrink-0 w-8 text-center">
                  <span className="text-lg font-bold text-muted-foreground">#{index + 1}</span>
                </div>

                <Avatar className="h-12 w-12">
                  <AvatarImage src={company.logo} alt={company.name} />
                  <AvatarFallback>
                    {company.name.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <h3 className="font-semibold">{company.name}</h3>
                  <p className="text-sm text-muted-foreground">{company.industry}</p>
                  <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {company.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {company.employees.length} employees
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-current text-yellow-500" />
                      {company.stats.averageRating.toFixed(1)}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-lg font-bold text-primary">
                    {company.stats.totalTransfers}
                  </div>
                  <div className="text-xs text-muted-foreground">Transfers</div>
                </div>

                <Button variant="outline" size="sm">
                  <Eye className="mr-2 h-4 w-4" />
                  View
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <CardContent className="p-8 text-center">
          <Zap className="h-12 w-12 mx-auto mb-4 text-yellow-300" />
          <h2 className="text-2xl font-bold mb-4">Ready to Climb the Rankings?</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Improve your skills, complete projects, and build your reputation to climb the leaderboard. 
            The top developers get the best opportunities and highest market values.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg">
              <TrendingUp className="mr-2 h-5 w-5" />
              Improve Your Ranking
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
              <ArrowRightLeft className="mr-2 h-5 w-5" />
              Browse Opportunities
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
