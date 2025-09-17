'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  TrendingUp
} from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { getTransferRequestsByDeveloper, getTransferRequestsByCompany, getDeveloperById, getCompanyById } from '@/data';
import { TransferRequest } from '@/types';

export default function TransfersPage() {
  const { currentUser } = useAppStore();
  const [activeTab, setActiveTab] = useState('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Get transfer requests based on user role
  const transferRequests = currentUser.role === 'developer' 
    ? getTransferRequestsByDeveloper(currentUser.id)
    : getTransferRequestsByCompany(currentUser.id);

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
    const developer = getDeveloperById(request.developerId);
    const toCompany = getCompanyById(request.toCompanyId);
    const fromCompany = request.fromCompanyId ? getCompanyById(request.fromCompanyId) : null;

    if (!developer || !toCompany) return null;

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
                    {request.type === 'transfer' ? 'Transfer' : 'Loan'} Request
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
                ${request.proposedSalary.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">Proposed Salary</p>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-0">
          {/* Participants */}
          <div className="space-y-3 mb-4">
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
          </div>

          {/* Transfer Details */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4 text-xs">
            <div className="text-center p-2 bg-muted/50 rounded">
              <DollarSign className="h-4 w-4 mx-auto mb-1 text-green-600" />
              <div className="font-medium">
                ${request.transferFee?.toLocaleString() || 'N/A'}
              </div>
              <div className="text-muted-foreground">Transfer Fee</div>
            </div>
            
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
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Transfer Management</h1>
          <p className="text-muted-foreground">
            {currentUser.role === 'developer' 
              ? 'Manage your transfer requests and opportunities' 
              : 'Track and manage your company\'s transfer activities'
            }
          </p>
        </div>
        
        {currentUser.role === 'company' && (
          <Button asChild>
            <Link href="/transfers/new">
              <Plus className="mr-2 h-4 w-4" />
              Create Transfer Request
            </Link>
          </Button>
        )}
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
                  ? currentUser.role === 'developer'
                    ? 'You don\'t have any transfer requests yet. Companies will reach out when interested.'
                    : 'You haven\'t created any transfer requests yet. Start by browsing developers.'
                  : 'Try adjusting your filter to see more results.'
                }
              </p>
              {currentUser.role === 'company' && transferRequests.length === 0 && (
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
