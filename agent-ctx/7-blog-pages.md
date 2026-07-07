# Task 7 - Blog Pages

## Files Created

### 1. `/home/z/my-project/src/components/portfolio/BlogPage.tsx`
- Blog listing page with RTL support, 'use client'
- Header with back button (ArrowLeft), title "بلاگ" and subtitle
- 1-col mobile / 2-col md grid of blog cards
- Each card: gradient placeholder (120px, #1C39BB30 → #0A1128) with faded titleEn overlay, p-6 content area with title, date row (Calendar icon), tags (Tag icon, #FF5E00 badges), summary (line-clamp-3), "ادامه مطلب" link
- Hover: left border 3px solid #0066FF, box-shadow #0066FF15
- data-cursor-hover, interactive class on cards
- Calls openBlogPost(post.id) on click
- Framer Motion staggered animations

### 2. `/home/z/my-project/src/components/portfolio/BlogPostPage.tsx`
- Individual blog post page with RTL support, 'use client'
- Gets selectedBlogPost from store, finds matching post
- Not found: shows "پست یافت نشد" with back button
- Header: ArrowRight back button (RTL), title #F5F5F5 text-2xl/md:text-3xl, meta (date + tags)
- Content: ReactMarkdown with custom renderers
  - Code blocks: SyntaxHighlighter with vscDarkPlus theme, bg #060D1A, border #1C39BB40, rounded-lg, 0.875rem font, language label
  - Inline code: styled with #FF5E00 on dark bg
  - Math: KaTeX via processMathInText() - handles both display ($$...$$) and inline ($...$) math
  - Custom h1, h2, h3, p, strong, em, ul, ol, li, blockquote, a, hr renderers
- Footer: "بازگشت به بلاگ" button
- All transitions: cubic-bezier(0.25, 0.1, 0.25, 1)

## Notes
- ESLint passes clean
- Pre-existing CSS @import error in globals.css (not related to this task)
- All dependencies (react-markdown, react-syntax-highlighter, katex, framer-motion) already in package.json