'use client'

import { useNavigationStore } from '@/store/useNavigationStore'
import { blogPosts } from '@/data/portfolio-data'
import { ArrowRight, Calendar, Clock, BookOpen, Copy, Check } from 'lucide-react'
import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import katex from 'katex'
import React, { useMemo, useState, useEffect } from 'react'

// Pre-process content: replace $$...$$ and $...$ with placeholder tokens,
// store KaTeX HTML, return tokenized content + render map
function preProcessMath(content: string): {
  processed: string
  mathMap: Map<string, { html: string; display: boolean }>
} {
  const mathMap = new Map<string, { html: string; display: boolean }>()
  let counter = 0

  // Replace display math $$...$$ first
  let processed = content.replace(/\$\$([\s\S]+?)\$\$/g, (_, formula) => {
    const token = `MATHBLOCK${counter++}`
    try {
      const html = katex.renderToString(formula.trim(), {
        displayMode: true,
        throwOnError: false,
      })
      mathMap.set(token, { html, display: true })
    } catch {
      mathMap.set(token, { html: `<code style="color:red">${formula}</code>`, display: true })
    }
    return token
  })

  // Replace inline math $...$
  processed = processed.replace(/\$([^\$\n]+?)\$/g, (_, formula) => {
    const token = `MATHINLINE${counter++}`
    try {
      const html = katex.renderToString(formula.trim(), {
        displayMode: false,
        throwOnError: false,
      })
      mathMap.set(token, { html, display: false })
    } catch {
      mathMap.set(token, { html: `<code style="color:red">${formula}</code>`, display: false })
    }
    return token
  })

  return { processed, mathMap }
}

// Replace math tokens inside React children
function replaceTokens(children: React.ReactNode, mathMap: Map<string, { html: string; display: boolean }>): React.ReactNode {
  if (typeof children === 'string') {
    const tokenPattern = /((?:MATHBLOCK|MATHINLINE)\d+)/g
    if (!tokenPattern.test(children)) return children
    tokenPattern.lastIndex = 0

    const parts = children.split(tokenPattern)
    return parts.map((part, i) => {
      if (mathMap.has(part)) {
        const { html, display } = mathMap.get(part)!
        if (display) {
          return (
            <div
              key={i}
              className="my-6 overflow-x-auto text-center"
              dir="ltr"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          )
        }
        return (
          <span
            key={i}
            dir="ltr"
            className="inline"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        )
      }
      return <React.Fragment key={i}>{part}</React.Fragment>
    })
  }

  if (Array.isArray(children)) {
    return children.map((child, i) => (
      <React.Fragment key={i}>{replaceTokens(child, mathMap)}</React.Fragment>
    ))
  }

  // Handle React elements: recursively process their children
  if (React.isValidElement(children)) {
    const props = children.props as Record<string, unknown>
    if ('children' in props && props.children != null) {
      const newChildren = replaceTokens(props.children as React.ReactNode, mathMap)
      return React.cloneElement(children as React.ReactElement<Record<string, unknown>>, {
        children: newChildren,
      })
    }
  }

  return children
}

function estimateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  return Math.max(1, Math.ceil(words / wordsPerMinute))
}

function CodeBlock({ language, codeString }: { language: string; codeString: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeString)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback
      const textarea = document.createElement('textarea')
      textarea.value = codeString
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="my-5 rounded-xl overflow-hidden">
      <div
        className="px-4 py-2.5 text-xs font-medium flex items-center justify-between"
        style={{
          backgroundColor: '#060D1A',
          color: '#808080',
          direction: 'ltr',
        }}
      >
        <span style={{ fontWeight: 600 }}>{language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs transition-colors duration-200 hover:text-[#0066FF] cursor-pointer"
          style={{ color: copied ? '#22c55e' : '#808080' }}
        >
          {copied ? <Check size={13} /> : <Copy size={13} />}
          <span>{copied ? 'کپی شد' : 'کپی'}</span>
        </button>
      </div>
      <SyntaxHighlighter
        style={vscDarkPlus}
        language={language}
        PreTag="div"
        customStyle={{
          margin: 0,
          borderRadius: 0,
          backgroundColor: '#060D1A',
          fontSize: '0.85rem',
          lineHeight: '1.7',
          padding: '1.25rem',
          fontWeight: 500,
          fontFamily: "'Cascadia Code', 'Fira Code', 'JetBrains Mono', 'Consolas', monospace",
        }}
        codeTagProps={{
          style: {
            fontWeight: 600,
            fontFamily: "'Cascadia Code', 'Fira Code', 'JetBrains Mono', 'Consolas', monospace",
          }
        }}
      >
        {codeString}
      </SyntaxHighlighter>
    </div>
  )
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

  // Pre-process math BEFORE ReactMarkdown
  const { processed: processedContent, mathMap } = useMemo(
    () => post ? preProcessMath(post.content) : { processed: '', mathMap: new Map() },
    [post]
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
                          fontWeight: 600,
                          fontFamily: "'Cascadia Code', 'Fira Code', 'JetBrains Mono', 'Consolas', monospace",
                        }}
                        {...props}
                      >
                        {children}
                      </code>
                    )
                  }

                  return <CodeBlock language={match[1]} codeString={codeString} />
                },
                h1({ children }) {
                  return (
                    <h1
                      className="text-2xl font-bold mb-4 mt-10 pb-3"
                      style={{ color: '#F5F5F5', borderBottom: '1px solid #1C39BB25' }}
                    >
                      {replaceTokens(children, mathMap)}
                    </h1>
                  )
                },
                h2({ children }) {
                  return (
                    <h2
                      className="text-xl font-bold mb-3 mt-10 pb-2"
                      style={{ color: '#F5F5F5', borderBottom: '1px solid #1C39BB15' }}
                    >
                      {replaceTokens(children, mathMap)}
                    </h2>
                  )
                },
                h3({ children }) {
                  return (
                    <h3
                      className="text-lg font-bold mb-2 mt-8"
                      style={{ color: '#F5F5F5' }}
                    >
                      {replaceTokens(children, mathMap)}
                    </h3>
                  )
                },
                p({ children }) {
                  return (
                    <p
                      className="text-base leading-[1.9] my-5"
                      style={{ color: '#B0B0B0' }}
                    >
                      {replaceTokens(children, mathMap)}
                    </p>
                  )
                },
                strong({ children }) {
                  return (
                    <strong style={{ color: '#F5F5F5', fontWeight: 700 }}>
                      {replaceTokens(children, mathMap)}
                    </strong>
                  )
                },
                em({ children }) {
                  return (
                    <em style={{ color: '#D0D0D0', fontStyle: 'italic' }}>
                      {replaceTokens(children, mathMap)}
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
                      {replaceTokens(children, mathMap)}
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
                      {replaceTokens(children, mathMap)}
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
                      {replaceTokens(children, mathMap)}
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
              {processedContent}
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