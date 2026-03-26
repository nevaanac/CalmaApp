import type { DailyCheckIn, DailyHabitRecord, Habit, JournalEntry } from "../types";
import { SummaryCards } from "../components/Summary/SummaryCards";

type SummaryPageProps = {
  entries: JournalEntry[];
  habits: Habit[];
  records: DailyHabitRecord[];
  checkIns: DailyCheckIn[];
};

export const Summary = ({ entries, habits, records, checkIns }: SummaryPageProps) => (
  <SummaryCards entries={entries} habits={habits} records={records} checkIns={checkIns} />
);
