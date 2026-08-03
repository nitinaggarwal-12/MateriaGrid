'use client';

import React, { useEffect, useRef } from 'react';

interface TelemetryPulseProps {
  activeCalculationCount: number;
}

export const TelemetryPulse: React.FC<TelemetryPulseProps> = ({
  activeCalculationCount,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    // Track an array of moving digital neon light particles
    const particles: Array<{
      x: number;
      y: number;
      speed: number;
      length: number;
      alpha: number;
    }> = [];

    const particleCount = Math.min(Math.max(activeCalculationCount * 5, 15), 60);

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        speed: 0.5 + Math.random() * 1.5,
        length: 20 + Math.random() * 40,
        alpha: 0.1 + Math.random() * 0.4,
      });
    }

    const renderMatrixBackground = () => {
      ctx.clearRect(0, 0, width, height);

      // Render fine trailing lines flowing horizontally down the screen matrix
      ctx.lineWidth = 1;
      particles.forEach((p) => {
        ctx.strokeStyle = `rgba(16, 185, 129, ${p.alpha})`;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x + p.length, p.y);
        ctx.stroke();

        // Increment position state
        p.x += p.speed;
        if (p.x > width) {
          p.x = -p.length;
          p.y = Math.random() * height;
        }
      });

      animationFrameId = requestAnimationFrame(renderMatrixBackground);
    };

    renderMatrixBackground();

    const handleResizeResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResizeResize);
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResizeResize);
    };
  }, [activeCalculationCount]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-40 z-0 bg-[#090A0C]"
    />
  );
};

export default TelemetryPulse;
