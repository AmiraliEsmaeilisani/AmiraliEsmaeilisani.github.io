'use client'

import { useNavigationStore } from '@/store/useNavigationStore'
import { blogPosts } from '@/data/portfolio-data'
import { ArrowRight, Calendar, Clock, BookOpen } from 'lucide-react'
import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import katex from 'katex'
import React, { useMemo, useState, useEffect } from 'react'

function processMathInText(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = []
  let lastIndex = 0
  let key = 0

  // Match display math $$...$$ first, then inline math $...$
  const displayMathRegex = /\$\$([\s\S]+?)\$\$/g
  const inlineMathRegex = /\$([^\$\n]+?)\$/g

  let match: RegExpExecArray | null

  // First pass: find all display and inline math positions
  interface MathSegment {
    start: number
    end: number
    formula: string
    displayMode: boolean
  }

  const segments: MathSegment[] = []

  // Find display math
  while ((match = displayMathRegex.exec(text)) !== null) {
    segments.push({
      start: match.index,
      end: match.index + match[0].length,
      formula: match[1].trim(),
      displayMode: true,
    })
  }

  // Find inline math (avoiding already-matched display math)
  while ((match = inlineMathRegex.exec(text)) !== null) {
    const isInsideDisplay = segments.some(
      (s) => match!.index > s.start && match!.index < s.end
    )
    if (!isInsideDisplay) {
      segments.push({
        start: match.index,
        end: match.index + match[0].length,
        formula: match[1].trim(),
        displayMode: false,
      })
    }
  }

  // Sort by position
  segments.sort((a, b) => a.start - b.start)

  // Build parts
  segments.forEach((seg) => {
    // Add text before this segment
    if (seg.start > lastIndex) {
      parts.push(
        <span key={key++}>
          {text.slice(lastIndex, seg.start)}
        </span>
      )
    }

    // Render math
    try {
      const html = katex.renderToString(seg.formula, {
        displayMode: seg.displayMode,
        throwOnError: false,
      })

      if (seg.displayMode) {
        parts.push(
          <div
            key={key++}
            className="my-6 overflow-x-auto text-center"
            dir="ltr"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        )
      } else {
        parts.push(
          <span
            key={key++}
            dir="ltr"
            className="inline"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        )
      }
    } catch {
      parts.push(
        <code key={key++} className="text-red-400">
          {seg.formula}
        </code>
      )
    }

    lastIndex = seg.end
  })

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(
      <span key={key++}>
        {text.slice(lastIndex)}
      </span>
    )
  }

  return parts.length > 0 ? parts : [text]
}

function estimateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  return Math.max(1, Math.ceil(words / wordsPerMinute))
}

function ReadingProgressBar() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      setProgress(Math.min(100, scrollPercent))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[2px] z-50"
      style={{ backgroundColor: '#0A1128' }}
    >
      <div
        className="h-full transition-[width] duration-150 ease-out"
        style={{
          width: `${progress}%`,
          background: 'linear-gradient(90deg, #0066FF, #FF5E00)',
          boxShadow: '0 0 8px #0066FF40',
        }}
      />
    </div>
  )
}

