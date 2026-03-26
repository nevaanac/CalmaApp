export type JournalEntry = {
  date: string;
  prompt?: string;
  text: string;
};

export type Habit = {
  id: string;
  name: string;
  isCustom: boolean;
};

export type DailyHabitRecord = {
  date: string;
  habitId: string;
  completed: boolean;
};

export type DailyCheckIn = {
  date: string;
  moodLevel: number;
  reflectionNote?: string;
};

export type ViewKey = "today" | "history" | "summary" | "breathing";
