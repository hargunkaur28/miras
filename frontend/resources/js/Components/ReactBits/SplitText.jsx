import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const SplitText = ({
  text = '',
  className = '',
  delay = 0,
  animation = { y: '100%', opacity: 0, duration: 0.5, ease: 'power2.out' }
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const chars = containerRef.current.querySelectorAll('.split-char');
    gsap.from(chars, {
      ...animation,
      delay,
      stagger: 0.05
    });
  }, [animation, delay]);

  return (
    <span ref={containerRef} className={`split-text-container ${className}`} style={{ display: 'inline-block', overflow: 'hidden' }}>
      {text.split('').map((char, index) => (
        <span
          key={index}
          className="split-char"
          style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
          {char}
        </span>
      ))}
    </span>
  );
};

export default SplitText;
