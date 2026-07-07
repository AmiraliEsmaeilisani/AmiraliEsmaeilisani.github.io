'use client';

import { useRef, useState, useEffect, useCallback } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

const LERP_FACTOR = 0.15;
const DOT_SIZE = 8;
const DOT_HOVER_SIZE = 4;
const FOLLOWER_SIZE = 40;
const FOLLOWER_HOVER_SCALE = 1.8;
const HOVER_TRANSITION = 'cubic-bezier(0.25, 0.1, 0.25, 1) 0.3s';
const RIPPLE_DURATION = 600;
const RIPPLE_MAX_SIZE = 60;
const DOT_COLOR = '#0066FF';
const FOLLOWER_COLOR = 'rgba(255, 94, 0, 0.6)';
const FOLLOWER_HOVER_COLOR = '#1C39BB';
const RIPPLE_COLOR = '#FF5E00';
const HOVER_SELECTORS = 'a, button, [role="button"], [data-cursor-hover], .interactive';

function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor;
}

function isHoverTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  return target.closest(HOVER_SELECTORS) !== null;
}

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number>(0);
  const mousePosRef = useRef<MousePosition>({ x: -100, y: -100 });
  const followerPosRef = useRef<MousePosition>({ x: -100, y: -100 });
  const isHoveringRef = useRef(false);
  const isVisibleRef = useRef(false);

  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(() => {
    if (typeof window === 'undefined') return false;
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  });

  // Animate loop using ref to avoid self-referencing useCallback
  const animateRef = useRef<() => void>(() => {});

  const applyHoverStyles = useCallback(() => {
    if (!dotRef.current || !followerRef.current) return;

    dotRef.current.style.width = `${DOT_HOVER_SIZE}px`;
    dotRef.current.style.height = `${DOT_HOVER_SIZE}px`;
    dotRef.current.style.transition = `width ${HOVER_TRANSITION}, height ${HOVER_TRANSITION}`;

    followerRef.current.style.width = `${FOLLOWER_SIZE * FOLLOWER_HOVER_SCALE}px`;
    followerRef.current.style.height = `${FOLLOWER_SIZE * FOLLOWER_HOVER_SCALE}px`;
    followerRef.current.style.borderColor = FOLLOWER_HOVER_COLOR;
    followerRef.current.style.transition = `width ${HOVER_TRANSITION}, height ${HOVER_TRANSITION}, border-color ${HOVER_TRANSITION}, transform ${HOVER_TRANSITION}`;
  }, []);

  const applyDefaultStyles = useCallback(() => {
    if (!dotRef.current || !followerRef.current) return;

    dotRef.current.style.width = `${DOT_SIZE}px`;
    dotRef.current.style.height = `${DOT_SIZE}px`;
    dotRef.current.style.transition = `width ${HOVER_TRANSITION}, height ${HOVER_TRANSITION}`;

    followerRef.current.style.width = `${FOLLOWER_SIZE}px`;
    followerRef.current.style.height = `${FOLLOWER_SIZE}px`;
    followerRef.current.style.borderColor = FOLLOWER_COLOR;
    followerRef.current.style.transition = `width ${HOVER_TRANSITION}, height ${HOVER_TRANSITION}, border-color ${HOVER_TRANSITION}, transform ${HOVER_TRANSITION}`;
  }, []);

  const createRipple = useCallback((x: number, y: number) => {
    const ripple = document.createElement('div');
    ripple.style.position = 'fixed';
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.style.width = '0px';
    ripple.style.height = '0px';
    ripple.style.borderRadius = '50%';
    ripple.style.border = `2px solid ${RIPPLE_COLOR}`;
    ripple.style.transform = 'translate(-50%, -50%)';
    ripple.style.pointerEvents = 'none';
    ripple.style.zIndex = '9999';
    ripple.style.opacity = '1';
    ripple.style.transition = `width ${RIPPLE_DURATION}ms ease-out, height ${RIPPLE_DURATION}ms ease-out, opacity ${RIPPLE_DURATION}ms ease-out`;
    document.body.appendChild(ripple);

    requestAnimationFrame(() => {
      ripple.style.width = `${RIPPLE_MAX_SIZE}px`;
      ripple.style.height = `${RIPPLE_MAX_SIZE}px`;
      ripple.style.opacity = '0';
    });

    setTimeout(() => {
      if (ripple.parentNode) {
        ripple.parentNode.removeChild(ripple);
      }
    }, RIPPLE_DURATION);
  }, []);

  // Runtime touch device detection via event listener
  useEffect(() => {
    if (isTouchDevice) return;

    const touchStartHandler = () => {
      setIsTouchDevice(true);
    };

    window.addEventListener('touchstart', touchStartHandler, { once: true });

    return () => {
      window.removeEventListener('touchstart', touchStartHandler);
    };
  }, [isTouchDevice]);

  // Main cursor effect: event listeners + animation loop
  useEffect(() => {
    if (isTouchDevice) return;

    // Define the animate function
    const animate = () => {
      followerPosRef.current.x = lerp(
        followerPosRef.current.x,
        mousePosRef.current.x,
        LERP_FACTOR
      );
      followerPosRef.current.y = lerp(
        followerPosRef.current.y,
        mousePosRef.current.y,
        LERP_FACTOR
      );

      if (dotRef.current) {
        const currentDotSize = isHoveringRef.current ? DOT_HOVER_SIZE : DOT_SIZE;
        dotRef.current.style.transform = `translate(${mousePosRef.current.x - currentDotSize / 2}px, ${mousePosRef.current.y - currentDotSize / 2}px)`;
      }

      const currentFollowerSize = isHoveringRef.current
        ? FOLLOWER_SIZE * FOLLOWER_HOVER_SCALE
        : FOLLOWER_SIZE;

      if (followerRef.current) {
        followerRef.current.style.transform = `translate(${followerPosRef.current.x - currentFollowerSize / 2}px, ${followerPosRef.current.y - currentFollowerSize / 2}px)`;
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    // Store in ref for cleanup access
    animateRef.current = animate;

    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };

      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        setIsVisible(true);
      }

      const shouldHover = isHoverTarget(e.target);
      if (shouldHover !== isHoveringRef.current) {
        isHoveringRef.current = shouldHover;
        if (shouldHover) {
          applyHoverStyles();
        } else {
          applyDefaultStyles();
        }
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      createRipple(e.clientX, e.clientY);
    };

    const handleMouseLeave = () => {
      isVisibleRef.current = false;
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      isVisibleRef.current = true;
      setIsVisible(true);
    };

    mousePosRef.current = { x: -100, y: -100 };
    followerPosRef.current = { x: -100, y: -100 };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    animFrameRef.current = requestAnimationFrame(animate);

    // Inject global style to hide default cursor
    const styleEl = document.createElement('style');
    styleEl.id = 'custom-cursor-hide-default';
    styleEl.textContent = '* { cursor: none !important; }';
    document.head.appendChild(styleEl);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animFrameRef.current);

      const existingStyle = document.getElementById('custom-cursor-hide-default');
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, [isTouchDevice, applyHoverStyles, applyDefaultStyles, createRipple]);

  if (isTouchDevice) {
    return null;
  }

  return (
    <>
      {/* Dot (main cursor) */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: `${DOT_SIZE}px`,
          height: `${DOT_SIZE}px`,
          backgroundColor: DOT_COLOR,
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.3s ease',
          willChange: 'transform',
        }}
      />
      {/* Follower ring */}
      <div
        ref={followerRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: `${FOLLOWER_SIZE}px`,
          height: `${FOLLOWER_SIZE}px`,
          borderRadius: '50%',
          border: `2px solid ${FOLLOWER_COLOR}`,
          pointerEvents: 'none',
          zIndex: 9999,
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.3s ease',
          willChange: 'transform',
        }}
      />
    </>
  );
}