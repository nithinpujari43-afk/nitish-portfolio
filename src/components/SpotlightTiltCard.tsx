import React, { useCallback, useRef } from 'react';

interface SpotlightTiltCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  tiltMaxDeg?: number;
  as?: 'div' | 'article';
}

export const SpotlightTiltCard: React.FC<SpotlightTiltCardProps> = ({
  children,
  className = '',
  onClick,
  tiltMaxDeg = 4.5,
  as = 'article',
}) => {
  const cardRef = useRef<HTMLElement | null>(null);
  const rafRef = useRef<number | null>(null);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      const el = cardRef.current;
      if (!el) return;

      const clientX = e.clientX;
      const clientY = e.clientY;

      if (rafRef.current !== null) return;
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;

        cardRef.current.style.setProperty('--spot-x', `${x}px`);
        cardRef.current.style.setProperty('--spot-y', `${y}px`);
        cardRef.current.style.setProperty('--spot-opacity', '1');

        if (tiltMaxDeg > 0) {
          const normX = (x / rect.width - 0.5) * 2;
          const normY = (y / rect.height - 0.5) * 2;
          const rotY = (normX * tiltMaxDeg).toFixed(2);
          const rotX = (-normY * tiltMaxDeg).toFixed(2);
          cardRef.current.style.transform = `perspective(1100px) rotateX(${rotX}deg) rotateY(${rotY}deg) translate3d(0, -3px, 0)`;
        }
      });
    },
    [tiltMaxDeg]
  );

  const handlePointerLeave = useCallback(() => {
    if (rafRef.current !== null) {
      window.cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty('--spot-opacity', '0');
    el.style.transform = 'perspective(1100px) rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0)';
  }, []);

  const Tag = as;

  return (
    <Tag
      ref={cardRef as React.RefObject<HTMLDivElement>}
      onClick={onClick}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`spotlight-card ${className}`}
    >
      {children}
    </Tag>
  );
};
