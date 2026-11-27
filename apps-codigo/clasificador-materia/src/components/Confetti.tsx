import React, { useEffect, useState } from 'react';

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  rotation: number;
  speedY: number;
  speedX: number;
}

const COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#a855f7', '#ec4899'];

export default function Confetti() {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    // Generate initial pieces
    const initialPieces: ConfettiPiece[] = Array.from({ length: 80 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage x
      y: -10 - Math.random() * 20, // start above screen
      size: Math.random() * 8 + 6,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      rotation: Math.random() * 360,
      speedY: Math.random() * 3 + 2,
      speedX: (Math.random() - 0.5) * 1.5
    }));
    setPieces(initialPieces);

    // Animation interval loop
    const interval = setInterval(() => {
      setPieces(prev =>
        prev
          .map(p => ({
            ...p,
            y: p.y + p.speedY,
            x: p.x + p.speedX,
            rotation: p.rotation + p.speedX * 4
          }))
          .filter(p => p.y < 120) // Keep items until they slide off
      );
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-55">
      {pieces.map(p => (
        <div
          key={p.id}
          className="absolute rounded-xs"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size * 1.3}px`,
            backgroundColor: p.color,
            transform: `rotate(${p.rotation}deg)`,
            opacity: 0.85,
            transition: 'transform 0.05s linear'
          }}
        />
      ))}
    </div>
  );
}
