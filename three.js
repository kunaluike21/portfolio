import React, { useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere } from 'three';
import { Spring, config } from 'react-spring/three';
import { useSphere } from '@react-three/cannon'; // Add this import

const CountryName = ({ name }) => {
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < name.length) {
      const timeout = setTimeout(() => {
        setText(text + name[index]);
        setIndex(index + 1);
      }, 100);

      return () => clearTimeout(timeout);
    }
  }, [index, name, text]);

  return (
    <Spring config={config.default} from={{ opacity: 0 }} to={{ opacity: 1 }}>
      {(props) => (
        <mesh name={name} position={[0, 1, 0]} {...props}>
          <textBufferGeometry attach="geometry" args={[text, { font: 'helvetiker', size: 0.2, height: 0.05 }]} />
          <meshStandardMaterial color="black" />
        </mesh>
      )}
    </Spring>
  );
};

const Earth = () => {
  const [ref, mesh] = useSphere(() => ({ args: [1, 32, 32] }));

  useFrame(() => (mesh.rotation.y = mesh.rotation.x += 0.01));

  return (
    <>
      <Sphere ref={ref} position={[0, 0, 0]} />
      {/* Add CountryName components here */}
    </>
  );
};

const App = () => {
  const countries = [
    { name: 'Country1', coords: [1, 0, 0] },
    { name: 'Country2', coords: [-1, 0, 0] },
    { name: 'Country3', coords: [0, 1, 0] },
  ];

  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Earth />
      {countries.map((country, index) => (
        <CountryName key={index} name={country.name} />
      ))}
    </Canvas>
  );
};
