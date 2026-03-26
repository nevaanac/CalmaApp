import { useEffect, useMemo, useState } from "react";
import { NavTabs } from "./components/UI/NavTabs";
import { Breathing } from "./pages/Breathing";
import { History } from "./pages/History";
import { Summary } from "./pages/Summary";
import { Today } from "./pages/Today";
import type {
  DailyCheckIn,
  DailyHabitRecord,
  Habit,
  JournalEntry,
  ViewKey,
} from "./types";
import { getTodayKey } from "./utils/date";
import {
  loadCheckIns,
  loadHabitRecords,
  loadHabits,
  loadJournalEntries,
  saveCheckIns,
  saveHabitRecords,
  saveHabits,
  saveJournalEntries,
} from "./utils/storage";

const App = () => {
  const [currentView, setCurrentView] = useState<ViewKey>("today");
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>(() => loadJournalEntries());
  const [habits, setHabits] = useState<Habit[]>(() => loadHabits());
  const [habitRecords, setHabitRecords] = useState<DailyHabitRecord[]>(() => loadHabitRecords());
  const [checkIns, setCheckIns] = useState<DailyCheckIn[]>(() => loadCheckIns());

  const today = getTodayKey();

  useEffect(() => {
    saveJournalEntries(journalEntries);
  }, [journalEntries]);

  useEffect(() => {
    saveHabits(habits);
  }, [habits]);

  useEffect(() => {
    saveHabitRecords(habitRecords);
  }, [habitRecords]);

  useEffect(() => {
    saveCheckIns(checkIns);
  }, [checkIns]);

  const todayEntry = useMemo(
    () => journalEntries.find((entry) => entry.date === today),
    [journalEntries, today],
  );
  const todayCheckIn = useMemo(
    () => checkIns.find((entry) => entry.date === today),
    [checkIns, today],
  );
  const sortedEntries = useMemo(
    () =>
      [...journalEntries]
        .filter((entry) => entry.text.trim().length > 0)
        .sort((left, right) => right.date.localeCompare(left.date)),
    [journalEntries],
  );

  const handleSaveJournal = (text: string, prompt?: string) => {
    setJournalEntries((current) => {
      const nextEntry: JournalEntry = { date: today, text, prompt };
      const otherEntries = current.filter((entry) => entry.date !== today);
      return [...otherEntries, nextEntry].sort((left, right) => left.date.localeCompare(right.date));
    });
  };

  const handleToggleHabit = (habitId: string, completed: boolean) => {
    setHabitRecords((current) => {
      const filtered = current.filter((record) => !(record.date === today && record.habitId === habitId));
      return [...filtered, { date: today, habitId, completed }];
    });
  };

  const handleAddHabit = (name: string) => {
    setHabits((current) => [
      ...current,
      { id: `habit-${Date.now()}`, name, isCustom: true },
    ]);
  };

  const handleDeleteHabit = (habitId: string) => {
    setHabits((current) => current.filter((habit) => habit.id !== habitId));
    setHabitRecords((current) => current.filter((record) => record.habitId !== habitId));
  };

  const handleSaveCheckIn = (moodLevel: number, reflectionNote: string) => {
    setCheckIns((current) => {
      const nextCheckIn: DailyCheckIn = {
        date: today,
        moodLevel,
        reflectionNote: reflectionNote.trim() || undefined,
      };
      const otherCheckIns = current.filter((checkIn) => checkIn.date !== today);
      return [...otherCheckIns, nextCheckIn].sort((left, right) => left.date.localeCompare(right.date));
    });
  };

  return (
    <div className="app-shell">
      <header className="hero">
        <div className="hero__content">
          <span className="hero__eyebrow">Calma</span>
          <h1>A quiet place for reflection and steady routines.</h1>
          <p>
            Everything stays local to this device, so your writing, check-ins, and habits remain private.
          </p>
        </div>
        <NavTabs currentView={currentView} onSelect={setCurrentView} />
      </header>

      <main className="page-content">
        {currentView === "today" ? (
          <Today
            today={today}
            journalEntry={todayEntry}
            habits={habits}
            habitRecords={habitRecords}
            checkIn={todayCheckIn}
            onSaveJournal={handleSaveJournal}
            onToggleHabit={handleToggleHabit}
            onAddHabit={handleAddHabit}
            onDeleteHabit={handleDeleteHabit}
            onSaveCheckIn={handleSaveCheckIn}
          />
        ) : null}
        {currentView === "history" ? <History entries={sortedEntries} /> : null}
        {currentView === "summary" ? (
          <Summary entries={journalEntries} habits={habits} records={habitRecords} checkIns={checkIns} />
        ) : null}
        {currentView === "breathing" ? <Breathing /> : null}
      </main>
    </div>
  );
};

export default App;
