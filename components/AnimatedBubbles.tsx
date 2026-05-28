import React from 'react';

const AnimatedBubbles = () => {
  const dots = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 6 + 2,
    left: Math.random() * 100,
    delay: Math.random() * 5,
    duration: Math.random() * 8 + 12
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {dots.map((dot) => (
        <div
          key={dot.id}
          style={{
            position: 'absolute',
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            left: `${dot.left}%`,
            bottom: '-10px',
            borderRadius: '50%',
            background: 'rgba(242, 200, 113, 0.7)',
            boxShadow: `0 0 ${dot.size}px rgba(242, 200, 113, 0.8)`,
            animation: `float ${dot.duration}s linear ${dot.delay}s infinite`
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedBubbles;
