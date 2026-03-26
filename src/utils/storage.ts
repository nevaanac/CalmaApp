import type { DailyCheckIn, DailyHabitRecord, Habit, JournalEntry } from "../types";

const STORAGE_KEYS = {
  journalEntries: "calma.journalEntries",
  habits: "calma.habits",
  habitRecords: "calma.habitRecords",
  checkIns: "calma.checkIns",
} as const;

const DEFAULT_HABITS: Habit[] = [
  { id: "water", name: "Drink water", isCustom: false },
  { id: "screen-break", name: "Take a screen break", isCustom: false },
  { id: "stretch", name: "Stretch or move", isCustom: false },
];

const safeRead = <T>(key: string, fallback: T): T => {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
};

const write = <T>(key: string, value: T): void => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
};

export const loadJournalEntries = (): JournalEntry[] =>
  safeRead<JournalEntry[]>(STORAGE_KEYS.journalEntries, []);

export const saveJournalEntries = (entries: JournalEntry[]): void => {
  write(STORAGE_KEYS.journalEntries, entries);
};

export const loadHabits = (): Habit[] => {
  const habits = safeRead<Habit[]>(STORAGE_KEYS.habits, []);
  return habits.length > 0 ? habits : DEFAULT_HABITS;
};

export const saveHabits = (habits: Habit[]): void => {
  write(STORAGE_KEYS.habits, habits);
};

export const loadHabitRecords = (): DailyHabitRecord[] =>
  safeRead<DailyHabitRecord[]>(STORAGE_KEYS.habitRecords, []);

export const saveHabitRecords = (records: DailyHabitRecord[]): void => {
  write(STORAGE_KEYS.habitRecords, records);
};

export const loadCheckIns = (): DailyCheckIn[] => safeRead<DailyCheckIn[]>(STORAGE_KEYS.checkIns, []);

export const saveCheckIns = (checkIns: DailyCheckIn[]): void => {
  write(STORAGE_KEYS.checkIns, checkIns);
};
