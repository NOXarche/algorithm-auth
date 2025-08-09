import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const FloatingCubes = () => {
  const meshRef = useRef();
  const light = useRef();

  const { positions, colors } = useMemo(() => {
    const count = 30;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      
      colors[i * 3] = 0.5 + Math.random() * 0.5;
      colors[i * 3 + 1] = 0.2 + Math.random() * 0.3;
      colors[i * 3 + 2] = 0.8 + Math.random() * 0.2;
    }
    
    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
    
    if (light.current) {
      light.current.position.x = Math.sin(state.clock.elapsedTime) * 10;
      light.current.position.z = Math.cos(state.clock.elapsedTime) * 10;
    }
  });

  return (
    <>
      <pointLight ref={light} intensity={0.5} color="#a855f7" />
      <instancedMesh ref={meshRef} args={[null, null, 30]}>
        <boxGeometry args={[0.15, 0.15, 0.15]} />
        <meshStandardMaterial 
          color="#8B5CF6" 
          transparent 
          opacity={0.7}
          roughness={0.3}
          metalness={0.1}
        />
      </instancedMesh>
    </>
  );
};

export default FloatingCubes;
