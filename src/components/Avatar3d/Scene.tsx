'use client';
import { Html, useProgress } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import Model from './Model';

function Loader() {
  const { progress, active } = useProgress();

  return <Html center></Html>;
}

export default function Scene() {
  return (
    <Canvas shadows>
      {/* <GizmoHelper
        alignment="bottom-right" // widget alignment within scene
        margin={[80, 80]} // widget margins (X, Y)
      > */}
      {/* <GizmoViewport axisColors={['red', 'green', 'blue']} labelColor="black" /> */}
      {/* alternative: <GizmoViewcube /> */}
      {/* </GizmoHelper> */}
      {/* <directionalLight position={[-5, -5, 5]} intensity={4} /> */}
      <Suspense fallback={<Loader />}>
        <ambientLight intensity={1} />
        <directionalLight position={[2, 4, 5]} intensity={2} />

        {/* <spotLight
          position={[-1, -1, -1]}
          angle={50}
          intensity={2}
          penumbra={1}
          // shadow-mapSize={1024}
          // castShadow
        /> */}
        {/* <SpotLight>
          <SpotLightShadow
            distance={0.4} // Distance between the shadow caster and light
            alphaTest={0.5} // Sets the alpha value to be used when running an alpha test. See Material.alphaTest
            scale={1} //  Scale of the shadow caster plane
            width={512} // Width of the shadow map. The higher the more expnsive
            height={512} // Height of the shadow map. The higher the more expnsive
          />
        </SpotLight> */}
        {/* <Shadow
          color="black"
          colorStop={0}
          opacity={0.5}
          fog={false} // Reacts to fog (default=false)
        /> */}
        {/* <OrbitControls
        
          maxPolarAngle={1.7}
          minPolarAngle={1.5}
          minAzimuthAngle={-0.8}
          maxAzimuthAngle={0.8}
        /> */}
        <Model />

        {/* <Environment preset="city" /> */}
      </Suspense>
    </Canvas>
  );
}
