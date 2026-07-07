'use client'

import { useNavigationStore } from '@/store/useNavigationStore'
import { blogPosts } from '@/data/portfolio-data'
import { Calendar, ArrowLeft, Tag } from 'lucide-react'
import { motion } from 'framer-motion'

export default function BlogPage() {
  const { openBlogPost, goBack } = useNavigationStore()

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6" dir="rtl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className="mb-10"
      >
        <button
          onClick={goBack}
          className="flex items-center gap-2 text-sm mb-6 transition-colors duration-300 hover:text-white"
          style={{ color: '#B0B0B0' }}
        >
          <ArrowLeft size={18} />
          <span>بازگشت</span>
        </button>

        <h1
          className="text-3xl font-bold mb-2"
          style={{ color: '#F5F5F5' }}
        >
          بلاگ
        </h1>
        <p
          className="text-base"
          style={{ color: '#B0B0B0' }}
        >
          نوشته‌ها و مقالات من
        </p>
      </motion.div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogPosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            onClick={() => openBlogPost(post.id)}
            data-cursor-hover
            className="interactive rounded-xl cursor-pointer overflow-hidden"
            style={{
              backgroundColor: '#0A1128',
              border: '1px solid #1C39BB25',
              transition: 'border-color 0.3s cubic-bezier(0.25, 0.1, 0.25, 1), box-shadow 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)',
            }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLElement).style.borderLeftWidth = '3px'
              ;(e.currentTarget as HTMLElement).style.borderLeftColor = '#0066FF'
              ;(e.currentTarget as HTMLElement).style.boxShadow = '0 0 30px #0066FF15'
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLElement).style.borderLeftWidth = '1px'
              ;(e.currentTarget as HTMLElement).style.borderLeftColor = '#1C39BB25'
              ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
            }}
          >
            {/* Gradient Placeholder */}
            <div
              className="relative h-[120px] overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #1C39BB30, #0A1128)',
              }}
            >
              <span
                className="absolute bottom-2 right-4 text-xl font-bold select-none pointer-events-none"
                style={{ color: '#1C39BB20', direction: 'ltr', fontSize: '1.25rem' }}
              >
                {post.titleEn}
              </span>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Title */}
              <h3
                className="font-bold text-lg mb-3"
                style={{ color: '#F5F5F5' }}
              >
                {post.title}
              </h3>

              {/* Date */}
              <div className="flex items-center gap-2 mb-3" style={{ color: '#B0B0B0' }}>
                <Calendar size={14} />
                <span className="text-sm">{post.date}</span>
              </div>

              {/* Tags */}
              <div className="flex items-center gap-2 flex-wrap mb-4">
                <Tag size={14} style={{ color: '#B0B0B0' }} />
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded-full"
                    style={{
                      backgroundColor: '#FF5E0015',
                      color: '#FF5E00',
                      border: '1px solid #FF5E0030',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Summary */}
              <p
                className="text-sm leading-relaxed line-clamp-3 mb-4"
                style={{ color: '#B0B0B0' }}
              >
                {post.summary}
              </p>

              {/* Read More Link */}
              <div
                className="flex items-center gap-2 text-sm font-medium"
                style={{ color: '#0066FF' }}
              >
                <span>ادامه مطلب</span>
                <ArrowLeft size={16} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}