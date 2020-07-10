import React, { useRef, useState } from 'react';
// Styles
import './App.scss';
// R3F
import { Canvas, useFrame } from 'react-three-fiber';
// Drei - R3F utils
import { softShadows, MeshWobbleMaterial, OrbitControls } from 'drei';
// Components
import Header from './components/header';
// React Spring
import { useSpring, a } from 'react-spring/three';

softShadows({});

const SpinningMesh = ({ position, args, color, speed }) => {
  const mesh = useRef(null);
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));

  const [expand, setExpand] = useState(false);

  const props = useSpring({
    scale: expand ? [1.4, 1.4, 1.4] : [1, 1, 1],
  });

  return (
    <a.mesh
      onClick={() => setExpand(!expand)}
      scale={props.scale}
      castShadow
      ref={mesh}
      position={position}
    >
      <boxBufferGeometry attach="geometry" args={args} />
      <MeshWobbleMaterial
        attach="material"
        color={color}
        speed={speed}
        factor={0.6}
        time={1}
      />
    </a.mesh>
  );
};

function App() {
  return (
    <>
      <Header></Header>
      <Canvas
        shadowMap
        colorManagement
        camera={{ position: [-5, 2, 10], fov: 60 }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight
          castShadow
          position={[0, 10, 0]}
          intensity={1.5}
          shadowMapWidth={1024}
          shadowMapHeight={1024}
          shadowCameraFar={50}
          shadowCameraLeft={-10}
          shadowCameraRight={10}
          shadowCameraTop={10}
          shadowCameraBottom={-10}
        />
        <pointLight position={[-10, 0, -20]} intensity={0.5} />
        <pointLight position={[0, -10, 0]} intensity={1.5} />

        <group>
          <mesh
            receiveShadow
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -3, 0]}
          >
            <planeBufferGeometry attach="geometry" args={[100, 100]} />
            <shadowMaterial attach="material" opacity={0.3} />
          </mesh>

          <SpinningMesh
            position={[0, 1, 0]}
            args={[3, 2, 1]}
            color="lightblue"
            speed={2}
          />
          <SpinningMesh
            position={[-2, 1, -5]}
            args={[1, 1, 1]}
            color="pink"
            speed={6}
          />
          <SpinningMesh
            position={[5, 1, -2]}
            args={[1, 1, 1]}
            color="pink"
            speed={6}
          />
        </group>

        <OrbitControls />
      </Canvas>
    </>
  );
}

export default App;
