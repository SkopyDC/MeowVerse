export type ElementType = "Oheň" | "Voda" | "Příroda";
export type Profession = "Rybář" | "Farmář" | "Kuchař" | "Kurýr" | "Horník";
export type Assignment = "pond" | "pvp" | null;
export type BeltId = "white"|"yellow"|"orange"|"green"|"blue"|"purple"|"brown"|"black";

export interface Cat {
  id: string;
  name: string;
  element: ElementType;
  power: number;
  profession: Profession;
  passive: string;
}

export interface OwnedCat { count: number; assignment: Assignment; }
export interface Progress {
  schemaVersion: number;
  fish: number;
  diamonds: number;
  medals: number;
  pondLevel: number;
  pondAt: number;
  collection: Record<string, OwnedCat>;
  pvpTeam: string[];
  tutorialStep: number;
  pendingCatId: string | null;
  wins: number;
  losses: number;
  soundEnabled: boolean;
  belt: BeltId;
  defeatedSenseiTrials: string[];
  senseiAttempts: Record<string,number>;
  profileFrame: string;
}

export interface RoundWin {
  round: number;
  catId: string;
  element: ElementType;
}

export type VictoryPath = "elemental" | "specialist" | "tiebreak" | "draw";
export interface MatchVictory {
  winner: "player" | "opponent" | "draw";
  path: VictoryPath;
  specialistElement?: ElementType;
}

export interface BattleResult {
  winner: "player" | "opponent" | "draw";
  reason: string;
}
