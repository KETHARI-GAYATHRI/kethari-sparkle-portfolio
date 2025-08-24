import { useEffect, useState } from 'react';

interface Ball {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  animationDelay: number;
}

export const BallpitBackground = () => {
  const [balls, setBalls] = useState<Ball[]>([]);

  useEffect(() => {
    const colors = [
      'hsl(var(--primary))',
      'hsl(var(--secondary))',
      'hsl(var(--accent))',
      'hsl(var(--tertiary))',
    ];

    const generateBalls = () => {
      const newBalls: Ball[] = [];
      for (let i = 0; i < 8; i++) {
        newBalls.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 60 + 20,
          color: colors[Math.floor(Math.random() * colors.length)],
          animationDelay: Math.random() * 6,
        });
      }
      setBalls(newBalls);
    };

    generateBalls();
  }, []);

  return (
    <div className="ballpit">
      {balls.map((ball) => (
        <div
          key={ball.id}
          className="ball"
          style={{
            left: `${ball.x}%`,
            top: `${ball.y}%`,
            width: `${ball.size}px`,
            height: `${ball.size}px`,
            background: ball.color,
            animationDelay: `${ball.animationDelay}s`,
            filter: 'blur(1px)',
            opacity: 0.4,
          }}
        />
      ))}
    </div>
  );
};