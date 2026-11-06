import { useCallback, useEffect, useMemo, useState } from 'react';
import { HEARTS_CONFIG } from './heartsConfig.js';

const STORAGE_KEY = 'lingoza_hearts';
const MAX_HEARTS = HEARTS_CONFIG.MAX_HEARTS;
const REGEN_MS = HEARTS_CONFIG.REGEN_MINUTES * 60 * 1000;

function persist(value) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(value)); } catch {}
}
function readInitial() {
  const now = Date.now();
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    if (!raw || !Number.isFinite(Number(raw.hearts)) || !Number.isFinite(Number(raw.updatedAt))) {
      const initial = { hearts: MAX_HEARTS, updatedAt: now };
      persist(initial);
      return initial;
    }
    const normalized = calculate({ hearts: Math.max(0, Math.min(MAX_HEARTS, Math.floor(Number(raw.hearts)))), updatedAt: Number(raw.updatedAt) }, now);
    persist(normalized);
    return normalized;
  } catch {
    return { hearts: MAX_HEARTS, updatedAt: now };
  }
}
function calculate(value, now) {
  const hearts = Math.max(0, Math.min(MAX_HEARTS, Math.floor(value.hearts)));
  if (hearts >= MAX_HEARTS) return { hearts: MAX_HEARTS, updatedAt: now };
  const elapsed = Math.max(0, now - value.updatedAt);
  const gained = Math.min(MAX_HEARTS - hearts, Math.floor(elapsed / REGEN_MS));
  return {
    hearts: hearts + gained,
    updatedAt: hearts + gained >= MAX_HEARTS ? now : value.updatedAt + gained * REGEN_MS
  };
}

export default function useHearts() {
  const [state, setState] = useState(readInitial);
  const [now, setNow] = useState(Date.now);

  useEffect(() => {
    const timer = window.setInterval(() => {
      const timestamp = Date.now();
      setNow(timestamp);
      setState(previous => {
        const next = calculate(previous, timestamp);
        if (next.hearts !== previous.hearts || next.updatedAt !== previous.updatedAt) persist(next);
        return next;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const loseHeart = useCallback((enabled = true) => {
    if (!enabled) return;
    setState(previous => {
      const current = calculate(previous, Date.now());
      if (current.hearts <= 0) return current;
      const next = { hearts: current.hearts - 1, updatedAt: current.hearts === MAX_HEARTS ? Date.now() : current.updatedAt };
      persist(next);
      return next;
    });
  }, []);

  const restoreHeart = useCallback(() => {
    setState(previous => {
      const current = calculate(previous, Date.now());
      if (current.hearts >= MAX_HEARTS) return current;
      const next = { hearts: current.hearts + 1, updatedAt: current.hearts + 1 >= MAX_HEARTS ? Date.now() : current.updatedAt };
      persist(next);
      return next;
    });
  }, []);

  const remainingMs = state.hearts >= MAX_HEARTS ? 0 : Math.max(0, REGEN_MS - (now - state.updatedAt) % REGEN_MS);
  const remainingMinutes = Math.ceil(remainingMs / 60000);
  const formattedTime = useMemo(() => {
    const minutes = Math.ceil(remainingMs / 60000);
    const hours = Math.floor(minutes / 60);
    const rest = minutes % 60;
    return hours ? (rest ? `${hours}س ${rest}د` : `${hours}س`) : `${minutes}د`;
  }, [remainingMs]);

  return { hearts: state.hearts, maxHearts: MAX_HEARTS, remainingMs, remainingMinutes, formattedTime, loseHeart, restoreHeart };
}
