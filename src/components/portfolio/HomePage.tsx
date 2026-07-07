'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useNavigationStore } from '@/store/useNavigationStore'
import { blogPosts, projects } from '@/data/portfolio-data'

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const scrollReveal = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
}

function LtrText({ children }: { children: React.ReactNode }) {
  return (
    <span dir="ltr" className="inline-block">
      {children}
    </span>
  )
}

export default function HomePage() {
  const { navigateTo, openBlogPost, openProject } = useNavigationStore()
  const blogSectionRef = useRef<HTMLDivElement>(null)
  const projectsSectionRef = useRef<HTMLDivElement>(null)
  const blogInView = useInView(blogSectionRef, { once: true, margin: '-80px' })
  const projectsInView = useInView(projectsSectionRef, { once: true, margin: '-80px' })

  const latestPosts = blogPosts.slice(0, 2)
  const featuredProjects = projects.slice(0, 3)

  return (
    <div className="min-h-screen">
      {/* ========== Hero Section ========== */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6">
        <motion.div
          className="text-center max-w-3xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4"
            style={{ color: '#F5F5F5' }}
            variants={fadeInUp}
            custom={0}
          >
            مهدی احمدی
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl mb-3"
            style={{ color: '#B0B0B0' }}
            variants={fadeInUp}
            custom={1}
          >
            دانشجوی مهندسی مکانیک | علاقه‌مند به هوش مصنوعی و دیجیتال توئین
          </motion.p>

          <motion.p
            className="text-base md:text-lg mb-10"
            style={{ color: '#0066FF' }}
            variants={fadeInUp}
            custom={2}
          >
            ترکیب دانش مهندسی با فناوری‌های نوین
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center justify-center gap-4"
            variants={fadeInUp}
            custom={3}
          >
            <button
              onClick={() => navigateTo('resume')}
              data-cursor-hover
              className="rounded-full px-8 py-3 text-white font-medium transition-all duration-300 cursor-pointer"
              style={{
                backgroundColor: '#FF5E00',
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLElement).style.backgroundColor = '#FF7A33'
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLElement).style.backgroundColor = '#FF5E00'
              }}
            >
              رزومه من
            </button>

            <button
              onClick={() => navigateTo('projects')}
              data-cursor-hover
              className="rounded-full px-8 py-3 font-medium transition-all duration-300 cursor-pointer"
              style={{
                border: '2px solid #0066FF',
                color: '#0066FF',
                backgroundColor: 'transparent',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.backgroundColor = '#0066FF'
                el.style.color = '#FFFFFF'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.backgroundColor = 'transparent'
                el.style.color = '#0066FF'
              }}
            >
              پروژه‌ها
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll Down Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <ChevronDown className="w-6 h-6" style={{ color: '#B0B0B0' }} />
        </motion.div>
      </section>

      {/* ========== Latest Blog Posts Section ========== */}
      <section ref={blogSectionRef} className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            animate={blogInView ? 'visible' : 'hidden'}
            variants={scrollReveal}
          >
            <h2
              className="text-2xl md:text-3xl font-bold mb-2"
              style={{ color: '#F5F5F5' }}
            >
              آخرین نوشته‌ها
            </h2>
            <div
              className="w-16 h-1 rounded-full mb-10"
              style={{ backgroundColor: '#0066FF' }}
            />
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
            initial="hidden"
            animate={blogInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
          >
            {latestPosts.map((post, index) => (
              <motion.article
                key={post.id}
                className="interactive rounded-2xl overflow-hidden cursor-pointer border-l-[3px] border-l-transparent transition-all duration-300"
                style={{
                  backgroundColor: '#0A1128',
                  borderColor: '#1C39BB30',
                  borderLeftWidth: '3px',
                }}
                variants={scrollReveal}
                onClick={() => openBlogPost(post.id)}
                data-cursor-hover
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderLeftColor = '#0066FF'
                  el.style.boxShadow = '0 0 20px rgba(0, 102, 255, 0.1)'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderLeftColor = 'transparent'
                  el.style.boxShadow = 'none'
                }}
              >
                {/* Colored Placeholder */}
                <div
                  className="h-40"
                  style={{
                    background: 'linear-gradient(135deg, #0A1128, rgba(28, 57, 187, 0.19))',
                  }}
                />

                <div className="p-6">
                  <h3
                    className="text-lg font-bold mb-2 line-clamp-2"
                    style={{ color: '#F5F5F5' }}
                  >
                    {post.title}
                  </h3>

                  <p
                    className="text-sm mb-3"
                    style={{ color: '#B0B0B0' }}
                  >
                    {post.date}
                  </p>

                  <p
                    className="text-sm leading-relaxed mb-4 line-clamp-2"
                    style={{ color: '#B0B0B0' }}
                  >
                    {post.summary}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1 rounded-full"
                        style={{
                          backgroundColor: 'rgba(255, 94, 0, 0.125)',
                          color: '#FF5E00',
                          border: '1px solid rgba(255, 94, 0, 0.25)',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>

          <motion.div
            initial="hidden"
            animate={blogInView ? 'visible' : 'hidden'}
            variants={scrollReveal}
            className="text-center"
          >
            <button
              onClick={() => navigateTo('blog')}
              className="text-sm font-medium transition-opacity duration-300 hover:opacity-80 cursor-pointer"
              style={{ color: '#0066FF' }}
            >
              مشاهده همه نوشته‌ها
            </button>
          </motion.div>
        </div>
      </section>

      {/* ========== Featured Projects Section ========== */}
      <section ref={projectsSectionRef} className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            animate={projectsInView ? 'visible' : 'hidden'}
            variants={scrollReveal}
          >
            <h2
              className="text-2xl md:text-3xl font-bold mb-2"
              style={{ color: '#F5F5F5' }}
            >
              پروژه‌های منتخب
            </h2>
            <div
              className="w-16 h-1 rounded-full mb-10"
              style={{ backgroundColor: '#FF5E00' }}
            />
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
            initial="hidden"
            animate={projectsInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
          >
            {featuredProjects.map((project) => (
              <motion.article
                key={project.id}
                className="interactive rounded-2xl overflow-hidden cursor-pointer transition-all duration-300"
                style={{
                  backgroundColor: '#0A1128',
                  border: '1px solid #1C39BB30',
                }}
                variants={scrollReveal}
                onClick={() => openProject(project.id)}
                data-cursor-hover
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.boxShadow = '0 0 25px rgba(0, 102, 255, 0.19)'
                  el.style.transform = 'scale(1.02)'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.boxShadow = 'none'
                  el.style.transform = 'scale(1)'
                }}
              >
                {/* Colored Placeholder Top Area */}
                <div
                  className="h-36"
                  style={{
                    background: 'linear-gradient(135deg, rgba(28, 57, 187, 0.125), #0A1128)',
                  }}
                />

                <div className="p-5">
                  <h3
                    className="text-lg font-bold mb-2"
                    style={{ color: '#F5F5F5' }}
                  >
                    {project.title}
                  </h3>

                  <p
                    className="text-sm leading-relaxed mb-4 line-clamp-2"
                    style={{ color: '#B0B0B0' }}
                  >
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => {
                      const isKey = project.keyTechnologies.includes(tech)
                      return (
                        <span
                          key={tech}
                          className="text-xs px-2.5 py-1 rounded-full"
                          style={{
                            backgroundColor: isKey
                              ? 'rgba(255, 94, 0, 0.08)'
                              : 'rgba(0, 102, 255, 0.08)',
                            color: isKey ? '#FF5E00' : '#0066FF',
                          }}
                        >
                          <LtrText>{tech}</LtrText>
                        </span>
                      )
                    })}
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>

          <motion.div
            initial="hidden"
            animate={projectsInView ? 'visible' : 'hidden'}
            variants={scrollReveal}
            className="text-center"
          >
            <button
              onClick={() => navigateTo('projects')}
              className="text-sm font-medium transition-opacity duration-300 hover:opacity-80 cursor-pointer"
              style={{ color: '#0066FF' }}
            >
              مشاهده همه پروژه‌ها
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}