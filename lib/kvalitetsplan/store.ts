"use client";

import { useCallback, useEffect, useState } from "react";
import {
  STORAGE_KEY,
  createEmptyState,
  type KvalitetsplanState,
} from "@/lib/kvalitetsplan/model";

export function useKvalitetsplan() {
  const [state, setState] = useState<KvalitetsplanState>(() => createEmptyState());
  const [ready, setReady] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setState(JSON.parse(raw) as KvalitetsplanState);
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  const save = useCallback((next: KvalitetsplanState) => {
    const stamped = { ...next, updatedAt: new Date().toISOString() };
    setState(stamped);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stamped));
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1400);
  }, []);

  return { state, ready, saved, save, reset: () => save(createEmptyState()) };
}
