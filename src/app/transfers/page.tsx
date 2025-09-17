'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  ArrowRightLeft, 
  Clock,
  CheckCircle,
  XCircle,
  MessageCircle,
  DollarSign,
  Calendar,
  Building2,
  User,
  Plus,
  Filter,
  TrendingUp,
  X
} from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { getTransferRequestsByCompany, getDeveloperById, getCompanyById } from '@/data';
import { TransferRequest } from '@/types';

export default function TransfersPage() {
  const { currentUser } = useAppStore();
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get('success') === 'created') {
      setShowSuccessMessage(true);
      // Auto-hide after 5 seconds
      setTimeout(() => setShowSuccessMessage(false), 5000);
    }
  }, [searchParams]);

  // Get transfer requests for company
  const transferRequests = getTransferRequestsByCompany(currentUser.id);

  // Filter by status
  const filteredRequests = filterStatus === 'all' 
    ? transferRequests 
    : transferRequests.filter(req => req.status === filterStatus);

  const getStatusIcon = (status: TransferRequest['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'negotiating':
        return <MessageCircle className="h-4 w-4 text-blue-500" />;
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-gray-500" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: TransferRequest['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'negotiating':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'completed':
        return 'bg-green-100 text-green-900 border-green-300';
      case 'cancelled':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const renderTransferCard = (request: TransferRequest) => {
    const developer = request.developerId ? getDeveloperById(request.developerId) : null;
    const toCompany = getCompanyById(request.toCompanyId);

    if (!toCompany) return null;

    return (
      <Card key={request.id} className="hover:shadow-md transition-shadow">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                <ArrowRightLeft className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">
                    {request.placementType === 'employee_listing' 
                      ? `Employee ${request.type === 'transfer' ? 'Transfer' : 'Loan'} Listing`
                      : `Developer ${request.type === 'transfer' ? 'Position' : 'Project'} Search`
                    }
                  </h3>
                  <Badge className={`${getStatusColor(request.status)} border`}>
                    {getStatusIcon(request.status)}
                    <span className="ml-1">{request.status}</span>
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Created {request.createdAt.toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-primary">
                {request.placementType === 'employee_listing' || request.proposedSalary ? (
                  `$${request.proposedSalary.toLocaleString()}`
                ) : (
                  request.salaryRange 
                    ? `$${request.salaryRange.min.toLocaleString()} - $${request.salaryRange.max.toLocaleString()}`
                    : 'Negotiable'
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {request.placementType === 'employee_listing' 
                  ? 'Min Salary' 
                  : request.salaryRange ? 'Salary Range' : 'Salary'
                }
              </p>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-0">
          {/* Participants or Job Info */}
          <div className="space-y-3 mb-4">
            {request.placementType === 'employee_listing' && developer ? (
              <>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={developer.avatar} alt={`${developer.firstName} ${developer.lastName}`} />
                    <AvatarFallback className="text-xs">
                      {developer.firstName[0]}{developer.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{developer.firstName} {developer.lastName}</p>
                    <p className="text-xs text-muted-foreground">{developer.title}</p>
                  </div>
                  <User className="h-4 w-4 text-muted-foreground" />
                </div>
                
                <div className="flex items-center justify-center">
                  <ArrowRightLeft className="h-4 w-4 text-muted-foreground" />
                </div>
                
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={toCompany.logo} alt={toCompany.name} />
                    <AvatarFallback className="text-xs">
                      {toCompany.name.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{toCompany.name}</p>
                    <p className="text-xs text-muted-foreground">{toCompany.industry}</p>
                  </div>
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={toCompany.logo} alt={toCompany.name} />
                    <AvatarFallback className="text-xs">
                      {toCompany.name.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{toCompany.name}</p>
                    <p className="text-xs text-muted-foreground">{toCompany.industry}</p>
                  </div>
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                </div>
                
                {request.requirements && (
                  <div className="bg-muted/30 rounded-lg p-3">
                    <p className="text-sm font-medium mb-1">
                      Looking for: {request.requirements.description || 'Developer'}
                    </p>
                    {request.requirements.skills && request.requirements.skills.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {request.requirements.skills.slice(0, 3).map((skill, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {request.requirements.skills.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{request.requirements.skills.length - 3}
                          </Badge>
                        )}
                      </div>
                    )}
                    {request.requirements.experience && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Experience: {request.requirements.experience.min}+ years
                      </p>
                    )}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Transfer Details */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4 text-xs">
            {request.placementType === 'employee_listing' && request.transferFee && (
              <div className="text-center p-2 bg-muted/50 rounded">
                <DollarSign className="h-4 w-4 mx-auto mb-1 text-green-600" />
                <div className="font-medium">
                  ${request.transferFee.toLocaleString()}
                </div>
                <div className="text-muted-foreground">Transfer Fee</div>
              </div>
            )}
            
            {request.placementType === 'developer_search' && request.applications && (
              <div className="text-center p-2 bg-muted/50 rounded">
                <User className="h-4 w-4 mx-auto mb-1 text-blue-600" />
                <div className="font-medium">
                  {request.applications.length}
                </div>
                <div className="text-muted-foreground">Applications</div>
              </div>
            )}
            
            {request.loanDuration && (
              <div className="text-center p-2 bg-muted/50 rounded">
                <Calendar className="h-4 w-4 mx-auto mb-1 text-blue-600" />
                <div className="font-medium">{request.loanDuration} months</div>
                <div className="text-muted-foreground">Duration</div>
              </div>
            )}
            
            <div className="text-center p-2 bg-muted/50 rounded">
              <MessageCircle className="h-4 w-4 mx-auto mb-1 text-orange-600" />
              <div className="font-medium">{request.negotiations.length}</div>
              <div className="text-muted-foreground">Messages</div>
            </div>
            
            <div className="text-center p-2 bg-muted/50 rounded">
              <Clock className="h-4 w-4 mx-auto mb-1 text-purple-600" />
              <div className="font-medium">
                {Math.ceil((new Date().getTime() - request.updatedAt.getTime()) / (1000 * 60 * 60 * 24))}d
              </div>
              <div className="text-muted-foreground">Last Update</div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1" asChild>
              <Link href={`/transfers/${request.id}`}>
                View Details
              </Link>
            </Button>
            {(request.status === 'pending' || request.status === 'negotiating') && (
              <Button size="sm" className="flex-1" asChild>
                <Link href={`/transfers/${request.id}/negotiate`}>
                  {request.status === 'pending' ? 'Respond' : 'Continue Chat'}
                </Link>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  const statusCounts = {
    all: transferRequests.length,
    pending: transferRequests.filter(r => r.status === 'pending').length,
    negotiating: transferRequests.filter(r => r.status === 'negotiating').length,
    approved: transferRequests.filter(r => r.status === 'approved').length,
    completed: transferRequests.filter(r => r.status === 'completed').length,
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Success Message */}
      {showSuccessMessage && (
        <Card className="mb-6 border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <h4 className="font-medium text-green-800">Transfer Placement Created!</h4>
                <p className="text-sm text-green-600">
                  Your transfer placement has been successfully created and published.
                </p>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowSuccessMessage(false)}
                className="ml-auto text-green-600 hover:text-green-800"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Transfer Management</h1>
          <p className="text-muted-foreground">
            Track and manage your company&apos;s transfer activities
          </p>
        </div>
        
        <Button asChild>
          <Link href="/transfers/new">
            <Plus className="mr-2 h-4 w-4" />
            Create Transfer Placement
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{statusCounts.all}</div>
            <div className="text-xs text-muted-foreground">Total Requests</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{statusCounts.pending}</div>
            <div className="text-xs text-muted-foreground">Pending</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{statusCounts.negotiating}</div>
            <div className="text-xs text-muted-foreground">Negotiating</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{statusCounts.approved}</div>
            <div className="text-xs text-muted-foreground">Approved</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-700">{statusCounts.completed}</div>
            <div className="text-xs text-muted-foreground">Completed</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium mr-4">Filter by status:</span>
            {[
              { value: 'all', label: 'All' },
              { value: 'pending', label: 'Pending' },
              { value: 'negotiating', label: 'Negotiating' },
              { value: 'approved', label: 'Approved' },
              { value: 'completed', label: 'Completed' },
            ].map((filter) => (
              <Button
                key={filter.value}
                variant={filterStatus === filter.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterStatus(filter.value)}
              >
                {filter.label}
                {statusCounts[filter.value as keyof typeof statusCounts] > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {statusCounts[filter.value as keyof typeof statusCounts]}
                  </Badge>
                )}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Transfer Requests */}
      {filteredRequests.length === 0 ? (
        <Card>
          <CardContent className="py-12">
            <div className="text-center">
              <ArrowRightLeft className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">
                {transferRequests.length === 0 ? 'No Transfer Requests' : 'No Matching Requests'}
              </h3>
              <p className="text-muted-foreground mb-6">
                {transferRequests.length === 0 
                  ? 'You haven\'t created any transfer requests yet. Start by browsing developers.'
                  : 'Try adjusting your filter to see more results.'
                }
              </p>
              {transferRequests.length === 0 && (
                <Button asChild>
                  <Link href="/developers">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Browse Developers
                  </Link>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredRequests.map((request) => renderTransferCard(request))}
        </div>
      )}
    </div>
  );
}
