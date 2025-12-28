// types/schedule.ts
import type { AllCodes } from "./allcodes";
export interface Schedule {
  id: number;
  date: string;           // "2025-12-15"
  time: AllCodes;       // "T1", "T2"
  currentNumber: number;
  maxNumber: number;
  createdAt: string;
  updatedAt: string;
}
