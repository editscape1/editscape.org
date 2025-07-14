
import { useEffect, useRef } from 'react';

export const Hero3DElements = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // 3D-like elements for the hero section
    const elements = [
      {
        type: 'cube',
        x: canvas.width * 0.3,
        y: canvas.height * 0.2,
        size: 80,
        rotation: 0,
        rotationSpeed: 0.02,
        depth: 0.6,
      },
      {
        type: 'timeline',
        x: canvas.width * 0.7,
        y: canvas.height * 0.4,
        size: 120,
        rotation: 0,
        rotationSpeed: 0.015,
        depth: 0.8,
      },
      {
        type: 'videoReel',
        x: canvas.width * 0.2,
        y: canvas.height * 0.7,
        size: 100,
        rotation: 0,
        rotationSpeed: 0.025,
        depth: 0.7,
      },
      {
        type: 'playButton',
        x: canvas.width * 0.8,
        y: canvas.height * 0.15,
        size: 60,
        rotation: 0,
        rotationSpeed: 0.01,
        depth: 0.9,
      },
      {
        type: 'waveform',
        x: canvas.width * 0.6,
        y: canvas.height * 0.8,
        size: 90,
        rotation: 0,
        rotationSpeed: 0.018,
        depth: 0.5,
      },
    ];

    let animationTime = 0;

    const draw3DCube = (x: number, y: number, size: number, rotation: number, depth: number) => {
      const cos = Math.cos(rotation);
      const sin = Math.sin(rotation);
      
      // Front face
      ctx.fillStyle = `rgba(16, 185, 129, ${0.8 * depth})`;
      ctx.fillRect(x - size/2, y - size/2, size, size);
      
      // Top face (3D effect)
      ctx.fillStyle = `rgba(16, 185, 129, ${0.6 * depth})`;
      ctx.beginPath();
      ctx.moveTo(x - size/2, y - size/2);
      ctx.lineTo(x - size/2 + size/3, y - size/2 - size/3);
      ctx.lineTo(x + size/2 + size/3, y - size/2 - size/3);
      ctx.lineTo(x + size/2, y - size/2);
      ctx.closePath();
      ctx.fill();
      
      // Right face
      ctx.fillStyle = `rgba(16, 185, 129, ${0.4 * depth})`;
      ctx.beginPath();
      ctx.moveTo(x + size/2, y - size/2);
      ctx.lineTo(x + size/2 + size/3, y - size/2 - size/3);
      ctx.lineTo(x + size/2 + size/3, y + size/2 - size/3);
      ctx.lineTo(x + size/2, y + size/2);
      ctx.closePath();
      ctx.fill();
    };

    const drawTimeline = (x: number, y: number, size: number, rotation: number, depth: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      
      // Main timeline bar
      ctx.fillStyle = `rgba(16, 185, 129, ${0.7 * depth})`;
      ctx.fillRect(-size, -size * 0.1, size * 2, size * 0.2);
      
      // Timeline segments
      for (let i = 0; i < 8; i++) {
        const segmentHeight = Math.sin(animationTime * 0.05 + i * 0.5) * size * 0.3 + size * 0.4;
        ctx.fillStyle = `rgba(16, 185, 129, ${(0.5 + Math.sin(animationTime * 0.05 + i) * 0.3) * depth})`;
        ctx.fillRect(-size + i * (size * 0.25), -segmentHeight/2, size * 0.15, segmentHeight);
      }
      
      ctx.restore();
    };

    const drawVideoReel = (x: number, y: number, size: number, rotation: number, depth: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      
      // Reel body
      ctx.fillStyle = `rgba(16, 185, 129, ${0.6 * depth})`;
      ctx.beginPath();
      ctx.arc(0, 0, size, 0, Math.PI * 2);
      ctx.fill();
      
      // Inner circle
      ctx.fillStyle = `rgba(0, 0, 0, ${0.8 * depth})`;
      ctx.beginPath();
      ctx.arc(0, 0, size * 0.3, 0, Math.PI * 2);
      ctx.fill();
      
      // Film strips
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const stripX = Math.cos(angle) * size * 0.7;
        const stripY = Math.sin(angle) * size * 0.7;
        
        ctx.fillStyle = `rgba(16, 185, 129, ${0.4 * depth})`;
        ctx.fillRect(stripX - 3, stripY - size * 0.2, 6, size * 0.4);
      }
      
      ctx.restore();
    };

    const drawPlayButton = (x: number, y: number, size: number, rotation: number, depth: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      
      // Button circle
      ctx.fillStyle = `rgba(16, 185, 129, ${0.8 * depth})`;
      ctx.beginPath();
      ctx.arc(0, 0, size, 0, Math.PI * 2);
      ctx.fill();
      
      // Play triangle
      ctx.fillStyle = `rgba(0, 0, 0, ${0.9 * depth})`;
      ctx.beginPath();
      ctx.moveTo(-size * 0.3, -size * 0.4);
      ctx.lineTo(size * 0.5, 0);
      ctx.lineTo(-size * 0.3, size * 0.4);
      ctx.closePath();
      ctx.fill();
      
      ctx.restore();
    };

    const drawWaveform = (x: number, y: number, size: number, rotation: number, depth: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      
      for (let i = 0; i < 12; i++) {
        const barHeight = Math.sin(animationTime * 0.1 + i * 0.3) * size * 0.8 + size * 0.3;
        const barX = -size + i * (size * 0.17);
        
        ctx.fillStyle = `rgba(16, 185, 129, ${(0.6 + Math.sin(animationTime * 0.1 + i) * 0.3) * depth})`;
        ctx.fillRect(barX, -barHeight/2, size * 0.12, barHeight);
      }
      
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      animationTime++;

      elements.forEach((element) => {
        element.rotation += element.rotationSpeed;
        
        // Floating effect
        const floatY = element.y + Math.sin(animationTime * 0.02 + element.x * 0.01) * 10;
        
        switch (element.type) {
          case 'cube':
            draw3DCube(element.x, floatY, element.size, element.rotation, element.depth);
            break;
          case 'timeline':
            drawTimeline(element.x, floatY, element.size, element.rotation, element.depth);
            break;
          case 'videoReel':
            drawVideoReel(element.x, floatY, element.size, element.rotation, element.depth);
            break;
          case 'playButton':
            drawPlayButton(element.x, floatY, element.size, element.rotation, element.depth);
            break;
          case 'waveform':
            drawWaveform(element.x, floatY, element.size, element.rotation, element.depth);
            break;
        }
      });

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
      className="w-full h-full opacity-60"
    />
  );
};
