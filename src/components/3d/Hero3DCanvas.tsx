"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles, PerspectiveCamera, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

// Procedural Henna Jar & Botanical Leaves
function HennaJarScene({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  const jarGroupRef = useRef<THREE.Group>(null);
  const leaf1Ref = useRef<THREE.Mesh>(null);
  const leaf2Ref = useRef<THREE.Mesh>(null);
  const leaf3Ref = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (jarGroupRef.current) {
      // Gentle idle rotation + mouse reactive parallax
      jarGroupRef.current.rotation.y += delta * 0.4;
      jarGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        jarGroupRef.current.rotation.x,
        mouseY * 0.25,
        0.05
      );
      jarGroupRef.current.rotation.z = THREE.MathUtils.lerp(
        jarGroupRef.current.rotation.z,
        -mouseX * 0.2,
        0.05
      );
    }

    // Drifting leaf orbit animations
    const t = state.clock.getElapsedTime();
    if (leaf1Ref.current) {
      leaf1Ref.current.position.y = 1.2 + Math.sin(t * 1.2) * 0.25;
      leaf1Ref.current.rotation.x = t * 0.8;
      leaf1Ref.current.rotation.y = t * 0.6;
    }
    if (leaf2Ref.current) {
      leaf2Ref.current.position.y = -0.8 + Math.cos(t * 0.9) * 0.3;
      leaf2Ref.current.rotation.z = t * 0.7;
    }
    if (leaf3Ref.current) {
      leaf3Ref.current.position.x = 1.8 + Math.sin(t * 0.7) * 0.2;
      leaf3Ref.current.rotation.y = t * 1.1;
    }
  });

  return (
    <group>
      {/* Lights */}
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 8, 5]} intensity={1.5} color="#fff6e8" castShadow />
      <pointLight position={[-4, -2, -2]} intensity={0.6} color="#c9a24b" />
      <spotLight position={[0, 6, 2]} intensity={1.2} angle={0.6} penumbra={0.8} color="#f8f1e4" />

      {/* Floating Henna Jar Model */}
      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
        <group ref={jarGroupRef} position={[0, 0, 0]}>
          {/* Glass / Ceramic Body in deep terracotta-henna tone */}
          <mesh castShadow receiveShadow position={[0, 0, 0]}>
            <cylinderGeometry args={[1.05, 1.15, 2.2, 32]} />
            <meshStandardMaterial
              color="#542813"
              roughness={0.25}
              metalness={0.15}
            />
          </mesh>

          {/* Golden Artisanal Label Band */}
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[1.07, 1.07, 1.1, 32]} />
            <meshStandardMaterial
              color="#C9A24B"
              metalness={0.7}
              roughness={0.3}
            />
          </mesh>

          {/* Wooden / Cork Lid */}
          <mesh castShadow position={[0, 1.25, 0]}>
            <cylinderGeometry args={[0.9, 0.95, 0.35, 32]} />
            <meshStandardMaterial
              color="#7c4e34"
              roughness={0.8}
              metalness={0.05}
            />
          </mesh>

          {/* Gold Seal Ring around Neck */}
          <mesh position={[0, 1.1, 0]}>
            <torusGeometry args={[0.92, 0.05, 16, 32]} />
            <meshStandardMaterial color="#E1BE6C" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>
      </Float>

      {/* Floating Botanical Henna Leaves */}
      <mesh ref={leaf1Ref} position={[-1.8, 1.2, 0.5]}>
        <coneGeometry args={[0.3, 0.9, 5]} />
        <meshStandardMaterial color="#3E5B2E" roughness={0.4} />
      </mesh>

      <mesh ref={leaf2Ref} position={[1.9, -0.6, 0.8]}>
        <coneGeometry args={[0.25, 0.8, 5]} />
        <meshStandardMaterial color="#557B3F" roughness={0.4} />
      </mesh>

      <mesh ref={leaf3Ref} position={[-1.2, -1.2, -0.6]}>
        <coneGeometry args={[0.22, 0.7, 5]} />
        <meshStandardMaterial color="#3E5B2E" roughness={0.5} />
      </mesh>

      {/* Drifting Organic Henna Powder & Gold Shimmer Particles */}
      <Sparkles
        count={50}
        scale={6}
        size={3.5}
        speed={0.4}
        opacity={0.7}
        color="#C9A24B"
      />
      <Sparkles
        count={35}
        scale={5}
        size={4}
        speed={0.3}
        opacity={0.6}
        color="#B5522B"
      />

      {/* Soft Contact Ground Shadow */}
      <ContactShadows
        position={[0, -2.1, 0]}
        opacity={0.45}
        scale={6}
        blur={2}
        far={3.5}
        color="#2a1307"
      />
    </group>
  );
}

export const Hero3DCanvas: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      setMousePos({
        x: (e.clientX / innerWidth) * 2 - 1,
        y: -(e.clientY / innerHeight) * 2 + 1,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (!mounted) return null;

  // Fallback for low-spec devices or reduced motion preference
  if (prefersReducedMotion) {
    return (
      <div className="w-full h-full flex items-center justify-center relative">
        <div className="w-64 h-64 rounded-full bg-henna-100 flex items-center justify-center border-4 border-gold/40 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-henna-mandala animate-pulse-subtle" />
          <span className="font-heading text-3xl font-bold text-henna-900 z-10 text-center px-4">
            Pure Sojat <br />
            <span className="text-terracotta text-xl">Henna Ritual</span>
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[420px] sm:h-[480px] lg:h-[540px] relative">
      <Canvas
        shadows
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
        className="cursor-grab active:cursor-grabbing"
      >
        <PerspectiveCamera makeDefault position={[0, 0.4, 4.8]} fov={45} />
        <HennaJarScene mouseX={mousePos.x} mouseY={mousePos.y} />
      </Canvas>

      {/* Interactive Micro-hint */}
      <div className="absolute bottom-2 inset-x-0 text-center pointer-events-none">
        <span className="text-[11px] font-medium tracking-widest uppercase text-henna-600/70 bg-cream-soft/80 backdrop-blur-sm px-3 py-1 rounded-full border border-henna-200/50">
          ✦ Interactive 3D Model • Move cursor to explore
        </span>
      </div>
    </div>
  );
};
