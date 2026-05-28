'use client';

import { useEffect, useState } from 'react';

export default function TopographicBlobAnimation() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const canvas = document.getElementById('topographicCanvas') as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const size = 600;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

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
      cancelAnimationFrame(animationId);
    };
  }, []);

  if (!isMounted) return null;

  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        height: '600px',
        zIndex: -1,
        pointerEvents: 'none',
      }}
    >
      <canvas
        id="topographicCanvas"
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
        }}
      />
    </div>
  );
}
