'use client'

import { useNavigationStore, PageType } from '@/store/useNavigationStore'
import { AnimatePresence, motion } from 'framer-motion'
import AnimatedBackground from '@/components/portfolio/AnimatedBackground'
import CustomCursor from '@/components/portfolio/CustomCursor'
import HamburgerMenu from '@/components/portfolio/HamburgerMenu'
import HomePage from '@/components/portfolio/HomePage'
import ResumePage from '@/components/portfolio/ResumePage'
import BlogPage from '@/components/portfolio/BlogPage'
import BlogPostPage from '@/components/portfolio/BlogPostPage'
import ProjectsPage from '@/components/portfolio/ProjectsPage'
import ProjectDetailPage from '@/components/portfolio/ProjectDetailPage'
import ContactPage from '@/components/portfolio/ContactPage'
import Footer from '@/components/portfolio/Footer'

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}

const pageTransition = {
  duration: 0.4,
  ease: [0.25, 0.1, 0.25, 1] as const,
}

function PageContent() {
  const { currentPage } = useNavigationStore()

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />
      case 'resume':
        return <ResumePage />
      case 'blog':
        return <BlogPage />
      case 'blog-post':
        return <BlogPostPage />
      case 'projects':
        return <ProjectsPage />
      case 'project-detail':
        return <ProjectDetailPage />
      case 'contact':
        return <ContactPage />
      default:
        return <HomePage />
    }
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentPage}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={pageTransition}
        className="relative z-10 flex-1"
      >
        {renderPage()}
      </motion.div>
    </AnimatePresence>
  )
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0A1128]">
      {/* Animated Particle Background */}
      <AnimatedBackground />

      {/* Custom Cursor */}
      <CustomCursor />

      {/* Hamburger Menu */}
      <HamburgerMenu />

      {/* Page Content */}
      <PageContent />

      {/* Footer */}
      <Footer />
    </div>
  )
}