import { Company, TransferRecord } from '@/types';

export const mockCompanies: Company[] = [
  {
    id: 'comp-1',
    name: 'TechFlow Solutions',
    email: 'hr@techflow.com',
    logo: 'https://images.unsplash.com/photo-1549924231-f129b911e442?w=100&h=100&fit=crop',
    website: 'https://techflow.com',
    location: 'San Francisco, CA',
    size: 'medium',
    industry: 'SaaS',
    description: 'Leading provider of workflow automation solutions for enterprise clients. We help companies streamline their operations through innovative software with a focus on scalable, cloud-native solutions.',
    employees: ['dev-1', 'dev-2', 'dev-3', 'dev-4', 'dev-5', 'dev-6', 'dev-7', 'dev-8'],
    transferHistory: [
      {
        id: 'transfer-1',
        developerId: 'dev-1',
        fromCompanyId: 'comp-5',
        toCompanyId: 'comp-1',
        type: 'transfer',
        transferFee: 25000,
        salary: 145000,
        completedAt: new Date('2023-01-15'),
        status: 'successful'
      },
      {
        id: 'transfer-2',
        developerId: 'dev-2',
        fromCompanyId: 'comp-2',
        toCompanyId: 'comp-1',
        type: 'transfer',
        transferFee: 28000,
        salary: 135000,
        completedAt: new Date('2023-03-10'),
        status: 'successful'
      },
      {
        id: 'transfer-3',
        developerId: 'dev-3',
        fromCompanyId: 'comp-3',
        toCompanyId: 'comp-1',
        type: 'loan',
        transferFee: 15000,
        salary: 160000,
        completedAt: new Date('2023-05-20'),
        status: 'successful'
      },
      {
        id: 'transfer-4',
        developerId: 'dev-4',
        toCompanyId: 'comp-1',
        type: 'transfer',
        transferFee: 22000,
        salary: 125000,
        completedAt: new Date('2023-08-15'),
        status: 'successful'
      },
      {
        id: 'transfer-5',
        developerId: 'dev-5',
        fromCompanyId: 'comp-6',
        toCompanyId: 'comp-1',
        type: 'transfer',
        transferFee: 32000,
        salary: 155000,
        completedAt: new Date('2023-11-05'),
        status: 'successful'
      },
      {
        id: 'transfer-6',
        developerId: 'dev-6',
        toCompanyId: 'comp-1',
        type: 'loan',
        transferFee: 18000,
        salary: 140000,
        completedAt: new Date('2024-01-20'),
        status: 'successful'
      }
    ],
    stats: {
      totalTransfers: 15,
      totalLoans: 8,
      averageRating: 4.6,
      successfulHires: 23
    },
    createdAt: new Date('2020-03-15'),
    updatedAt: new Date('2024-02-15')
  },

  {
    id: 'comp-2',
    name: 'DataSphere Inc',
    email: 'talent@datasphere.com',
    logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop',
    website: 'https://datasphere.com',
    location: 'Austin, TX',
    size: 'large',
    industry: 'Big Data & Analytics',
    description: 'Data analytics platform helping businesses make data-driven decisions. We process billions of data points daily for Fortune 500 companies.',
    employees: [],
    transferHistory: [
      {
        id: 'transfer-2',
        developerId: 'dev-2',
        toCompanyId: 'comp-2',
        type: 'transfer',
        transferFee: 20000,
        salary: 135000,
        completedAt: new Date('2020-06-01'),
        status: 'successful'
      }
    ],
    stats: {
      totalTransfers: 15,
      totalLoans: 7,
      averageRating: 4.8,
      successfulHires: 22
    },
    createdAt: new Date('2019-01-10'),
    updatedAt: new Date('2024-01-30')
  },

  {
    id: 'comp-3',
    name: 'CloudNative Systems',
    email: 'careers@cloudnative.com',
    logo: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=100&h=100&fit=crop',
    website: 'https://cloudnative.com',
    location: 'Seattle, WA',
    size: 'medium',
    industry: 'Cloud Infrastructure',
    description: 'Cloud infrastructure and DevOps consulting company. We help enterprises migrate to cloud-native architectures and implement best practices.',
    employees: ['dev-3'],
    transferHistory: [
      {
        id: 'transfer-3',
        developerId: 'dev-3',
        toCompanyId: 'comp-3',
        type: 'transfer',
        transferFee: 30000,
        salary: 160000,
        completedAt: new Date('2022-08-01'),
        status: 'successful'
      }
    ],
    stats: {
      totalTransfers: 6,
      totalLoans: 4,
      averageRating: 4.9,
      successfulHires: 10
    },
    createdAt: new Date('2021-05-20'),
    updatedAt: new Date('2024-02-10')
  },

  {
    id: 'comp-4',
    name: 'MobileFirst Technologies',
    email: 'hr@mobilefirst.com',
    logo: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=100&h=100&fit=crop',
    website: 'https://mobilefirst.com',
    location: 'Miami, FL',
    size: 'small',
    industry: 'Mobile App Development',
    description: 'Specialized mobile app development company creating innovative iOS and Android applications for startups and enterprises.',
    employees: ['dev-4'],
    transferHistory: [
      {
        id: 'transfer-4',
        developerId: 'dev-4',
        toCompanyId: 'comp-4',
        type: 'transfer',
        transferFee: 18000,
        salary: 125000,
        completedAt: new Date('2022-05-20'),
        status: 'successful'
      }
    ],
    stats: {
      totalTransfers: 4,
      totalLoans: 2,
      averageRating: 4.4,
      successfulHires: 6
    },
    createdAt: new Date('2021-02-28'),
    updatedAt: new Date('2024-01-25')
  },

  {
    id: 'comp-5',
    name: 'StartupXYZ',
    email: 'team@startupxyz.com',
    logo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=100&h=100&fit=crop',
    website: 'https://startupxyz.com',
    location: 'San Francisco, CA',
    size: 'startup',
    industry: 'FinTech',
    description: 'Early-stage fintech startup building the next generation of digital banking solutions for millennials and Gen Z.',
    employees: [],
    transferHistory: [
      {
        id: 'transfer-5',
        developerId: 'dev-1',
        fromCompanyId: 'comp-5',
        toCompanyId: 'comp-1',
        type: 'transfer',
        transferFee: 25000,
        salary: 145000,
        completedAt: new Date('2023-01-15'),
        status: 'successful'
      }
    ],
    stats: {
      totalTransfers: 3,
      totalLoans: 1,
      averageRating: 4.2,
      successfulHires: 4
    },
    createdAt: new Date('2020-11-01'),
    updatedAt: new Date('2023-01-15')
  },

  {
    id: 'comp-6',
    name: 'DataTech Solutions',
    email: 'recruitment@datatech.com',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop',
    website: 'https://datatech.com',
    location: 'New York, NY',
    size: 'large',
    industry: 'Enterprise Software',
    description: 'Enterprise data management and analytics platform serving Fortune 1000 companies with mission-critical data solutions.',
    employees: [],
    transferHistory: [
      {
        id: 'transfer-6',
        developerId: 'dev-5',
        toCompanyId: 'comp-6',
        type: 'transfer',
        transferFee: 28000,
        salary: 155000,
        completedAt: new Date('2019-09-01'),
        status: 'successful'
      }
    ],
    stats: {
      totalTransfers: 12,
      totalLoans: 8,
      averageRating: 4.7,
      successfulHires: 20
    },
    createdAt: new Date('2018-06-15'),
    updatedAt: new Date('2024-02-05')
  },

  {
    id: 'comp-7',
    name: 'AI Innovations Lab',
    email: 'careers@ailab.com',
    logo: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=100&h=100&fit=crop',
    website: 'https://ailab.com',
    location: 'Boston, MA',
    size: 'medium',
    industry: 'Artificial Intelligence',
    description: 'Cutting-edge AI research and development company focusing on machine learning solutions for healthcare and finance industries.',
    employees: [],
    transferHistory: [],
    stats: {
      totalTransfers: 2,
      totalLoans: 1,
      averageRating: 4.8,
      successfulHires: 3
    },
    createdAt: new Date('2022-01-30'),
    updatedAt: new Date('2024-02-20')
  },

  {
    id: 'comp-8',
    name: 'EcoTech Ventures',
    email: 'jobs@ecotech.com',
    logo: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=100&h=100&fit=crop',
    website: 'https://ecotech.com',
    location: 'Portland, OR',
    size: 'small',
    industry: 'GreenTech',
    description: 'Sustainable technology company developing IoT solutions for environmental monitoring and smart city applications.',
    employees: [],
    transferHistory: [],
    stats: {
      totalTransfers: 1,
      totalLoans: 0,
      averageRating: 4.5,
      successfulHires: 1
    },
    createdAt: new Date('2023-03-15'),
    updatedAt: new Date('2024-01-10')
  },

  {
    id: 'comp-9',
    name: 'GameStudio Pro',
    email: 'talent@gamestudio.com',
    logo: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=100&h=100&fit=crop',
    website: 'https://gamestudio.com',
    location: 'Los Angeles, CA',
    size: 'medium',
    industry: 'Gaming',
    description: 'Independent game development studio creating immersive gaming experiences for PC and mobile platforms.',
    employees: [],
    transferHistory: [],
    stats: {
      totalTransfers: 5,
      totalLoans: 2,
      averageRating: 4.3,
      successfulHires: 7
    },
    createdAt: new Date('2021-08-20'),
    updatedAt: new Date('2024-01-15')
  },

  {
    id: 'comp-10',
    name: 'HealthTech Solutions',
    email: 'hr@healthtech.com',
    logo: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=100&h=100&fit=crop',
    website: 'https://healthtech.com',
    location: 'Chicago, IL',
    size: 'large',
    industry: 'HealthTech',
    description: 'Digital healthcare platform providing telemedicine and patient management solutions to healthcare providers nationwide.',
    employees: [],
    transferHistory: [],
    stats: {
      totalTransfers: 9,
      totalLoans: 5,
      averageRating: 4.6,
      successfulHires: 14
    },
    createdAt: new Date('2020-07-10'),
    updatedAt: new Date('2024-02-01')
  }
];
