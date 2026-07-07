# Task 2 — AnimatedBackground Component

## Status: ✅ Completed

## File Created
- `/home/z/my-project/src/components/portfolio/AnimatedBackground.tsx`

## Implementation Summary

Created a `'use client'` canvas-based particle network animation component with the following features:

### Particle Network
- **80 particles on desktop**, **40 on mobile** (responsive via 768px breakpoint)
- Each particle has `x`, `y`, `vx`, `vy`, `radius`, `baseRadius`, `color`, `pulsePhase`, `pulseSpeed`
- Particles move slowly in random directions with soft edge bouncing
- Connection lines drawn between particles within 150px distance
- Line opacity decreases with distance using a smoothstep ease-in-out curve: `opacity² × (3 - 2 × opacity)`
- `requestAnimationFrame` drives smooth animation

### Colors
- `#0066FF` (electric blue) and `#1C39BB` (persian blue) mixed randomly for particles
- `#FF5E00` (orange tint) for ~10% of particles (rare accent)
- Connection lines use `#1C39BB` with varying opacity up to 0.4
- Canvas background is transparent (page handles `#0A1128`)

### Performance
- `useRef` for canvas, animation frame ID, particles array, and DPR
- Animation loop defined inside `useEffect` to avoid `react-hooks/immutability` lint issue with `useCallback`
- Proper cleanup: `cancelAnimationFrame` + `removeEventListener` on unmount
- `devicePixelRatio` used for sharp HiDPI rendering
- No mouse/scroll reactivity — purely ambient animation

### Extras
- Subtle pulsing size effect via `sin(phase) * 0.3` multiplier
- Responsive resize handler that adjusts canvas size, particle count, and clamps particle positions
- `pointer-events-none` and `aria-hidden="true"` for accessibility
- Fixed positioning at `z-0` for full-viewport background layer

### Lint
- Passes ESLint with zero warnings/errors (the remaining lint error is from an unrelated file)