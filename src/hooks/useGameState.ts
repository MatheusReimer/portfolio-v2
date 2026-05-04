"use client";

import { useReducer, useCallback, useMemo } from "react";
import { challenges, Challenge } from "@/data/challenges";
import { solutions, combos, defaultSolutions, Solution, Combo } from "@/data/solutions";

export type Depth = 1 | 2 | 3;
export type FocusKind = "challenge" | "solution";

export interface GameState {
  playedIds: string[];          // currently in arena, awaiting acceptance
  acceptedIds: string[];        // challenge IDs in amber graveyard
  acceptedSolutionIds: string[]; // solution IDs in pink graveyard
  focusedId: string | null;
  focusedKind: FocusKind | null;
  depth: Depth;
  showPortfolio: boolean;
  lpOpponent: number;
}

type Action =
  | { type: "PLAY"; id: string }
  | { type: "ACCEPT" }
  | { type: "FOCUS"; id: string; kind: FocusKind }
  | { type: "BLUR" }
  | { type: "DEPTH"; d: Depth }
  | { type: "RESET" }
  | { type: "PORTFOLIO" };

const INIT: GameState = {
  playedIds: [],
  acceptedIds: [],
  acceptedSolutionIds: [],
  focusedId: null,
  focusedKind: null,
  depth: 2,
  showPortfolio: false,
  lpOpponent: 8000,
};

function reducer(s: GameState, a: Action): GameState {
  switch (a.type) {
    case "PLAY": {
      if (s.playedIds.includes(a.id)) return s;
      const next = [...s.playedIds, a.id];
      const ch = challenges.find((c) => c.id === a.id);
      const dmg = ch ? Math.round(ch.power / 1.3) : 0;
      return {
        ...s,
        playedIds: next,
        focusedId: null,
        focusedKind: null,
        lpOpponent: Math.max(0, s.lpOpponent - dmg),
      };
    }
    case "ACCEPT": {
      // Move current arena cards (played challenges + active solutions) to their graveyards
      const { cards: solutionCards } = resolveSolutions(s.playedIds);
      return {
        ...s,
        acceptedIds: [...s.acceptedIds, ...s.playedIds],
        acceptedSolutionIds: [...s.acceptedSolutionIds, ...solutionCards.map((c) => c.id)],
        playedIds: [],
        focusedId: null,
        focusedKind: null,
      };
    }
    case "FOCUS":
      return { ...s, focusedId: a.id, focusedKind: a.kind, depth: 2 };
    case "BLUR":
      return { ...s, focusedId: null, focusedKind: null };
    case "DEPTH":
      return { ...s, depth: a.d };
    case "RESET":
      return INIT;
    case "PORTFOLIO":
      return { ...s, showPortfolio: !s.showPortfolio };
    default:
      return s;
  }
}

export function resolveSolutions(ids: string[]): {
  cards: Solution[];
  combo: Combo | null;
} {
  if (!ids.length) return { cards: [], combo: null };

  if (ids.length >= 2) {
    const match = combos.find(
      (c) =>
        ids.every((id) => c.challengeIds.includes(id)) &&
        c.challengeIds.length === ids.length
    );
    if (match) {
      return {
        cards: match.solutionIds
          .map((id) => solutions.find((s) => s.id === id)!)
          .filter(Boolean),
        combo: match,
      };
    }
    const seen = new Set<string>();
    ids.forEach((cId) =>
      (defaultSolutions[cId] ?? []).forEach((sId) => seen.add(sId))
    );
    return {
      cards: [...seen]
        .map((id) => solutions.find((s) => s.id === id)!)
        .filter(Boolean),
      combo: null,
    };
  }

  const sIds = defaultSolutions[ids[0]] ?? [];
  return {
    cards: sIds.map((id) => solutions.find((s) => s.id === id)!).filter(Boolean),
    combo: null,
  };
}

export function useGameState() {
  const [state, dispatch] = useReducer(reducer, INIT);

  const play = useCallback((id: string) => dispatch({ type: "PLAY", id }), []);
  const accept = useCallback(() => dispatch({ type: "ACCEPT" }), []);
  const focus = useCallback(
    (id: string, kind: FocusKind) => dispatch({ type: "FOCUS", id, kind }),
    []
  );
  const blur = useCallback(() => dispatch({ type: "BLUR" }), []);
  const setDepth = useCallback(
    (d: Depth) => dispatch({ type: "DEPTH", d }),
    []
  );
  const reset = useCallback(() => dispatch({ type: "RESET" }), []);
  const togglePortfolio = useCallback(
    () => dispatch({ type: "PORTFOLIO" }),
    []
  );

  const { cards: activeSolutions, combo } = useMemo(
    () => resolveSolutions(state.playedIds),
    [state.playedIds]
  );

  const played: Challenge[] = useMemo(
    () =>
      state.playedIds
        .map((id) => challenges.find((c) => c.id === id)!)
        .filter(Boolean),
    [state.playedIds]
  );

  const acceptedChallenges: Challenge[] = useMemo(
    () =>
      state.acceptedIds
        .map((id) => challenges.find((c) => c.id === id)!)
        .filter(Boolean),
    [state.acceptedIds]
  );

  const acceptedSolutions: Solution[] = useMemo(
    () =>
      state.acceptedSolutionIds
        .map((id) => solutions.find((s) => s.id === id)!)
        .filter(Boolean),
    [state.acceptedSolutionIds]
  );

  return {
    state,
    played,
    activeSolutions,
    combo,
    acceptedChallenges,
    acceptedSolutions,
    play,
    accept,
    focus,
    blur,
    setDepth,
    reset,
    togglePortfolio,
  };
}
