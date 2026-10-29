"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Sparkles, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

function ProductMesh3D({ color = "#542813" }: { color?: string }) {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <group ref={meshRef}>
      <mesh castShadow position={[0, 0, 0]}>
        <cylinderGeometry args={[1.1, 1.2, 2.0, 32]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.15} />
      </mesh>
      {/* Golden label */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[1.12, 1.12, 1.0, 32]} />
        <meshStandardMaterial color="#C9A24B" metalness={0.7} roughness={0.25} />
      </mesh>
      {/* Cap */}
      <mesh position={[0, 1.15, 0]}>
        <cylinderGeometry args={[0.95, 1.0, 0.3, 32]} />
        <meshStandardMaterial color="#7c4e34" roughness={0.8} />
      </mesh>
      <Sparkles count={25} scale={4} size={2.5} speed={0.3} color="#C9A24B" />
      <ContactShadows position={[0, -1.8, 0]} opacity={0.4} scale={5} blur={2} />
    </group>
  );
}

export const ProductViewer360: React.FC<{ productName?: string }> = ({ productName }) => {
  return (
    <div className="w-full h-80 sm:h-96 relative bg-gradient-to-b from-henna-50/50 to-cream rounded-2xl overflow-hidden border border-henna-200/80">
      <Canvas
        camera={{ position: [0, 0.5, 4.2], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[4, 6, 4]} intensity={1.5} color="#fff6e8" />
        <pointLight position={[-4, -1, -2]} intensity={0.5} color="#c9a24b" />
        <ProductMesh3D />
        <OrbitControls
          enableZoom={true}
          minDistance={2.5}
          maxDistance={6}
          autoRotate={false}
          enablePan={false}
        />
      </Canvas>
      <div className="absolute bottom-3 inset-x-0 text-center pointer-events-none">
        <span className="text-[10px] uppercase tracking-wider font-semibold text-henna-700 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full border border-henna-200">
          Drag to rotate 360° • Scroll to zoom
        </span>
      </div>
    </div>
  );
};
