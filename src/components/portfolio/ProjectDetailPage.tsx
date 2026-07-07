'use client'

import { useNavigationStore } from '@/store/useNavigationStore'
import { projects } from '@/data/portfolio-data'
import { ArrowRight, Github, ExternalLink, Calendar, Layers } from 'lucide-react'
import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'

export default function ProjectDetailPage() {
  const { selectedProject, goBack } = useNavigationStore()

  const project = projects.find((p) => p.id === selectedProject)

  if (!project) {
    return (
      <section className="mx-auto max-w-4xl px-4 pb-20 pt-8 sm:px-6">
        <div className="flex items-center gap-4">
          <button
            onClick={goBack}
            className="flex h-10 w-10 items-center justify-center rounded-lg transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: '#1C39BB15',
              color: '#B0B0B0',
              transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
            }}
            data-cursor-hover
          >
            <ArrowRight size={20} />
          </button>
        </div>
        <div
          className="mt-8 rounded-xl border p-8 text-center"
          style={{ borderColor: '#1C39BB25', backgroundColor: '#0A1128' }}
        >
          <p style={{ color: '#B0B0B0' }}>پروژه مورد نظر یافت نشد.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-4xl px-4 pb-20 pt-8 sm:px-6">
      {/* Header */}
      <div className="mb-8">
        <div className="mb-6 flex items-center gap-4">
          <button
            onClick={goBack}
            className="flex h-10 w-10 items-center justify-center rounded-lg transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: '#1C39BB15',
              color: '#B0B0B0',
              transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
            }}
            data-cursor-hover
          >
            <ArrowRight size={20} />
          </button>
          <div>
            <h1
              className="text-2xl font-bold md:text-3xl"
              style={{ color: '#F5F5F5' }}
            >
              {project.title}
            </h1>
            <p className="mt-1 text-sm" style={{ color: '#B0B0B0' }}>
              <span dir="ltr">{project.titleEn}</span>
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-medium transition-all duration-300 hover:text-white"
              style={{
                borderColor: '#0066FF',
                color: '#0066FF',
                transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#0066FF'
                e.currentTarget.style.color = '#FFFFFF'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.color = '#0066FF'
              }}
              data-cursor-hover
            >
              <Github size={16} />
              GitHub
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:brightness-110"
              style={{
                backgroundColor: '#FF5E00',
                transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
              }}
              data-cursor-hover
            >
              <ExternalLink size={16} />
              مشاهده دمو
            </a>
          )}
        </div>
      </div>

      {/* Full Description */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className="mb-8 rounded-xl border p-6"
        style={{ borderColor: '#1C39BB25', backgroundColor: '#0A1128' }}
      >
        <div className="markdown-content" style={{ color: '#B0B0B0' }}>
          <ReactMarkdown>{project.descriptionFull}</ReactMarkdown>
        </div>
      </motion.div>

      {/* Technology Stack */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
        className="mb-8 rounded-xl border p-6"
        style={{ borderColor: '#1C39BB25', backgroundColor: '#0A1128' }}
      >
        <div className="mb-4 flex items-center gap-2">
          <Layers size={18} style={{ color: '#0066FF' }} />
          <h2 className="text-lg font-bold" style={{ color: '#F5F5F5' }}>
            تکنولوژی‌های استفاده‌شده
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => {
            const isKey = project.keyTechnologies.includes(tech)
            return (
              <span
                key={tech}
                className="rounded-md px-3 py-1.5 text-sm font-medium"
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
      </motion.div>

      {/* Gallery Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        className="rounded-xl border p-6"
        style={{ borderColor: '#1C39BB25', backgroundColor: '#0A1128' }}
      >
        <div className="mb-4 flex items-center gap-2">
          <Calendar size={18} style={{ color: '#0066FF' }} />
          <h2 className="text-lg font-bold" style={{ color: '#F5F5F5' }}>
            گالری تصاویر
          </h2>
        </div>
        {project.gallery && project.gallery.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {project.gallery.map((img, idx) => (
              <div
                key={idx}
                className="h-48 overflow-hidden rounded-lg border"
                style={{ borderColor: '#1C39BB25' }}
              >
                {img ? (
                  <img
                    src={img}
                    alt={`${project.title} - تصویر ${idx + 1}`}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                ) : (
                  <div
                    className="flex h-full w-full items-center justify-center"
                    style={{ backgroundColor: '#1C39BB10' }}
                  >
                    <span style={{ color: '#B0B0B0' }} className="text-sm">
                      تصویر {idx + 1}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div
            className="flex h-32 items-center justify-center rounded-lg"
            style={{ backgroundColor: '#1C39BB10' }}
          >
            <p className="text-sm" style={{ color: '#B0B0B0' }}>
              تصاویری موجود نیست
            </p>
          </div>
        )}
      </motion.div>
    </section>
  )
}