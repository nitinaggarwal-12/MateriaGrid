'use client';

import React, { useEffect, useRef } from 'react';

export const QuantumParticleCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    const mouse = { x: width / 2, y: height / 2, radius: 120 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    canvas.addEventListener('mousemove', handleMouseMove);

    // REMEDY ORBITAL NODES
    const remedyNodes = [
      { name: 'Belladonna 65.2', x: width * 0.35, y: height * 0.3, vx: 0.4, vy: 0.3, color: '#10B981' },
      { name: 'Chelidonium 58.4', x: width * 0.65, y: height * 0.35, vx: -0.3, vy: 0.4, color: '#06B6D4' },
      { name: 'Sulphur 52.1', x: width * 0.5, y: height * 0.7, vx: 0.5, vy: -0.3, color: '#A855F7' },
      { name: 'Aconitum 49.3', x: width * 0.25, y: height * 0.65, vx: -0.4, vy: -0.4, color: '#F59E0B' },
      { name: 'Rhus-t 42.1', x: width * 0.75, y: height * 0.68, vx: 0.3, vy: 0.5, color: '#10B981' },
    ];

    // BACKGROUND QUANTUM PARTICLES
    const particleCount = 130;
    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
    }[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.6 + 0.2,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // DRAW CENTER QUANTUM HOLOGRAPHIC RING
      const centerX = width / 2;
      const centerY = height / 2;
      const time = Date.now() * 0.001;

      // Outer rotating bio-emerald ring
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(time * 0.3);
      ctx.beginPath();
      ctx.arc(0, 0, Math.min(width, height) * 0.28, 0, Math.PI * 1.6);
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.25)';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.restore();

      // Inner cyan ring
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(-time * 0.5);
      ctx.beginPath();
      ctx.arc(0, 0, Math.min(width, height) * 0.2, 0, Math.PI * 1.4);
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.3)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([8, 6]);
      ctx.stroke();
      ctx.restore();

      // PARTICLES UPDATE & CONNECT
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // MOUSE GRAVITY REACTION
        const dxMouse = mouse.x - p.x;
        const dyMouse = mouse.y - p.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < mouse.radius) {
          p.x += (dxMouse / distMouse) * 1.2;
          p.y += (dyMouse / distMouse) * 1.2;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(16, 185, 129, ${p.alpha})`;
        ctx.fill();

        // CONNECT NEARBY PARTICLES
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 75) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(16, 185, 129, ${(1 - dist / 75) * 0.2})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // REMEDY NODES UPDATE & GLOW
      for (const node of remedyNodes) {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 60 || node.x > width - 60) node.vx *= -1;
        if (node.y < 60 || node.y > height - 60) node.vy *= -1;

        // CONNECT REMEDY NODES TO CENTER
        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(centerX, centerY);
        ctx.strokeStyle = 'rgba(16, 185, 129, 0.2)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // NODE GLOW ORB
        const gradient = ctx.createRadialGradient(
          node.x,
          node.y,
          0,
          node.x,
          node.y,
          24
        );
        gradient.addColorStop(0, node.color);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.beginPath();
        ctx.arc(node.x, node.y, 24, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // NODE DOT
        ctx.beginPath();
        ctx.arc(node.x, node.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();

        // LABEL
        ctx.font = 'bold 11px monospace';
        ctx.fillStyle = '#E6E8EA';
        ctx.fillText(node.name, node.x + 10, node.y + 4);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full block cursor-crosshair"
    />
  );
};

export default QuantumParticleCanvas;
