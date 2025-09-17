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
  Verified
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
  
  // Try to find as developer first, then as company
  const developer = getDeveloperById(profileId);
  const company = getCompanyById(profileId);
  const profile = developer || company;
  const profileType = developer ? 'developer' : company ? 'company' : null;

  if (!profile || !profileType) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Profile Not Found</h1>
          <p className="text-muted-foreground mb-4">The profile you're looking for doesn't exist.</p>
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

  const transferRequests = profileType === 'developer' 
    ? getTransferRequestsByDeveloper(profileId)
    : getTransferRequestsByCompany(profileId);

  const employees = profileType === 'company' ? getDevelopersByCompany(profileId) : [];

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

  const handleContact = () => {
    console.log('Contact:', profileId);
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  if (profileType === 'developer') {
    const dev = profile as Developer;
    
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
                {currentUser.role === 'company' && (
                  <Button onClick={handleContact}>
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Contact
                  </Button>
                )}
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
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Skills & Experience</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
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
        </Tabs>
      </div>
    );
  }

  // Company profile
  const comp = profile as Company;
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Button variant="ghost" className="mb-6" asChild>
        <Link href="/developers">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Link>
      </Button>

      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 mb-6">
          <Avatar className="h-32 w-32">
            <AvatarImage src={comp.logo} alt={comp.name} />
            <AvatarFallback className="text-4xl">
              {comp.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-4xl font-bold">{comp.name}</h1>
              <Badge variant="outline">{comp.size}</Badge>
            </div>
            
            <p className="text-2xl text-muted-foreground mb-4">{comp.industry}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {comp.location}
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {employees.length} employees
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-current text-yellow-500" />
                {comp.stats.averageRating.toFixed(1)} rating
              </div>
            </div>

            <div className="flex items-center gap-4">
              <a href={comp.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline cursor-pointer">
                <Globe className="h-4 w-4 inline mr-1" />
                {comp.website}
              </a>
              <a href={`mailto:${comp.email}`} className="text-muted-foreground hover:text-foreground cursor-pointer">
                <Mail className="h-4 w-4 inline mr-1" />
                {comp.email}
              </a>
            </div>
          </div>
          
          <div className="flex flex-col gap-3 lg:items-end">
            <div className="text-right">
              <div className="text-3xl font-bold text-primary">
                {comp.stats.totalTransfers}
              </div>
              <p className="text-sm text-muted-foreground">Total Transfers</p>
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
            </div>
          </div>
        </div>
      </div>

      {/* Company Description */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <p className="text-lg leading-relaxed">{comp.description}</p>
        </CardContent>
      </Card>

      {/* Company Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6 text-center">
            <Users className="h-8 w-8 mx-auto mb-2 text-blue-500" />
            <div className="text-2xl font-bold">{employees.length}</div>
            <div className="text-sm text-muted-foreground">Employees</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <ArrowRightLeft className="h-8 w-8 mx-auto mb-2 text-green-500" />
            <div className="text-2xl font-bold">{comp.stats.totalTransfers}</div>
            <div className="text-sm text-muted-foreground">Total Transfers</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <TrendingUp className="h-8 w-8 mx-auto mb-2 text-orange-500" />
            <div className="text-2xl font-bold">{comp.stats.successfulHires}</div>
            <div className="text-sm text-muted-foreground">Successful Hires</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <Star className="h-8 w-8 mx-auto mb-2 text-yellow-500 fill-current" />
            <div className="text-2xl font-bold">{comp.stats.averageRating.toFixed(1)}</div>
            <div className="text-sm text-muted-foreground">Average Rating</div>
          </CardContent>
        </Card>
      </div>

      {/* Team Members */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Team Members ({employees.length})
          </CardTitle>
          <CardDescription>
            Current employees and their expertise
          </CardDescription>
        </CardHeader>
        <CardContent>
          {employees.length === 0 ? (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No Public Team Members</h3>
              <p className="text-muted-foreground">
                This company hasn't made their team members public yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {employees.map((employee) => (
                <Card key={employee.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={employee.avatar} alt={`${employee.firstName} ${employee.lastName}`} />
                        <AvatarFallback>
                          {employee.firstName[0]}{employee.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium">
                          {employee.firstName} {employee.lastName}
                        </h4>
                        <p className="text-sm text-muted-foreground">{employee.title}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="h-4 w-4 fill-current text-yellow-500" />
                        {employee.ratings.overall.toFixed(1)}
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/profile/${employee.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
