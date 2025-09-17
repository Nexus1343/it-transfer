'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  ArrowLeft,
  ArrowRightLeft, 
  Clock,
  CheckCircle,
  XCircle,
  MessageCircle,
  DollarSign,
  Calendar,
  HandCoins,
  MessageSquare,
  AlertTriangle,
  FileText,
  MapPin,
  Star,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { getTransferRequestById, getDeveloperById, getCompanyById } from '@/data';
import { TransferRequest } from '@/types';
import { toast } from 'sonner';

interface CounterOfferDialogProps {
  isOpen: boolean;
  onClose: () => void;
  currentOffer: {
    salary: number;
    transferFee?: number;
    startDate?: Date;
    loanDuration?: number;
  };
  transferType: 'transfer' | 'loan';
}

function CounterOfferDialog({ isOpen, onClose, currentOffer, transferType }: CounterOfferDialogProps) {
  const [salary, setSalary] = useState(currentOffer.salary);
  const [transferFee, setTransferFee] = useState(currentOffer.transferFee || 0);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success('Counter-offer submitted successfully!');
    onClose();
    setIsSubmitting(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <HandCoins className="h-5 w-5" />
            Make Counter-Offer
          </DialogTitle>
          <DialogDescription>
            Adjust the terms and submit your counter-offer
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="salary">Annual Salary</Label>
            <div className="relative mt-2">
              <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="salary"
                type="number"
                value={salary}
                onChange={(e) => setSalary(Number(e.target.value))}
                className="pl-9"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Current offer: ${currentOffer.salary.toLocaleString()}
            </p>
          </div>

          {transferType === 'transfer' && (
            <div>
              <Label htmlFor="transferFee">Transfer Fee</Label>
              <div className="relative mt-2">
                <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="transferFee"
                  type="number"
                  value={transferFee}
                  onChange={(e) => setTransferFee(Number(e.target.value))}
                  className="pl-9"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Current offer: ${(currentOffer.transferFee || 0).toLocaleString()}
              </p>
            </div>
          )}

          <div>
            <Label htmlFor="message">Message</Label>
            <textarea
              id="message"
              placeholder="Explain your counter-offer..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full h-20 p-3 border border-border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent mt-2"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting || !message.trim()}>
            {isSubmitting ? 'Submitting...' : 'Submit Counter-Offer'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function TransferDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { currentUser } = useAppStore();
  const [showCounterOfferDialog, setShowCounterOfferDialog] = useState(false);
  
  const transferId = params.id as string;
  const transfer = getTransferRequestById(transferId);

  if (!transfer) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Transfer Not Found</h1>
          <Button asChild>
            <Link href="/transfers">Back to Transfers</Link>
          </Button>
        </div>
      </div>
    );
  }

  const developer = transfer.developerId ? getDeveloperById(transfer.developerId) : null;
  const toCompany = getCompanyById(transfer.toCompanyId);
  const fromCompany = transfer.fromCompanyId ? getCompanyById(transfer.fromCompanyId) : null;

  if (!toCompany) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Company Not Found</h1>
          <p className="text-muted-foreground mb-4">The company associated with this transfer was not found.</p>
          <Button asChild>
            <Link href="/transfers">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Transfers
            </Link>
          </Button>
        </div>
      </div>
    );
  }

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

  const handleAcceptOffer = async () => {
    toast.success('Offer accepted successfully!');
    router.push('/transfers');
  };

  const handleRejectOffer = async () => {
    toast.error('Offer rejected');
    router.push('/transfers');
  };

  const currentOfferTerms = {
    salary: transfer.proposedSalary,
    transferFee: transfer.transferFee,
    startDate: transfer.loanStartDate,
    loanDuration: transfer.loanDuration
  };

  const canTakeAction = (transfer.status === 'pending' || transfer.status === 'negotiating') && 
    (transfer.fromCompanyId === currentUser.id || transfer.toCompanyId === currentUser.id);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <Button variant="ghost" onClick={() => router.back()} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Transfers
        </Button>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Transfer Details</h1>
            <p className="text-muted-foreground">
              Created on {transfer.createdAt.toLocaleDateString()} • 
              Last updated {transfer.updatedAt.toLocaleDateString()}
            </p>
          </div>
          
          <Badge className={`${getStatusColor(transfer.status)} border text-lg px-4 py-2`}>
            {getStatusIcon(transfer.status)}
            <span className="ml-2 capitalize">{transfer.status}</span>
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Transfer Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowRightLeft className="h-5 w-5" />
                Transfer Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Participants */}
                {transfer.placementType === 'employee_listing' && developer && fromCompany ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={developer.avatar} alt={`${developer.firstName} ${developer.lastName}`} />
                        <AvatarFallback>
                          {developer.firstName[0]}{developer.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-semibold">{developer.firstName} {developer.lastName}</h3>
                        <p className="text-sm text-muted-foreground">{developer.title}</p>
                        <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {developer.location}
                          </span>
                          <span>{developer.experience} years exp</span>
                          <span className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-current text-yellow-500" />
                            {developer.ratings.overall.toFixed(1)}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-green-600">
                          ${developer.marketValue.current.toLocaleString()}
                        </div>
                        <div className="text-xs text-muted-foreground">Market Value</div>
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <ArrowRightLeft className="h-6 w-6 text-muted-foreground" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-muted/30 rounded-lg">
                        <div className="flex items-center gap-3 mb-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={fromCompany.logo} alt={fromCompany.name} />
                            <AvatarFallback>{fromCompany.name.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium text-sm">{fromCompany.name}</h4>
                            <p className="text-xs text-muted-foreground">Current Employer</p>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {fromCompany.industry} • {fromCompany.size} company
                        </div>
                      </div>

                      <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                        <div className="flex items-center gap-3 mb-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={toCompany.logo} alt={toCompany.name} />
                            <AvatarFallback>{toCompany.name.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium text-sm">{toCompany.name}</h4>
                            <p className="text-xs text-muted-foreground">Potential Employer</p>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {toCompany.industry} • {toCompany.size} company
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Developer Search Posting
                  <div className="space-y-4">
                    <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                      <div className="flex items-center gap-3 mb-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={toCompany.logo} alt={toCompany.name} />
                          <AvatarFallback>{toCompany.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{toCompany.name}</h3>
                          <p className="text-sm text-muted-foreground">Looking for Developer</p>
                        </div>
                      </div>

                      {transfer.requirements && (
                        <div className="space-y-3">
                          <div>
                            <h4 className="font-medium text-sm mb-2">Job Requirements</h4>
                            <p className="text-sm text-muted-foreground mb-3">
                              {transfer.requirements.description}
                            </p>
                          </div>

                          {transfer.requirements.skills && transfer.requirements.skills.length > 0 && (
                            <div>
                              <h5 className="font-medium text-xs mb-2 text-muted-foreground">Required Skills</h5>
                              <div className="flex flex-wrap gap-2">
                                {transfer.requirements.skills.map((skill, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}

                          <div className="grid grid-cols-2 gap-4 text-xs">
                            {transfer.requirements.experience && (
                              <div>
                                <span className="text-muted-foreground">Experience:</span>
                                <span className="ml-1 font-medium">
                                  {transfer.requirements.experience.min}+ years
                                </span>
                              </div>
                            )}
                            {transfer.requirements.location && (
                              <div>
                                <span className="text-muted-foreground">Location:</span>
                                <span className="ml-1 font-medium">
                                  {transfer.requirements.location}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Financial Terms */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Financial Terms
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="text-2xl font-bold text-green-600">
                    ${transfer.proposedSalary.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {transfer.placementType === 'employee_listing' ? 'Proposed Salary' : 
                     transfer.salaryRange ? 'Salary (from range)' : 'Annual Salary'}
                  </div>
                  {transfer.salaryRange && (
                    <div className="text-xs text-muted-foreground mt-1">
                      Range: ${transfer.salaryRange.min.toLocaleString()} - ${transfer.salaryRange.max.toLocaleString()}
                    </div>
                  )}
                </div>

                {transfer.transferFee && (
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="text-2xl font-bold text-blue-600">
                      ${transfer.transferFee.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">Transfer Fee</div>
                    <div className="text-xs text-muted-foreground mt-1">One-time payment</div>
                  </div>
                )}

                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                  <div className="text-2xl font-bold text-purple-600">
                    ${((transfer.proposedSalary || 0) + (transfer.transferFee || 0)).toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Cost</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {transfer.type === 'loan' && transfer.loanDuration ? `Over ${transfer.loanDuration} months` : 'First year'}
                  </div>
                </div>
              </div>

              {/* Additional Terms */}
              {(transfer.loanDuration || transfer.trialPeriod) && (
                <div className="mt-6 pt-4 border-t">
                  <h4 className="font-medium mb-3">Additional Terms</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    {transfer.loanDuration && (
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>
                          <span className="font-medium">{transfer.loanDuration} months</span> loan duration
                        </span>
                      </div>
                    )}
                    {transfer.loanStartDate && (
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>
                          Starts <span className="font-medium">{transfer.loanStartDate.toLocaleDateString()}</span>
                        </span>
                      </div>
                    )}
                    {transfer.trialPeriod && (
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                        <span>
                          <span className="font-medium">{transfer.trialPeriod.duration} days</span> trial period
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Negotiation History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Negotiation History
              </CardTitle>
              <CardDescription>
                {transfer.negotiations.length} message{transfer.negotiations.length !== 1 ? 's' : ''} in this conversation
              </CardDescription>
            </CardHeader>
            <CardContent>
              {transfer.negotiations.length === 0 ? (
                <div className="text-center py-6 text-muted-foreground">
                  <MessageCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No negotiations yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {transfer.negotiations.map((negotiation) => {
                    const isFromCurrentUser = 
                      negotiation.fromRole === 'company' && negotiation.fromUserId === currentUser.id;

                    return (
                      <div
                        key={negotiation.id}
                        className={`flex ${isFromCurrentUser ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-[80%] ${
                          isFromCurrentUser 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-muted'
                        } rounded-lg p-4`}>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant={isFromCurrentUser ? 'secondary' : 'default'} className="text-xs">
                              Company
                            </Badge>
                            <span className="text-xs opacity-70">
                              {negotiation.timestamp.toLocaleDateString()} {negotiation.timestamp.toLocaleTimeString()}
                            </span>
                          </div>
                          
                          <p className="text-sm mb-3">{negotiation.message}</p>
                          
                          {negotiation.proposalChanges && (
                            <div className="text-xs border-t border-opacity-20 pt-2">
                              <div className="font-medium mb-1">Proposed Changes:</div>
                              <div className="space-y-1">
                                {negotiation.proposalChanges.salary && (
                                  <div>Salary: ${negotiation.proposalChanges.salary.toLocaleString()}</div>
                                )}
                                {negotiation.proposalChanges.transferFee && (
                                  <div>Transfer Fee: ${negotiation.proposalChanges.transferFee.toLocaleString()}</div>
                                )}
                                {negotiation.proposalChanges.startDate && (
                                  <div>Start Date: {negotiation.proposalChanges.startDate.toLocaleDateString()}</div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          {canTakeAction && (
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Take action on this transfer request
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full" 
                  onClick={handleAcceptOffer}
                  disabled={transfer.status !== 'pending' && transfer.status !== 'negotiating'}
                >
                  <ThumbsUp className="mr-2 h-4 w-4" />
                  Accept Offer
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setShowCounterOfferDialog(true)}
                  disabled={transfer.status !== 'pending' && transfer.status !== 'negotiating'}
                >
                  <HandCoins className="mr-2 h-4 w-4" />
                  Make Counter-Offer
                </Button>
                
                <Button 
                  variant="destructive" 
                  className="w-full"
                  onClick={handleRejectOffer}
                  disabled={transfer.status !== 'pending' && transfer.status !== 'negotiating'}
                >
                  <ThumbsDown className="mr-2 h-4 w-4" />
                  Reject Offer
                </Button>
                
                <Button variant="outline" className="w-full" asChild>
                  <Link href={`/transfers/${transfer.id}/negotiate`}>
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Open Chat
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Transfer Info */}
          <Card>
            <CardHeader>
              <CardTitle>Transfer Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Type:</span>
                <span className="font-medium capitalize">{transfer.type}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Category:</span>
                <span className="font-medium">
                  {transfer.placementType === 'employee_listing' ? 'Employee Listing' : 'Developer Search'}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <Badge className={getStatusColor(transfer.status)}>
                  {transfer.status}
                </Badge>
              </div>
              
              <Separator />
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Created:</span>
                <span className="font-medium">{transfer.createdAt.toLocaleDateString()}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last Updated:</span>
                <span className="font-medium">{transfer.updatedAt.toLocaleDateString()}</span>
              </div>
              
              {transfer.approvedAt && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Approved:</span>
                  <span className="font-medium">{transfer.approvedAt.toLocaleDateString()}</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Documents */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Documents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• Transfer Agreement (Draft)</p>
                <p>• Employment Contract Template</p>
                {transfer.type === 'loan' && <p>• Loan Agreement Template</p>}
                {transfer.trialPeriod && <p>• Trial Period Terms</p>}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Counter-Offer Dialog */}
      <CounterOfferDialog
        isOpen={showCounterOfferDialog}
        onClose={() => setShowCounterOfferDialog(false)}
        currentOffer={currentOfferTerms}
        transferType={transfer.type}
      />
    </div>
  );
}