export default function BlogPostPage() {
  const { selectedBlogPost, goBack } = useNavigationStore()

  const post = useMemo(
    () => blogPosts.find((p) => p.id === selectedBlogPost),
    [selectedBlogPost]
  )

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6" dir="rtl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center py-20"
        >
          <p className="text-2xl mb-6" style={{ color: '#F5F5F5' }}>
            پست یافت نشد
          </p>
          <button
            onClick={goBack}
            className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-lg transition-colors duration-300"
            style={{
              backgroundColor: '#1C39BB15',
              color: '#F5F5F5',
              border: '1px solid #1C39BB30',
            }}
          >
            <ArrowRight size={16} />
            <span>بازگشت به بلاگ</span>
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6" dir="rtl">
      <ReadingProgressBar />
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
          className="text-2xl md:text-3xl font-bold mb-6"
          style={{ color: '#F5F5F5' }}
        >
          {post.title}
        </h1>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <div className="flex items-center gap-1.5" style={{ color: '#B0B0B0' }}>
            <Calendar size={14} />
            <span className="text-sm">{post.date}</span>
          </div>
          <div className="flex items-center gap-1.5" style={{ color: '#B0B0B0' }}>
            <Clock size={14} />
            <span className="text-sm">{estimateReadingTime(post.content)} دقیقه مطالعه</span>
          </div>
          <div className="flex items-center gap-1.5" style={{ color: '#B0B0B0' }}>
            <BookOpen size={14} />
            <span className="text-sm">{post.content.trim().split(/\s+/).length.toLocaleString('fa-IR')} کلمه</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex items-center gap-2 flex-wrap">
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

        {/* Divider */}
        <div
          className="mt-6 mb-2"
          style={{ height: '1px', backgroundColor: '#1C39BB20' }}
        />
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          delay: 0.15,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        <div
          className="rounded-xl p-6 md:p-10"
          style={{
            backgroundColor: '#0A1128',
            border: '1px solid #1C39BB20',
          }}
        >
          <div className="markdown-content" dir="rtl">
            <ReactMarkdown
              components={{
                code({ className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '')
                  const isInline = !match
                  const codeString = String(children).replace(/\n$/, '')

                  if (isInline) {
                    return (
                      <code
                        className="px-1.5 py-0.5 rounded text-sm"
                        style={{
                          backgroundColor: '#1C39BB20',
                          color: '#FF5E00',
                          border: '1px solid #1C39BB30',
                          direction: 'ltr',
                        }}
                        {...props}
                      >
                        {children}
                      </code>
                    )
                  }

                  return (
                    <div className="my-5 rounded-xl overflow-hidden" style={{ border: '1px solid #1C39BB40' }}>
                      {match && (
                        <div
                          className="px-4 py-2.5 text-xs font-medium flex items-center justify-between"
                          style={{
                            backgroundColor: '#060D1A',
                            color: '#B0B0B0',
                            borderBottom: '1px solid #1C39BB40',
                            direction: 'ltr',
                          }}
                        >
                          <span>{match[1]}</span>
                          <span style={{ color: '#1C39BB60' }}>code</span>
                        </div>
                      )}
                      <SyntaxHighlighter
                        style={vscDarkPlus}
                        language={match ? match[1] : 'text'}
                        PreTag="div"
                        customStyle={{
                          margin: 0,
                          borderRadius: 0,
                          backgroundColor: '#060D1A',
                          fontSize: '0.85rem',
                          lineHeight: '1.7',
                          padding: '1.25rem',
                        }}
                      >
                        {codeString}
                      </SyntaxHighlighter>
                    </div>
                  )
                },
                h1({ children }) {
                  return (
                    <h1
                      className="text-2xl font-bold mb-4 mt-10 pb-3"
                      style={{ color: '#F5F5F5', borderBottom: '1px solid #1C39BB25' }}
                    >
                      {processMathInText(String(children))}
                    </h1>
                  )
                },
                h2({ children }) {
                  return (
                    <h2
                      className="text-xl font-bold mb-3 mt-10 pb-2"
                      style={{ color: '#F5F5F5', borderBottom: '1px solid #1C39BB15' }}
                    >
                      {processMathInText(String(children))}
                    </h2>
                  )
                },
                h3({ children }) {
                  return (
                    <h3
                      className="text-lg font-bold mb-2 mt-8"
                      style={{ color: '#F5F5F5' }}
                    >
                      {processMathInText(String(children))}
                    </h3>
                  )
                },
                p({ children }) {
                  if (typeof children === 'string') {
                    return (
                      <p
                        className="text-base leading-[1.9] my-5"
                        style={{ color: '#B0B0B0' }}
                      >
                        {processMathInText(children)}
                      </p>
                    )
                  }
                  // For complex children (with bold/italic etc), process text nodes
                  return (
                    <p
                      className="text-base leading-[1.9] my-5"
                      style={{ color: '#B0B0B0' }}
                    >
                      {children}
                    </p>
                  )
                },
                strong({ children }) {
                  return (
                    <strong style={{ color: '#F5F5F5', fontWeight: 700 }}>
                      {typeof children === 'string'
                        ? processMathInText(children)
                        : children}
                    </strong>
                  )
                },
                em({ children }) {
                  return (
                    <em style={{ color: '#D0D0D0', fontStyle: 'italic' }}>
                      {typeof children === 'string'
                        ? processMathInText(children)
                        : children}
                    </em>
                  )
                },
                ul({ children }) {
                  return (
                    <ul
                      className="list-disc list-inside my-4 space-y-2.5"
                      style={{ color: '#B0B0B0' }}
                    >
                      {children}
                    </ul>
                  )
                },
                ol({ children }) {
                  return (
                    <ol
                      className="list-decimal list-inside my-4 space-y-2.5"
                      style={{ color: '#B0B0B0' }}
                    >
                      {children}
                    </ol>
                  )
                },
                li({ children }) {
                  return (
                    <li className="text-base leading-relaxed pl-2">
                      {children}
                    </li>
                  )
                },
                blockquote({ children }) {
                  return (
                    <blockquote
                      className="border-r-4 pr-5 py-3 my-6 rounded-r-lg"
                      style={{
                        borderColor: '#0066FF',
                        backgroundColor: '#0066FF08',
                        color: '#B0B0B0',
                      }}
                    >
                      {children}
                    </blockquote>
                  )
                },
                a({ href, children }) {
                  return (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-2 transition-colors duration-300 hover:text-[#FF5E00]"
                      style={{ color: '#0066FF' }}
                    >
                      {children}
                    </a>
                  )
                },
                hr() {
                  return (
                    <hr
                      className="my-10"
                      style={{ borderColor: '#1C39BB20' }}
                    />
                  )
                },
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </div>
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        className="mt-8 mb-12 flex items-center gap-4"
      >
        <button
          onClick={goBack}
          className="inline-flex items-center gap-2 text-sm px-5 py-2.5 rounded-lg transition-all duration-300 hover:brightness-110"
          style={{
            backgroundColor: '#1C39BB15',
            color: '#F5F5F5',
            border: '1px solid #1C39BB30',
          }}
        >
          <ArrowRight size={16} />
          <span>بازگشت به بلاگ</span>
        </button>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="inline-flex items-center gap-2 text-sm px-5 py-2.5 rounded-lg transition-all duration-300 hover:brightness-110"
          style={{
            backgroundColor: '#FF5E0010',
            color: '#FF5E00',
            border: '1px solid #FF5E0025',
          }}
        >
          بازگشت به بالا
        </button>
      </motion.div>
    </div>
  )
}