import React from 'react';
import styled from 'styled-components';
import CubeEngine from './CubeEngine';
import useToneStarted from 'audio/useToneStarted';

const AppContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default function App() {
  // Music won't play until the user interacts with the app
  const [audioReady, onUserAction] = useToneStarted();

  return (
    <AppContainer>
      {!audioReady ? <button onClick={onUserAction}>Start</button> : <CubeEngine />}
    </AppContainer>
  );
}
