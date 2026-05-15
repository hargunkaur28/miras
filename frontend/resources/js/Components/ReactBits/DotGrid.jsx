import { useRef, useEffect, useCallback } from 'react';

const DotGrid = ({
  dotSize = 2,
  dotColor = '#3b82f633',
  gap = 25,
  hoverRadius = 150,
  maxOffset = 15,
  className = '',
  style = {}
}) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const dotsRef = useRef([]);
  const pointerRef = useRef({ x: -1000, y: -1000 });

  const buildGrid = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const { width, height } = container.getBoundingClientRect();
    canvas.width = width;
    canvas.height = height;

    const dots = [];
    const rows = Math.ceil(height / gap);
    const cols = Math.ceil(width / gap);

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        dots.push({
          x: j * gap + gap / 2,
          y: i * gap + gap / 2,
          cx: j * gap + gap / 2,
          cy: i * gap + gap / 2,
          ox: 0,
          oy: 0
        });
      }
    }
    dotsRef.current = dots;
  }, [gap]);

  useEffect(() => {
    buildGrid();
    const ro = new ResizeObserver(buildGrid);
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [buildGrid]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let frameId;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = dotColor;

      const pr = pointerRef.current;
      for (const dot of dotsRef.current) {
        const dx = pr.x - dot.cx;
        const dy = pr.y - dot.cy;
        const dist = Math.hypot(dx, dy);

        if (dist < hoverRadius) {
          const power = (1 - dist / hoverRadius);
          const targetOx = (dx / dist) * maxOffset * power;
          const targetOy = (dy / dist) * maxOffset * power;
          dot.ox += (targetOx - dot.ox) * 0.1;
          dot.oy += (targetOy - dot.oy) * 0.1;
        } else {
          dot.ox *= 0.9;
          dot.oy *= 0.9;
        }

        ctx.beginPath();
        ctx.arc(dot.cx - dot.ox, dot.cy - dot.oy, dotSize / 2, 0, Math.PI * 2);
        ctx.fill();
      }
      frameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(frameId);
  }, [dotColor, dotSize, hoverRadius, maxOffset]);

  const handlePointerMove = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const pr = pointerRef.current;
    pr.x = e.clientX - rect.left;
    pr.y = e.clientY - rect.top;
  };

  return (
    <div ref={containerRef} className={`absolute inset-0 z-0 ${className}`} style={style} onPointerMove={handlePointerMove}>
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};

export default DotGrid;
