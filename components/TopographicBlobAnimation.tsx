'use client';

import { useEffect } from 'react';

export default function TopographicBlobAnimation() {
  useEffect(() => {
    const canvas = document.getElementById('topographicCanvas') as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 600;
    canvas.height = 600;

    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, 600, 600);
      ctx.fillStyle = 'rgba(43, 31, 23, 0.08)';
      ctx.fillRect(0, 0, 600, 600);

      const centerX = 300;
      const centerY = 300;

      for (let layer = 0; layer < 10; layer++) {
        ctx.strokeStyle = `rgba(120, 80, 50, ${0.3 - layer * 0.02})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();

        const baseRadius = 40 + layer * 20;

        for (let i = 0; i <= 120; i++) {
          const angle = (i / 120) * Math.PI * 2;
          
          // Deformación simple pero efectiva
          const wave = Math.sin(angle * 3 + time * 0.1 + layer) * 15;
          const wave2 = Math.cos(angle * 2 - time * 0.08 + layer * 0.5) * 10;
          
          const radius = baseRadius + wave + wave2;
          const x = centerX + Math.cos(angle) * radius;
          const y = centerY + Math.sin(angle) * radius;

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.closePath();
        ctx.stroke();
      }

      time += 1;
      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <canvas
        id="topographicCanvas"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1,
          opacity: 0.6,
        }}
      />
    </div>
  );
}
