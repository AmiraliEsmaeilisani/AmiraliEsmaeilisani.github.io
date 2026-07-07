'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Github, Linkedin, Mail } from 'lucide-react'
import { useNavigationStore } from '@/store/useNavigationStore'

const menuItems: { label: string; page: 'home' | 'resume' | 'blog' | 'projects' | 'contact' }[] = [
  { label: 'خانه', page: 'home' },
  { label: 'رزومه', page: 'resume' },
  { label: 'بلاگ', page: 'blog' },
  { label: 'پروژه‌ها', page: 'projects' },
  { label: 'تماس با من', page: 'contact' },
]

const lineTransition = {
  duration: 0.4,
  ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
}

const itemVariants = {
  hidden: {
    opacity: 0,
    x: 60,
  },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
      delay: i * 0.08,
    },
  }),
  exit: (i: number) => ({
    opacity: 0,
    x: 60,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
      delay: i * 0.04,
    },
  }),
}

const socialLinks = [
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:contact@example.com', label: 'Email' },
]

export default function HamburgerMenu() {
  const { isMenuOpen, setMenuOpen, navigateTo } = useNavigationStore()

  const handleToggle = () => {
    setMenuOpen(!isMenuOpen)
  }

  const handleNavigate = (page: 'home' | 'resume' | 'blog' | 'projects' | 'contact') => {
    navigateTo(page)
  }

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={handleToggle}
        className="fixed top-6 right-6 z-50 flex flex-col justify-center items-center w-10 h-10 cursor-pointer"
        aria-label={isMenuOpen ? 'بستن منو' : 'باز کردن منو'}
        aria-expanded={isMenuOpen}
      >
        <div className="relative w-7 h-5">
          <motion.span
            className="absolute left-0 right-0 h-[2px] rounded-full"
            style={{
              backgroundColor: isMenuOpen ? '#FF5E00' : '#0066FF',
            }}
            animate={
              isMenuOpen
                ? { top: '50%', rotate: 45, translateY: '-50%' }
                : { top: 0, rotate: 0, translateY: 0 }
            }
            transition={lineTransition}
          />
          <motion.span
            className="absolute left-0 right-0 h-[2px] rounded-full"
            style={{
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: isMenuOpen ? '#FF5E00' : '#0066FF',
            }}
            animate={
              isMenuOpen
                ? { opacity: 0, scaleX: 0 }
                : { opacity: 1, scaleX: 1 }
            }
            transition={lineTransition}
          />
          <motion.span
            className="absolute left-0 right-0 h-[2px] rounded-full"
            style={{
              backgroundColor: isMenuOpen ? '#FF5E00' : '#0066FF',
            }}
            animate={
              isMenuOpen
                ? { bottom: '50%', rotate: -45, translateY: '50%' }
                : { bottom: 0, rotate: 0, translateY: 0 }
            }
            transition={lineTransition}
          />
        </div>
      </button>

      {/* Full-screen Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col items-center justify-center"
            style={{ backgroundColor: 'rgba(10, 17, 40, 0.98)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Menu Items */}
            <nav className="flex flex-col items-center gap-3">
              <AnimatePresence mode="popLayout">
                {menuItems.map((item, index) => (
                  <motion.button
                    key={item.page}
                    custom={index}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    onClick={() => handleNavigate(item.page)}
                    data-cursor-hover
                    className="text-[#F5F5F5] font-bold text-[1.75rem] sm:text-[2.5rem] leading-relaxed cursor-pointer transition-colors duration-300 hover:text-[#0066FF] text-right"
                    style={{ direction: 'rtl' }}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </AnimatePresence>
            </nav>

            {/* Social Links */}
            <motion.div
              className="absolute bottom-10 flex items-center gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{
                duration: 0.4,
                delay: menuItems.length * 0.08,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  data-cursor-hover
                  className="text-[#808080] transition-colors duration-300 hover:text-[#0066FF]"
                >
                  <social.icon size={20} strokeWidth={1.8} />
                </a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}