import { TransferRequest, Negotiation } from '@/types';

const sampleNegotiations: Negotiation[] = [
  {
    id: 'neg-1',
    fromRole: 'company',
    fromUserId: 'comp-7',
    message: 'We are interested in bringing Sarah to our AI team. Her backend expertise would be perfect for our machine learning infrastructure projects.',
    proposalChanges: {
      salary: 170000,
      transferFee: 35000,
      startDate: new Date('2024-04-01')
    },
    timestamp: new Date('2024-02-20T10:00:00Z')
  },
  {
    id: 'neg-2',
    fromRole: 'developer',
    fromUserId: 'dev-5',
    message: 'Thank you for the offer. I\'m very interested in the AI space. Could we discuss a slightly higher salary given my experience with high-performance systems?',
    proposalChanges: {
      salary: 180000
    },
    timestamp: new Date('2024-02-21T14:30:00Z')
  },
  {
    id: 'neg-3',
    fromRole: 'company',
    fromUserId: 'comp-7',
    message: 'We appreciate your counter-offer. We can meet you at $175,000 with a signing bonus of $10,000. How does that sound?',
    proposalChanges: {
      salary: 175000
    },
    timestamp: new Date('2024-02-22T09:15:00Z')
  }
];

export const mockTransferRequests: TransferRequest[] = [
  {
    id: 'req-1',
    type: 'transfer',
    placementType: 'employee_listing',
    developerId: 'dev-5',
    fromCompanyId: 'comp-1',
    toCompanyId: 'comp-7',
    status: 'negotiating',
    transferFee: 35000,
    proposedSalary: 175000,
    currentSalary: 155000,
    negotiations: sampleNegotiations,
    createdAt: new Date('2024-02-20'),
    updatedAt: new Date('2024-02-22')
  },

  {
    id: 'req-2',
    type: 'loan',
    placementType: 'developer_search',
    toCompanyId: 'comp-8',
    status: 'pending',
    proposedSalary: 140000,
    salaryRange: {
      min: 130000,
      max: 150000
    },
    requirements: {
      skills: ['Node.js', 'React', 'AWS', 'Docker'],
      experience: {
        min: 3,
        max: 8
      },
      location: 'Remote',
      employmentType: 'loan',
      description: 'Full-stack developer for IoT platform development'
    },
    loanDuration: 6,
    loanStartDate: new Date('2024-03-15'),
    trialPeriod: {
      duration: 30,
      terms: '30-day trial period with full evaluation and feedback'
    },
    negotiations: [
      {
        id: 'neg-4',
        fromRole: 'company',
        fromUserId: 'comp-8',
        message: 'We would like to bring Marcus on a 6-month loan to help with our sustainable IoT platform development. His full-stack expertise would be invaluable.',
        proposalChanges: {
          salary: 140000,
          startDate: new Date('2024-03-15')
        },
        timestamp: new Date('2024-02-18T11:00:00Z')
      }
    ],
    createdAt: new Date('2024-02-18'),
    updatedAt: new Date('2024-02-18')
  },

  {
    id: 'req-3',
    type: 'transfer',
    placementType: 'employee_listing',
    developerId: 'dev-4',
    fromCompanyId: 'comp-4',
    toCompanyId: 'comp-9',
    status: 'approved',
    transferFee: 22000,
    proposedSalary: 135000,
    currentSalary: 125000,
    negotiations: [
      {
        id: 'neg-5',
        fromRole: 'company',
        fromUserId: 'comp-9',
        message: 'We are looking for a mobile developer to join our game development team. David\'s cross-platform experience would be perfect for our upcoming mobile game projects.',
        proposalChanges: {
          salary: 135000,
          transferFee: 22000
        },
        timestamp: new Date('2024-02-15T13:20:00Z')
      },
      {
        id: 'neg-6',
        fromRole: 'developer',
        fromUserId: 'dev-4',
        message: 'I\'m excited about the gaming industry opportunity. The terms look good to me!',
        timestamp: new Date('2024-02-16T10:45:00Z')
      }
    ],
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date('2024-02-17'),
    approvedAt: new Date('2024-02-17')
  },

  {
    id: 'req-4',
    type: 'transfer',
    placementType: 'developer_search',
    toCompanyId: 'comp-10',
    status: 'rejected',
    proposedSalary: 155000,
    salaryRange: {
      min: 140000,
      max: 170000
    },
    requirements: {
      skills: ['React', 'TypeScript', 'GraphQL', 'Healthcare Systems'],
      experience: {
        min: 5,
        max: 10
      },
      location: 'San Francisco, CA',
      employmentType: 'full-time',
      description: 'Senior Frontend Developer for healthcare platform patient portal'
    },
    negotiations: [
      {
        id: 'neg-7',
        fromRole: 'company',
        fromUserId: 'comp-10',
        message: 'We are interested in Alexandra for our healthcare platform frontend development. Her React expertise would be perfect for our patient portal project.',
        proposalChanges: {
          salary: 155000,
          transferFee: 40000
        },
        timestamp: new Date('2024-02-10T09:30:00Z')
      },
      {
        id: 'neg-8',
        fromRole: 'developer',
        fromUserId: 'dev-1',
        message: 'Thank you for the offer, but I\'m very happy with my current role and the projects I\'m working on at TechFlow Solutions.',
        timestamp: new Date('2024-02-12T15:00:00Z')
      }
    ],
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-02-12')
  },

  {
    id: 'req-5',
    type: 'loan',
    placementType: 'employee_listing',
    developerId: 'dev-3',
    fromCompanyId: 'comp-3',
    toCompanyId: 'comp-2',
    status: 'completed',
    proposedSalary: 165000,
    currentSalary: 160000,
    loanDuration: 3,
    loanStartDate: new Date('2024-01-01'),
    negotiations: [
      {
        id: 'neg-9',
        fromRole: 'company',
        fromUserId: 'comp-2',
        message: 'We need DevOps expertise for a 3-month cloud migration project. Priya\'s skills would be perfect for this initiative.',
        proposalChanges: {
          salary: 165000,
          startDate: new Date('2024-01-01')
        },
        timestamp: new Date('2023-12-15T14:00:00Z')
      },
      {
        id: 'neg-10',
        fromRole: 'developer',
        fromUserId: 'dev-3',
        message: 'This sounds like an interesting project. I\'m happy to help with the cloud migration work.',
        timestamp: new Date('2023-12-16T11:20:00Z')
      }
    ],
    createdAt: new Date('2023-12-15'),
    updatedAt: new Date('2024-01-15'),
    approvedAt: new Date('2023-12-20')
  },

  {
    id: 'req-6',
    type: 'transfer',
    placementType: 'developer_search',
    toCompanyId: 'comp-7',
    status: 'pending',
    proposedSalary: 145000,
    salaryRange: {
      min: 130000,
      max: 160000
    },
    requirements: {
      skills: ['Python', 'Machine Learning', 'TensorFlow', 'Full-stack Development'],
      experience: {
        min: 4,
        max: 8
      },
      location: 'Boston, MA / Remote',
      employmentType: 'full-time',
      description: 'Full-stack developer transitioning into AI development'
    },
    trialPeriod: {
      duration: 45,
      terms: '45-day trial period with AI/ML project evaluation'
    },
    negotiations: [
      {
        id: 'neg-11',
        fromRole: 'company',
        fromUserId: 'comp-7',
        message: 'We\'re impressed with Marcus\'s full-stack background and think he could transition well into AI development. We\'d like to offer him a position with our team.',
        proposalChanges: {
          salary: 145000
        },
        timestamp: new Date('2024-02-25T10:15:00Z')
      }
    ],
    createdAt: new Date('2024-02-25'),
    updatedAt: new Date('2024-02-25')
  }
];
