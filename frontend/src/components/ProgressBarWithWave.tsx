import React, { useEffect, useRef, useState } from "react";
import { Progress } from "./ui/progress";

// Two shades of green for the waves
const GREEN1 = "#4ade80"; // Main green
const GREEN2 = "#22c55e"; // Secondary green

// SVG Wave in a circle
function WaveCircle({ amplitude, frequency, phase, color, size = 120, progress = 0 }) {
  // The vertical offset for the wave (0 = bottom, 1 = top)
  const fillLevel = size - (progress / 100) * size;
  const points = [];
  for (let x = 0; x <= size; x += 2) {
    const theta = (x / size) * Math.PI * 2;
    // The wave is centered at fillLevel, so it rises as progress increases
    const y = amplitude * Math.sin(frequency * theta + phase) + fillLevel;
    points.push(`${x},${y}`);
  }
  const path = `M0,${size} L${points.join(" ")} L${size},${size} Z`;
  return (
    <svg width={size} height={size} style={{ position: "absolute", left: 0, top: 0 }}>
      <defs>
        <clipPath id="wave-clip">
          <circle cx={size / 2} cy={size / 2} r={size / 2} />
        </clipPath>
      </defs>
      <g clipPath="url(#wave-clip)">
        <path d={path} fill={color} fillOpacity={0.7} />
      </g>
    </svg>
  );
}

interface ProgressBarWithWaveProps {
  loading?: boolean;
  onComplete?: () => void;
  duration?: number;
}

export default function ProgressBarWithWave({
  loading = true,
  onComplete,
  duration = 7000, // ms, always 7 seconds
}: ProgressBarWithWaveProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);
  const requestRef = useRef<number>();
  const barRef = useRef<HTMLDivElement>(null);

  // Animate progress from 0 to 100 over duration
  useEffect(() => {
    if (!loading) return;
    let start: number | undefined;
    function animate(ts: number) {
      if (!start) start = ts;
      const elapsed = ts - start;
      const pct = Math.min(100, (elapsed / duration) * 100);
      setProgress(pct);
      setPhase((prev) => prev + 0.08);
      if (pct < 100) {
        requestRef.current = requestAnimationFrame(animate);
      } else if (onComplete) {
        onComplete();
      }
    }
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current!);
  }, [loading, duration, onComplete]);

  // Calculate the left position for the circle and triangle
  const getIndicatorLeft = () => {
    if (!barRef.current) return '0px';
    // 100% - 14px (half of 28px circle) to center the circle at the end
    return `calc(${progress}% - 14px)`;
  };

  return (
    <div
      style={{
        background: "#000",
        borderRadius: 24,
        padding: 32,
        width: 420,
        margin: "0 auto",
        boxShadow: "0 0 24px #4ade8030, 0 0 8px #fff1",
        position: "relative",
        filter: "drop-shadow(0 0 6px #4ade8040)",
      }}
    >
      {/* Wave animation in a circle */}
      <div style={{ position: "relative", width: 120, height: 120, margin: "0 auto 32px auto" }}>
        {/* Back wave */}
        <WaveCircle
          amplitude={14}
          frequency={1.5}
          phase={phase}
          color={GREEN2}
          size={120}
          progress={progress}
        />
        {/* Front wave */}
        <WaveCircle
          amplitude={10}
          frequency={2.2}
          phase={phase + 1}
          color={GREEN1}
          size={120}
          progress={progress}
        />
        {/* Percentage in the center (white, Playfair Display, glow) */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 120,
            height: 120,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 35,
            fontWeight: 700,
            color: "#fff",
            fontFamily: 'Playfair Display, serif',
            textShadow: "0 0 8px #4ade80cc, 0 0 2px #fff",
            pointerEvents: "none",
            letterSpacing: 0.5,
            userSelect: "none",
          }}
        >
          {Math.round(progress)}
        </div>
      </div>
      {/* Progress bar with glowing circle and triangle indicator */}
      <div style={{ position: "relative", width: "100%", margin: "32px 0 0 0", height: 64 }}>
        {/* Glowing green circle at the end of the filled bar, always visible when progress > 0 */}
        {progress > 0 && (
          <div
            style={{
              position: "absolute",
              left: getIndicatorLeft(),
              top: 21, // perfectly center the 28px circle on a 16px bar at top:26
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: GREEN1,
              boxShadow: "0 0 12px 4px #4ade8040",
              border: `2px solid #fff` ,
              zIndex: 4,
              pointerEvents: "none",
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: "left 0.1s linear",
            }}
          />
        )}
        {/* Triangle indicator above the circle, moves with progress */}
        <div
          style={{
            position: "absolute",
            left: getIndicatorLeft(),
            top: 0,
            width: 0,
            height: 0,
            borderLeft: "12px solid transparent",
            borderRight: "12px solid transparent",
            borderTop: `16px solid #fff`,
            zIndex: 5,
            pointerEvents: "none",
            transition: "left 0.1s linear",
          }}
        />
        {/* Thicker, fully rounded progress bar with strong, soft green glow */}
        <div
          ref={barRef}
          style={{
            position: "relative",
            width: "100%",
            height: 16, // thick bar
            background: "#444", // grey for unfilled
            borderRadius: 999,
            overflow: "visible",
            top: 26,
            boxShadow: "0 0 8px 2px #4ade8040", // more subtle green glow
          }}
        >
          {/* Filled part with strong, soft green glow */}
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              background: GREEN1,
              borderRadius: 999,
              boxShadow: progress > 0 ? `0 0 8px 2px #4ade80cc` : undefined,
              position: "absolute",
              left: 0,
              top: 0,
              zIndex: 1,
              transition: "width 0.1s linear",
            }}
          />
        </div>
        {/* Loading text and percentage below the bar, spaced and white */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 32,
            fontFamily: 'Montserrat, Arial, sans-serif',
            color: "#fff",
            fontSize: 20,
            textShadow: "0 0 8px #4ade8040",
            alignItems: "center",
            width: '100%',
          }}
        >
          <span style={{ color: '#fff', fontWeight: 400, textAlign: 'left' }}>LOADING....</span>
          <span style={{ color: '#fff', fontWeight: 700, textAlign: 'right' }}>{Math.round(progress)}%</span>
        </div>
      </div>
    </div>
  );
} 