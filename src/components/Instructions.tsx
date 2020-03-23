import React from 'react';

type Props = {
  randomMovesEnabled: boolean;
  setRandomMovesEnabled: (enabled: boolean) => void;
};

export default function Instructions({
  randomMovesEnabled,
  setRandomMovesEnabled,
}: Props) {
  return (
    <div>
      <div>Left-click a face to rotate it clockwise</div>
      <div>Right-click a face to rotate it counterclockwise</div>
      <label>
        Make random moves after a period of inactivity
        <input
          type="checkbox"
          checked={randomMovesEnabled}
          onChange={() => setRandomMovesEnabled(!randomMovesEnabled)}
        />
      </label>
    </div>
  );
}
