import { Developer, Skill, SoftSkill, Achievement, RatingSource, CompanyHistory } from '@/types';

const technicalSkills: Record<string, Skill[]> = {
  frontend: [
    { name: 'React', level: 'expert', yearsOfExperience: 5, category: 'framework' },
    { name: 'TypeScript', level: 'advanced', yearsOfExperience: 4, category: 'programming' },
    { name: 'Next.js', level: 'advanced', yearsOfExperience: 3, category: 'framework' },
    { name: 'Tailwind CSS', level: 'advanced', yearsOfExperience: 2, category: 'framework' },
  ],
  backend: [
    { name: 'Node.js', level: 'expert', yearsOfExperience: 6, category: 'programming' },
    { name: 'Python', level: 'advanced', yearsOfExperience: 5, category: 'programming' },
    { name: 'PostgreSQL', level: 'advanced', yearsOfExperience: 4, category: 'database' },
    { name: 'MongoDB', level: 'intermediate', yearsOfExperience: 3, category: 'database' },
  ],
  fullstack: [
    { name: 'JavaScript', level: 'expert', yearsOfExperience: 7, category: 'programming' },
    { name: 'React', level: 'expert', yearsOfExperience: 5, category: 'framework' },
    { name: 'Node.js', level: 'advanced', yearsOfExperience: 4, category: 'programming' },
    { name: 'AWS', level: 'intermediate', yearsOfExperience: 3, category: 'cloud' },
  ],
  mobile: [
    { name: 'React Native', level: 'expert', yearsOfExperience: 4, category: 'framework' },
    { name: 'Swift', level: 'advanced', yearsOfExperience: 3, category: 'programming' },
    { name: 'Kotlin', level: 'intermediate', yearsOfExperience: 2, category: 'programming' },
  ],
  devops: [
    { name: 'Docker', level: 'expert', yearsOfExperience: 5, category: 'tool' },
    { name: 'Kubernetes', level: 'advanced', yearsOfExperience: 3, category: 'tool' },
    { name: 'AWS', level: 'expert', yearsOfExperience: 6, category: 'cloud' },
    { name: 'Terraform', level: 'advanced', yearsOfExperience: 2, category: 'tool' },
  ]
};

const commonSoftSkills: SoftSkill[] = [
  { name: 'Communication', level: 4 },
  { name: 'Team Leadership', level: 3 },
  { name: 'Problem Solving', level: 5 },
  { name: 'Adaptability', level: 4 },
  { name: 'Time Management', level: 4 },
];

const achievements: Achievement[] = [
  {
    id: '1',
    type: 'opensource',
    title: 'React Component Library',
    description: 'Created and maintained a popular React component library with 2k+ stars',
    date: new Date('2023-06-15'),
    url: 'https://github.com/example/react-components',
    verified: true
  },
  {
    id: '2',
    type: 'certification',
    title: 'AWS Solutions Architect',
    description: 'Professional level AWS certification',
    date: new Date('2023-03-20'),
    verified: true
  },
  {
    id: '3',
    type: 'project',
    title: 'E-commerce Platform Redesign',
    description: 'Led the complete redesign of a major e-commerce platform, increasing conversion by 25%',
    date: new Date('2023-09-10'),
    verified: true
  }
];

