import { useEffect, useState, useRef } from 'react';
import { Player, Transport } from 'tone';
import { Face, Faces, getDisorder, Cube } from 'music-cube';
import audioFiles from './audioFiles';

/**
 * Object mapping faces to Tone.Player instances. I didn't use the built-in Players class
 * since the types for `Players.get` seemed to be broken, and this is stricter anyway.
 */
type Players = Record<Face, Player>;

/**
 * Instantiates a new Player object for the given face.
 * Sets the correct audio file and settings, then resolves once audio has loaded.
 */
async function createPlayer(face: Face): Promise<Player> {
  const player = new Player();
  player.loop = true;
  player.volume.value = -6;
  player.sync();
  player.toDestination();
  await player.load(audioFiles[face]);
  return player;
}

/**
 * Instantiates a new Players object.
 * Create a Player each face, and resolve with the Players object once each Player has loaded.
 */
async function createPlayers(): Promise<Players> {
  const result = ({} as unknown) as Players;
  await Promise.all(
    Faces.map(async (face) => {
      const player = await createPlayer(face);
      result[face] = player;
    }),
  );
  return result;
}

/** Calls `createPlayers` once, and return that value once it's loaded. */
function usePlayers(): Players | null {
  const [players, setPlayers] = useState<Players | null>(null);
  useEffect(() => {
    createPlayers().then(setPlayers);
  }, []);
  return players;
}

/** Plays music using Tone.js for the provided Cube. */
export default function useMusic(cube: Cube): boolean {
  const players = usePlayers();
  const cubeRef = useRef(cube);

  // Keep the current cube up to date.
  useEffect(() => {
    cubeRef.current = cube;
  }, [players, cube]);

  // Once we have a players object, begin playing music. This hook should only
  // ever trigger twice: once initially, before we have loaded audio, and once
  // after the audio has loaded.
  useEffect(() => {
    if (!players) return;

    // Start all players
    for (const face of Faces) {
      players[face].start();
    }

    // On each eighth note, set each player to the correct slice of the sample.
    // The sample number is based on the disorder of that face of the cube.
    // Within the sample, we want to seek to the correct eighth note.
    for (const quarterNote of [0, 1, 2, 3]) {
      for (const sixteenthNote of [0, 2]) {
        Transport.scheduleRepeat(
          (time) => {
            const disorder = getDisorder(cubeRef.current);
            for (const face of Faces) {
              const player = players[face];
              const sampleNum = disorder[face];
              player.seek(`${sampleNum}:${quarterNote}:${sixteenthNote}`, time);
            }
          },
          '1m',
          `1:${quarterNote}:${sixteenthNote}`,
        );
      }
    }

    Transport.start();
  }, [players]);

  return !!players;
}
