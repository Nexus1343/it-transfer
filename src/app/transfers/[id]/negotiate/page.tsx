'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft,
  Send,
  DollarSign,
  Calendar,
  MessageCircle,
  HandCoins,
  User,
  Building2
} from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { getTransferRequestById, getDeveloperById, getCompanyById } from '@/data';
import { toast } from 'sonner';

export default function NegotiatePage() {
  const params = useParams();
  const router = useRouter();
  const { currentUser } = useAppStore();
  const [message, setMessage] = useState('');
  const [proposedSalary, setProposedSalary] = useState('');
  const [proposedTransferFee, setProposedTransferFee] = useState('');
  const [proposedStartDate, setProposedStartDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
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

  const handleSendMessage = async () => {
    if (!message.trim() && !proposedSalary && !proposedTransferFee && !proposedStartDate) {
      toast.error('Please enter a message or propose new terms');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast.success('Message sent successfully!');
    
    // Clear form
    setMessage('');
    setProposedSalary('');
    setProposedTransferFee('');
    setProposedStartDate('');
    
    setIsSubmitting(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <Button variant="ghost" onClick={() => router.back()} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Transfer Details
        </Button>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Negotiate Transfer</h1>
            <p className="text-muted-foreground">
              Continue the conversation with your transfer request
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chat Section */}
        <div className="lg:col-span-2">
          {/* Conversation History */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Conversation History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {transfer.negotiations.length === 0 ? (
                  <div className="text-center py-6 text-muted-foreground">
                    <MessageCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>No messages yet. Start the conversation!</p>
                  </div>
                ) : (
                  transfer.negotiations.map((negotiation) => {
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
                                  <div>💰 Salary: ${negotiation.proposalChanges.salary.toLocaleString()}</div>
                                )}
                                {negotiation.proposalChanges.transferFee && (
                                  <div>🔄 Transfer Fee: ${negotiation.proposalChanges.transferFee.toLocaleString()}</div>
                                )}
                                {negotiation.proposalChanges.startDate && (
                                  <div>📅 Start Date: {negotiation.proposalChanges.startDate.toLocaleDateString()}</div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </CardContent>
          </Card>

          {/* New Message Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="h-5 w-5" />
                Send Message
              </CardTitle>
              <CardDescription>
                Continue the conversation or propose new terms
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Message */}
              <div>
                <Label htmlFor="message">Message</Label>
                <textarea
                  id="message"
                  placeholder="Type your message here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full h-24 p-3 border border-border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent mt-2"
                />
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <HandCoins className="h-4 w-4" />
                  Propose New Terms (Optional)
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="salary">Annual Salary</Label>
                    <div className="relative mt-2">
                      <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="salary"
                        type="number"
                        placeholder="150000"
                        value={proposedSalary}
                        onChange={(e) => setProposedSalary(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Current: ${transfer.proposedSalary.toLocaleString()}
                    </p>
                  </div>

                  {transfer.type === 'transfer' && (
                    <div>
                      <Label htmlFor="transferFee">Transfer Fee</Label>
                      <div className="relative mt-2">
                        <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="transferFee"
                          type="number"
                          placeholder="25000"
                          value={proposedTransferFee}
                          onChange={(e) => setProposedTransferFee(e.target.value)}
                          className="pl-9"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Current: ${(transfer.transferFee || 0).toLocaleString()}
                      </p>
                    </div>
                  )}

                  <div>
                    <Label htmlFor="startDate">Start Date</Label>
                    <div className="relative mt-2">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="startDate"
                        type="date"
                        value={proposedStartDate}
                        onChange={(e) => setProposedStartDate(e.target.value)}
                        className="pl-9"
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    {transfer.loanStartDate && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Current: {transfer.loanStartDate.toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <Button 
                onClick={handleSendMessage} 
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting ? (
                  'Sending...'
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Current Offer */}
          <Card>
            <CardHeader>
              <CardTitle>Current Offer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Annual Salary:</span>
                <span className="font-medium">${transfer.proposedSalary.toLocaleString()}</span>
              </div>
              
              {transfer.transferFee && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Transfer Fee:</span>
                  <span className="font-medium">${transfer.transferFee.toLocaleString()}</span>
                </div>
              )}
              
              {transfer.loanDuration && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration:</span>
                  <span className="font-medium">{transfer.loanDuration} months</span>
                </div>
              )}
              
              {transfer.loanStartDate && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Start Date:</span>
                  <span className="font-medium">{transfer.loanStartDate.toLocaleDateString()}</span>
                </div>
              )}
              
              <Separator />
              
              <div className="flex justify-between font-medium">
                <span>Total Cost:</span>
                <span className="text-primary">
                  ${((transfer.proposedSalary || 0) + (transfer.transferFee || 0)).toLocaleString()}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Participants */}
          <Card>
            <CardHeader>
              <CardTitle>Participants</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {developer && (
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={developer.avatar} alt={`${developer.firstName} ${developer.lastName}`} />
                    <AvatarFallback>
                      {developer.firstName[0]}{developer.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">{developer.firstName} {developer.lastName}</p>
                    <p className="text-xs text-muted-foreground">{developer.title}</p>
                  </div>
                  <User className="h-4 w-4 text-muted-foreground ml-auto" />
                </div>
              )}

              {fromCompany && (
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={fromCompany.logo} alt={fromCompany.name} />
                    <AvatarFallback>{fromCompany.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">{fromCompany.name}</p>
                    <p className="text-xs text-muted-foreground">Current Employer</p>
                  </div>
                  <Building2 className="h-4 w-4 text-muted-foreground ml-auto" />
                </div>
              )}

              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={toCompany.logo} alt={toCompany.name} />
                  <AvatarFallback>{toCompany.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm">{toCompany.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {transfer.placementType === 'employee_listing' ? 'Potential Employer' : 'Hiring Company'}
                  </p>
                </div>
                <Building2 className="h-4 w-4 text-primary ml-auto" />
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full" asChild>
                <Link href={`/transfers/${transfer.id}`}>
                  View Full Details
                </Link>
              </Button>
              
              <Button variant="outline" className="w-full" asChild>
                <Link href="/transfers">
                  Back to Transfers
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
