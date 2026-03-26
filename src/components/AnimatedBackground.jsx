import { Canvas } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useMemo } from "react";

function Particles() {
  const points = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 3000; i++) {
      arr.push((Math.random() - 0.5) * 20);
    }
    return new Float32Array(arr);
  }, []);

  return (
    <Points positions={points} stride={3}>
      <PointMaterial color="#3b82f6" size={0.02} />
    </Points>
  );
}

export default function AnimatedBackground() {
  return (
    <>
      {/* Clean Dark Gradient */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-br from-black via-gray-900 to-black"></div>

      {/* Subtle Glow */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.15),transparent_40%)]"></div>

      {/* Particles */}
      <div className="absolute inset-0 -z-10">
        <Canvas>
          <Particles />
        </Canvas>
      </div>
    </>
  );
}
