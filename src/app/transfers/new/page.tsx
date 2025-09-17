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
  Building2,
  UserPlus,
  FileText,
  Briefcase,
  MapPin,
  Plus,
  X
} from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { getDeveloperById, mockDevelopers, getCompanyById } from '@/data';
import { Developer, TransferPlacementType } from '@/types';

interface TransferFormData {
  // Step 0: Placement Type Selection
  placementType: TransferPlacementType;
  
  // Step 1: Transfer Type & Target Selection
  transferType: 'transfer' | 'loan';
  developerId?: string; // For employee listing
  
  // For developer search postings
  jobTitle?: string;
  jobDescription?: string;
  requiredSkills?: string[];
  experienceLevel?: { min: number; max?: number };
  location?: string;
  
  // Step 2: Financial Terms
  proposedSalary?: number;
  salaryRange?: { min: number; max: number };
  transferFee?: number;
  
  // Step 3: Loan/Timeline Specific
  loanDuration?: number;
  loanStartDate?: string;
  
  // Step 4: Trial Period & Additional Terms
  hasTrialPeriod: boolean;
  trialDuration?: number;
  trialTerms?: string;
  
  // Step 5: Initial Message/Description
  initialMessage: string;
}

const initialFormData: TransferFormData = {
  placementType: 'employee_listing',
  transferType: 'transfer',
  developerId: '',
  requiredSkills: [],
  hasTrialPeriod: false,
  trialDuration: 30,
  initialMessage: ''
};

