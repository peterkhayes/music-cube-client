import { Face } from 'music-cube';

/*
  TODO: figure out issues with Typescript imports of WAV files
*/

/* eslint-disable */
// @ts-ignore
import UpWav from 'music-cube/src/songs/demo/up.wav';
// @ts-ignore
import DownWav from 'music-cube/src/songs/demo/down.wav';
// @ts-ignore
import LeftWav from 'music-cube/src/songs/demo/left.wav';
// @ts-ignore
import RightWav from 'music-cube/src/songs/demo/right.wav';
// @ts-ignore
import FrontWav from 'music-cube/src/songs/demo/front.wav';
// @ts-ignore
import BackWav from 'music-cube/src/songs/demo/back.wav';
/* eslint-enable */

const audioFiles: Record<Face, string> = {
  [Face.Up]: UpWav,
  [Face.Down]: DownWav,
  [Face.Left]: LeftWav,
  [Face.Right]: RightWav,
  [Face.Front]: FrontWav,
  [Face.Back]: BackWav,
};

const BPM = 120;
const BEATS_PER_SLICE = 4;
const SECONDS_PER_BEAT = 60 / BPM;
export const SECONDS_PER_SLICE = SECONDS_PER_BEAT * BEATS_PER_SLICE;

export default audioFiles;
