import React from "react";
import { cn } from "../../lib/utils";

const BlockLoader = ({
  blockColor = "bg-[#2563eb]",
  borderColor = "border-[#2563eb]",
  size = 75,
  gap = 4,
  speed = 1,
  className,
}) => {
  const blocks = [0, 1, 2, 3];

  return (
    <div
      className={cn(
        `flex flex-wrap p-1 border-2 rounded-md ${borderColor} justify-center`,
        className
      )}
      style={{
        maxWidth: `${size * 2 + gap * 3 + 8}px`,
        gap: `${gap}px`
      }}
    >
      {blocks.map((_, i) => (
        <div
          key={i}
          className={cn(`${blockColor} rounded-sm mx-1`)}
          style={{
            width: `${size}px`,
            height: `${size}px`,
            animation: `blockLoading ${speed}s infinite`,
            animationDelay: `${i * 0.2}s`,
          }}
        />
      ))}

      <style>{`
        @keyframes blockLoading {
          0%, 100% { flex: 1; }
          50% { flex: 4; }
        }
      `}</style>
    </div>
  );
};

export default BlockLoader;
