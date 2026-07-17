'use client'

import { useNavigationStore } from '@/store/useNavigationStore'
import { blogPosts } from '@/data/portfolio-data'
import { ArrowRight, Calendar, Clock, BookOpen, Copy, Check } from 'lucide-react'
import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import katex from 'katex'
import 'katex/dist/katex.min.css'
import React, { useMemo, useState, useEffect } from 'react'

/* ── Segment types ───────────────────────────────────────────────────── */

type Segment =
  | { type: 'markdown'; content: string; codeSpans: string[] } // text with math tokens inside; inline code kept aside as placeholders
  | { type: 'display-math'; formula: string }
  | { type: 'code'; language: string; code: string }

/* ── Token / placeholder schemes ─────────────────────────────────────── */
/* Unique, collision-proof markers that markdown will pass through as text */

const MATH_TOKEN_PREFIX = 'ZZKMATH'
const MATH_TOKEN_SUFFIX = 'KZZ'
const MATH_TOKEN_PATTERN = /(ZZKMATH\d+KZZ)/g
const CODE_SPAN_OPEN = '\uE000' // private-use char (invisible, never appears in real content)
const CODE_SPAN_CLOSE = '\uE001'
const CODE_SPAN_PATTERN = /\uE000(\d+)\uE001/g

/* ── HTML escaping (used for KaTeX error fallback) ───────────────────── */

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/* ── KaTeX render helper ─────────────────────────────────────────────── */

function renderKatex(formula: string, displayMode: boolean): string {
  try {
    return katex.renderToString(formula, {
      displayMode,
      throwOnError: false,
      strict: false,
    })
  } catch {
    return `<code style="color:#ff6b6b" dir="ltr">${escapeHtml(formula)}</code>`
  }
}

/* ── Inline math extraction (single pass → tokenized text + map) ─────── */
/* One pass builds BOTH the tokenized string and the map, so tokens and  */
/* formulas can never drift out of sync.                                 */
/* (?<![\\$]) skips escaped dollars (\$) and $$ display delimiters.      */

const INLINE_MATH_PATTERN = /(?<![\\$])\$([^\$\n]+?)\$(?!\$)/g

function extractInlineMath(content: string): { tokenized: string; mathMap: Map<string, string> } {
  const mathMap = new Map<string, string>()
  let counter = 0
  const tokenized = content.replace(INLINE_MATH_PATTERN, (_match, formula: string) => {
    const token = `${MATH_TOKEN_PREFIX}${counter++}${MATH_TOKEN_SUFFIX}`
    mathMap.set(token, formula.trim())
    return token
  })
  return { tokenized, mathMap }
}

/* ── Protect inline code spans (`...`) with placeholders ─────────────── */
/* so that $ and $$ inside code are never treated as math.               */

function protectCodeSpans(text: string): { text: string; codeSpans: string[] } {
  const codeSpans: string[] = []
  const protectedText = text.replace(/`([^`\n]+)`/g, (_match, code: string) => {
    codeSpans.push(code)
    return `${CODE_SPAN_OPEN}${codeSpans.length - 1}${CODE_SPAN_CLOSE}`
  })
  return { text: protectedText, codeSpans }
}

function restoreCodeSpans(text: string, codeSpans: string[]): string {
  return text.replace(CODE_SPAN_PATTERN, (_match, index: string) => {
    const code = codeSpans[Number(index)]
    return code === undefined ? _match : `\`${code}\``
  })
}

/* ── Parse content: fenced code → $$...$$ → markdown ─────────────────── */
/* Order matters: fenced code is carved out first so math delimiters     */
/* inside code are never parsed; then display math; the rest is markdown.*/