export default function NewTransferPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { currentUser } = useAppStore();
  const [currentStep, setCurrentStep] = useState(0); // Start with placement type selection
  const [formData, setFormData] = useState<TransferFormData>(initialFormData);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newSkill, setNewSkill] = useState('');

  // Pre-populate developer if provided in URL
  useEffect(() => {
    const developerId = searchParams.get('developerId');
    if (developerId) {
      const developer = getDeveloperById(developerId);
      if (developer) {
        setFormData(prev => ({ 
          ...prev, 
          developerId: developerId,
          placementType: 'employee_listing',
          proposedSalary: Math.round(developer.marketValue.current * 1.1)
        }));
        setCurrentStep(1);
      }
    }
  }, [searchParams]);

  // Redirect if not a company
  if (currentUser.role !== 'company') {
    router.push('/transfers');
    return null;
  }

  const totalSteps = 6; // 0: placement type, 1-5: form steps

  const updateFormData = (updates: Partial<TransferFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
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

  // Get company employees for employee listing
  const company = getCompanyById(currentUser.id);
  const companyEmployees = company ? mockDevelopers.filter(dev => 
    company.employees.includes(dev.id)
  ) : [];

  // Filter developers/employees based on search
  const getFilteredTargets = () => {
    const targets = formData.placementType === 'employee_listing' 
      ? companyEmployees 
      : mockDevelopers.filter(dev => dev.availability !== 'not-available');
    
    return targets.filter(dev => 
      dev.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dev.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dev.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dev.technicalSkills.some(skill => skill.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  };

  const selectedDeveloper = formData.developerId ? getDeveloperById(formData.developerId) : null;

  const addSkill = () => {
    if (newSkill.trim() && !formData.requiredSkills?.includes(newSkill.trim())) {
      updateFormData({
        requiredSkills: [...(formData.requiredSkills || []), newSkill.trim()]
      });
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    updateFormData({
      requiredSkills: formData.requiredSkills?.filter(skill => skill !== skillToRemove) || []
    });
  };

  const canProceedToNext = () => {
    switch (currentStep) {
      case 0:
        return formData.placementType;
      case 1:
        if (formData.placementType === 'employee_listing') {
          return formData.transferType && formData.developerId;
        } else {
          return formData.transferType && formData.jobTitle && formData.jobDescription;
        }
      case 2:
        if (formData.placementType === 'employee_listing') {
          return formData.proposedSalary && formData.proposedSalary > 0 && 
                 (formData.transferType === 'loan' || (formData.transferFee && formData.transferFee > 0));
        } else {
          return formData.salaryRange?.min && formData.salaryRange?.max && 
                 formData.salaryRange.min < formData.salaryRange.max;
        }
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
      case 0:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">Choose Placement Type</h3>
              <p className="text-muted-foreground">
                Select how you'd like to create your transfer request
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card 
                className={`cursor-pointer border-2 transition-all hover:scale-105 ${
                  formData.placementType === 'employee_listing' 
                    ? 'border-primary bg-primary/5 shadow-lg' 
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => updateFormData({ placementType: 'employee_listing' })}
              >
                <CardContent className="p-6 text-center">
                  <Users className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h4 className="text-lg font-semibold mb-2">Employee Transfer Listing</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    List one of your employees as available for transfer. Other companies can browse and make offers for your talented team members.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2 justify-center">
                    <Badge variant="secondary">Outbound Transfer</Badge>
                    <Badge variant="secondary">Employee Listing</Badge>
                  </div>
                </CardContent>
              </Card>
              
              <Card 
                className={`cursor-pointer border-2 transition-all hover:scale-105 ${
                  formData.placementType === 'developer_search' 
                    ? 'border-primary bg-primary/5 shadow-lg' 
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => updateFormData({ placementType: 'developer_search' })}
              >
                <CardContent className="p-6 text-center">
                  <Search className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                  <h4 className="text-lg font-semibold mb-2">Developer Search Posting</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Create a posting with specific requirements. Developers can browse your requirements and apply to join your team.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2 justify-center">
                    <Badge variant="secondary">Inbound Applications</Badge>
                    <Badge variant="secondary">Job Posting</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 1:
        if (formData.placementType === 'employee_listing') {
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
                        Full transfer of employee to another company
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
                <h3 className="text-lg font-semibold mb-4">Select Employee to List</h3>
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search your employees..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                  
                  <div className="grid gap-3 max-h-80 overflow-y-auto">
                    {getFilteredTargets().map((employee) => (
                      <Card 
                        key={employee.id}
                        className={`cursor-pointer border-2 transition-colors ${
                          formData.developerId === employee.id ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                        }`}
                        onClick={() => updateFormData({ developerId: employee.id })}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={employee.avatar} alt={`${employee.firstName} ${employee.lastName}`} />
                              <AvatarFallback>
                                {employee.firstName[0]}{employee.lastName[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <h4 className="font-medium">{employee.firstName} {employee.lastName}</h4>
                                <Badge variant="outline">Employee</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">{employee.title}</p>
                              <div className="flex flex-wrap gap-1 mt-2">
                                {employee.technicalSkills.slice(0, 3).map((skill) => (
                                  <Badge key={skill.name} variant="outline" className="text-xs">
                                    {skill.name}
                                  </Badge>
                                ))}
                                {employee.technicalSkills.length > 3 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{employee.technicalSkills.length - 3}
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-medium text-primary">
                                ${employee.marketValue.current.toLocaleString()}
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
        } else {
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
                      <h4 className="font-medium">Permanent Position</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Full-time role at your company
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
                      <h4 className="font-medium">Contract/Project</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Short-term project collaboration
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div>
                  <Label htmlFor="jobTitle">Job Title</Label>
                  <Input
                    id="jobTitle"
                    placeholder="e.g., Senior Frontend Developer, DevOps Engineer"
                    value={formData.jobTitle || ''}
                    onChange={(e) => updateFormData({ jobTitle: e.target.value })}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="jobDescription">Job Description</Label>
                  <textarea
                    id="jobDescription"
                    placeholder="Describe the role, responsibilities, and what makes this opportunity exciting..."
                    value={formData.jobDescription || ''}
                    onChange={(e) => updateFormData({ jobDescription: e.target.value })}
                    className="w-full h-32 p-3 border border-border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="location">Location</Label>
                  <div className="relative mt-2">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="location"
                      placeholder="e.g., San Francisco, CA / Remote / Hybrid"
                      value={formData.location || ''}
                      onChange={(e) => updateFormData({ location: e.target.value })}
                      className="pl-9"
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        }

      case 2:
        if (formData.placementType === 'employee_listing') {
          return (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Financial Terms</h3>
                
                <div className="grid gap-6">
                  <div>
                    <Label htmlFor="salary">Minimum Salary Expectation (Annual)</Label>
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
                        Employee's current market value: ${selectedDeveloper.marketValue.current.toLocaleString()}
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
                        Fee for transferring this employee to another company
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        } else {
          return (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Salary Range & Requirements</h3>
                
                <div className="grid gap-6">
                  <div>
                    <Label>Salary Range (Annual)</Label>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="number"
                          placeholder="120000"
                          value={formData.salaryRange?.min || ''}
                          onChange={(e) => updateFormData({ 
                            salaryRange: { 
                              ...formData.salaryRange, 
                              min: Number(e.target.value),
                              max: formData.salaryRange?.max || 0
                            } 
                          })}
                          className="pl-9"
                        />
                        <Label className="text-xs text-muted-foreground mt-1">Minimum</Label>
                      </div>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="number"
                          placeholder="180000"
                          value={formData.salaryRange?.max || ''}
                          onChange={(e) => updateFormData({ 
                            salaryRange: { 
                              ...formData.salaryRange, 
                              min: formData.salaryRange?.min || 0,
                              max: Number(e.target.value)
                            } 
                          })}
                          className="pl-9"
                        />
                        <Label className="text-xs text-muted-foreground mt-1">Maximum</Label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label>Experience Level (Years)</Label>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <div>
                        <Input
                          type="number"
                          placeholder="3"
                          value={formData.experienceLevel?.min || ''}
                          onChange={(e) => updateFormData({ 
                            experienceLevel: { 
                              ...formData.experienceLevel, 
                              min: Number(e.target.value)
                            } 
                          })}
                        />
                        <Label className="text-xs text-muted-foreground mt-1">Minimum</Label>
                      </div>
                      <div>
                        <Input
                          type="number"
                          placeholder="8"
                          value={formData.experienceLevel?.max || ''}
                          onChange={(e) => updateFormData({ 
                            experienceLevel: { 
                              ...formData.experienceLevel, 
                              max: Number(e.target.value)
                            } 
                          })}
                        />
                        <Label className="text-xs text-muted-foreground mt-1">Maximum (Optional)</Label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label>Required Skills</Label>
                    <div className="space-y-3 mt-2">
                      <div className="flex gap-2">
                        <Input
                          placeholder="e.g., React, Node.js, AWS"
                          value={newSkill}
                          onChange={(e) => setNewSkill(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                        />
                        <Button type="button" onClick={addSkill} size="icon" variant="outline">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      {formData.requiredSkills && formData.requiredSkills.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {formData.requiredSkills.map((skill, index) => (
                            <Badge key={index} variant="secondary" className="pr-1">
                              {skill}
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-4 w-4 ml-1 hover:bg-destructive hover:text-destructive-foreground"
                                onClick={() => removeSkill(skill)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }

      case 3:
        return (
          <div className="space-y-6">
            {formData.transferType === 'loan' ? (
              <>
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    {formData.placementType === 'employee_listing' ? 'Loan Details' : 'Project Timeline'}
                  </h3>
                  
                  <div className="grid gap-6">
                    <div>
                      <Label htmlFor="duration">Duration</Label>
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
                      <Label htmlFor="startDate">
                        {formData.placementType === 'employee_listing' ? 'Available From' : 'Project Start Date'}
                      </Label>
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
                <h3 className="text-lg font-semibold mb-2">Timeline Details Complete</h3>
                <p className="text-muted-foreground">
                  {formData.placementType === 'employee_listing' 
                    ? 'For permanent transfers, no additional timeline details are needed.' 
                    : 'For permanent positions, no additional timeline details are needed.'
                  }
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
              <h3 className="text-lg font-semibold mb-4">
                {formData.placementType === 'employee_listing' 
                  ? 'Employee Listing Description' 
                  : 'Additional Job Details'
                }
              </h3>
              <p className="text-muted-foreground mb-4">
                {formData.placementType === 'employee_listing' 
                  ? 'Describe your employee\'s strengths and what makes them a great transfer candidate.' 
                  : 'Provide additional details about the role and your company to attract the right candidates.'
                }
              </p>
              
              <textarea
                placeholder={formData.placementType === 'employee_listing' 
                  ? "This employee excels in [key strengths] and would be perfect for companies looking for [specific expertise]. They have successfully [achievements]..." 
                  : "We're looking for a talented developer to join our [team/project]. You'll be working on [exciting projects/technologies] and have the opportunity to [growth/impact]..."
                }
                value={formData.initialMessage}
                onChange={(e) => updateFormData({ initialMessage: e.target.value })}
                className="w-full h-32 p-3 border border-border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Summary */}
            <div className="bg-muted/50 rounded-lg p-4">
              <h4 className="font-medium mb-3">
                {formData.placementType === 'employee_listing' ? 'Listing' : 'Posting'} Summary
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Type:</span>
                  <span className="font-medium">
                    {formData.placementType === 'employee_listing' ? 'Employee Listing' : 'Developer Search'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Transfer Type:</span>
                  <span className="font-medium capitalize">{formData.transferType}</span>
                </div>
                {formData.placementType === 'employee_listing' ? (
                  <>
                    {selectedDeveloper && (
                      <div className="flex justify-between">
                        <span>Employee:</span>
                        <span className="font-medium">{selectedDeveloper.firstName} {selectedDeveloper.lastName}</span>
                      </div>
                    )}
                    {formData.proposedSalary && (
                      <div className="flex justify-between">
                        <span>Min Salary:</span>
                        <span className="font-medium">${formData.proposedSalary.toLocaleString()}</span>
                      </div>
                    )}
                    {formData.transferFee && (
                      <div className="flex justify-between">
                        <span>Transfer Fee:</span>
                        <span className="font-medium">${formData.transferFee.toLocaleString()}</span>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    {formData.jobTitle && (
                      <div className="flex justify-between">
                        <span>Position:</span>
                        <span className="font-medium">{formData.jobTitle}</span>
                      </div>
                    )}
                    {formData.salaryRange && (
                      <div className="flex justify-between">
                        <span>Salary Range:</span>
                        <span className="font-medium">
                          ${formData.salaryRange.min.toLocaleString()} - ${formData.salaryRange.max.toLocaleString()}
                        </span>
                      </div>
                    )}
                    {formData.requiredSkills && formData.requiredSkills.length > 0 && (
                      <div className="flex justify-between">
                        <span>Key Skills:</span>
                        <span className="font-medium">{formData.requiredSkills.slice(0, 3).join(', ')}</span>
                      </div>
                    )}
                  </>
                )}
                {formData.loanDuration && (
                  <div className="flex justify-between">
                    <span>Duration:</span>
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

  const getStepTitle = () => {
    if (currentStep === 0) return 'Placement Type';
    const stepNumber = currentStep;
    const totalFormSteps = 5;
    return `Step ${stepNumber} of ${totalFormSteps}`;
  };

  const getStepDescription = () => {
    switch (currentStep) {
      case 0:
        return "Choose how you want to create your transfer request";
      case 1:
        return formData.placementType === 'employee_listing' 
          ? "Choose transfer type and select the employee to list"
          : "Define the position details and requirements";
      case 2:
        return formData.placementType === 'employee_listing'
          ? "Set the financial terms for this transfer opportunity"
          : "Set salary range and specify required skills and experience";
      case 3:
        return formData.transferType === 'loan' 
          ? "Specify the timeline and start date" 
          : "Timeline confirmation";
      case 4:
        return "Configure optional trial period settings";
      case 5:
        return formData.placementType === 'employee_listing'
          ? "Review your listing and add employee description"
          : "Review your posting and add additional details";
      default:
        return "";
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
        
        <h1 className="text-3xl font-bold mb-2">
          Create Transfer {formData.placementType === 'employee_listing' ? 'Listing' : 'Posting'}
        </h1>
        <p className="text-muted-foreground">
          {formData.placementType === 'employee_listing' 
            ? 'List your employee for potential transfers to other companies'
            : 'Create a posting to find talented developers for your team'
          }
        </p>
      </div>

      {/* Progress Steps - Only show for form steps, not placement type selection */}
      {currentStep > 0 && (
        <div className="flex items-center justify-between mb-8 relative">
          <div className="absolute top-4 left-0 w-full h-0.5 bg-border -z-10"></div>
          <div 
            className="absolute top-4 left-0 h-0.5 bg-primary transition-all duration-300 -z-10"
            style={{ width: `${((currentStep - 1) / 4) * 100}%` }}
          ></div>
          
          {Array.from({ length: 5 }, (_, i) => i + 1).map((step) => (
            <div key={step} className="flex flex-col items-center">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 bg-background transition-colors ${
                  step < currentStep 
                    ? 'border-primary text-primary' 
                    : step === currentStep
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
                {step === 3 && 'Timeline'}
                {step === 4 && 'Options'}
                {step === 5 && 'Review'}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Form Content */}
      <Card>
        <CardHeader>
          <CardTitle>
            {getStepTitle()}
          </CardTitle>
          <CardDescription>
            {getStepDescription()}
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
            disabled={currentStep === 0}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          
          <div className="flex gap-2">
            {currentStep < totalSteps - 1 ? (
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
                    Creating {formData.placementType === 'employee_listing' ? 'Listing' : 'Posting'}...
                  </>
                ) : (
                  <>
                    Publish {formData.placementType === 'employee_listing' ? 'Listing' : 'Posting'}
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