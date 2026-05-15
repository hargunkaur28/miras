import { useRef, useEffect } from 'react';

const BorderGlow = ({ children, className = '', glowColor = 'rgba(255, 255, 255, 0.4)' }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const { left, top } = containerRef.current.getBoundingClientRect();
      containerRef.current.style.setProperty('--mouse-x', `${e.clientX - left}px`);
      containerRef.current.style.setProperty('--mouse-y', `${e.clientY - top}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className={`border-glow-container ${className}`} style={{ '--glow-color': glowColor }}>
      <div className="border-glow-overlay"></div>
      <div className="border-glow-content">{children}</div>
    </div>
  );
};

export default BorderGlow;
