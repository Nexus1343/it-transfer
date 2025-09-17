'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { 
  MapPin, 
  Mail, 
  Globe,
  Users,
  TrendingUp,
  ArrowRightLeft,
  Search,
  Filter,
  Star,
  Eye,
  UserPlus
} from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { getDevelopersByCompany, getTransferRequestsByCompany, mockDevelopers } from '@/data';
import { Company } from '@/types';

export default function CompanyDashboard() {
  const { currentUser } = useAppStore();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  
  if (currentUser.role !== 'company') {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
          <p>Please switch to a company role to access this dashboard.</p>
        </div>
      </div>
    );
  }

  const company = currentUser.data as Company;
  const employees = getDevelopersByCompany(company.id);
  const transferRequests = getTransferRequestsByCompany(company.id);
  
  // Filter available developers for browsing
  const availableDevelopers = mockDevelopers.filter(dev => 
    dev.availability === 'available' || dev.availability === 'employed'
  ).filter(dev =>
    searchTerm === '' || 
    `${dev.firstName} ${dev.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dev.technicalSkills.some(skill => skill.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const pendingRequests = transferRequests.filter(r => r.status === 'pending' || r.status === 'negotiating');

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <Avatar className="h-24 w-24">
            <AvatarImage src={company.logo} alt={company.name} />
            <AvatarFallback className="text-2xl">
              {company.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold">{company.name}</h1>
              <Badge variant="outline">{company.size}</Badge>
            </div>
            
            <p className="text-xl text-muted-foreground mb-4">{company.industry}</p>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {company.location}
              </div>
              <div className="flex items-center gap-1">
                <Mail className="h-4 w-4" />
                {company.email}
              </div>
              <div className="flex items-center gap-1">
                <Globe className="h-4 w-4" />
                <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {company.website}
                </a>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-current text-yellow-500" />
                {company.stats.averageRating.toFixed(1)} rating
              </div>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" asChild>
              <Link href="/developers">
                <Search className="mr-2 h-4 w-4" />
                Browse Developers
              </Link>
            </Button>
            <Button asChild>
              <Link href="/transfers/new">
                <UserPlus className="mr-2 h-4 w-4" />
                Create Transfer Request
              </Link>
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
                <p className="text-sm font-medium text-muted-foreground">Employees</p>
                <p className="text-2xl font-bold">{employees.length}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Active team members
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Transfers</p>
                <p className="text-2xl font-bold">{company.stats.totalTransfers}</p>
              </div>
              <ArrowRightLeft className="h-8 w-8 text-green-500" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Completed successfully
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Requests</p>
                <p className="text-2xl font-bold">{pendingRequests.length}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-500" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Pending negotiations
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Success Rate</p>
                <p className="text-2xl font-bold">
                  {((company.stats.successfulHires / (company.stats.totalTransfers + company.stats.totalLoans)) * 100).toFixed(0)}%
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-500" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Hire success rate
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="employees">Team</TabsTrigger>
          <TabsTrigger value="browse">Browse Developers</TabsTrigger>
          <TabsTrigger value="transfers">Transfer Activity</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Company Description */}
            <Card>
              <CardHeader>
                <CardTitle>About {company.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{company.description}</p>
              </CardContent>
            </Card>
            
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transferRequests.slice(0, 3).map((request) => (
                    <div key={request.id} className="flex items-start space-x-3 pb-3 border-b last:border-b-0">
                      <div className="flex-shrink-0 mt-1">
                        <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          {request.type === 'transfer' ? 'Transfer' : 'Loan'} request for developer
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Status: {request.status} • ${request.proposedSalary.toLocaleString()}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {request.createdAt.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                  {transferRequests.length === 0 && (
                    <p className="text-muted-foreground text-sm text-center py-4">
                      No recent transfer activity
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="employees" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>
                Current employees and their status
              </CardDescription>
            </CardHeader>
            <CardContent>
              {employees.length === 0 ? (
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Team Members</h3>
                  <p className="text-muted-foreground">
                    Start building your team by browsing and hiring developers.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {employees.map((developer) => (
                    <div key={developer.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={developer.avatar} alt={`${developer.firstName} ${developer.lastName}`} />
                        <AvatarFallback>
                          {developer.firstName[0]}{developer.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <h4 className="font-medium">
                          {developer.firstName} {developer.lastName}
                        </h4>
                        <p className="text-sm text-muted-foreground">{developer.title}</p>
                      </div>
                      
                      <div className="text-right">
                        <div className="flex items-center gap-1 mb-1">
                          <Star className="h-4 w-4 fill-current text-yellow-500" />
                          <span className="text-sm font-medium">{developer.ratings.overall.toFixed(1)}</span>
                        </div>
                        <Badge variant={developer.availability === 'available' ? 'default' : 'secondary'}>
                          {developer.availability}
                        </Badge>
                      </div>
                      
                      <Button variant="outline" size="sm">
                        <Eye className="mr-2 h-4 w-4" />
                        View Profile
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="browse" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Browse Developers</CardTitle>
              <CardDescription>
                Discover and connect with talented developers
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Search */}
              <div className="flex gap-4 mb-6">
                <div className="flex-1">
                  <Input
                    placeholder="Search by name or skills..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                  />
                </div>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                </Button>
              </div>
              
              {/* Developer List */}
              <div className="space-y-4">
                {availableDevelopers.slice(0, 5).map((developer) => (
                  <div key={developer.id} className="flex items-center space-x-4 p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={developer.avatar} alt={`${developer.firstName} ${developer.lastName}`} />
                      <AvatarFallback>
                        {developer.firstName[0]}{developer.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <h4 className="font-medium">
                        {developer.firstName} {developer.lastName}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-2">{developer.title}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {developer.location}
                        <span>•</span>
                        <span>{developer.experience} years</span>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-current text-yellow-500" />
                          {developer.ratings.overall.toFixed(1)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-sm font-medium mb-1">
                        ${(developer.marketValue.current / 1000).toFixed(0)}k
                      </div>
                      <Badge variant={developer.availability === 'available' ? 'default' : 'secondary'}>
                        {developer.availability}
                      </Badge>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </Button>
                      <Button size="sm">
                        <UserPlus className="mr-2 h-4 w-4" />
                        Contact
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-6">
                <Button variant="outline" asChild>
                  <Link href="/developers">
                    View All Developers ({mockDevelopers.length})
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="transfers" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Transfer Requests</CardTitle>
              <CardDescription>
                Manage your transfer and loan requests
              </CardDescription>
            </CardHeader>
            <CardContent>
              {transferRequests.length === 0 ? (
                <div className="text-center py-8">
                  <ArrowRightLeft className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Transfer Requests</h3>
                  <p className="text-muted-foreground mb-4">
                    Start by creating transfer or loan requests for developers you&apos;re interested in.
                  </p>
                  <Button asChild>
                    <Link href="/transfers/new">
                      Create Transfer Request
                    </Link>
                  </Button>
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
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-3">
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
                            <span className="text-muted-foreground">Duration:</span>
                            <div className="font-medium">{request.loanDuration} months</div>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between pt-3 border-t">
                        <span className="text-sm text-muted-foreground">
                          {request.negotiations.length} message(s) • Updated {request.updatedAt.toLocaleDateString()}
                        </span>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                          {(request.status === 'pending' || request.status === 'negotiating') && (
                            <Button size="sm">
                              Continue Negotiation
                            </Button>
                          )}
                        </div>
                      </div>
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
