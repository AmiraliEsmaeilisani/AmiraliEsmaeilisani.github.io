'use client'

import { useNavigationStore } from '@/store/useNavigationStore'
import { blogPosts } from '@/data/portfolio-data'
import { Calendar, ArrowRight, ArrowLeft, Clock } from 'lucide-react'
import { motion } from 'framer-motion'

function estimateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  return Math.max(1, Math.ceil(words / wordsPerMinute))
}

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
          style={{ color: '#808080' }}
        >
          <ArrowRight size={18} />
          <span>بازگشت</span>
        </button>

        <h1
          className="text-3xl font-bold mb-2"
          style={{ color: '#F5F5F5' }}
        >
          بلاگ
        </h1>
        <p
          className="text-base leading-relaxed"
          style={{ color: '#808080' }}
        >
          نوشته‌ها و مقالات من در زمینه هوش مصنوعی، مهندسی مکانیک و فناوری
        </p>
      </motion.div>

      {/* Blog Grid */}
      {/* Featured Post */}
      {blogPosts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          onClick={() => openBlogPost(blogPosts[0].id)}
          data-cursor-hover
          className="interactive rounded-xl cursor-pointer overflow-hidden mb-6"
          style={{
            backgroundColor: '#0A1128',
            border: '1px solid #1C39BB20',
            transition: 'border-color 0.3s cubic-bezier(0.25, 0.1, 0.25, 1), box-shadow 0.3s cubic-bezier(0.25, 0.1, 0.25, 1), transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)',
          }}
          onMouseEnter={(e) => {
            ;(e.currentTarget as HTMLElement).style.borderLeftWidth = '3px'
            ;(e.currentTarget as HTMLElement).style.borderLeftColor = '#FF5E00'
            ;(e.currentTarget as HTMLElement).style.boxShadow = '0 0 40px #FF5E0010'
            ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'
          }}
          onMouseLeave={(e) => {
            ;(e.currentTarget as HTMLElement).style.borderLeftWidth = '1px'
            ;(e.currentTarget as HTMLElement).style.borderLeftColor = '#1C39BB20'
            ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
            ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
          }}
        >
          <div
            className="relative h-[160px] overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #FF5E0010, #0A1128 60%, #1C39BB10)',
            }}
          >
            <div
              className="absolute top-3 right-4 px-2.5 py-1 rounded-full text-xs font-medium"
              style={{ backgroundColor: '#FF5E0020', color: '#FF5E00' }}
            >
              ویژه
            </div>
            <div
              className="absolute bottom-4 left-6 w-14 h-1 rounded-full"
              style={{ backgroundColor: '#FF5E0025' }}
            />
            <span
              className="absolute bottom-3 right-4 font-bold select-none pointer-events-none"
              style={{ color: '#1C39BB15', direction: 'ltr', fontSize: '1.1rem' }}
            >
              {blogPosts[0].titleEn}
            </span>
          </div>
          <div className="p-6">
            <h3 className="font-bold text-xl mb-3 leading-relaxed" style={{ color: '#F5F5F5' }}>
              {blogPosts[0].title}
            </h3>
            <div className="flex items-center gap-4 mb-3" style={{ color: '#B0B0B0' }}>
              <div className="flex items-center gap-1.5">
                <Calendar size={13} />
                <span className="text-xs">{blogPosts[0].date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={13} />
                <span className="text-xs">{estimateReadingTime(blogPosts[0].content)} دقیقه مطالعه</span>
              </div>
            </div>
            <p className="text-sm leading-[1.8] line-clamp-2 mb-4" style={{ color: '#808080' }}>
              {blogPosts[0].summary}
            </p>
            <div className="flex items-center gap-1.5 flex-wrap mb-4">
              {blogPosts[0].tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2.5 py-1 rounded-full"
                  style={{ backgroundColor: '#FF5E0015', color: '#FF5E00', border: '1px solid #FF5E0030' }}
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2 text-sm font-medium" style={{ color: '#0066FF' }}>
              <span>ادامه مطلب</span>
              <ArrowLeft size={13} />
            </div>
          </div>
        </motion.div>
      )}

      {/* Rest of Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogPosts.slice(1).map((post, index) => (
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
              border: '1px solid #1C39BB20',
              transition: 'border-color 0.3s cubic-bezier(0.25, 0.1, 0.25, 1), box-shadow 0.3s cubic-bezier(0.25, 0.1, 0.25, 1), transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)',
            }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLElement).style.borderLeftWidth = '3px'
              ;(e.currentTarget as HTMLElement).style.borderLeftColor = '#0066FF'
              ;(e.currentTarget as HTMLElement).style.boxShadow = '0 0 30px #0066FF12'
              ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLElement).style.borderLeftWidth = '1px'
              ;(e.currentTarget as HTMLElement).style.borderLeftColor = '#1C39BB20'
              ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
              ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
            }}
          >
            {/* Gradient Placeholder */}
            <div
              className="relative h-[130px] overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #1C39BB18, #0A1128 60%, #FF5E0008)',
              }}
            >
              {/* Decorative elements */}
              <div
                className="absolute top-3 right-4 w-8 h-8 rounded-full"
                style={{ backgroundColor: '#1C39BB15' }}
              />
              <div
                className="absolute bottom-4 left-6 w-12 h-1 rounded-full"
                style={{ backgroundColor: '#FF5E0020' }}
              />
              <span
                className="absolute bottom-3 right-4 text-xl font-bold select-none pointer-events-none"
                style={{ color: '#1C39BB18', direction: 'ltr', fontSize: '1.1rem' }}
              >
                {post.titleEn}
              </span>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Title */}
              <h3
                className="font-bold text-lg mb-3 leading-relaxed"
                style={{ color: '#F5F5F5' }}
              >
                {post.title}
              </h3>

              {/* Meta row */}
              <div className="flex items-center gap-4 mb-3" style={{ color: '#B0B0B0' }}>
                <div className="flex items-center gap-1.5">
                  <Calendar size={13} />
                  <span className="text-xs">{post.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock size={13} />
                  <span className="text-xs">{estimateReadingTime(post.content)} دقیقه مطالعه</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex items-center gap-1.5 flex-wrap mb-4">
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
                className="text-sm leading-[1.8] line-clamp-2 mb-4"
                style={{ color: '#808080' }}
              >
                {post.summary}
              </p>

              {/* Read More Link */}
              <div
                className="flex items-center gap-2 text-sm font-medium transition-colors duration-300"
                style={{ color: '#0066FF' }}
              >
                <span>ادامه مطلب</span>
                <ArrowLeft size={13} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}