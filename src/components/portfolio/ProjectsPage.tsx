'use client'

import { useNavigationStore } from '@/store/useNavigationStore'
import { projects } from '@/data/portfolio-data'
import { ArrowRight, ExternalLink, Github } from 'lucide-react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useState, MouseEvent } from 'react'

function ProjectCard({
  project,
}: {
  project: (typeof projects)[0]
}) {
  const { openProject } = useNavigationStore()
  const x = useMotionValue(0.5)
  const y = useMotionValue(0.5)

  const rotateX = useSpring(useTransform(y, [0, 1], [8, -8]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(x, [0, 1], [-8, 8]), { stiffness: 300, damping: 30 })

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width)
    y.set((e.clientY - rect.top) / rect.height)
  }

  function handleMouseLeave() {
    x.set(0.5)
    y.set(0.5)
  }

  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        handleMouseLeave()
        setIsHovered(false)
      }}
      onMouseEnter={() => setIsHovered(true)}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: '1000px',
        borderColor: isHovered ? '#0066FF20' : '#1C39BB20',
        backgroundColor: '#0A1128',
        boxShadow: isHovered ? '0 0 20px #0066FF15' : 'none',
      }}
      className="interactive cursor-pointer rounded-xl border transition-all duration-300"
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      data-cursor-hover
      onClick={() => openProject(project.id)}
    >
      {/* Gradient placeholder */}
      <div
        className="relative h-40 w-full overflow-hidden rounded-t-xl"
        style={{
          background: 'linear-gradient(135deg, #1C39BB15, #0A1128 60%, #FF5E0008)',
        }}
      >
        {/* Decorative elements */}
        <div
          className="absolute top-3 left-3 w-6 h-6 rounded-full"
          style={{ backgroundColor: '#1C39BB12' }}
        />
        <div
          className="absolute bottom-3 right-4 w-10 h-0.5 rounded-full"
          style={{ backgroundColor: '#FF5E0018' }}
        />
        {/* Overlay titleEn */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            dir="ltr"
            className="text-2xl font-bold select-none"
            style={{ color: '#1C39BB30' }}
          >
            {project.titleEn}
          </span>
        </div>

        {/* Quick action icons - top left in RTL */}
        <div className="absolute top-3 left-3 flex gap-2" dir="ltr">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex h-8 w-8 items-center justify-center rounded-lg backdrop-blur-sm transition-all duration-200 hover:scale-110"
              style={{ backgroundColor: '#0A112880', color: '#808080' }}
              data-cursor-hover
            >
              <Github size={16} />
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex h-8 w-8 items-center justify-center rounded-lg backdrop-blur-sm transition-all duration-200 hover:scale-110"
              style={{ backgroundColor: '#0A112880', color: '#808080' }}
              data-cursor-hover
            >
              <ExternalLink size={16} />
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3
          className="mb-2 text-xl font-bold leading-relaxed"
          style={{ color: '#F5F5F5' }}
        >
          {project.title}
        </h3>
        <p
          className="mb-4 line-clamp-2 text-sm leading-[1.8]"
          style={{ color: '#808080' }}
        >
          {project.description}
        </p>

        {/* Technology tags */}
        <div className="mb-4 flex flex-wrap gap-2">
          {project.technologies.map((tech) => {
            const isKey = project.keyTechnologies.includes(tech)
            return (
              <span
                key={tech}
                className="rounded-md px-2.5 py-1 text-xs font-medium"
                style={
                  isKey
                    ? {
                        backgroundColor: '#FF5E0015',
                        color: '#FF5E00',
                        border: '1px solid #FF5E0030',
                      }
                    : {
                        backgroundColor: '#0066FF10',
                        color: '#0066FF80',
                        border: '1px solid #0066FF20',
                      }
                }
              >
                <span dir="ltr">{tech}</span>
              </span>
            )
          })}
        </div>

        {/* View details link */}
        <button
          className="text-sm font-medium transition-all duration-300 hover:underline"
          style={{ color: '#0066FF' }}
          onClick={(e) => {
            e.stopPropagation()
            openProject(project.id)
          }}
        >
          مشاهده جزئیات →
        </button>
      </div>
    </motion.div>
  )
}

export default function ProjectsPage() {
  const { goBack } = useNavigationStore()

  return (
    <section className="mx-auto max-w-4xl px-4 pb-20 pt-8 sm:px-6">
      {/* Header */}
      <div className="mb-10 flex items-center gap-4">
        <button
          onClick={goBack}
          className="flex h-10 w-10 items-center justify-center rounded-lg transition-all duration-300 hover:scale-105"
          style={{
            backgroundColor: '#1C39BB15',
            color: '#808080',
            transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
          }}
          data-cursor-hover
        >
          <ArrowRight size={20} />
        </button>
        <div>
          <h1
            className="text-3xl font-bold"
            style={{ color: '#F5F5F5' }}
          >
            پروژه‌ها
          </h1>
          <p
            className="mt-1 text-sm leading-relaxed"
            style={{ color: '#808080' }}
          >
            پروژه‌های تحقیقاتی و اجرایی من
          </p>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  )
}