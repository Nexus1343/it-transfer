'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Newspaper, 
  TrendingUp, 
  ArrowRightLeft,
  Building2,
  User,
  Award,
  Zap,
  Clock,
  Search,
  Filter,
  Eye,
  MessageCircle,
  Share,
  Heart,
  ExternalLink,
  Star,
  Calendar
} from 'lucide-react';
import { mockNews, getDeveloperById, getCompanyById } from '@/data';
import { NewsItem } from '@/types';

export default function NewsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [timeFilter, setTimeFilter] = useState<string>('all_time');

  // Filter news
  const filteredNews = mockNews.filter((news) => {
    const matchesSearch = searchTerm === '' || 
      news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      news.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = typeFilter === 'all' || news.type === typeFilter;
    
    const matchesTime = timeFilter === 'all_time' || 
      (timeFilter === 'this_week' && news.timestamp > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) ||
      (timeFilter === 'this_month' && news.timestamp > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000));

    return matchesSearch && matchesType && matchesTime;
  });

  // Sort by timestamp (newest first)
  const sortedNews = [...filteredNews].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

  const getNewsIcon = (type: NewsItem['type']) => {
    switch (type) {
      case 'transfer_completed':
        return <ArrowRightLeft className="h-5 w-5 text-green-600" />;
      case 'transfer_rumor':
        return <MessageCircle className="h-5 w-5 text-blue-600" />;
      case 'new_developer':
        return <User className="h-5 w-5 text-purple-600" />;
      case 'company_joined':
        return <Building2 className="h-5 w-5 text-indigo-600" />;
      case 'achievement':
        return <Award className="h-5 w-5 text-yellow-600" />;
      case 'market_update':
        return <TrendingUp className="h-5 w-5 text-orange-600" />;
      default:
        return <Newspaper className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getNewsTypeLabel = (type: NewsItem['type']) => {
    switch (type) {
      case 'transfer_completed':
        return 'Transfer Complete';
      case 'transfer_rumor':
        return 'Transfer Rumor';
      case 'new_developer':
        return 'New Developer';
      case 'company_joined':
        return 'Company Joined';
      case 'achievement':
        return 'Achievement';
      case 'market_update':
        return 'Market Update';
      default:
        return 'News';
    }
  };

  const getRelativeTime = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return timestamp.toLocaleDateString();
  };

  const renderNewsCard = (news: NewsItem, featured = false) => {
    const developer = news.relatedDeveloperId ? getDeveloperById(news.relatedDeveloperId) : null;
    const company = news.relatedCompanyId ? getCompanyById(news.relatedCompanyId) : null;

    return (
      <Card key={news.id} className={`hover:shadow-md transition-all ${featured ? 'ring-2 ring-primary/20 bg-primary/5' : ''}`}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              {getNewsIcon(news.type)}
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant={featured ? 'default' : 'secondary'}>
                    {getNewsTypeLabel(news.type)}
                  </Badge>
                  {featured && (
                    <Badge variant="destructive" className="text-xs">
                      <Star className="h-3 w-3 mr-1" />
                      Featured
                    </Badge>
                  )}
                </div>
                <h3 className={`font-semibold ${featured ? 'text-lg' : ''}`}>
                  {news.title}
                </h3>
              </div>
            </div>
            <div className="text-right text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {getRelativeTime(news.timestamp)}
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-0">
          <p className="text-muted-foreground mb-4 leading-relaxed">
            {news.description}
          </p>
          
          {/* Related People/Companies */}
          {(developer || company) && (
            <div className="flex items-center gap-4 mb-4 p-3 bg-muted/50 rounded-lg">
              {developer && (
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={developer.avatar} alt={`${developer.firstName} ${developer.lastName}`} />
                    <AvatarFallback className="text-xs">
                      {developer.firstName[0]}{developer.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">{developer.firstName} {developer.lastName}</p>
                    <p className="text-xs text-muted-foreground">{developer.title}</p>
                  </div>
                </div>
              )}
              
              {developer && company && (
                <ArrowRightLeft className="h-4 w-4 text-muted-foreground" />
              )}
              
              {company && (
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={company.logo} alt={company.name} />
                    <AvatarFallback className="text-xs">
                      {company.name.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">{company.name}</p>
                    <p className="text-xs text-muted-foreground">{company.industry}</p>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {/* Actions */}
          <div className="flex items-center justify-between pt-3 border-t">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <Button variant="ghost" size="sm" className="h-8 px-2">
                <Heart className="h-4 w-4 mr-1" />
                24
              </Button>
              <Button variant="ghost" size="sm" className="h-8 px-2">
                <MessageCircle className="h-4 w-4 mr-1" />
                8
              </Button>
              <Button variant="ghost" size="sm" className="h-8 px-2">
                <Share className="h-4 w-4 mr-1" />
                Share
              </Button>
            </div>
            
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-2" />
              Read More
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  const featuredNews = sortedNews.filter(news => news.featured);
  const regularNews = sortedNews.filter(news => !news.featured);

  const newsTypeCounts = {
    all: mockNews.length,
    transfer_completed: mockNews.filter(n => n.type === 'transfer_completed').length,
    transfer_rumor: mockNews.filter(n => n.type === 'transfer_rumor').length,
    achievement: mockNews.filter(n => n.type === 'achievement').length,
    market_update: mockNews.filter(n => n.type === 'market_update').length,
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <Newspaper className="h-16 w-16 text-primary" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Transfer Market News</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Stay updated with the latest transfers, achievements, and market trends in the developer community.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4 text-center">
            <ArrowRightLeft className="h-8 w-8 mx-auto mb-2 text-green-600" />
            <div className="text-2xl font-bold">{newsTypeCounts.transfer_completed}</div>
            <div className="text-xs text-muted-foreground">Completed Transfers</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <MessageCircle className="h-8 w-8 mx-auto mb-2 text-blue-600" />
            <div className="text-2xl font-bold">{newsTypeCounts.transfer_rumor}</div>
            <div className="text-xs text-muted-foreground">Transfer Rumors</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Award className="h-8 w-8 mx-auto mb-2 text-yellow-600" />
            <div className="text-2xl font-bold">{newsTypeCounts.achievement}</div>
            <div className="text-xs text-muted-foreground">Achievements</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-8 w-8 mx-auto mb-2 text-orange-600" />
            <div className="text-2xl font-bold">{newsTypeCounts.market_update}</div>
            <div className="text-xs text-muted-foreground">Market Updates</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filter News
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search news..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">News Type</label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All News</SelectItem>
                  <SelectItem value="transfer_completed">Transfer Completed</SelectItem>
                  <SelectItem value="transfer_rumor">Transfer Rumors</SelectItem>
                  <SelectItem value="achievement">Achievements</SelectItem>
                  <SelectItem value="market_update">Market Updates</SelectItem>
                  <SelectItem value="new_developer">New Developers</SelectItem>
                  <SelectItem value="company_joined">Companies Joined</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Time Period</label>
              <Select value={timeFilter} onValueChange={setTimeFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all_time">All Time</SelectItem>
                  <SelectItem value="this_week">This Week</SelectItem>
                  <SelectItem value="this_month">This Month</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Featured News */}
      {featuredNews.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Star className="h-6 w-6 text-yellow-500" />
            Featured Stories
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {featuredNews.slice(0, 2).map((news) => renderNewsCard(news, true))}
          </div>
        </div>
      )}

      {/* Regular News */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Latest Updates</h2>
          <div className="text-sm text-muted-foreground">
            {sortedNews.length} article{sortedNews.length !== 1 ? 's' : ''} found
          </div>
        </div>
        
        {sortedNews.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Newspaper className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No News Found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search criteria or filters to find more articles.
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm('');
                  setTypeFilter('all');
                  setTimeFilter('all_time');
                }}
              >
                Clear All Filters
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {regularNews.map((news) => renderNewsCard(news))}
          </div>
        )}
      </div>

      {/* Newsletter Signup */}
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <CardContent className="p-8 text-center">
          <Zap className="h-12 w-12 mx-auto mb-4 text-yellow-300" />
          <h2 className="text-2xl font-bold mb-4">Never Miss a Story</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Get the latest transfer news, market updates, and developer achievements delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Input 
              placeholder="Enter your email" 
              className="bg-white text-black"
            />
            <Button variant="secondary" size="lg">
              Subscribe
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
