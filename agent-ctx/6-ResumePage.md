# Task 6: ResumePage Component

## Status: Completed

## Summary
Created `/home/z/my-project/src/components/portfolio/ResumePage.tsx` — a full resume/CV page for a Persian (RTL) mechanical engineering student's portfolio.

## What was built
- **Page Header**: Back button (ArrowRight, RTL), title "رزومه من", subtitle with name in blue
- **About/Bio Section**: Bio text, language badges, interest badges (orange-tinted)
- **Education Timeline**: Vertical timeline with left-aligned dots (RTL), period badges in orange, degree/field/institution/GPA/description cards
- **Skills Section**: Progress bars with animated fill (`skill-bar-fill` class), icon mapping (Code, Brain, Calculator, Box, Cpu, Globe, Database, Container), category labels, percentage display
- **Experience Timeline**: Same timeline style as education, for work experiences
- **Download PDF Button**: Large button with orange border, hover fill animation
- **Scroll animations**: All sections use framer-motion `useInView` with staggered delays
- **Design consistency**: Followed exact color specs (#0A1128, #1C39BB, #0066FF, #FF5E00, #B0B0B0, #F5F5F5), cubic-bezier transitions, RTL layout

## Technical details
- `'use client'` component
- Imports `resumeData` from `@/data/portfolio-data`
- Imports `goBack` from `@/store/useNavigationStore`
- Helper sub-components: `SectionCard`, `SectionTitle`, `EducationTimelineItem`, `ExperienceTimelineItem`, `SkillBar`, `SkillIcon`
- English tech names wrapped in `<span dir="ltr">` where applicable
- `data-cursor-hover` on interactive elements
- Lint passes with no errors