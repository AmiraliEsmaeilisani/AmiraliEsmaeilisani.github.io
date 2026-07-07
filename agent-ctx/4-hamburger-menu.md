# Task 4 - HamburgerMenu Component

## Status: ✅ Completed

## Summary
Created `/home/z/my-project/src/components/portfolio/HamburgerMenu.tsx` — an animated hamburger menu component for the RTL Persian portfolio site.

## What was implemented

### Hamburger Button
- Fixed position at `top-6 right-6`, `z-50`
- Three horizontal lines: 28px wide, 2px height, `#0066FF` color
- 7px gap between lines (achieved via absolute positioning with `top: 0`, `50%`, `bottom: 0` in a 20px container)
- Open state: framer-motion morphs lines into X shape
  - Top line rotates 45deg to center
  - Middle line fades out + scaleX to 0
  - Bottom line rotates -45deg to center
- Color changes to `#FF5E00` when open
- Transition: `cubic-bezier(0.25, 0.1, 0.25, 1)`, duration 0.4s

### Full-screen Overlay
- `AnimatePresence`-wrapped overlay, `z-40`, full viewport
- Background: `rgba(10, 17, 40, 0.97)`
- Content centered vertically/horizontally with flexbox

### Menu Items
- 5 Persian items: خانه, رزومه, بلاگ, پروژه‌ها, تماس با من
- `text-[1.75rem]` on mobile, `sm:text-[2.5rem]` on desktop
- Font weight 700, color `#F5F5F5`, hover `#0066FF`
- Each has `data-cursor-hover` attribute
- Stagger animation: items slide in from right (`x: 60` → `0`), 0.08s delay between each
- Exit in reverse order via `popLayout` mode

### Social Links
- GitHub, LinkedIn, Email icons at bottom of overlay
- Color `#B0B0B0`, hover `#0066FF`
- Appear after menu items finish animating (delayed by `menuItems.length * 0.08`)

### Store Integration
- Uses `useNavigationStore` for `isMenuOpen`, `setMenuOpen`, `navigateTo`
- Menu items call `navigateTo(page)` which auto-closes menu
- "تماس با من" navigates to `contact`

## Lint Status
- Component passes lint (the pre-existing error is in a different file, unrelated)