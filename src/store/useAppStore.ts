import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AppState, UserRole, Developer, Company, DeveloperFilters } from '@/types';
import { 
  mockDevelopers, 
  mockCompanies, 
  mockTransferRequests, 
  mockNews,
  getDeveloperById,
  getCompanyById
} from '@/data';

interface AppStore extends AppState {
  // Actions
  switchUserRole: (role: UserRole, userId: string) => void;
  setFilters: (filters: Partial<DeveloperFilters>) => void;
  clearFilters: () => void;
  setSelectedDeveloper: (developer: Developer | undefined) => void;
  setSelectedCompany: (company: Company | undefined) => void;
  setLoading: (loading: boolean) => void;
  
  // Computed
  getFilteredDevelopers: () => Developer[];
  getCurrentUserData: () => Company;
}

const defaultFilters: DeveloperFilters = {
  skills: [],
  availability: [],
  location: '',
  salaryRange: undefined,
  marketValue: undefined,
  experience: undefined,
  rating: undefined,
};

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      // Initial state
      currentUser: {
        role: 'company',
        id: 'comp-1',
        data: mockCompanies[0]
      },
      developers: mockDevelopers,
      companies: mockCompanies,
      transferRequests: mockTransferRequests,
      news: mockNews,
      loading: false,
      selectedDeveloper: undefined,
      selectedCompany: undefined,
      filters: defaultFilters,

      // Actions
      switchUserRole: (role: UserRole, userId: string) => {
        const data = getCompanyById(userId);
        
        if (data) {
          set({
            currentUser: {
              role,
              id: userId,
              data
            },
            selectedDeveloper: undefined,
            selectedCompany: undefined,
          });
        }
      },

      setFilters: (newFilters: Partial<DeveloperFilters>) => {
        set((state) => ({
          filters: { ...state.filters, ...newFilters }
        }));
      },

      clearFilters: () => {
        set({ filters: defaultFilters });
      },

      setSelectedDeveloper: (developer: Developer | undefined) => {
        set({ selectedDeveloper: developer });
      },

      setSelectedCompany: (company: Company | undefined) => {
        set({ selectedCompany: company });
      },

      setLoading: (loading: boolean) => {
        set({ loading });
      },

      // Computed functions
      getFilteredDevelopers: () => {
        const { developers, filters } = get();
        
        return developers.filter((developer) => {
          // Skills filter
          if (filters.skills && filters.skills.length > 0) {
            const hasRequiredSkills = filters.skills.every(skill =>
              developer.technicalSkills.some(techSkill =>
                techSkill.name.toLowerCase().includes(skill.toLowerCase())
              )
            );
            if (!hasRequiredSkills) return false;
          }

          // Availability filter
          if (filters.availability && filters.availability.length > 0) {
            if (!filters.availability.includes(developer.availability)) return false;
          }

          // Location filter
          if (filters.location) {
            if (!developer.location.toLowerCase().includes(filters.location.toLowerCase())) {
              return false;
            }
          }

          // Experience filter
          if (filters.experience) {
            if (developer.experience < filters.experience.min || 
                developer.experience > filters.experience.max) {
              return false;
            }
          }

          // Salary range filter
          if (filters.salaryRange) {
            const salary = developer.salaryExpectation || developer.hourlyRate || 0;
            if (salary < filters.salaryRange.min || salary > filters.salaryRange.max) {
              return false;
            }
          }

          // Market value filter
          if (filters.marketValue) {
            if (developer.marketValue.current < filters.marketValue.min ||
                developer.marketValue.current > filters.marketValue.max) {
              return false;
            }
          }

          // Rating filter
          if (filters.rating) {
            if (developer.ratings.overall < filters.rating.min ||
                developer.ratings.overall > filters.rating.max) {
              return false;
            }
          }

          return true;
        });
      },

      getCurrentUserData: () => {
        const { currentUser } = get();
        return currentUser.data as Company;
      },
    }),
    {
      name: 'it-transfer-storage',
      partialize: (state) => ({
        currentUser: state.currentUser,
        filters: state.filters,
      }),
    }
  )
);
