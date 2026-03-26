import type { DailyCheckIn, DailyHabitRecord, Habit, JournalEntry } from "../types";
import { getPromptForDate } from "../utils/calculations";
import { formatFriendlyDate } from "../utils/date";
import { CheckInCard } from "../components/CheckIn/CheckInCard";
import { HabitTracker } from "../components/Habits/HabitTracker";
import { JournalEditor } from "../components/Journal/JournalEditor";
import { SectionTitle } from "../components/UI/SectionTitle";

type TodayProps = {
  today: string;
  journalEntry?: JournalEntry;
  habits: Habit[];
  habitRecords: DailyHabitRecord[];
  checkIn?: DailyCheckIn;
  onSaveJournal: (text: string, prompt?: string) => void;
  onToggleHabit: (habitId: string, completed: boolean) => void;
  onAddHabit: (name: string) => void;
  onDeleteHabit: (habitId: string) => void;
  onSaveCheckIn: (moodLevel: number, reflectionNote: string) => void;
};

export const Today = ({
  today,
  journalEntry,
  habits,
  habitRecords,
  checkIn,
  onSaveJournal,
  onToggleHabit,
  onAddHabit,
  onDeleteHabit,
  onSaveCheckIn,
}: TodayProps) => {
  const prompt = journalEntry?.prompt ?? getPromptForDate(today);
  const completedToday = habits.filter((habit) =>
    habitRecords.some((record) => record.date === today && record.habitId === habit.id && record.completed),
  ).length;
  const shouldShowReflectionPrompt = completedToday < habits.length;

  return (
    <div className="stack">
      <SectionTitle
        eyebrow={formatFriendlyDate(today)}
        title="Today"
        description="A calm space for one entry, a few habits, and a gentle check-in."
      />
      <div className="two-column-layout">
        <JournalEditor
          date={today}
          prompt={prompt}
          initialText={journalEntry?.text ?? ""}
          onSave={(text) => onSaveJournal(text, prompt)}
        />
        <div className="stack">
          <HabitTracker
            date={today}
            habits={habits}
            records={habitRecords}
            onToggle={onToggleHabit}
            onAddHabit={onAddHabit}
            onDeleteHabit={onDeleteHabit}
          />
          <CheckInCard
            initialCheckIn={checkIn}
            shouldShowReflectionPrompt={shouldShowReflectionPrompt}
            onSave={onSaveCheckIn}
          />
        </div>
      </div>
    </div>
  );
};
