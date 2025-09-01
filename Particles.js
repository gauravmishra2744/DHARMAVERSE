import React, { useRef, useEffect } from "react";

const Particles = ({ svgRefs = [], mousePos = { x: null, y: null } }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let particlesArray = [];
    let animationId;
    const colors = ["#ffffff", "#ff77ff", "#c0aaff", "#aaffff"];
    const maxDistance = 120;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 1.5;
        this.speedY = (Math.random() - 0.5) * 1.5;
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0) { this.x = 0; this.speedX *= -1; }
        if (this.x > canvas.width) { this.x = canvas.width; this.speedX *= -1; }
        if (this.y < 0) { this.y = 0; this.speedY *= -1; }
        if (this.y > canvas.height) { this.y = canvas.height; this.speedY *= -1; }
      }
      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const initParticles = () => {
      particlesArray = [];
      const count = Math.floor(canvas.width / 10);
      for (let i = 0; i < count; i++) particlesArray.push(new Particle());
    };

    const connectParticles = () => {
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a + 1; b < particlesArray.length; b++) {
          let dx = particlesArray[a].x - particlesArray[b].x;
          let dy = particlesArray[a].y - particlesArray[b].y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < maxDistance) {
            ctx.strokeStyle = `rgba(255,255,255,${1 - distance / maxDistance})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }

      // Connect particles to SVGs
      svgRefs.forEach((svgRef) => {
        if (svgRef.current) {
          const rect = svgRef.current.getBoundingClientRect();
          const svgX = rect.left + rect.width / 2;
          const svgY = rect.top + rect.height / 2;
          particlesArray.forEach((p) => {
            const dx = p.x - svgX;
            const dy = p.y - svgY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < maxDistance) {
              ctx.strokeStyle = 'rgba(255,255,255,0.3)';
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(svgX, svgY);
              ctx.stroke();
            }
          });
        }
      });

      // Connect particles to mouse
      if (mousePos.x && mousePos.y) {
        particlesArray.forEach((p) => {
          const dx = p.x - mousePos.x;
          const dy = p.y - mousePos.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < maxDistance) {
            ctx.strokeStyle = 'rgba(255,255,255,0.2)';
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mousePos.x, mousePos.y);
            ctx.stroke();
          }
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesArray.forEach((p) => {
        p.update();
        p.draw();
      });
      connectParticles();
      animationId = requestAnimationFrame(animate);
    };

    initParticles();
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [svgRefs, mousePos]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
    />
  );
};

export default Particles;