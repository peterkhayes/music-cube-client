import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import Cube2DLayout from './Cube2DLayout';
import Instructions from './Instructions';
import { createCube, getRandomRotation, Rotation, performRotation } from 'music-cube';

const RANDOM_MOVE_INTERVAL = 4000;
const RANDOM_MOVE_DELAY = 2 * RANDOM_MOVE_INTERVAL;

const AppContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function App() {
  // Create and store the current state of the cube.
  const [cube, setCube] = useState(createCube());

  // To facilitate demoing the app, there's a checkbox in the instructions
  // which has the app make random moves after a delay. We need some state
  // for this to work.
  const [randomMovesEnabled, setRandomMovesEnabled] = useState(true);
  const lastUserMoveTimeRef = useRef(Date.now());

  // Function for rotating the cube. Second argument prevents updating the last
  // user move time, which is used when making random moves.
  const rotateCube = useCallback((rotation: Rotation, wasRandomMove = false) => {
    // Ugly -  `performRotation` mutates the cube
    setCube((c) => {
      const newCube = { ...c };
      performRotation(newCube, rotation);
      return newCube;
    });
    if (!wasRandomMove) lastUserMoveTimeRef.current = Date.now();
  }, []);

  // Set up an interval to make random moves, if no move has been made by
  // the user in awhile.
  useEffect(() => {
    if (!randomMovesEnabled) return;

    const randomMoveInterval = setInterval(() => {
      if (Date.now() - lastUserMoveTimeRef.current < RANDOM_MOVE_DELAY) return;
      const rotation = getRandomRotation();
      rotateCube(rotation, true);
    }, RANDOM_MOVE_INTERVAL);

    return () => clearInterval(randomMoveInterval);
  }, [rotateCube, randomMovesEnabled]);

  return (
    <AppContainer>
      <Cube2DLayout cube={cube} rotateCube={rotateCube} />
      <Instructions
        randomMovesEnabled={randomMovesEnabled}
        setRandomMovesEnabled={setRandomMovesEnabled}
      />
    </AppContainer>
  );
}
