import { mockDevelopers } from './mockDevelopers';
import { mockCompanies } from './mockCompanies';
import { mockTransferRequests } from './mockTransfers';
import { mockNews, mockLeaderboards } from './mockNews';

export {
  mockDevelopers,
  mockCompanies,
  mockTransferRequests,
  mockNews,
  mockLeaderboards
};

// Helper functions
export const getDeveloperById = (id: string) => mockDevelopers.find(dev => dev.id === id);
export const getCompanyById = (id: string) => mockCompanies.find(comp => comp.id === id);
export const getTransferRequestById = (id: string) => mockTransferRequests.find(req => req.id === id);

// Filter functions
export const getAvailableDevelopers = () => mockDevelopers.filter(dev => 
  dev.availability === 'available' || dev.availability === 'employed'
);

export const getDevelopersByCompany = (companyId: string) => 
  mockDevelopers.filter(dev => dev.currentCompanyId === companyId);

export const getTransferRequestsByDeveloper = (developerId: string) =>
  mockTransferRequests.filter(req => req.developerId === developerId);

export const getTransferRequestsByCompany = (companyId: string) =>
  mockTransferRequests.filter(req => 
    req.toCompanyId === companyId || req.fromCompanyId === companyId
  );

export const getFeaturedNews = () => mockNews.filter(news => news.featured);

export const getLeaderboard = (metric: 'market_value' | 'rating' | 'achievements') => {
  // Map the metric names to match the mockLeaderboards keys
  const metricKeyMap = {
    'market_value': 'marketValue',
    'rating': 'rating',
    'achievements': 'achievements'
  } as const;
  
  const leaderboardKey = metricKeyMap[metric];
  const leaderboard = mockLeaderboards[leaderboardKey];
  
  if (!leaderboard) {
    console.error(`Leaderboard not found for metric: ${metric}`);
    return [];
  }
  
  return leaderboard.map(entry => ({
    ...entry,
    developer: getDeveloperById(entry.developerId)!
  }));
};
