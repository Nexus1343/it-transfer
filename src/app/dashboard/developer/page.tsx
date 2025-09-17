'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  User, 
  MapPin, 
  Mail, 
  Calendar,
  Star,
  TrendingUp,
  Award,
  Code,
  ArrowRightLeft,
  Eye,
  Edit,
  ExternalLink,
  Github,
  Linkedin,
  Globe
} from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { getTransferRequestsByDeveloper } from '@/data';
import { Developer, Skill } from '@/types';

export default function DeveloperDashboard() {
  const { currentUser } = useAppStore();
  const [activeTab, setActiveTab] = useState('overview');
  
  if (currentUser.role !== 'developer') {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
          <p>Please switch to a developer role to access this dashboard.</p>
        </div>
      </div>
    );
  }

  const developer = currentUser.data as Developer;
  const transferRequests = getTransferRequestsByDeveloper(developer.id);

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

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <Avatar className="h-24 w-24">
            <AvatarImage src={developer.avatar} alt={`${developer.firstName} ${developer.lastName}`} />
            <AvatarFallback className="text-2xl">
              {developer.firstName[0]}{developer.lastName[0]}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold">
                {developer.firstName} {developer.lastName}
              </h1>
              <Badge variant={developer.availability === 'available' ? 'default' : 'secondary'}>
                {developer.availability}
              </Badge>
            </div>
            
            <p className="text-xl text-muted-foreground mb-4">{developer.title}</p>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {developer.location}
              </div>
              <div className="flex items-center gap-1">
                <Mail className="h-4 w-4" />
                {developer.email}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {developer.experience} years experience
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-current text-yellow-500" />
                {developer.ratings.overall.toFixed(1)} rating
              </div>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline">
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
            <Button>
              <Eye className="mr-2 h-4 w-4" />
              Preview Public Profile
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Market Value</p>
                <p className="text-2xl font-bold">${(developer.marketValue.current / 1000).toFixed(0)}k</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              +${((developer.marketValue.suggested - developer.marketValue.current) / 1000).toFixed(0)}k suggested
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Overall Rating</p>
                <p className="text-2xl font-bold">{developer.ratings.overall.toFixed(1)}</p>
              </div>
              <Star className="h-8 w-8 text-yellow-500 fill-current" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Performance: {developer.ratings.performance.toFixed(1)}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Requests</p>
                <p className="text-2xl font-bold">{transferRequests.length}</p>
              </div>
              <ArrowRightLeft className="h-8 w-8 text-blue-500" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {transferRequests.filter(r => r.status === 'pending' || r.status === 'negotiating').length} pending
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Achievements</p>
                <p className="text-2xl font-bold">{developer.achievements.length}</p>
              </div>
              <Award className="h-8 w-8 text-purple-500" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {developer.achievements.filter(a => a.verified).length} verified
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="transfers">Transfers</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Bio */}
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{developer.bio}</p>
              </CardContent>
            </Card>
            
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Performance Rating</span>
                  <div className="flex items-center gap-2">
                    <Progress value={developer.ratings.performance * 10} className="w-24" />
                    <span className="text-sm font-medium">{developer.ratings.performance.toFixed(1)}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm">Potential Rating</span>
                  <div className="flex items-center gap-2">
                    <Progress value={developer.ratings.potential * 10} className="w-24" />
                    <span className="text-sm font-medium">{developer.ratings.potential.toFixed(1)}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm">Technical Skills</span>
                  <span className="text-sm font-medium">{developer.technicalSkills.length}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm">Soft Skills</span>
                  <span className="text-sm font-medium">{developer.softSkills.length}</span>
                </div>
              </CardContent>
            </Card>
            
            {/* Social Links */}
            <Card>
              <CardHeader>
                <CardTitle>Links & Portfolio</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {developer.socialLinks.github && (
                    <div className="flex items-center gap-3">
                      <Github className="h-4 w-4" />
                      <a 
                        href={developer.socialLinks.github} 
                        className="text-blue-600 hover:underline cursor-pointer" 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        GitHub Profile
                      </a>
                    </div>
                  )}
                  
                  {developer.socialLinks.linkedin && (
                    <div className="flex items-center gap-3">
                      <Linkedin className="h-4 w-4" />
                      <a 
                        href={developer.socialLinks.linkedin} 
                        className="text-blue-600 hover:underline cursor-pointer" 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        LinkedIn Profile
                      </a>
                    </div>
                  )}
                  
                  {developer.socialLinks.website && (
                    <div className="flex items-center gap-3">
                      <Globe className="h-4 w-4" />
                      <a 
                        href={developer.socialLinks.website} 
                        className="text-blue-600 hover:underline cursor-pointer" 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        Personal Website
                      </a>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            {/* Employment History */}
            <Card>
              <CardHeader>
                <CardTitle>Employment History</CardTitle>
              </CardHeader>
              <CardContent>
                {developer.currentCompanyId && (
                  <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                      <span className="font-medium text-sm">Currently Employed</span>
                    </div>
                  </div>
                )}
                
                <div className="space-y-3">
                  {developer.previousCompanies.map((job, index) => (
                    <div key={index} className="border-l-2 border-muted pl-4">
                      <h4 className="font-medium">{job.position}</h4>
                      <p className="text-sm text-muted-foreground">{job.companyName}</p>
                      <p className="text-xs text-muted-foreground">
                        {job.startDate.toLocaleDateString()} - {job.endDate?.toLocaleDateString() || 'Present'}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="skills" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Technical Skills */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  Technical Skills
                </CardTitle>
                <CardDescription>
                  Programming languages, frameworks, and tools
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {developer.technicalSkills.map((skill, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{skill.name}</span>
                        <Badge variant="outline" className={getSkillColor(skill.level)}>
                          {skill.level}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={getSkillProgress(skill.level)} className="flex-1" />
                        <span className="text-xs text-muted-foreground">
                          {skill.yearsOfExperience}y
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Soft Skills */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Soft Skills
                </CardTitle>
                <CardDescription>
                  Communication, leadership, and personal skills
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {developer.softSkills.map((skill, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{skill.name}</span>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-4 w-4 ${
                                star <= skill.level
                                  ? 'text-yellow-500 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="achievements" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {developer.achievements.map((achievement) => (
              <Card key={achievement.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5" />
                      {achievement.title}
                    </CardTitle>
                    {achievement.verified && (
                      <Badge variant="default">Verified</Badge>
                    )}
                  </div>
                  <CardDescription>
                    {achievement.type.replace('_', ' ').toUpperCase()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-3">{achievement.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {achievement.date.toLocaleDateString()}
                    </span>
                    {achievement.url && (
                      <a
                        href={achievement.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
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
        
        <TabsContent value="transfers" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Transfer Requests</CardTitle>
              <CardDescription>
                Current and past transfer requests and negotiations
              </CardDescription>
            </CardHeader>
            <CardContent>
              {transferRequests.length === 0 ? (
                <div className="text-center py-8">
                  <ArrowRightLeft className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Transfer Requests</h3>
                  <p className="text-muted-foreground">
                    You don't have any transfer requests yet. Companies will reach out when interested.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {transferRequests.map((request) => (
                    <div key={request.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Badge variant={
                            request.status === 'approved' ? 'default' :
                            request.status === 'rejected' ? 'destructive' :
                            request.status === 'negotiating' ? 'secondary' : 'outline'
                          }>
                            {request.status}
                          </Badge>
                          <span className="font-medium">
                            {request.type === 'transfer' ? 'Transfer' : 'Loan'} Request
                          </span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {request.createdAt.toLocaleDateString()}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Proposed Salary:</span>
                          <div className="font-medium">${request.proposedSalary.toLocaleString()}</div>
                        </div>
                        {request.transferFee && (
                          <div>
                            <span className="text-muted-foreground">Transfer Fee:</span>
                            <div className="font-medium">${request.transferFee.toLocaleString()}</div>
                          </div>
                        )}
                        {request.loanDuration && (
                          <div>
                            <span className="text-muted-foreground">Loan Duration:</span>
                            <div className="font-medium">{request.loanDuration} months</div>
                          </div>
                        )}
                      </div>
                      
                      {request.negotiations.length > 0 && (
                        <div className="mt-3 pt-3 border-t">
                          <span className="text-sm text-muted-foreground">
                            {request.negotiations.length} message(s) in negotiation
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
