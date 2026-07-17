export type ElementType = "Oheň" | "Voda" | "Příroda";
export type Profession = "Rybář" | "Farmář" | "Kuchař" | "Kurýr" | "Horník";
export type Assignment = "pond" | "pvp" | null;

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
  tutorialStep: number;
  pendingCatId: string | null;
  wins: number;
  losses: number;
  soundEnabled: boolean;
}

export interface BattleResult {
  winner: "player" | "opponent" | "draw";
  reason: string;
}
