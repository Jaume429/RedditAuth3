'use client';

import { useEffect } from 'react';

export default function TopographicBlobAnimation() {
  useEffect(() => {
    const canvas = document.getElementById('topographicCanvas') as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.parentElement?.getBoundingClientRect();
    if (!rect) return;

    canvas.width = rect.width;
    canvas.height = rect.height;

    let time = 0;

    // Definir posiciones y colores de los blobs
    const blobs = [
      { x: 150, y: 200, color: 'rgba(200, 140, 100, 0.12)', size: 80 },
      { x: canvas.width - 200, y: 250, color: 'rgba(180, 120, 80, 0.1)', size: 100 },
      { x: 300, y: canvas.height - 200, color: 'rgba(210, 150, 110, 0.11)', size: 90 },
      { x: canvas.width - 150, y: canvas.height - 180, color: 'rgba(190, 130, 90, 0.1)', size: 85 },
    ];

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      blobs.forEach((blob, blobIndex) => {
        ctx.fillStyle = blob.color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (let layer = 0; layer < 8; layer++) {
          ctx.strokeStyle = `rgba(150, 100, 60, ${0.2 - layer * 0.02})`;
          ctx.lineWidth = 1.2;
          ctx.beginPath();

          const baseRadius = blob.size * 0.3 + layer * blob.size * 0.08;

          for (let i = 0; i <= 100; i++) {
            const angle = (i / 100) * Math.PI * 2;
            
            // Ralentizado: multiplicadores más pequeños
            const wave1 = Math.sin(angle * 3 + time * 0.02 + blobIndex) * blob.size * 0.15;
            const wave2 = Math.cos(angle * 2 - time * 0.015 + layer * 0.3) * blob.size * 0.12;
            const wave3 = Math.sin(angle + time * 0.01) * blob.size * 0.08;
            
            const radius = baseRadius + wave1 + wave2 + wave3;
            const x = blob.x + Math.cos(angle) * radius;
            const y = blob.y + Math.sin(angle) * radius;

            if (i === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }

          ctx.closePath();
          ctx.stroke();
        }
      });

      time += 1;
      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
      <canvas id="topographicCanvas" style={{ display: 'block', width: '100%', height: '100%' }} />
    </div>
  );
}
