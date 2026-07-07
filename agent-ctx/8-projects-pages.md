# Task 8: Projects Pages

## Files Created
1. `/home/z/my-project/src/components/portfolio/ProjectsPage.tsx` - Projects listing page
2. `/home/z/my-project/src/components/portfolio/ProjectDetailPage.tsx` - Project detail page

## Implementation Details

### ProjectsPage.tsx
- 'use client' component with RTL Persian layout
- Header with back button (ArrowLeft), title "پروژه‌ها", subtitle "پروژه‌های تحقیقاتی و اجرایی من"
- 1-col mobile / 2-col lg grid with gap-6
- Each ProjectCard has 3D tilt effect using framer-motion `useMotionValue`, `useSpring`, `useTransform`
  - Tilt range: ±8 degrees on X/Y axes
  - Springs back to center on mouse leave
  - `transform-style: preserve-3d`, `perspective: 1000px`
- Card design: gradient placeholder (160px), faded titleEn overlay, quick action icons (GitHub/ExternalLink) in top-left, tech tags (key tech in orange, others in blue), "مشاهده جزئیات" link
- Hover: border glow `#0066FF20`, shadow glow
- Click opens project detail via `openProject(project.id)` (external links use stopPropagation)

### ProjectDetailPage.tsx
- 'use client' component with RTL Persian layout
- Header with back button (ArrowRight), project title + titleEn
- Action buttons: GitHub (bordered #0066FF, hover fills), Demo (solid #FF5E00)
- Full description rendered with ReactMarkdown in `markdown-content` class
- Technology stack section with key tech (orange) and others (blue) badges
- Gallery section: grid if images exist, "تصاویری موجود نیست" message if empty
- Error state if project not found
- All animations with framer-motion, cubic-bezier transitions

## Notes
- Pre-existing CSS @import error in globals.css (not related to this task)
- Lint passes cleanly