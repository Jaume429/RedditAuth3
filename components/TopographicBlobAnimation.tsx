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

    const blobs = [
      { x: canvas.width * 0.15, y: canvas.height * 0.3, size: 180, speed: 0.0015 },
      { x: canvas.width * 0.85, y: canvas.height * 0.4, size: 200, speed: 0.002 },
      { x: canvas.width * 0.3, y: canvas.height * 0.85, size: 160, speed: 0.0018 },
      { x: canvas.width * 0.75, y: canvas.height * 0.75, size: 190, speed: 0.0016 },
    ];

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      blobs.forEach((blob, blobIndex) => {
        // Patrón más complejo y orgánico
        for (let layer = 0; layer < 12; layer++) {
          ctx.strokeStyle = `rgba(160, 110, 70, ${0.3 - layer * 0.018})`;
          ctx.lineWidth = 1.5;
          ctx.beginPath();

          const baseRadius = blob.size * 0.2 + layer * blob.size * 0.06;
          const blobTime = time * blob.speed;

          for (let i = 0; i <= 200; i++) {
            const angle = (i / 200) * Math.PI * 2;
            
            // Formas más orgánicas y complejas
            const wave1 = Math.sin(angle * 4 + blobTime + blobIndex * 2) * blob.size * 0.12;
            const wave2 = Math.cos(angle * 5 - blobTime * 0.8 + layer * 0.5) * blob.size * 0.1;
            const wave3 = Math.sin(angle * 2.5 + blobTime * 0.4) * blob.size * 0.08;
            const wave4 = Math.cos(angle * 3 - blobTime * 0.5 + layer) * blob.size * 0.07;
            
            const radius = baseRadius + wave1 + wave2 + wave3 + wave4;
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
