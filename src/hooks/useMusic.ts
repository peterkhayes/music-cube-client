import { useState, useEffect, useCallback, useRef } from 'react';
import { Face, Faces, getDisorder, Cube } from 'music-cube';
import audioFiles, { SECONDS_PER_SLICE } from '../config/audioFiles';

type AudioTags = Record<Face, HTMLAudioElement>;

function playAudioSlice(audioTag: HTMLAudioElement, sliceNumber: number) {
  audioTag.currentTime = sliceNumber * SECONDS_PER_SLICE;
  if (audioTag.paused) audioTag.play();
}

function loadAudioTag(audioTag: HTMLAudioElement, file: string) {
  return new Promise((resolve, reject) => {
    audioTag.autoplay = false;
    audioTag.loop = true;
    audioTag.volume = 0.5;
    audioTag.src = file;
    audioTag.addEventListener('canplaythrough', () => resolve());
    audioTag.addEventListener('error', () =>
      reject(new Error(`Can't load audio: ${file}`)),
    );
  });
}

export default function useMusic(cube: Cube): boolean {
  // We don't want to play any music or show anything until all audio is loaded.
  const [audioFilesLoaded, setAudioFilesLoaded] = useState(false);

  // Remember the current state of the cube.
  // TODO: Figure out a way to adjust the loops immediately when the cube changes,
  // and not just every 4 beats, while still preserving the loop timing.
  // Doing this naively seems to get the music out of sync, so we'll probably need
  // a better technique for controlling playing loops.
  const cubeRef = useRef<Cube>(cube);

  // Create audio tags for each face.
  const audioTagsRef = useRef<AudioTags>({
    [Face.Up]: new Audio(),
    [Face.Down]: new Audio(),
    [Face.Left]: new Audio(),
    [Face.Right]: new Audio(),
    [Face.Front]: new Audio(),
    [Face.Back]: new Audio(),
  });

  // Set up each audio tag with the correct source, then set the "loaded" flag
  // once all files have loaded.
  const loadAudioTags = useCallback(async () => {
    await Promise.all(
      Faces.map((face) => loadAudioTag(audioTagsRef.current[face], audioFiles[face])),
    );
    setAudioFilesLoaded(true);
  }, []);

  // Reset each audio tag to the correct start location, based on the disorder
  // of the cube. This should run every four beats.
  const playLoops = useCallback(() => {
    const disorder = getDisorder(cubeRef.current);
    const audioTags = audioTagsRef.current;
    for (const face of Faces) {
      playAudioSlice(audioTags[face], disorder[face]);
    }
  }, [audioTagsRef, cubeRef]);

  // Kick off the initial loading of audio tags
  useEffect(() => {
    loadAudioTags();
  }, [loadAudioTags]);

  // Make sure we keep the cube up to date.
  useEffect(() => {
    cubeRef.current = cube;
  });

  // Once audio is loaded, play loops on an interval.
  useEffect(() => {
    if (audioFilesLoaded) {
      const interval = setInterval(playLoops, SECONDS_PER_SLICE * 1000);
      return () => clearInterval(interval);
    }
  }, [audioFilesLoaded, playLoops]);

  return audioFilesLoaded;
}
