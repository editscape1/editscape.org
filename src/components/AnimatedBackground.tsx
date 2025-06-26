
import { useEffect, useRef } from 'react';

export const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Enhanced particle system for video editing elements
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      type: 'cube' | 'videoTape' | 'timeline' | 'soundWave' | 'filmStrip' | 'playButton' | 'waveform';
      rotation: number;
      rotationSpeed: number;
      pulsePhase: number;
    }> = [];

    // Create more diverse editing-themed particles
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 30 + 8,
        speedX: (Math.random() - 0.5) * 0.8,
        speedY: (Math.random() - 0.5) * 0.8,
        opacity: Math.random() * 0.4 + 0.1,
        type: ['cube', 'videoTape', 'timeline', 'soundWave', 'filmStrip', 'playButton', 'waveform'][Math.floor(Math.random() * 7)] as any,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.03,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.rotation += particle.rotationSpeed;
        particle.pulsePhase += 0.02;

        // Wrap around screen
        if (particle.x < -particle.size) particle.x = canvas.width + particle.size;
        if (particle.x > canvas.width + particle.size) particle.x = -particle.size;
        if (particle.y < -particle.size) particle.y = canvas.height + particle.size;
        if (particle.y > canvas.height + particle.size) particle.y = -particle.size;

        // Pulsing effect for some elements
        const pulseMultiplier = 1 + Math.sin(particle.pulsePhase) * 0.2;

        // Set color and opacity with variation
        const green = Math.floor(185 + Math.sin(particle.pulsePhase) * 20);
        ctx.globalAlpha = particle.opacity * (0.8 + Math.sin(particle.pulsePhase) * 0.2);
        ctx.fillStyle = `rgb(16, ${green}, 129)`;
        ctx.strokeStyle = `rgb(16, ${green}, 129)`;
        ctx.lineWidth = 2;

        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate(particle.rotation);
        ctx.scale(pulseMultiplier, pulseMultiplier);

        // Draw different video editing elements
        switch (particle.type) {
          case 'cube':
            ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
            break;
            
          case 'videoTape':
            // Video cassette shape
            ctx.fillRect(-particle.size, -particle.size * 0.6, particle.size * 2, particle.size * 1.2);
            ctx.fillStyle = '#000';
            ctx.fillRect(-particle.size * 0.7, -particle.size * 0.3, particle.size * 0.5, particle.size * 0.6);
            ctx.fillRect(particle.size * 0.2, -particle.size * 0.3, particle.size * 0.5, particle.size * 0.6);
            break;
            
          case 'timeline':
            // Timeline track
            ctx.fillRect(-particle.size, -particle.size * 0.2, particle.size * 2, particle.size * 0.4);
            for (let j = 0; j < 4; j++) {
              ctx.fillRect(-particle.size + j * (particle.size * 0.5), -particle.size * 0.4, particle.size * 0.3, particle.size * 0.8);
            }
            break;
            
          case 'soundWave':
            // Sound wave visualization
            ctx.beginPath();
            for (let j = 0; j < 20; j++) {
              const waveX = -particle.size + (j / 19) * particle.size * 2;
              const waveY = Math.sin(j * 0.5 + particle.pulsePhase) * particle.size * 0.5;
              if (j === 0) ctx.moveTo(waveX, waveY);
              else ctx.lineTo(waveX, waveY);
            }
            ctx.stroke();
            break;
            
          case 'filmStrip':
            // Film strip with holes
            ctx.fillRect(-particle.size, -particle.size * 0.8, particle.size * 2, particle.size * 1.6);
            ctx.fillStyle = '#000';
            for (let j = 0; j < 6; j++) {
              const holeX = -particle.size * 0.8 + j * (particle.size * 0.3);
              ctx.beginPath();
              ctx.arc(holeX, -particle.size * 0.5, particle.size * 0.1, 0, Math.PI * 2);
              ctx.fill();
              ctx.beginPath();
              ctx.arc(holeX, particle.size * 0.5, particle.size * 0.1, 0, Math.PI * 2);
              ctx.fill();
            }
            break;
            
          case 'playButton':
            // Play button triangle
            ctx.beginPath();
            ctx.moveTo(-particle.size * 0.3, -particle.size * 0.5);
            ctx.lineTo(particle.size * 0.7, 0);
            ctx.lineTo(-particle.size * 0.3, particle.size * 0.5);
            ctx.closePath();
            ctx.fill();
            break;
            
          case 'waveform':
            // Audio waveform bars
            for (let j = 0; j < 8; j++) {
              const barHeight = Math.sin(j + particle.pulsePhase) * particle.size * 0.8 + particle.size * 0.2;
              const barX = -particle.size + j * (particle.size * 0.25);
              ctx.fillRect(barX, -barHeight / 2, particle.size * 0.15, barHeight);
            }
            break;
        }

        ctx.restore();
      });

      ctx.globalAlpha = 1;
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ background: 'radial-gradient(circle at 30% 70%, #0a0a0a 0%, #000000 50%, #001a0a 100%)' }}
    />
  );
};
