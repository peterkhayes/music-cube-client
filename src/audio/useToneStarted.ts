import { useState, useEffect, useCallback } from 'react';
import { start } from 'tone';

/**
 * Browsers will not play sound until a user has interacted with the page.
 * Therefore, Tone.js requires its `start` function to be called in an event
 * handler callback. We can wire this up to both a button to click, and to a
 * key handler.
 */
export default function useToneStarted(): [boolean, () => unknown] {
  const [toneStarted, setToneStarted] = useState(false);

  const onUserAction = useCallback(async () => {
    await start();
    setToneStarted(true);
  }, []);

  useEffect(() => {
    function listener() {
      onUserAction();
      document.removeEventListener('keyup', listener);
    }
    document.addEventListener('keyup', listener);
    return () => document.removeEventListener('keyup', listener);
  }, []);

  return [toneStarted, onUserAction];
}
