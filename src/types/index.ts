// User Roles
export type UserRole = 'developer' | 'company';

// Developer Types
export interface Developer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
  title: string;
  location: string;
  availability: 'available' | 'employed' | 'on-loan' | 'not-available';
  employmentType: 'freelancer' | 'employee';
  currentCompanyId?: string;
  previousCompanies: CompanyHistory[];
  
  // Skills
  technicalSkills: Skill[];
  softSkills: SoftSkill[];
  
  // Ratings (1-10 scale)
  ratings: {
    performance: number;
    potential: number;
    overall: number;
    ratingsSources: RatingSource[];
  };
  
  // Achievements
  achievements: Achievement[];
  
  // Market value
  marketValue: {
    current: number;
    suggested: number;
    currency: string;
    lastUpdated: Date;
  };
  
  // Additional info
  experience: number; // years
  hourlyRate?: number;
  salaryExpectation?: number;
  bio: string;
  portfolio: string[];
  socialLinks: SocialLinks;
  
  createdAt: Date;
  updatedAt: Date;
}

export interface Skill {
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  yearsOfExperience: number;
  category: 'programming' | 'framework' | 'database' | 'tool' | 'cloud' | 'other';
}

export interface SoftSkill {
  name: string;
  level: 1 | 2 | 3 | 4 | 5; // 1-5 scale
}

export interface RatingSource {
  type: 'employer' | 'ai_analysis' | 'peer_review';
  companyId?: string;
  rating: number;
  comment?: string;
  date: Date;
}

export interface Achievement {
  id: string;
  type: 'project' | 'opensource' | 'certification' | 'award' | 'publication';
  title: string;
  description: string;
  date: Date;
  url?: string;
  verified: boolean;
}

export interface CompanyHistory {
  companyId: string;
  companyName: string;
  position: string;
  startDate: Date;
  endDate?: Date;
  type: 'employment' | 'loan';
}

export interface SocialLinks {
  github?: string;
  linkedin?: string;
  stackoverflow?: string;
  website?: string;
  twitter?: string;
}

// Company Types
export interface Company {
  id: string;
  name: string;
  email: string;
  logo?: string;
  website: string;
  location: string;
  size: 'startup' | 'small' | 'medium' | 'large' | 'enterprise';
  industry: string;
  description: string;
  
  // Employees
  employees: string[]; // Developer IDs
  
  // Transfer history
  transferHistory: TransferRecord[];
  
  // Company stats
  stats: {
    totalTransfers: number;
    totalLoans: number;
    averageRating: number;
    successfulHires: number;
  };
  
  createdAt: Date;
  updatedAt: Date;
}

// Transfer & Loan Types
export type TransferPlacementType = 'employee_listing' | 'developer_search';

export interface TransferRequest {
  id: string;
  type: 'transfer' | 'loan';
  placementType: TransferPlacementType;
  
  // For employee listings: the employee being listed
  // For developer search: undefined (will be filled when a developer applies)
  developerId?: string;
  
  fromCompanyId?: string;
  toCompanyId: string;
  status: 'pending' | 'negotiating' | 'approved' | 'rejected' | 'completed' | 'cancelled';
  
  // Financial terms
  transferFee?: number;
  proposedSalary: number;
  currentSalary?: number;
  
  // For developer search postings
  salaryRange?: {
    min: number;
    max: number;
  };
  
  // Loan specific
  loanDuration?: number; // months
  loanStartDate?: Date;
  
  // Job requirements for developer search
  requirements?: {
    skills: string[];
    experience: {
      min: number;
      max?: number;
    };
    location?: string;
    employmentType?: 'full-time' | 'contract' | 'loan';
    description: string;
  };
  
  // Trial period
  trialPeriod?: {
    duration: number; // days
    terms: string;
  };
  
  // Messages and negotiations
  negotiations: Negotiation[];
  
  // For developer search: applications from developers
  applications?: DeveloperApplication[];
  
  createdAt: Date;
  updatedAt: Date;
  approvedAt?: Date;
}

export interface DeveloperApplication {
  id: string;
  developerId: string;
  message: string;
  proposedSalary?: number;
  availableFrom?: Date;
  appliedAt: Date;
  status: 'pending' | 'reviewing' | 'shortlisted' | 'rejected' | 'accepted';
}

export interface Negotiation {
  id: string;
  fromRole: 'developer' | 'company';
  fromUserId: string;
  message: string;
  proposalChanges?: {
    salary?: number;
    transferFee?: number;
    startDate?: Date;
    trialPeriod?: number;
  };
  timestamp: Date;
}

export interface TransferRecord {
  id: string;
  developerId: string;
  fromCompanyId?: string;
  toCompanyId: string;
  type: 'transfer' | 'loan';
  transferFee: number;
  salary: number;
  completedAt: Date;
  status: 'successful' | 'failed';
}

// News & Activity Types
export interface NewsItem {
  id: string;
  type: 'transfer_completed' | 'transfer_rumor' | 'new_developer' | 'company_joined' | 'achievement' | 'market_update';
  title: string;
  description: string;
  relatedDeveloperId?: string;
  relatedCompanyId?: string;
  timestamp: Date;
  featured: boolean;
}

export interface LeaderboardEntry {
  developerId: string;
  developer: Developer;
  metric: 'market_value' | 'transfers' | 'rating' | 'achievements';
  value: number;
  rank: number;
}

// Search and Filter Types
export interface DeveloperFilters {
  skills?: string[];
  experience?: {
    min: number;
    max: number;
  };
  availability?: string[];
  location?: string;
  salaryRange?: {
    min: number;
    max: number;
  };
  marketValue?: {
    min: number;
    max: number;
  };
  rating?: {
    min: number;
    max: number;
  };
}

// App State Types
export interface AppState {
  currentUser: {
    role: UserRole;
    id: string;
    data: Developer | Company;
  };
  
  // Data
  developers: Developer[];
  companies: Company[];
  transferRequests: TransferRequest[];
  news: NewsItem[];
  
  // UI State
  loading: boolean;
  selectedDeveloper?: Developer;
  selectedCompany?: Company;
  filters: DeveloperFilters;
}

// Utility Types
export type SortOption = 
  | 'market_value_desc'
  | 'market_value_asc'
  | 'rating_desc'
  | 'experience_desc'
  | 'name_asc';
