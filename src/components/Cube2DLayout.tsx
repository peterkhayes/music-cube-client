import React from 'react';
import styled from 'styled-components';
import { Cube, Face, Rotation } from 'music-cube';
import Cube2DLayoutFace, {
  Cube2DLayoutFacePlaceholder,
} from 'components/Cube2DLayoutFace';

const CubeContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 100px;
  margin-bottom: 100px;
`;

const CubeContainerRow = styled.div`
  display: flex;
`;

type Props = {
  cube: Cube;
  rotateCube: (rotation: Rotation) => void;
};

export default function Cube2DLayout({ cube, rotateCube }: Props) {
  return (
    <CubeContainer>
      <CubeContainerRow>
        <Cube2DLayoutFacePlaceholder />
        <Cube2DLayoutFace cube={cube} face={Face.Up} rotateCube={rotateCube} />
        <Cube2DLayoutFacePlaceholder />
        <Cube2DLayoutFacePlaceholder />
      </CubeContainerRow>
      <CubeContainerRow>
        <Cube2DLayoutFace cube={cube} face={Face.Left} rotateCube={rotateCube} />
        <Cube2DLayoutFace cube={cube} face={Face.Front} rotateCube={rotateCube} />
        <Cube2DLayoutFace cube={cube} face={Face.Right} rotateCube={rotateCube} />
        <Cube2DLayoutFace cube={cube} face={Face.Back} rotateCube={rotateCube} />
      </CubeContainerRow>
      <CubeContainerRow>
        <Cube2DLayoutFacePlaceholder />
        <Cube2DLayoutFace cube={cube} face={Face.Down} rotateCube={rotateCube} />
        <Cube2DLayoutFacePlaceholder />
        <Cube2DLayoutFacePlaceholder />
      </CubeContainerRow>
    </CubeContainer>
  );
}
