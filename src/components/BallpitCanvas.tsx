import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface BallpitCanvasProps {
  count?: number;
  gravity?: number;
  friction?: number;
  wallBounce?: number;
  followCursor?: boolean;
  colors?: number[];
  ambientColor?: number;
  ambientIntensity?: number;
  lightIntensity?: number;
  minSize?: number;
  maxSize?: number;
  maxVelocity?: number;
  className?: string;
}

interface Ball {
  mesh: THREE.Mesh;
  velocity: THREE.Vector3;
  originalPosition: THREE.Vector3;
}

export const BallpitCanvas = ({
  count = 80,
  gravity = 0.01,
  friction = 0.9975,
  wallBounce = 0.95,
  followCursor = true,
  colors = [0x00d4ff, 0x8b5cf6, 0xf59e0b, 0xef4444, 0x10b981],
  ambientColor = 0x404040,
  ambientIntensity = 0.4,
  lightIntensity = 1,
  minSize = 0.1,
  maxSize = 0.3,
  maxVelocity = 0.1,
  className = '',
}: BallpitCanvasProps) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const ballsRef = useRef<Ball[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const frameId = useRef<number>();

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(ambientColor, ambientIntensity);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, lightIntensity);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Create balls
    const balls: Ball[] = [];
    const geometry = new THREE.SphereGeometry(1, 16, 16);

    for (let i = 0; i < count; i++) {
      const material = new THREE.MeshPhongMaterial({
        color: colors[Math.floor(Math.random() * colors.length)],
        shininess: 100,
        transparent: true,
        opacity: 0.8,
      });

      const mesh = new THREE.Mesh(geometry, material);
      const size = Math.random() * (maxSize - minSize) + minSize;
      mesh.scale.setScalar(size);

      // Random position
      mesh.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 5
      );

      const ball: Ball = {
        mesh,
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02
        ),
        originalPosition: mesh.position.clone(),
      };

      balls.push(ball);
      scene.add(mesh);
    }

    camera.position.z = 8;

    // Store refs
    sceneRef.current = scene;
    rendererRef.current = renderer;
    cameraRef.current = camera;
    ballsRef.current = balls;

    // Mouse tracking
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      frameId.current = requestAnimationFrame(animate);

      balls.forEach((ball, index) => {
        // Apply gravity
        ball.velocity.y -= gravity;

        // Mouse interaction
        if (followCursor) {
          const mousePos = new THREE.Vector3(
            mouseRef.current.x * 5,
            mouseRef.current.y * 3,
            0
          );
          const distance = ball.mesh.position.distanceTo(mousePos);
          if (distance < 2) {
            const force = mousePos.clone().sub(ball.mesh.position).normalize().multiplyScalar(0.001);
            ball.velocity.add(force);
          }
        }

        // Update position
        ball.mesh.position.add(ball.velocity);

        // Wall collisions with bounce
        const bounds = { x: 5, y: 4, z: 2.5 };
        
        if (Math.abs(ball.mesh.position.x) > bounds.x) {
          ball.velocity.x *= -wallBounce;
          ball.mesh.position.x = Math.sign(ball.mesh.position.x) * bounds.x;
        }
        
        if (Math.abs(ball.mesh.position.y) > bounds.y) {
          ball.velocity.y *= -wallBounce;
          ball.mesh.position.y = Math.sign(ball.mesh.position.y) * bounds.y;
        }
        
        if (Math.abs(ball.mesh.position.z) > bounds.z) {
          ball.velocity.z *= -wallBounce;
          ball.mesh.position.z = Math.sign(ball.mesh.position.z) * bounds.z;
        }

        // Apply friction
        ball.velocity.multiplyScalar(friction);

        // Limit velocity
        if (ball.velocity.length() > maxVelocity) {
          ball.velocity.normalize().multiplyScalar(maxVelocity);
        }

        // Slow rotation
        ball.mesh.rotation.x += 0.01;
        ball.mesh.rotation.y += 0.01;
      });

      // Gentle camera movement
      camera.position.x = Math.sin(Date.now() * 0.0005) * 0.5;
      camera.position.y = Math.cos(Date.now() * 0.0003) * 0.3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!camera || !renderer) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (frameId.current) {
        cancelAnimationFrame(frameId.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [count, gravity, friction, wallBounce, followCursor, colors, ambientColor, ambientIntensity, lightIntensity, minSize, maxSize, maxVelocity]);

  return (
    <div 
      ref={mountRef} 
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      style={{ background: 'transparent' }}
    />
  );
};