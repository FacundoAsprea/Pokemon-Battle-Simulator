import type { Type } from "./battledata";

export type uiUpdates = swapUiUpdate | attackUiUpdate;

interface uiUpdate {
  user: string;
  message: string;
  type: 'swap' | 'attack';
}

export interface swapUiUpdate extends uiUpdate {
  newSelected: string;
}

export interface attackUiUpdate extends uiUpdate {
  animation: Type;
  damage: number;
  moveName: string;
}