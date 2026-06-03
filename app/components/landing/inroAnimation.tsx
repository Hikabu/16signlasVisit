"use client";

import React, { useEffect, useRef } from 'react';

const RaycastEffect = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId = 0;

    // Resize handler to keep canvas sharp and full-screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Animation variables
    let tick = 0;
    const lineCount = 18; // Number of glowing bars
    
    const render = () => {
      const w = canvas.width / window.devicePixelRatio;
      const h = canvas.height / window.devicePixelRatio;
      tick += 0.004; // Controls the speed of the organic movement

      // 1. Clear with a deep, textured dark background
      ctx.fillStyle = '#070c0c';
      ctx.fillRect(0, 0, w, h);

      // Save context state for global rotations/skewing
      ctx.save();
      
      // Translate to center and skew to get that signature diagonal dynamic look
      ctx.translate(w * 0.4, h * 0.5);
      ctx.rotate(-0.4); 

      // 2. Draw the moving gradient bars
      for (let i = 0; i < lineCount; i++) {
        // Unique offset per line using a sine wave to make them move independently
        const offset = Math.sin(tick + i * 0.3) * 60;
        const xPosition = (i - lineCount / 2) * 55 + offset;
        const lineWidth = 40 + Math.sin(tick * 2 + i) * 10;
        const lineHeight = h * 2; // Make sure it extends past screen edges due to rotation

        ctx.save();
        ctx.translate(xPosition, -lineHeight / 2);

        // Create the core gradient using your requested color #009A93
        // Mixing it with deeper tones and bright highlights for that 3D volume effect
        const gradient = ctx.createLinearGradient(0, 0, lineWidth, 0);
        gradient.addColorStop(0, '#001a1a');       // Deep shadow boundary
        gradient.addColorStop(0.2, '#004d49');     // Mid-tone transition
        gradient.addColorStop(0.5, '#009A93');     // Core Vibrant Color
        gradient.addColorStop(0.7, '#40e0d8');     // Intense illuminated glow edge
        gradient.addColorStop(1, '#001313');       // Back-edge shadow

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, lineWidth, lineHeight);

        // 3. Add the subtle "grain/noise" texture overlay over the lines
        ctx.fillStyle = 'rgba(255, 255, 255, 0.015)';
        for (let j = 0; j < 15; j++) {
          const noiseX = Math.random() * lineWidth;
          ctx.fillRect(noiseX, 0, Math.random() * 2 + 1, lineHeight);
        }

        ctx.restore();
      }

      ctx.restore();

      // 4. Smooth vignette/shadow layer to mask the top/bottom and match video framing
      const vignette = ctx.createRadialGradient(w/2, h/2, h*0.3, w/2, h/2, w*0.8);
      vignette.addColorStop(0, 'rgba(7, 12, 12, 0)');
      vignette.addColorStop(0.6, 'rgba(7, 12, 12, 0.5)');
      vignette.addColorStop(1, 'rgba(7, 12, 12, 0.95)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, w, h);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Inline styling strictly scoped to avoid conflicts
  const styles: Record<string, React.CSSProperties> = {
    container: {
      position: 'relative',
      width: '100vw',
      height: '100vh',
      backgroundColor: '#070c0c',
      overflow: 'hidden',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: '#ffffff',
      textAlign: 'center',
      padding: '0 20px',
    },
    canvas: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 1,
    },
    contentCard: {
      position: 'relative',
      zIndex: 2,
      pointerEvents: 'none', // Allows clicks to pass through if needed
      maxWidth: '600px',
    },
    titleText: {
      fontSize: '3.5rem',
      fontWeight: '700',
      letterSpacing: '-0.03em',
      margin: '0 0 16px 0',
      lineHeight: '1.15',
    },
    subText: {
      fontSize: '1.15rem',
      color: 'rgba(255, 255, 255, 0.75)',
      fontWeight: '400',
      lineHeight: '1.6',
      maxWidth: '480px',
      margin: '0 auto',
    }
  };

  return (
    <div id="raycast-hero-container-unique-id" style={styles.container}>
      {/* Background Animated Canvas */}
      <canvas 
        ref={canvasRef} 
        className="raycast-dynamic-canvas-unique-class" 
        style={styles.canvas} 
      />
      
      {/* Foreground Content Card */}
      <div className="raycast-text-wrapper-unique-class" style={styles.contentCard}>
        <h1 className="raycast-main-heading-unique-class" style={styles.titleText}>
          Your shortcut to everything.
        </h1>
        <p className="raycast-sub-heading-unique-class" style={styles.subText}>
          A collection of powerful productivity tools all within an extendable launcher. Fast, ergonomic and reliable.
        </p>
      </div>
    </div>
  );
};

export default RaycastEffect;