export const mockDevelopers: Developer[] = [
  {
    id: 'dev-1',
    firstName: 'Alexandra',
    lastName: 'Chen',
    email: 'alexandra.chen@email.com',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b68448c5?w=150&h=150&fit=crop&crop=face',
    title: 'Senior Frontend Developer',
    location: 'San Francisco, CA',
    availability: 'employed',
    employmentType: 'employee',
    currentCompanyId: 'comp-1',
    previousCompanies: [
      {
        companyId: 'comp-5',
        companyName: 'StartupXYZ',
        position: 'Frontend Developer',
        startDate: new Date('2021-01-15'),
        endDate: new Date('2022-12-31'),
        type: 'employment'
      }
    ],
    technicalSkills: [
      ...technicalSkills.frontend,
      { name: 'Vue.js', level: 'intermediate', yearsOfExperience: 2, category: 'framework' },
      { name: 'GraphQL', level: 'advanced', yearsOfExperience: 3, category: 'other' }
    ],
    softSkills: commonSoftSkills,
    ratings: {
      performance: 9.2,
      potential: 8.8,
      overall: 9.0,
      ratingsSources: [
        {
          type: 'employer',
          companyId: 'comp-1',
          rating: 9.2,
          comment: 'Exceptional frontend skills and team leadership',
          date: new Date('2024-01-15')
        },
        {
          type: 'ai_analysis',
          rating: 8.8,
          comment: 'Strong code quality and contribution patterns',
          date: new Date('2024-02-01')
        }
      ]
    },
    achievements: [achievements[0], achievements[2]],
    marketValue: {
      current: 145000,
      suggested: 155000,
      currency: 'USD',
      lastUpdated: new Date('2024-02-15')
    },
    experience: 6,
    salaryExpectation: 150000,
    bio: 'Passionate frontend developer with expertise in React ecosystem and modern web technologies. Love building user-centric applications that solve real problems.',
    portfolio: [
      'https://alexandra-portfolio.com',
      'https://github.com/alexandra-chen'
    ],
    socialLinks: {
      github: 'https://github.com/alexandra-chen',
      linkedin: 'https://linkedin.com/in/alexandra-chen',
      website: 'https://alexandra-portfolio.com'
    },
    createdAt: new Date('2022-01-15'),
    updatedAt: new Date('2024-02-15')
  },
  
  {
    id: 'dev-2',
    firstName: 'Marcus',
    lastName: 'Johnson',
    email: 'marcus.johnson@email.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    title: 'Full Stack Developer',
    location: 'Austin, TX',
    availability: 'available',
    employmentType: 'freelancer',
    previousCompanies: [
      {
        companyId: 'comp-2',
        companyName: 'TechCorp',
        position: 'Senior Developer',
        startDate: new Date('2020-06-01'),
        endDate: new Date('2023-12-31'),
        type: 'employment'
      }
    ],
    technicalSkills: [
      ...technicalSkills.fullstack,
      { name: 'Docker', level: 'advanced', yearsOfExperience: 4, category: 'tool' },
      { name: 'Redis', level: 'intermediate', yearsOfExperience: 2, category: 'database' }
    ],
    softSkills: [
      { name: 'Communication', level: 5 },
      { name: 'Team Leadership', level: 4 },
      { name: 'Problem Solving', level: 5 },
      { name: 'Mentoring', level: 4 },
      { name: 'Project Management', level: 3 },
    ],
    ratings: {
      performance: 8.9,
      potential: 9.1,
      overall: 9.0,
      ratingsSources: [
        {
          type: 'employer',
          companyId: 'comp-2',
          rating: 9.0,
          comment: 'Outstanding technical skills and reliability',
          date: new Date('2023-11-30')
        },
        {
          type: 'peer_review',
          rating: 8.8,
          comment: 'Great mentor and team player',
          date: new Date('2023-12-15')
        }
      ]
    },
    achievements: [achievements[1], achievements[2]],
    marketValue: {
      current: 135000,
      suggested: 140000,
      currency: 'USD',
      lastUpdated: new Date('2024-01-30')
    },
    experience: 8,
    hourlyRate: 85,
    salaryExpectation: 140000,
    bio: 'Versatile full-stack developer with strong expertise in JavaScript ecosystem and cloud technologies. Experienced in leading teams and delivering scalable solutions.',
    portfolio: [
      'https://marcus-dev.com',
      'https://github.com/marcus-johnson'
    ],
    socialLinks: {
      github: 'https://github.com/marcus-johnson',
      linkedin: 'https://linkedin.com/in/marcus-johnson',
      website: 'https://marcus-dev.com',
      stackoverflow: 'https://stackoverflow.com/users/marcus-johnson'
    },
    createdAt: new Date('2021-03-10'),
    updatedAt: new Date('2024-01-30')
  },

  {
    id: 'dev-3',
    firstName: 'Priya',
    lastName: 'Patel',
    email: 'priya.patel@email.com',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face',
    title: 'DevOps Engineer',
    location: 'Seattle, WA',
    availability: 'employed',
    employmentType: 'employee',
    currentCompanyId: 'comp-3',
    previousCompanies: [],
    technicalSkills: [
      ...technicalSkills.devops,
      { name: 'Jenkins', level: 'expert', yearsOfExperience: 5, category: 'tool' },
      { name: 'Python', level: 'advanced', yearsOfExperience: 4, category: 'programming' },
      { name: 'Prometheus', level: 'advanced', yearsOfExperience: 3, category: 'tool' }
    ],
    softSkills: [
      { name: 'Problem Solving', level: 5 },
      { name: 'Communication', level: 4 },
      { name: 'Automation Mindset', level: 5 },
      { name: 'System Thinking', level: 5 },
      { name: 'Reliability Focus', level: 5 },
    ],
    ratings: {
      performance: 9.4,
      potential: 8.7,
      overall: 9.1,
      ratingsSources: [
        {
          type: 'employer',
          companyId: 'comp-3',
          rating: 9.5,
          comment: 'Exceptional DevOps skills, improved deployment reliability by 99%',
          date: new Date('2024-01-20')
        }
      ]
    },
    achievements: [
      {
        id: '4',
        type: 'project',
        title: 'Zero-Downtime Deployment System',
        description: 'Architected and implemented a zero-downtime deployment system reducing deployment risks by 95%',
        date: new Date('2023-11-20'),
        verified: true
      },
      achievements[1]
    ],
    marketValue: {
      current: 160000,
      suggested: 170000,
      currency: 'USD',
      lastUpdated: new Date('2024-02-10')
    },
    experience: 7,
    salaryExpectation: 165000,
    bio: 'DevOps engineer passionate about building reliable, scalable infrastructure. Specialized in cloud-native technologies and automation.',
    portfolio: [
      'https://priya-devops.com',
      'https://github.com/priya-patel'
    ],
    socialLinks: {
      github: 'https://github.com/priya-patel',
      linkedin: 'https://linkedin.com/in/priya-patel',
      website: 'https://priya-devops.com'
    },
    createdAt: new Date('2022-08-01'),
    updatedAt: new Date('2024-02-10')
  },

  // Add more developers...
  {
    id: 'dev-4',
    firstName: 'David',
    lastName: 'Rodriguez',
    email: 'david.rodriguez@email.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    title: 'Mobile Developer',
    location: 'Miami, FL',
    availability: 'on-loan',
    employmentType: 'employee',
    currentCompanyId: 'comp-4',
    previousCompanies: [],
    technicalSkills: [
      ...technicalSkills.mobile,
      { name: 'Flutter', level: 'expert', yearsOfExperience: 3, category: 'framework' },
      { name: 'Firebase', level: 'advanced', yearsOfExperience: 4, category: 'cloud' }
    ],
    softSkills: [
      { name: 'User Experience Focus', level: 5 },
      { name: 'Communication', level: 4 },
      { name: 'Innovation', level: 5 },
      { name: 'Detail Oriented', level: 4 },
      { name: 'Cross-platform Thinking', level: 5 },
    ],
    ratings: {
      performance: 8.7,
      potential: 9.2,
      overall: 8.9,
      ratingsSources: [
        {
          type: 'employer',
          companyId: 'comp-4',
          rating: 8.8,
          comment: 'Excellent mobile development skills and user-focused approach',
          date: new Date('2024-01-10')
        }
      ]
    },
    achievements: [
      {
        id: '5',
        type: 'project',
        title: 'Cross-Platform Fitness App',
        description: 'Developed a cross-platform fitness app with 100k+ downloads and 4.8 star rating',
        date: new Date('2023-08-15'),
        verified: true
      }
    ],
    marketValue: {
      current: 125000,
      suggested: 135000,
      currency: 'USD',
      lastUpdated: new Date('2024-01-25')
    },
    experience: 5,
    salaryExpectation: 130000,
    bio: 'Mobile developer specializing in cross-platform applications. Passionate about creating intuitive user experiences and performance optimization.',
    portfolio: [
      'https://david-mobile.dev',
      'https://github.com/david-rodriguez'
    ],
    socialLinks: {
      github: 'https://github.com/david-rodriguez',
      linkedin: 'https://linkedin.com/in/david-rodriguez-mobile',
      website: 'https://david-mobile.dev'
    },
    createdAt: new Date('2022-05-20'),
    updatedAt: new Date('2024-01-25')
  },

  {
    id: 'dev-5',
    firstName: 'Sarah',
    lastName: 'Kim',
    email: 'sarah.kim@email.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    title: 'Backend Engineer',
    location: 'New York, NY',
    availability: 'available',
    employmentType: 'freelancer',
    previousCompanies: [
      {
        companyId: 'comp-6',
        companyName: 'DataTech Solutions',
        position: 'Senior Backend Developer',
        startDate: new Date('2019-09-01'),
        endDate: new Date('2023-08-31'),
        type: 'employment'
      }
    ],
    technicalSkills: [
      ...technicalSkills.backend,
      { name: 'Java', level: 'expert', yearsOfExperience: 8, category: 'programming' },
      { name: 'Spring Boot', level: 'expert', yearsOfExperience: 6, category: 'framework' },
      { name: 'Elasticsearch', level: 'advanced', yearsOfExperience: 4, category: 'database' }
    ],
    softSkills: [
      { name: 'System Design', level: 5 },
      { name: 'Performance Optimization', level: 5 },
      { name: 'Communication', level: 4 },
      { name: 'Code Review', level: 5 },
      { name: 'Mentoring', level: 4 },
    ],
    ratings: {
      performance: 9.3,
      potential: 8.9,
      overall: 9.1,
      ratingsSources: [
        {
          type: 'employer',
          companyId: 'comp-6',
          rating: 9.4,
          comment: 'Outstanding backend architecture skills and system design expertise',
          date: new Date('2023-07-30')
        },
        {
          type: 'peer_review',
          rating: 9.2,
          comment: 'Excellent mentor and code reviewer',
          date: new Date('2023-08-15')
        }
      ]
    },
    achievements: [
      {
        id: '6',
        type: 'project',
        title: 'High-Performance API Gateway',
        description: 'Designed and built a high-performance API gateway handling 10M+ requests/day with 99.99% uptime',
        date: new Date('2023-05-20'),
        verified: true
      },
      achievements[1]
    ],
    marketValue: {
      current: 155000,
      suggested: 165000,
      currency: 'USD',
      lastUpdated: new Date('2024-02-05')
    },
    experience: 9,
    hourlyRate: 95,
    salaryExpectation: 160000,
    bio: 'Senior backend engineer with expertise in building scalable, high-performance systems. Passionate about clean architecture and mentoring junior developers.',
    portfolio: [
      'https://sarah-backend.dev',
      'https://github.com/sarah-kim'
    ],
    socialLinks: {
      github: 'https://github.com/sarah-kim',
      linkedin: 'https://linkedin.com/in/sarah-kim-backend',
      website: 'https://sarah-backend.dev',
      stackoverflow: 'https://stackoverflow.com/users/sarah-kim'
    },
    createdAt: new Date('2021-11-10'),
    updatedAt: new Date('2024-02-05')
  },

  // Additional team members for TechFlow Solutions
  {
    id: 'dev-6',
    firstName: 'David',
    lastName: 'Rodriguez',
    email: 'david.rodriguez@techflow.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    title: 'Frontend Architect',
    location: 'San Francisco, CA',
    availability: 'employed',
    employmentType: 'employee',
    currentCompanyId: 'comp-1',
    previousCompanies: [
      {
        companyId: 'comp-2',
        companyName: 'DataSphere Inc',
        position: 'Senior Frontend Developer',
        startDate: new Date('2019-03-01'),
        endDate: new Date('2022-08-31'),
        type: 'employment'
      }
    ],
    technicalSkills: technicalSkills.frontend,
    softSkills: [
      { name: 'UI/UX Design', level: 5 },
      { name: 'Team Leadership', level: 4 },
      { name: 'Communication', level: 5 },
      { name: 'Creative Problem Solving', level: 4 }
    ],
    ratings: {
      performance: 9.1,
      potential: 8.8,
      overall: 9.0,
      ratingsSources: [
        {
          type: 'employer',
          companyId: 'comp-1',
          rating: 9.1,
          comment: 'Excellent frontend architecture decisions and team mentoring',
          date: new Date('2024-01-15')
        }
      ]
    },
    achievements: [
      {
        id: '7',
        type: 'project',
        title: 'Component Design System',
        description: 'Built a comprehensive React component library used across 20+ products',
        date: new Date('2023-09-15'),
        verified: true
      },
      achievements[2]
    ],
    marketValue: {
      current: 148000,
      suggested: 155000,
      currency: 'USD',
      lastUpdated: new Date('2024-02-01')
    },
    experience: 7,
    hourlyRate: 85,
    salaryExpectation: 150000,
    bio: 'Frontend architect specializing in scalable React applications and design systems. Passionate about creating exceptional user experiences and leading frontend teams.',
    portfolio: [
      'https://davidrodriguez.dev',
      'https://github.com/drodriguez-fe'
    ],
    socialLinks: {
      github: 'https://github.com/drodriguez-fe',
      linkedin: 'https://linkedin.com/in/david-rodriguez-frontend',
      website: 'https://davidrodriguez.dev'
    },
    createdAt: new Date('2022-09-01'),
    updatedAt: new Date('2024-02-01')
  },

  {
    id: 'dev-7',
    firstName: 'Lisa',
    lastName: 'Wang',
    email: 'lisa.wang@techflow.com',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b1c0?w=150&h=150&fit=crop',
    title: 'DevOps Engineer',
    location: 'San Francisco, CA',
    availability: 'employed',
    employmentType: 'employee',
    currentCompanyId: 'comp-1',
    previousCompanies: [
      {
        companyId: 'comp-3',
        companyName: 'CloudNative Systems',
        position: 'Cloud Engineer',
        startDate: new Date('2020-06-01'),
        endDate: new Date('2023-02-28'),
        type: 'employment'
      }
    ],
    technicalSkills: technicalSkills.devops,
    softSkills: [
      { name: 'System Thinking', level: 5 },
      { name: 'Problem Solving', level: 5 },
      { name: 'Automation', level: 4 },
      { name: 'Team Collaboration', level: 4 }
    ],
    ratings: {
      performance: 9.3,
      potential: 9.0,
      overall: 9.2,
      ratingsSources: [
        {
          type: 'employer',
          companyId: 'comp-1',
          rating: 9.3,
          comment: 'Outstanding DevOps practices and infrastructure automation',
          date: new Date('2024-01-30')
        }
      ]
    },
    achievements: [
      {
        id: '8',
        type: 'project',
        title: 'CI/CD Pipeline Optimization',
        description: 'Reduced deployment time by 75% and improved system reliability to 99.95% uptime',
        date: new Date('2023-11-10'),
        verified: true
      },
      achievements[3]
    ],
    marketValue: {
      current: 152000,
      suggested: 160000,
      currency: 'USD',
      lastUpdated: new Date('2024-02-10')
    },
    experience: 6,
    hourlyRate: 90,
    salaryExpectation: 155000,
    bio: 'DevOps engineer focused on cloud infrastructure, automation, and reliability. Expert in Kubernetes, AWS, and building scalable deployment pipelines.',
    portfolio: [
      'https://lisawang.dev',
      'https://github.com/lisa-devops'
    ],
    socialLinks: {
      github: 'https://github.com/lisa-devops',
      linkedin: 'https://linkedin.com/in/lisa-wang-devops',
      website: 'https://lisawang.dev'
    },
    createdAt: new Date('2023-03-01'),
    updatedAt: new Date('2024-02-10')
  },

  {
    id: 'dev-8',
    firstName: 'James',
    lastName: 'Thompson',
    email: 'james.thompson@techflow.com', 
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
    title: 'Product Engineer',
    location: 'San Francisco, CA',
    availability: 'employed',
    employmentType: 'employee',
    currentCompanyId: 'comp-1',
    previousCompanies: [
      {
        companyId: 'comp-4',
        companyName: 'MobileFirst Technologies',
        position: 'Full Stack Developer',
        startDate: new Date('2021-01-15'),
        endDate: new Date('2023-06-30'),
        type: 'employment'
      }
    ],
    technicalSkills: technicalSkills.fullstack,
    softSkills: [
      { name: 'Product Thinking', level: 5 },
      { name: 'User Empathy', level: 4 },
      { name: 'Cross-functional Collaboration', level: 5 },
      { name: 'Strategic Planning', level: 4 }
    ],
    ratings: {
      performance: 8.9,
      potential: 9.2,
      overall: 9.0,
      ratingsSources: [
        {
          type: 'employer',
          companyId: 'comp-1',
          rating: 8.9,
          comment: 'Exceptional product sense and ability to translate business needs into technical solutions',
          date: new Date('2024-02-05')
        }
      ]
    },
    achievements: [
      {
        id: '9',
        type: 'project',
        title: 'Customer Analytics Platform',
        description: 'Built analytics platform that increased customer retention by 40% and reduced churn',
        date: new Date('2023-12-01'),
        verified: true
      },
      achievements[0]
    ],
    marketValue: {
      current: 142000,
      suggested: 150000,
      currency: 'USD',
      lastUpdated: new Date('2024-02-05')
    },
    experience: 5,
    hourlyRate: 80,
    salaryExpectation: 145000,
    bio: 'Product-focused engineer with strong full-stack skills. Bridges the gap between technical implementation and business value, with a passion for user-centric solutions.',
    portfolio: [
      'https://jamesthompson.dev',
      'https://github.com/james-product'
    ],
    socialLinks: {
      github: 'https://github.com/james-product',
      linkedin: 'https://linkedin.com/in/james-thompson-product',
      website: 'https://jamesthompson.dev'
    },
    createdAt: new Date('2023-07-01'),
    updatedAt: new Date('2024-02-05')
  }
];
