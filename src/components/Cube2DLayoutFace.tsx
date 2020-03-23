import React from 'react';
import styled from 'styled-components';
import {
  Face,
  Cube,
  CellsByFace,
  Color,
  HexCodesByColor,
  RotationsByFace,
  Rotation,
} from 'music-cube';

const CELL_SIZE = 50;
const FACE_SIZE = 3 * CELL_SIZE;

const CellContainer = styled.div<{ color: Color }>`
  width: ${CELL_SIZE}px;
  height: ${CELL_SIZE}px;
  background-color: ${({ color }) => HexCodesByColor[color]};
  box-shadow: 0 0 1px black;
  opacity: 0.8;
`;

const FaceContainer = styled.div<{ onClick?: Function; onContextMenu?: Function }>`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  width: ${FACE_SIZE}px;
  height: ${FACE_SIZE}px;
  cursor: pointer;

  &:hover {
    ${({ onClick }) => (onClick ? 'background-color: black;' : '')}
  }
`;

type Props = {
  cube: Cube;
  face: Face;
  rotateCube: (rotation: Rotation) => void;
};

export default function Cube2DLayoutFace({ cube, face, rotateCube }: Props) {
  const [clockwiseRotation, counterclockwiseRotation] = RotationsByFace[face];

  function onClick() {
    rotateCube(clockwiseRotation);
  }

  function onContextMenu(evt: React.MouseEvent<HTMLElement>) {
    evt.preventDefault();
    rotateCube(counterclockwiseRotation);
  }

  const [c, nw, n, ne, e, se, s, sw, w] = CellsByFace[face];

  return (
    <FaceContainer onClick={onClick} onContextMenu={onContextMenu}>
      <CellContainer color={cube[nw]} />
      <CellContainer color={cube[n]} />
      <CellContainer color={cube[ne]} />
      <CellContainer color={cube[w]} />
      <CellContainer color={cube[c]} />
      <CellContainer color={cube[e]} />
      <CellContainer color={cube[sw]} />
      <CellContainer color={cube[s]} />
      <CellContainer color={cube[se]} />
    </FaceContainer>
  );
}

export function Cube2DLayoutFacePlaceholder() {
  return <FaceContainer />;
}
