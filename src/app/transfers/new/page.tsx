'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  ArrowRight, 
  Users, 
  DollarSign, 
  Calendar,
  CheckCircle,
  AlertCircle,
  Search,
  Clock,
  Building2
} from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { getDeveloperById, mockDevelopers } from '@/data';
import { Developer } from '@/types';

interface TransferFormData {
  // Step 1: Transfer Type & Developer
  transferType: 'transfer' | 'loan';
  developerId: string;
  
  // Step 2: Financial Terms
  proposedSalary: number;
  transferFee?: number;
  
  // Step 3: Loan Specific (if applicable)
  loanDuration?: number;
  loanStartDate?: string;
  
  // Step 4: Trial Period & Additional Terms
  hasTrialPeriod: boolean;
  trialDuration?: number;
  trialTerms?: string;
  
  // Step 5: Initial Message
  initialMessage: string;
}

const initialFormData: TransferFormData = {
  transferType: 'transfer',
  developerId: '',
  proposedSalary: 0,
  transferFee: 0,
  hasTrialPeriod: false,
  trialDuration: 30,
  trialTerms: '',
  initialMessage: ''
};

export default function NewTransferPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { currentUser } = useAppStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<TransferFormData>(initialFormData);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pre-populate developer if provided in URL
  useEffect(() => {
    const developerId = searchParams.get('developerId');
    if (developerId) {
      const developer = getDeveloperById(developerId);
      if (developer) {
        setFormData(prev => ({ 
          ...prev, 
          developerId: developerId,
          proposedSalary: Math.round(developer.marketValue.current * 1.1) // Suggest 10% above market value
        }));
        // If developer is pre-selected, start from step 2
        setCurrentStep(2);
      }
    }
  }, [searchParams]);

  // Redirect if not a company
  if (currentUser.role !== 'company') {
    router.push('/transfers');
    return null;
  }

  const totalSteps = 5;

  const updateFormData = (updates: Partial<TransferFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // In a real app, you would save this to your backend/state
    console.log('Transfer request created:', formData);
    
    setIsSubmitting(false);
    router.push('/transfers?success=created');
  };

  // Filter developers based on search
  const filteredDevelopers = mockDevelopers.filter(dev => 
    dev.availability !== 'not-available' &&
    (dev.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
     dev.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
     dev.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
     dev.technicalSkills.some(skill => skill.name.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  const selectedDeveloper = formData.developerId ? getDeveloperById(formData.developerId) : null;

  const canProceedToNext = () => {
    switch (currentStep) {
      case 1:
        return formData.transferType && formData.developerId;
      case 2:
        return formData.proposedSalary > 0 && (formData.transferType === 'loan' || (formData.transferFee && formData.transferFee > 0));
      case 3:
        return formData.transferType === 'transfer' || (formData.loanDuration && formData.loanStartDate);
      case 4:
        return !formData.hasTrialPeriod || (formData.trialDuration && formData.trialTerms);
      case 5:
        return formData.initialMessage.trim().length > 0;
      default:
        return false;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Transfer Type</h3>
              <div className="grid grid-cols-2 gap-4">
                <Card 
                  className={`cursor-pointer border-2 transition-colors ${
                    formData.transferType === 'transfer' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => updateFormData({ transferType: 'transfer' })}
                >
                  <CardContent className="p-4 text-center">
                    <Building2 className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <h4 className="font-medium">Permanent Transfer</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Full transfer of developer to your company
                    </p>
                  </CardContent>
                </Card>
                
                <Card 
                  className={`cursor-pointer border-2 transition-colors ${
                    formData.transferType === 'loan' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => updateFormData({ transferType: 'loan' })}
                >
                  <CardContent className="p-4 text-center">
                    <Clock className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                    <h4 className="font-medium">Temporary Loan</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Short-term collaboration for specific projects
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-4">Select Developer</h3>
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, title, or skills..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                
                <div className="grid gap-3 max-h-80 overflow-y-auto">
                  {filteredDevelopers.map((developer) => (
                    <Card 
                      key={developer.id}
                      className={`cursor-pointer border-2 transition-colors ${
                        formData.developerId === developer.id ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => updateFormData({ developerId: developer.id })}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={developer.avatar} alt={`${developer.firstName} ${developer.lastName}`} />
                            <AvatarFallback>
                              {developer.firstName[0]}{developer.lastName[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium">{developer.firstName} {developer.lastName}</h4>
                              <Badge variant={developer.availability === 'available' ? 'default' : 'secondary'}>
                                {developer.availability}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{developer.title}</p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {developer.technicalSkills.slice(0, 3).map((skill) => (
                                <Badge key={skill.name} variant="outline" className="text-xs">
                                  {skill.name}
                                </Badge>
                              ))}
                              {developer.technicalSkills.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{developer.technicalSkills.length - 3}
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium text-primary">
                              ${developer.marketValue.current.toLocaleString()}
                            </div>
                            <div className="text-xs text-muted-foreground">Market Value</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Financial Terms</h3>
              
              <div className="grid gap-6">
                <div>
                  <Label htmlFor="salary">Proposed Salary (Annual)</Label>
                  <div className="relative mt-2">
                    <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="salary"
                      type="number"
                      placeholder="150000"
                      value={formData.proposedSalary || ''}
                      onChange={(e) => updateFormData({ proposedSalary: Number(e.target.value) })}
                      className="pl-9"
                    />
                  </div>
                  {selectedDeveloper && (
                    <p className="text-sm text-muted-foreground mt-1">
                      Developer's current market value: ${selectedDeveloper.marketValue.current.toLocaleString()}
                    </p>
                  )}
                </div>

                {formData.transferType === 'transfer' && (
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
                    <p className="text-sm text-muted-foreground mt-1">
                      Typical transfer fees range from $15,000 - $50,000
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            {formData.transferType === 'loan' ? (
              <>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Loan Details</h3>
                  
                  <div className="grid gap-6">
                    <div>
                      <Label htmlFor="duration">Loan Duration</Label>
                      <Select onValueChange={(value) => updateFormData({ loanDuration: Number(value) })}>
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

                    <div>
                      <Label htmlFor="startDate">Proposed Start Date</Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={formData.loanStartDate || ''}
                        onChange={(e) => updateFormData({ loanStartDate: e.target.value })}
                        className="mt-2"
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Transfer Details Complete</h3>
                <p className="text-muted-foreground">
                  For permanent transfers, no additional timeline details are needed.
                </p>
              </div>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Trial Period (Optional)</h3>
              
              <div className="flex items-center space-x-2 mb-4">
                <Switch
                  id="trial-period"
                  checked={formData.hasTrialPeriod}
                  onCheckedChange={(checked) => updateFormData({ hasTrialPeriod: checked })}
                />
                <Label htmlFor="trial-period">Include trial period</Label>
              </div>

              {formData.hasTrialPeriod && (
                <div className="space-y-4 pl-6 border-l-2 border-primary/20">
                  <div>
                    <Label htmlFor="trialDuration">Trial Duration (days)</Label>
                    <Select 
                      value={formData.trialDuration?.toString() || '30'} 
                      onValueChange={(value) => updateFormData({ trialDuration: Number(value) })}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="14">14 days</SelectItem>
                        <SelectItem value="30">30 days</SelectItem>
                        <SelectItem value="45">45 days</SelectItem>
                        <SelectItem value="60">60 days</SelectItem>
                        <SelectItem value="90">90 days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="trialTerms">Trial Period Terms</Label>
                    <Input
                      id="trialTerms"
                      placeholder="e.g., Full evaluation with specific project goals and feedback sessions"
                      value={formData.trialTerms || ''}
                      onChange={(e) => updateFormData({ trialTerms: e.target.value })}
                      className="mt-2"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Initial Message</h3>
              <p className="text-muted-foreground mb-4">
                Write a message to the developer explaining your interest and the opportunity.
              </p>
              
              <textarea
                placeholder="Hi [Developer Name], we're excited about the possibility of having you join our team. We believe your expertise in [skills] would be perfect for our upcoming [project/role]..."
                value={formData.initialMessage}
                onChange={(e) => updateFormData({ initialMessage: e.target.value })}
                className="w-full h-32 p-3 border border-border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Summary */}
            <div className="bg-muted/50 rounded-lg p-4">
              <h4 className="font-medium mb-3">Request Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Type:</span>
                  <span className="font-medium capitalize">{formData.transferType}</span>
                </div>
                {selectedDeveloper && (
                  <div className="flex justify-between">
                    <span>Developer:</span>
                    <span className="font-medium">{selectedDeveloper.firstName} {selectedDeveloper.lastName}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Proposed Salary:</span>
                  <span className="font-medium">${formData.proposedSalary.toLocaleString()}</span>
                </div>
                {formData.transferFee && (
                  <div className="flex justify-between">
                    <span>Transfer Fee:</span>
                    <span className="font-medium">${formData.transferFee.toLocaleString()}</span>
                  </div>
                )}
                {formData.loanDuration && (
                  <div className="flex justify-between">
                    <span>Loan Duration:</span>
                    <span className="font-medium">{formData.loanDuration} months</span>
                  </div>
                )}
                {formData.hasTrialPeriod && (
                  <div className="flex justify-between">
                    <span>Trial Period:</span>
                    <span className="font-medium">{formData.trialDuration} days</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <Button variant="ghost" onClick={() => router.back()} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Transfers
        </Button>
        
        <h1 className="text-3xl font-bold mb-2">Create Transfer Request</h1>
        <p className="text-muted-foreground">
          Start a new {formData.transferType === 'loan' ? 'loan agreement' : 'transfer process'} with a talented developer
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-8 relative">
        <div className="absolute top-4 left-0 w-full h-0.5 bg-border -z-10"></div>
        <div 
          className="absolute top-4 left-0 h-0.5 bg-primary transition-all duration-300 -z-10"
          style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
        ></div>
        
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
          <div key={step} className="flex flex-col items-center">
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center border-2 bg-background transition-colors ${
                step <= currentStep 
                  ? 'border-primary text-primary' 
                  : 'border-border text-muted-foreground'
              }`}
            >
              {step < currentStep ? (
                <CheckCircle className="h-4 w-4 fill-current" />
              ) : (
                <span className="text-sm font-medium">{step}</span>
              )}
            </div>
            <span className="text-xs mt-2 text-center max-w-16">
              {step === 1 && 'Setup'}
              {step === 2 && 'Terms'}
              {step === 3 && 'Details'}
              {step === 4 && 'Options'}
              {step === 5 && 'Review'}
            </span>
          </div>
        ))}
      </div>

      {/* Form Content */}
      <Card>
        <CardHeader>
          <CardTitle>
            Step {currentStep} of {totalSteps}
          </CardTitle>
          <CardDescription>
            {currentStep === 1 && "Choose the type of collaboration and select a developer"}
            {currentStep === 2 && "Set the financial terms for this opportunity"}
            {currentStep === 3 && formData.transferType === 'loan' ? "Specify the loan timeline and start date" : "Transfer details confirmation"}
            {currentStep === 4 && "Configure optional trial period settings"}
            {currentStep === 5 && "Review your request and send initial message"}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="min-h-96">
          {renderStepContent()}
        </CardContent>
        
        {/* Navigation */}
        <div className="flex justify-between items-center p-6 border-t">
          <Button 
            variant="outline" 
            onClick={prevStep}
            disabled={currentStep === 1}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          
          <div className="flex gap-2">
            {currentStep < totalSteps ? (
              <Button 
                onClick={nextStep}
                disabled={!canProceedToNext()}
              >
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button 
                onClick={handleSubmit}
                disabled={!canProceedToNext() || isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    Creating Request...
                  </>
                ) : (
                  <>
                    Send Request
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
