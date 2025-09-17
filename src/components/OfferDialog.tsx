'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DollarSign, 
  Calendar, 
  Clock, 
  Building2, 
  HandCoins,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { Developer } from '@/types';
import { useAppStore } from '@/store/useAppStore';
import { toast } from 'sonner';

interface OfferDialogProps {
  isOpen: boolean;
  onClose: () => void;
  developer: Developer;
}

interface OfferFormData {
  offerType: 'permanent' | 'loan';
  salary: number;
  transferFee: number;
  loanDuration?: number; // months
  startDate: string;
  message: string;
}

export function OfferDialog({ isOpen, onClose, developer }: OfferDialogProps) {
  const { currentUser } = useAppStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<OfferFormData>({
    offerType: 'permanent',
    salary: Math.round(developer.marketValue.current * 1.1), // 10% above market value
    transferFee: Math.round(developer.marketValue.current * 0.15), // 15% of market value as transfer fee
    startDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days from now
    message: ''
  });

  const updateFormData = (updates: Partial<OfferFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Validate form
      if (!formData.salary || formData.salary <= 0) {
        toast.error('Please enter a valid salary amount');
        return;
      }
      
      if (formData.offerType === 'permanent' && (!formData.transferFee || formData.transferFee <= 0)) {
        toast.error('Please enter a valid transfer fee for permanent offers');
        return;
      }
      
      if (formData.offerType === 'loan' && (!formData.loanDuration || formData.loanDuration <= 0)) {
        toast.error('Please select a loan duration');
        return;
      }
      
      if (!formData.startDate) {
        toast.error('Please select a start date');
        return;
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create the offer (in a real app, this would call your API)
      const offer = {
        id: `offer-${Date.now()}`,
        developerId: developer.id,
        fromCompanyId: currentUser.id,
        toCompanyId: developer.currentCompanyId || 'freelancer',
        type: formData.offerType,
        proposedSalary: formData.salary,
        transferFee: formData.offerType === 'permanent' ? formData.transferFee : undefined,
        loanDuration: formData.offerType === 'loan' ? formData.loanDuration : undefined,
        startDate: new Date(formData.startDate),
        message: formData.message,
        status: 'pending',
        createdAt: new Date()
      };
      
      console.log('Offer submitted:', offer);
      
      toast.success(`${formData.offerType === 'permanent' ? 'Transfer' : 'Loan'} offer sent to ${developer.firstName} ${developer.lastName}!`);
      onClose();
      
    } catch (error) {
      console.error('Error submitting offer:', error);
      toast.error('Failed to submit offer. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      offerType: 'permanent',
      salary: Math.round(developer.marketValue.current * 1.1),
      transferFee: Math.round(developer.marketValue.current * 0.15),
      startDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      message: ''
    });
  };

  const handleClose = () => {
    if (!isSubmitting) {
      resetForm();
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl w-[90vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <HandCoins className="h-5 w-5" />
            Make an Offer
          </DialogTitle>
          <DialogDescription>
            Submit an offer to hire {developer.firstName} {developer.lastName}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Developer Preview */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={developer.avatar} alt={`${developer.firstName} ${developer.lastName}`} />
                  <AvatarFallback>
                    {developer.firstName[0]}{developer.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-semibold">{developer.firstName} {developer.lastName}</h3>
                  <p className="text-sm text-muted-foreground">{developer.title}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                    <span>{developer.location}</span>
                    <span>{developer.experience} years exp</span>
                    <Badge variant={developer.availability === 'available' ? 'default' : 'secondary'}>
                      {developer.availability}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-green-600">
                    ${developer.marketValue.current.toLocaleString()}
                  </div>
                  <div className="text-xs text-muted-foreground">Market Value</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Offer Type Selection */}
          <div className="space-y-3">
            <Label>Offer Type</Label>
            <div className="grid grid-cols-2 gap-3">
              <Card 
                className={`cursor-pointer border-2 transition-colors ${
                  formData.offerType === 'permanent' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                }`}
                onClick={() => updateFormData({ offerType: 'permanent' })}
              >
                <CardContent className="p-4 text-center">
                  <Building2 className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <h4 className="font-medium">Permanent Transfer</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Full transfer with transfer fee
                  </p>
                </CardContent>
              </Card>
              
              <Card 
                className={`cursor-pointer border-2 transition-colors ${
                  formData.offerType === 'loan' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                }`}
                onClick={() => updateFormData({ offerType: 'loan' })}
              >
                <CardContent className="p-4 text-center">
                  <Clock className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                  <h4 className="font-medium">Temporary Loan</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Short-term collaboration
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Financial Terms */}
          <div className="grid gap-4">
            <div>
              <Label htmlFor="salary">Annual Salary Offer</Label>
              <div className="relative mt-2">
                <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="salary"
                  type="number"
                  placeholder="150000"
                  value={formData.salary || ''}
                  onChange={(e) => updateFormData({ salary: Number(e.target.value) })}
                  className="pl-9"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Market value: ${developer.marketValue.current.toLocaleString()} 
                {formData.salary > developer.marketValue.current && (
                  <span className="text-green-600 ml-1">
                    (+{(((formData.salary - developer.marketValue.current) / developer.marketValue.current) * 100).toFixed(1)}%)
                  </span>
                )}
              </p>
            </div>

            {formData.offerType === 'permanent' && (
              <div>
                <Label htmlFor="transferFee">Transfer Fee</Label>
                <div className="relative mt-2">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="transferFee"
                    type="number"
                    placeholder="25000"
                    value={formData.transferFee || ''}
                    onChange={(e) => updateFormData({ transferFee: Number(e.target.value) })}
                    className="pl-9"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  One-time fee paid to the current employer
                </p>
              </div>
            )}

            {formData.offerType === 'loan' && (
              <div>
                <Label htmlFor="loanDuration">Loan Duration</Label>
                <Select 
                  value={formData.loanDuration?.toString() || ''} 
                  onValueChange={(value) => updateFormData({ loanDuration: Number(value) })}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 month</SelectItem>
                    <SelectItem value="2">2 months</SelectItem>
                    <SelectItem value="3">3 months</SelectItem>
                    <SelectItem value="6">6 months</SelectItem>
                    <SelectItem value="9">9 months</SelectItem>
                    <SelectItem value="12">12 months</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          {/* Start Date */}
          <div>
            <Label htmlFor="startDate">Proposed Start Date</Label>
            <div className="relative mt-2">
              <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => updateFormData({ startDate: e.target.value })}
                className="pl-9"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <Label htmlFor="message">Message (Optional)</Label>
            <textarea
              id="message"
              placeholder="Tell them why you want to work with them and what makes this opportunity exciting..."
              value={formData.message}
              onChange={(e) => updateFormData({ message: e.target.value })}
              className="w-full h-20 p-3 border border-border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent mt-2"
            />
          </div>

          {/* Offer Summary */}
          <Card className="bg-muted/50">
            <CardContent className="p-4">
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Offer Summary
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Offer Type:</span>
                  <span className="font-medium capitalize">{formData.offerType}</span>
                </div>
                <div className="flex justify-between">
                  <span>Annual Salary:</span>
                  <span className="font-medium">${formData.salary?.toLocaleString()}</span>
                </div>
                {formData.offerType === 'permanent' && (
                  <div className="flex justify-between">
                    <span>Transfer Fee:</span>
                    <span className="font-medium">${formData.transferFee?.toLocaleString()}</span>
                  </div>
                )}
                {formData.offerType === 'loan' && formData.loanDuration && (
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span className="font-medium">{formData.loanDuration} months</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Start Date:</span>
                  <span className="font-medium">
                    {new Date(formData.startDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between border-t pt-2 font-medium">
                  <span>Total Cost:</span>
                  <span className="text-primary">
                    ${((formData.salary || 0) + (formData.offerType === 'permanent' ? (formData.transferFee || 0) : 0)).toLocaleString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Warning for availability */}
          {developer.availability !== 'available' && (
            <div className="flex items-center gap-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md">
              <AlertCircle className="h-4 w-4 text-yellow-600" />
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                This developer is currently {developer.availability}. They may need to negotiate with their current employer first.
              </p>
            </div>
          )}
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={handleClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? (
              <>Submitting Offer...</>
            ) : (
              <>
                <HandCoins className="mr-2 h-4 w-4" />
                Submit Offer
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
