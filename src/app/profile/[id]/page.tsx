'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  User, 
  Building2,
  MapPin, 
  Mail, 
  Calendar,
  Star,
  TrendingUp,
  Award,
  Code,
  ArrowRightLeft,
  Eye,
  UserPlus,
  ExternalLink,
  Github,
  Linkedin,
  Globe,
  Users,
  DollarSign,
  MessageCircle,
  Share,
  Heart,
  ChevronLeft,
  Verified,
  HandCoins
} from 'lucide-react';
import Link from 'next/link';
import { useAppStore } from '@/store/useAppStore';
import { getDeveloperById, getCompanyById, getTransferRequestsByDeveloper, getTransferRequestsByCompany, getDevelopersByCompany } from '@/data';
import { Developer, Company, Skill } from '@/types';

export default function ProfilePage() {
  const params = useParams();
  const { currentUser } = useAppStore();
  const [activeTab, setActiveTab] = useState('overview');
  const [isFollowing, setIsFollowing] = useState(false);
  
  const profileId = params.id as string;
  
  // Only show developer profiles since companies browse developers for hiring
  const developer = getDeveloperById(profileId);
  
  if (!developer) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Developer Not Found</h1>
          <p className="text-muted-foreground mb-4">The developer profile you're looking for doesn't exist.</p>
          <Button asChild>
            <Link href="/developers">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Developers
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const transferRequests = getTransferRequestsByDeveloper(profileId);

  const getSkillColor = (level: Skill['level']) => {
    switch (level) {
      case 'expert': return 'bg-green-500';
      case 'advanced': return 'bg-blue-500';
      case 'intermediate': return 'bg-yellow-500';
      case 'beginner': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getSkillProgress = (level: Skill['level']) => {
    switch (level) {
      case 'expert': return 100;
      case 'advanced': return 80;
      case 'intermediate': return 60;
      case 'beginner': return 30;
      default: return 0;
    }
  };

  const handleMakeOffer = () => {
    console.log('Make offer for developer:', profileId);
  };

  const handleStartTransfer = () => {
    // Navigate to transfer wizard with pre-selected developer
    window.location.href = `/transfers/new?developerId=${profileId}`;
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  const dev = developer;
    
    return (
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button variant="ghost" className="mb-6" asChild>
          <Link href="/developers">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Developers
          </Link>
        </Button>

        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 mb-6">
            <Avatar className="h-32 w-32">
              <AvatarImage src={dev.avatar} alt={`${dev.firstName} ${dev.lastName}`} />
              <AvatarFallback className="text-4xl">
                {dev.firstName[0]}{dev.lastName[0]}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-bold">
                  {dev.firstName} {dev.lastName}
                </h1>
                <Verified className="h-6 w-6 text-blue-500" />
                <Badge variant={dev.availability === 'available' ? 'default' : 'secondary'}>
                  {dev.availability}
                </Badge>
              </div>
              
              <p className="text-2xl text-muted-foreground mb-4">{dev.title}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {dev.location}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {dev.experience} years experience
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-current text-yellow-500" />
                  {dev.ratings.overall.toFixed(1)} rating
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-4 w-4 fill-current text-green-500" />
                  ${(dev.marketValue.current / 1000).toFixed(0)}k value
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-4 mb-4">
                {dev.socialLinks.github && (
                  <a href={dev.socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground cursor-pointer">
                    <Github className="h-5 w-5" />
                  </a>
                )}
                {dev.socialLinks.linkedin && (
                  <a href={dev.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground cursor-pointer">
                    <Linkedin className="h-5 w-5" />
                  </a>
                )}
                {dev.socialLinks.website && (
                  <a href={dev.socialLinks.website} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground cursor-pointer">
                    <Globe className="h-5 w-5" />
                  </a>
                )}
              </div>
            </div>
            
            <div className="flex flex-col gap-3 lg:items-end">
              <div className="text-right">
                <div className="text-3xl font-bold text-primary">
                  ${(dev.marketValue.current / 1000).toFixed(0)}k
                </div>
                <p className="text-sm text-muted-foreground">Market Value</p>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={handleFollow}
                  className={isFollowing ? 'bg-blue-50 border-blue-200 text-blue-600' : ''}
                >
                  <Heart className={`mr-2 h-4 w-4 ${isFollowing ? 'fill-current' : ''}`} />
                  {isFollowing ? 'Following' : 'Follow'}
                </Button>
                <Button variant="outline" onClick={handleShare}>
                  <Share className="mr-2 h-4 w-4" />
                  Share
                </Button>
                <Button onClick={handleStartTransfer} size="lg">
                  <HandCoins className="mr-2 h-4 w-4" />
                  Make an Offer
                </Button>
                <Button variant="outline" onClick={handleMakeOffer}>
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Negotiate
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bio */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <p className="text-lg leading-relaxed">{dev.bio}</p>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Star className="h-8 w-8 mx-auto mb-2 text-yellow-500 fill-current" />
              <div className="text-2xl font-bold">{dev.ratings.overall.toFixed(1)}</div>
              <div className="text-sm text-muted-foreground">Overall Rating</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Code className="h-8 w-8 mx-auto mb-2 text-blue-500" />
              <div className="text-2xl font-bold">{dev.technicalSkills.length}</div>
              <div className="text-sm text-muted-foreground">Technical Skills</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Award className="h-8 w-8 mx-auto mb-2 text-purple-500" />
              <div className="text-2xl font-bold">{dev.achievements.length}</div>
              <div className="text-sm text-muted-foreground">Achievements</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <ArrowRightLeft className="h-8 w-8 mx-auto mb-2 text-green-500" />
              <div className="text-2xl font-bold">{transferRequests.length}</div>
              <div className="text-sm text-muted-foreground">Transfer Requests</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Skills & Experience</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="insights">Company Insights</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Technical Skills */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5" />
                    Technical Skills
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {dev.technicalSkills.map((skill, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{skill.name}</span>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className={getSkillColor(skill.level)}>
                              {skill.level}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {skill.yearsOfExperience}y
                            </span>
                          </div>
                        </div>
                        <Progress value={getSkillProgress(skill.level)} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Experience & History */}
              <Card>
                <CardHeader>
                  <CardTitle>Experience & History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {dev.currentCompanyId && (
                      <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                          <span className="font-medium">Currently Employed</span>
                        </div>
                        <p className="text-sm text-muted-foreground">Active team member</p>
                      </div>
                    )}
                    
                    {dev.previousCompanies.map((job, index) => (
                      <div key={index} className="border-l-2 border-muted pl-4 pb-4">
                        <h4 className="font-semibold">{job.position}</h4>
                        <p className="text-muted-foreground">{job.companyName}</p>
                        <p className="text-sm text-muted-foreground">
                          {job.startDate.toLocaleDateString()} - {job.endDate?.toLocaleDateString() || 'Present'}
                        </p>
                        <Badge variant="outline" className="mt-2">
                          {job.type}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="achievements" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {dev.achievements.map((achievement) => (
                <Card key={achievement.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Award className="h-5 w-5 text-purple-600" />
                        {achievement.title}
                      </CardTitle>
                      {achievement.verified && (
                        <Badge variant="default" className="bg-green-100 text-green-800 border-green-200">
                          <Verified className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    <CardDescription>
                      {achievement.type.replace('_', ' ').toUpperCase()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {achievement.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {achievement.date.toLocaleDateString()}
                      </span>
                      {achievement.url && (
                        <a
                          href={achievement.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline flex items-center gap-1 text-sm cursor-pointer"
                        >
                          View <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="activity" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Transfer requests and career updates
                </CardDescription>
              </CardHeader>
              <CardContent>
                {transferRequests.length === 0 ? (
                  <div className="text-center py-8">
                    <ArrowRightLeft className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No Recent Activity</h3>
                    <p className="text-muted-foreground">
                      No transfer requests or recent updates to show.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {transferRequests.map((request) => (
                      <div key={request.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant={
                            request.status === 'approved' ? 'default' :
                            request.status === 'rejected' ? 'destructive' :
                            'secondary'
                          }>
                            {request.status}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {request.createdAt.toLocaleDateString()}
                          </span>
                        </div>
                        <p className="font-medium mb-2">
                          {request.type === 'transfer' ? 'Transfer' : 'Loan'} Request
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Proposed salary: ${request.proposedSalary.toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Company Insights Tab */}
          <TabsContent value="insights" className="mt-6">
              <div className="grid gap-6">
                {/* Success Metrics */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Success Metrics
                    </CardTitle>
                    <CardDescription>
                      Key indicators for this developer's performance and reliability
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                        <div className="text-2xl font-bold text-green-600 mb-1">
                          {Math.round(((transferRequests.filter(r => r.status === 'completed' || r.status === 'approved').length || 1) / (transferRequests.length || 1)) * 100)}%
                        </div>
                        <div className="text-sm text-green-700">Success Rate</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Based on completed transfers
                        </div>
                      </div>
                      
                      <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="text-2xl font-bold text-blue-600 mb-1">
                          {dev.previousCompanies.length + (dev.currentCompanyId ? 1 : 0)}
                        </div>
                        <div className="text-sm text-blue-700">Companies</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Career diversity
                        </div>
                      </div>
                      
                      <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                        <div className="text-2xl font-bold text-purple-600 mb-1">
                          {Math.round(dev.experience / (dev.previousCompanies.length + (dev.currentCompanyId ? 1 : 0)) * 10) / 10}
                        </div>
                        <div className="text-sm text-purple-700">Avg Tenure</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Years per company
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Market Analysis */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5" />
                      Market Analysis
                    </CardTitle>
                    <CardDescription>
                      Financial insights and market positioning
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                        <div>
                          <div className="font-medium">Current Market Value</div>
                          <div className="text-sm text-muted-foreground">
                            Based on skills, experience, and performance
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary">
                            ${dev.marketValue.current.toLocaleString()}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Updated {dev.marketValue.lastUpdated.toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                        <div>
                          <div className="font-medium">Suggested Offer Range</div>
                          <div className="text-sm text-muted-foreground">
                            Competitive range for this developer
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold">
                            ${Math.round(dev.marketValue.current * 0.95).toLocaleString()} - ${Math.round(dev.marketValue.current * 1.15).toLocaleString()}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            95% - 115% of market value
                          </div>
                        </div>
                      </div>
                      
                      {dev.salaryExpectation && (
                        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                          <div>
                            <div className="font-medium">Developer's Expectation</div>
                            <div className="text-sm text-muted-foreground">
                              Salary expectation from developer
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold">
                              ${dev.salaryExpectation.toLocaleString()}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {dev.salaryExpectation > dev.marketValue.current ? 'Above' : 'Below'} market value
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Skill Demand Analysis */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Code className="h-5 w-5" />
                      Skill Demand Analysis
                    </CardTitle>
                    <CardDescription>
                      How in-demand are this developer's skills in the current market
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {dev.technicalSkills.slice(0, 6).map((skill, index) => {
                        // Mock demand percentage based on skill popularity
                        const demandPercentage = Math.max(60, 100 - index * 8);
                        return (
                          <div key={skill.name} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Badge variant="outline" className={getSkillColor(skill.level)}>
                                {skill.level}
                              </Badge>
                              <span className="font-medium">{skill.name}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="text-right">
                                <div className="text-sm font-medium">{demandPercentage}% demand</div>
                                <div className="text-xs text-muted-foreground">
                                  {demandPercentage > 80 ? 'High' : demandPercentage > 60 ? 'Medium' : 'Low'} market demand
                                </div>
                              </div>
                              <div className="w-16 bg-muted rounded-full h-2">
                                <div 
                                  className={`h-2 rounded-full ${demandPercentage > 80 ? 'bg-green-500' : demandPercentage > 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                                  style={{ width: `${demandPercentage}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
        </Tabs>
      </div>
    );
}
