import React from 'react';

const FloatingShapes = () => {
  const shapes = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    size: Math.random() * 180 + 100,
    left: Math.random() * 100,
    delay: Math.random() * 8,
    duration: Math.random() * 20 + 25,
    rotation: Math.random() * 360
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-60">
      {shapes.map((shape) => (
        <div
          key={shape.id}
          className="absolute mix-blend-overlay"
          style={{
            width: `${shape.size}px`,
            height: `${shape.size}px`,
            left: `${shape.left}%`,
            top: '-120px',
            background: `radial-gradient(circle at 30% 30%, rgba(242, 200, 113, 0.5), rgba(139, 85, 60, 0.2))`,
            borderRadius: shape.id % 2 === 0 ? '50% 50% 50% 50%' : '30% 70% 70% 30%',
            animation: `float ${shape.duration}s ease-in-out ${shape.delay}s infinite`,
            filter: 'blur(50px)',
            transform: `rotate(${shape.rotation}deg)`,
            boxShadow: `0 0 ${shape.size * 0.6}px rgba(179, 92, 62, 0.3)`
          }}
        />
      ))}
    </div>
  );
};

export default FloatingShapes;
