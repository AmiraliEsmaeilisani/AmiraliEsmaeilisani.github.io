import { create } from 'zustand'

export type PageType = 'home' | 'resume' | 'blog' | 'blog-post' | 'projects' | 'project-detail' | 'contact'

interface NavigationState {
  currentPage: PageType
  selectedBlogPost: string | null
  selectedProject: string | null
  isMenuOpen: boolean
  navigateTo: (page: PageType) => void
  openBlogPost: (postId: string) => void
  openProject: (projectId: string) => void
  setMenuOpen: (open: boolean) => void
  goBack: () => void
}

export const useNavigationStore = create<NavigationState>((set, get) => ({
  currentPage: 'home',
  selectedBlogPost: null,
  selectedProject: null,
  isMenuOpen: false,
  navigateTo: (page) => {
    set({ currentPage: page, isMenuOpen: false })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  },
  openBlogPost: (postId) => {
    set({ currentPage: 'blog-post', selectedBlogPost: postId, isMenuOpen: false })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  },
  openProject: (projectId) => {
    set({ currentPage: 'project-detail', selectedProject: projectId, isMenuOpen: false })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  },
  setMenuOpen: (open) => set({ isMenuOpen: open }),
  goBack: () => {
    const state = get()
    if (state.currentPage === 'blog-post') {
      set({ currentPage: 'blog', selectedBlogPost: null })
    } else if (state.currentPage === 'project-detail') {
      set({ currentPage: 'projects', selectedProject: null })
    } else {
      set({ currentPage: 'home' })
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  },
}))