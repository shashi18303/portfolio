import React, { useEffect, useRef, useState } from 'react';

export const BloomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const bloomAuraRef = useRef<HTMLDivElement>(null);

  // Smooth lerp coordinates
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const animFrameId = useRef<number>(0);

  useEffect(() => {
    // Check if device is touch only
    if (typeof window !== 'undefined') {
      const touchCheck = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
      if (touchCheck) {
        setIsTouchDevice(true);
        return;
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      if (!isVisible) {
        setIsVisible(true);
      }

      // Update dot instantly for crisp precision
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }

      // Detect if hovering over clickable / interactive elements
      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = Boolean(
          target.closest('a, button, input, textarea, select, [role="button"], label, .interactive-card, .cursor-pointer')
        );
        setIsHovered(isInteractive);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Smooth Lerp Animation Loop for the Blooming Ring and Aura
    const renderLoop = () => {
      // Lerp smoothing formula: current += (target - current) * ease
      const ease = 0.16;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * ease;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * ease;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      if (bloomAuraRef.current) {
        bloomAuraRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      animFrameId.current = requestAnimationFrame(renderLoop);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    animFrameId.current = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
    };
  }, [isVisible]);

  if (isTouchDevice) {
    return null;
  }

  return (
    <div
      id="custom-bloom-cursor-container"
      className={`fixed inset-0 pointer-events-none z-[99999] transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      {/* 1. Deep Radiant Bloom Aura (Diffuse Glow) */}
      <div
        ref={bloomAuraRef}
        className={`fixed top-0 left-0 rounded-full pointer-events-none transition-all duration-300 will-change-transform ${
          isHovered
            ? 'w-24 h-24 bg-gradient-to-r from-amber-500/25 via-yellow-400/20 to-cyan-400/20 blur-xl opacity-90 scale-125'
            : isClicking
            ? 'w-16 h-16 bg-amber-400/35 blur-lg opacity-90 scale-90'
            : 'w-16 h-16 bg-gradient-to-r from-amber-400/15 via-yellow-400/10 to-amber-600/15 blur-lg opacity-60'
        }`}
      />

      {/* 2. Round Bloom Corona Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full pointer-events-none will-change-transform transition-[width,height,border-color,background-color,box-shadow] duration-200 flex items-center justify-center ${
          isHovered
            ? 'w-14 h-14 border-2 border-amber-400/80 bg-amber-400/10 shadow-[0_0_24px_rgba(255,184,0,0.55),inset_0_0_12px_rgba(255,184,0,0.25)]'
            : isClicking
            ? 'w-8 h-8 border border-amber-300 bg-amber-400/30 shadow-[0_0_18px_rgba(255,184,0,0.7)]'
            : 'w-10 h-10 border border-amber-400/50 bg-amber-400/5 shadow-[0_0_14px_rgba(255,184,0,0.3),inset_0_0_6px_rgba(255,184,0,0.15)]'
        }`}
      >
        {/* Subtle inner rotating pulse dot on hover */}
        {isHovered && (
          <div className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-ping opacity-60" />
        )}
      </div>

      {/* 3. Razor-Sharp Luminous Center Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 rounded-full pointer-events-none will-change-transform transition-[width,height,background-color,box-shadow] duration-150 ${
          isHovered
            ? 'w-3 h-3 bg-amber-300 shadow-[0_0_12px_rgba(255,200,66,0.9)]'
            : isClicking
            ? 'w-4 h-4 bg-yellow-200 shadow-[0_0_16px_rgba(255,230,100,1)]'
            : 'w-2 h-2 bg-amber-400 shadow-[0_0_8px_rgba(255,184,0,0.85)]'
        }`}
      />
    </div>
  );
};
