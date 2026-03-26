import type { DailyCheckIn, DailyHabitRecord, Habit, JournalEntry } from "../types";
import { getLastNDates } from "./date";

export const JOURNAL_PROMPTS = [
  "One thing that went well today",
  "Something that affected my energy levels today",
  "A moment I would like to reflect on",
  "One thing I am grateful for today",
];

export const getPromptForDate = (dateKey: string): string => {
  const seed = dateKey.split("-").reduce((sum, part) => sum + Number(part), 0);
  return JOURNAL_PROMPTS[seed % JOURNAL_PROMPTS.length];
};

export const getHabitCompletionForDate = (
  date: string,
  habits: Habit[],
  records: DailyHabitRecord[],
): number => {
  if (habits.length === 0) {
    return 0;
  }

  const completed = habits.filter((habit) =>
    records.some((record) => record.date === date && record.habitId === habit.id && record.completed),
  ).length;

  return completed / habits.length;
};

export const getWeeklySummary = (
  entries: JournalEntry[],
  habits: Habit[],
  records: DailyHabitRecord[],
  checkIns: DailyCheckIn[],
) => {
  const dates = getLastNDates(7);

  const journalDays = dates.filter((date) =>
    entries.some((entry) => entry.date === date && entry.text.trim().length > 0),
  ).length;

  const totalHabitOpportunities = dates.length * habits.length;
  const totalCompletedHabits = records.filter(
    (record) => dates.includes(record.date) && record.completed && habits.some((habit) => habit.id === record.habitId),
  ).length;

  const moods = checkIns.filter((checkIn) => dates.includes(checkIn.date)).map((checkIn) => checkIn.moodLevel);
  const averageMood =
    moods.length > 0 ? moods.reduce((sum, value) => sum + value, 0) / moods.length : 0;

  const byDay = dates.map((date) => {
    const mood = checkIns.find((checkIn) => checkIn.date === date)?.moodLevel ?? 0;

    return {
      date,
      journaled: entries.some((entry) => entry.date === date && entry.text.trim().length > 0),
      habitCompletion: getHabitCompletionForDate(date, habits, records),
      mood,
    };
  });

  return {
    journalDays,
    habitCompletionRate:
      totalHabitOpportunities > 0 ? (totalCompletedHabits / totalHabitOpportunities) * 100 : 0,
    averageMood,
    byDay,
  };
};
