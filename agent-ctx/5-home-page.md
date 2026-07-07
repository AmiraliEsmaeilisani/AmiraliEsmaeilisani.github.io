# Task 5 - HomePage Component

## Summary
Created `/home/z/my-project/src/components/portfolio/HomePage.tsx` — a 'use client' component serving as the main home page for the Persian (RTL) mechanical engineering student's portfolio.

## What was built

### 1. Hero Section
- Full viewport height, centered content with staggered framer-motion fadeInUp animations
- Name "مهدی احمدی" in large bold text (text-4xl/md:6xl/lg:7xl), color #F5F5F5
- Subtitle in #B0B0B0, tagline in #0066FF
- Two CTA buttons: "رزومه من" (orange bg, white text) and "پروژه‌ها" (blue border), both with `data-cursor-hover`
- Animated scroll-down chevron indicator at bottom

### 2. Latest Blog Posts Section
- Section title "آخرین نوشته‌ها" with #0066FF underline accent
- Shows 2 most recent blog posts as horizontal cards in responsive grid (1 col mobile, 2 col md)
- Cards: gradient placeholder, title, date, 2-line summary, tag badges (#FF5E00 style)
- Hover: left border #0066FF with subtle glow, calls `openBlogPost(post.id)`
- `data-cursor-hover` and `interactive` class on each card
- "مشاهده همه نوشته‌ها" link calling `navigateTo('blog')`

### 3. Featured Projects Section
- Section title "پروژه‌های منتخب" with #FF5E00 underline accent
- 3 projects in responsive grid (1/2/3 cols)
- Cards: gradient placeholder, title, 2-line description, tech tags (key=#FF5E00, others=#0066FF)
- English tech names wrapped in `<LtrText>` component (dir="ltr", inline-block)
- Hover: border glow + scale(1.02), calls `openProject(project.id)`
- `data-cursor-hover` and `interactive` class on each card
- "مشاهده همه پروژه‌ها" link calling `navigateTo('projects')`

## Design Rules Applied
- Container: max-w-6xl mx-auto px-4 sm:px-6
- Section spacing: py-16 md:py-24
- Card bg: #0A1128, border: #1C39BB30, rounded-2xl
- Transition timing: cubic-bezier(0.25, 0.1, 0.25, 1)
- Scroll-triggered animations via useInView with once:true
- All Persian text is RTL (inherited direction), English tech names use LtrText wrapper