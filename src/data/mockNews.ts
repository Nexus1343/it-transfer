import { NewsItem, LeaderboardEntry } from '@/types';

export const mockNews: NewsItem[] = [
  {
    id: 'news-1',
    type: 'transfer_completed',
    title: 'David Rodriguez Joins GameStudio Pro',
    description: 'Mobile developer David Rodriguez has completed his transfer from MobileFirst Technologies to GameStudio Pro for a $22,000 transfer fee. He will be working on the studio\'s upcoming cross-platform mobile games.',
    relatedDeveloperId: 'dev-4',
    relatedCompanyId: 'comp-9',
    timestamp: new Date('2024-02-17T15:30:00Z'),
    featured: true
  },

  {
    id: 'news-2',
    type: 'transfer_rumor',
    title: 'AI Innovations Lab Eyes Backend Talent',
    description: 'Sources close to AI Innovations Lab suggest they are actively seeking experienced backend developers for their new machine learning infrastructure initiative. Several high-profile developers are reportedly in talks.',
    relatedCompanyId: 'comp-7',
    timestamp: new Date('2024-02-22T09:45:00Z'),
    featured: true
  },

  {
    id: 'news-3',
    type: 'new_developer',
    title: 'Senior DevOps Engineer Priya Patel Joins the Platform',
    description: 'CloudNative Systems\' senior DevOps engineer Priya Patel has joined the IT Transfer Market platform. With a 9.1 overall rating and expertise in Kubernetes and AWS, she\'s already attracting attention from major tech companies.',
    relatedDeveloperId: 'dev-3',
    timestamp: new Date('2024-02-20T12:00:00Z'),
    featured: false
  },

  {
    id: 'news-4',
    type: 'achievement',
    title: 'Sarah Kim Launches Open Source Project',
    description: 'Backend engineer Sarah Kim has released a high-performance API gateway framework that has already gained over 1,000 GitHub stars. This achievement has boosted her market value and attracted multiple transfer inquiries.',
    relatedDeveloperId: 'dev-5',
    timestamp: new Date('2024-02-19T14:20:00Z'),
    featured: false
  },

  {
    id: 'news-5',
    type: 'company_joined',
    title: 'HealthTech Solutions Joins the Platform',
    description: 'Chicago-based HealthTech Solutions has officially joined the IT Transfer Market platform. The large healthcare technology company is actively looking for frontend and backend developers to expand their digital health platform.',
    relatedCompanyId: 'comp-10',
    timestamp: new Date('2024-02-18T11:30:00Z'),
    featured: false
  },

  {
    id: 'news-6',
    type: 'market_update',
    title: 'DevOps Engineers See 15% Market Value Increase',
    description: 'Market analysis shows DevOps engineers have experienced an average 15% increase in market value over the past quarter, driven by high demand for cloud-native expertise and infrastructure automation skills.',
    timestamp: new Date('2024-02-16T10:00:00Z'),
    featured: true
  },

  {
    id: 'news-7',
    type: 'transfer_rumor',
    title: 'Multiple Companies Compete for Full-Stack Talent',
    description: 'Industry insiders report that freelancer Marcus Johnson is receiving multiple offers from AI and sustainability tech companies. His versatile full-stack skills and proven track record make him a highly sought-after talent.',
    relatedDeveloperId: 'dev-2',
    timestamp: new Date('2024-02-15T16:45:00Z'),
    featured: false
  },

  {
    id: 'news-8',
    type: 'achievement',
    title: 'Alexandra Chen\'s React Library Hits 2K Stars',
    description: 'Frontend developer Alexandra Chen\'s popular React component library has surpassed 2,000 GitHub stars, cementing her reputation as a leading expert in modern React development patterns.',
    relatedDeveloperId: 'dev-1',
    timestamp: new Date('2024-02-14T13:15:00Z'),
    featured: false
  },

  {
    id: 'news-9',
    type: 'transfer_completed',
    title: 'Successful Completion of 3-Month DevOps Loan',
    description: 'Priya Patel has successfully completed her 3-month loan assignment with DataSphere Inc, where she led a major cloud migration project. The collaboration was deemed highly successful by both parties.',
    relatedDeveloperId: 'dev-3',
    relatedCompanyId: 'comp-2',
    timestamp: new Date('2024-02-01T17:00:00Z'),
    featured: false
  },

  {
    id: 'news-10',
    type: 'market_update',
    title: 'Q1 2024 Transfer Market Summary',
    description: 'The first quarter shows increased activity in the developer transfer market, with a 23% rise in completed transfers compared to Q4 2023. Mobile and AI specialists are seeing the highest demand.',
    timestamp: new Date('2024-01-31T09:00:00Z'),
    featured: false
  }
];

export const mockLeaderboards = {
  marketValue: [
    {
      developerId: 'dev-3',
      metric: 'market_value',
      value: 160000,
      rank: 1
    },
    {
      developerId: 'dev-5',
      metric: 'market_value', 
      value: 155000,
      rank: 2
    },
    {
      developerId: 'dev-1',
      metric: 'market_value',
      value: 145000,
      rank: 3
    },
    {
      developerId: 'dev-2',
      metric: 'market_value',
      value: 135000,
      rank: 4
    },
    {
      developerId: 'dev-4',
      metric: 'market_value',
      value: 125000,
      rank: 5
    }
  ],
  
  rating: [
    {
      developerId: 'dev-3',
      metric: 'rating',
      value: 9.1,
      rank: 1
    },
    {
      developerId: 'dev-5',
      metric: 'rating',
      value: 9.1,
      rank: 2
    },
    {
      developerId: 'dev-1',
      metric: 'rating',
      value: 9.0,
      rank: 3
    },
    {
      developerId: 'dev-2',
      metric: 'rating',
      value: 9.0,
      rank: 4
    },
    {
      developerId: 'dev-4',
      metric: 'rating',
      value: 8.9,
      rank: 5
    }
  ],

  achievements: [
    {
      developerId: 'dev-5',
      metric: 'achievements',
      value: 2,
      rank: 1
    },
    {
      developerId: 'dev-1',
      metric: 'achievements',
      value: 2,
      rank: 2
    },
    {
      developerId: 'dev-2',
      metric: 'achievements',
      value: 2,
      rank: 3
    },
    {
      developerId: 'dev-3',
      metric: 'achievements',
      value: 2,
      rank: 4
    },
    {
      developerId: 'dev-4',
      metric: 'achievements',
      value: 1,
      rank: 5
    }
  ]
} as Record<string, LeaderboardEntry[]>;
