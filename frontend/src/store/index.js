import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Auth store
export const useAuthStore = create(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      isAuthenticated: false,

      // Set token and update authentication state
      setToken: (token) => {
        set({ token, isAuthenticated: true });
      },

      // Set user data
      setUser: (user) => {
        set({ user });
      },

      // Clear authentication
      logout: () => {
        set({ token: null, user: null, isAuthenticated: false });
      },

      // Check if user is authenticated
      checkAuth: () => {
        const { token } = get();
        if (token) {
          set({ isAuthenticated: true });
          return true;
        }
        return false;
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ token: state.token, user: state.user }),
    }
  )
);

// UI store for global UI state
export const useUIStore = create((set) => ({
  isLoading: false,
  sidebarOpen: false,
  modalOpen: false,
  modalContent: null,

  setLoading: (isLoading) => set({ isLoading }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
  openModal: (content) => set({ modalOpen: true, modalContent: content }),
  closeModal: () => set({ modalOpen: false, modalContent: null }),
}));

// Blog filters store
export const useBlogFiltersStore = create((set) => ({
  category: '',
  tags: '',
  authorId: '',
  subcategory: '',

  setCategory: (category) => set({ category }),
  setTags: (tags) => set({ tags }),
  setAuthorId: (authorId) => set({ authorId }),
  setSubcategory: (subcategory) => set({ subcategory }),
  clearFilters: () => set({ category: '', tags: '', authorId: '', subcategory: '' }),
}));