const FENCED_CODE_PATTERN = /```([^\n`]*)\n([\s\S]*?)```/g
const DISPLAY_MATH_PATTERN = /\$\$([\s\S]+?)\$\$/g

function parseContent(content: string): Segment[] {
  const segments: Segment[] = []

  const pushTextChunk = (chunk: string) => {
    if (!chunk) return
    const { text, codeSpans } = protectCodeSpans(chunk)

    DISPLAY_MATH_PATTERN.lastIndex = 0
    let last = 0
    let match: RegExpExecArray | null
    while ((match = DISPLAY_MATH_PATTERN.exec(text)) !== null) {
      if (match.index > last) {
        segments.push({ type: 'markdown', content: text.slice(last, match.index), codeSpans })
      }
      segments.push({ type: 'display-math', formula: match[1].trim() })
      last = match.index + match[0].length
    }
    if (last < text.length) {
      segments.push({ type: 'markdown', content: text.slice(last), codeSpans })
    }
  }

  FENCED_CODE_PATTERN.lastIndex = 0
  let lastIndex = 0
  let match: RegExpExecArray | null
  while ((match = FENCED_CODE_PATTERN.exec(content)) !== null) {
    if (match.index > lastIndex) {
      pushTextChunk(content.slice(lastIndex, match.index))
    }
    segments.push({
      type: 'code',
      language: match[1].trim() || 'text',
      code: match[2].replace(/\n$/, ''),
    })
    lastIndex = match.index + match[0].length
  }
  if (lastIndex < content.length) {
    pushTextChunk(content.slice(lastIndex))
  }

  return segments
}

/* ── Inline math token replacement in React children ─────────────────── */

function replaceInlineTokens(
  children: React.ReactNode,
  mathMap: Map<string, string>
): React.ReactNode {
  if (typeof children === 'string') {
    MATH_TOKEN_PATTERN.lastIndex = 0
    if (!MATH_TOKEN_PATTERN.test(children)) return children
    MATH_TOKEN_PATTERN.lastIndex = 0

    const parts = children.split(MATH_TOKEN_PATTERN)
    return parts.map((part, i) => {
      if (mathMap.has(part)) {
        const html = renderKatex(mathMap.get(part)!, false)
        return (
          <span
            key={i}
            dir="ltr"
            className="inline-block align-middle"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        )
      }
      return <React.Fragment key={i}>{part}</React.Fragment>
    })
  }

  if (Array.isArray(children)) {
    return children.map((child, i) => (
      <React.Fragment key={i}>{replaceInlineTokens(child, mathMap)}</React.Fragment>
    ))
  }

  if (React.isValidElement(children)) {
    const props = children.props as Record<string, unknown>
    if ('children' in props && props.children != null) {
      const newChildren = replaceInlineTokens(props.children as React.ReactNode, mathMap)
      if (newChildren === props.children) return children
      return React.cloneElement(children as React.ReactElement<Record<string, unknown>>, {
        children: newChildren,
      })
    }
  }

  return children
}

/* ── Reading time ────────────────────────────────────────────────────── */

function estimateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / wordsPerMinute))
}

/* ── Code block with copy ────────────────────────────────────────────── */

function CodeBlock({ language, codeString }: { language: string; codeString: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeString)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
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
    <div className="my-5 rounded-xl overflow-hidden" dir="ltr">
      <div
        className="px-4 py-2.5 text-xs font-medium flex items-center justify-between"
        style={{ backgroundColor: '#060D1A', color: '#808080', direction: 'ltr' }}
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

/* ── Reading progress bar ────────────────────────────────────────────── */

function ReadingProgressBar() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      setProgress(Math.min(100, Math.max(0, scrollPercent)))
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-50" style={{ backgroundColor: '#0A1128' }}>
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

/* ── Markdown segment with inline math support ───────────────────────── */

function MarkdownSegment({ content, codeSpans }: { content: string; codeSpans: string[] }) {
  // Single-pass tokenization guarantees each token maps to its own formula.
  // Code spans are restored AFTER math extraction, so `$` inside code stays literal.
  const { tokenized, mathMap } = useMemo(() => {
    const extracted = extractInlineMath(content)
    return {
      tokenized: restoreCodeSpans(extracted.tokenized, codeSpans),
      mathMap: extracted.mathMap,
    }
  }, [content, codeSpans])

  return (
    <ReactMarkdown
      components={{
        pre({ children }) {
          // Block code is rendered by the `code` override below; drop the <pre> wrapper.
          return <>{children}</>
        },
        code({ className, children }) {
          const match = /language-(\w+)/.exec(className || '')
          const codeString = String(children).replace(/\n$/, '')
          // Block = has a language, or contains newlines (fence without language / indented code)
          const isBlock = Boolean(match) || codeString.includes('\n')
          if (!isBlock) {
            return (
              <code
                className="px-1.5 py-0.5 rounded text-sm"
                style={{
                  backgroundColor: '#1C39BB20',
                  color: '#FF5E00',
                  border: '1px solid #1C39BB30',
                  direction: 'ltr',
                  unicodeBidi: 'embed',
                  fontWeight: 600,
                  fontFamily: "'Cascadia Code', 'Fira Code', 'JetBrains Mono', 'Consolas', monospace",
                }}
              >
                {children}
              </code>
            )
          }
          return <CodeBlock language={match ? match[1] : 'text'} codeString={codeString} />
        },
        h1({ children }) {
          return (
            <h1 className="text-2xl font-bold mb-4 mt-10 pb-3" style={{ color: '#F5F5F5', borderBottom: '1px solid #1C39BB25' }}>
              {replaceInlineTokens(children, mathMap)}
            </h1>
          )
        },
        h2({ children }) {
          return (
            <h2 className="text-xl font-bold mb-3 mt-10 pb-2" style={{ color: '#F5F5F5', borderBottom: '1px solid #1C39BB15' }}>
              {replaceInlineTokens(children, mathMap)}
            </h2>
          )
        },
        h3({ children }) {
          return (
            <h3 className="text-lg font-bold mb-2 mt-8" style={{ color: '#F5F5F5' }}>
              {replaceInlineTokens(children, mathMap)}
            </h3>
          )
        },
        p({ children }) {
          return (
            <p className="text-base leading-[1.9] my-5" style={{ color: '#B0B0B0' }}>
              {replaceInlineTokens(children, mathMap)}
            </p>
          )
        },
        strong({ children }) {
          return <strong style={{ color: '#F5F5F5', fontWeight: 700 }}>{replaceInlineTokens(children, mathMap)}</strong>
        },
        em({ children }) {
          return <em style={{ color: '#D0D0D0', fontStyle: 'italic' }}>{replaceInlineTokens(children, mathMap)}</em>
        },
        ul({ children }) {
          return <ul className="list-disc list-inside my-4 space-y-2.5" style={{ color: '#B0B0B0' }}>{children}</ul>
        },
        ol({ children }) {
          return <ol className="list-decimal list-inside my-4 space-y-2.5" style={{ color: '#B0B0B0' }}>{children}</ol>
        },
        li({ children }) {
          return <li className="text-base leading-relaxed pl-2">{replaceInlineTokens(children, mathMap)}</li>
        },
        blockquote({ children }) {
          return (
            <blockquote className="border-r-4 pr-5 py-3 my-6 rounded-r-lg" style={{ borderColor: '#0066FF', backgroundColor: '#0066FF08', color: '#B0B0B0' }}>
              {replaceInlineTokens(children, mathMap)}
            </blockquote>
          )
        },
        a({ href, children }) {
          return (
            <a href={href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 transition-colors duration-300 hover:text-[#FF5E00]" style={{ color: '#0066FF' }}>
              {replaceInlineTokens(children, mathMap)}
            </a>
          )
        },
        hr() {
          return <hr className="my-10" style={{ borderColor: '#1C39BB20' }} />
        },
      }}
    >
      {tokenized}
    </ReactMarkdown>
  )
}

/* ── Main component ──────────────────────────────────────────────────── */

export default function BlogPostPage() {
  const { selectedBlogPost, goBack } = useNavigationStore()

  const post = useMemo(
    () => blogPosts.find((p) => p.id === selectedBlogPost),
    [selectedBlogPost]
  )

  const segments = useMemo(
    () => (post ? parseContent(post.content) : []),
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
          <p className="text-2xl mb-6" style={{ color: '#F5F5F5' }}>پست یافت نشد</p>
          <button
            onClick={goBack}
            className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-lg transition-colors duration-300"
            style={{ backgroundColor: '#1C39BB15', color: '#F5F5F5', border: '1px solid #1C39BB30' }}
          >
            <ArrowRight size={16} />
            <span>بازگشت به بلاگ</span>
          </button>
        </motion.div>
      </div>
    )
  }

  const wordCount = post.content.trim().split(/\s+/).filter(Boolean).length

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

        <h1 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: '#F5F5F5' }}>
          {post.title}
        </h1>

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
            <span className="text-sm">{wordCount.toLocaleString('fa-IR')} کلمه</span>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {(post.tags ?? []).map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-1 rounded-full"
              style={{ backgroundColor: '#FF5E0015', color: '#FF5E00', border: '1px solid #FF5E0030' }}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-6 mb-2" style={{ height: '1px', backgroundColor: '#1C39BB20' }} />
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div
          className="rounded-xl p-6 md:p-10"
          style={{ backgroundColor: '#0A1128', border: '1px solid #1C39BB20' }}
        >
          <div className="markdown-content" dir="rtl">
            {segments.map((segment, i) => {
              if (segment.type === 'display-math') {
                const html = renderKatex(segment.formula, true)
                return (
                  <div
                    key={i}
                    className="my-6 overflow-x-auto text-center"
                    dir="ltr"
                    dangerouslySetInnerHTML={{ __html: html }}
                  />
                )
              }
              if (segment.type === 'code') {
                return <CodeBlock key={i} language={segment.language} codeString={segment.code} />
              }
              return <MarkdownSegment key={i} content={segment.content} codeSpans={segment.codeSpans} />
            })}
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
          style={{ backgroundColor: '#1C39BB15', color: '#F5F5F5', border: '1px solid #1C39BB30' }}
        >
          <ArrowRight size={16} />
          <span>بازگشت به بلاگ</span>
        </button>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="inline-flex items-center gap-2 text-sm px-5 py-2.5 rounded-lg transition-all duration-300 hover:brightness-110"
          style={{ backgroundColor: '#FF5E0010', color: '#FF5E00', border: '1px solid #FF5E0025' }}
        >
          بازگشت به بالا
        </button>
      </motion.div>
    </div>
  )
}
