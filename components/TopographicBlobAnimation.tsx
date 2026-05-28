'use client';

import { useEffect, useRef } from 'react';
import './TopographicBlobAnimation.css';

export default function TopographicBlobAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = containerRef.current?.querySelector('canvas') as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Escalamos el canvas para que se vea ultra nítido en pantallas Retina/4K
    const dpr = window.devicePixelRatio || 1;
    const size = 600;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    // CONFIGURACIÓN ESTÉTICA
    const CONFIG = {
      totalLines: 10,
      spacing: 18,
      baseRadius: 60,
      strokeColor: 'rgba(43, 31, 23, 0.15)',
      lineWidth: 1.5,
      speed: 0.005,
    };

    let time = 0;
    let animationId: number;

    function drawTopographicBlob() {
      ctx.clearRect(0, 0, size, size);

      const centerX = size / 2;
      const centerY = size / 2;

      ctx.strokeStyle = CONFIG.strokeColor;
      ctx.lineWidth = CONFIG.lineWidth;

      for (let i = 0; i < CONFIG.totalLines; i++) {
        ctx.beginPath();

        const currentRadius = CONFIG.baseRadius + i * CONFIG.spacing;
        const totalPoints = 120;

        for (let j = 0; j <= totalPoints; j++) {
          const angle = (j / totalPoints) * Math.PI * 2;

          const noiseX = Math.cos(angle * 2 + time) * 0.4;
          const noiseY = Math.sin(angle * 3 - time * 1.5) * 0.3;
          const waveFactor = 1 + (noiseX + noiseY) * (0.15 + i * 0.015);

          const r = currentRadius * waveFactor;

          const x = centerX + Math.cos(angle) * r;
          const y = centerY + Math.sin(angle) * r;

          if (j === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.closePath();
        ctx.stroke();
      }

      time += CONFIG.speed;
      animationId = requestAnimationFrame(drawTopographicBlob);
    }

    drawTopographicBlob();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="background-animation-container"
    >
      <canvas id="topographicCanvas" />
    </div>
  );
}
