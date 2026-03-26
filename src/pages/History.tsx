import type { JournalEntry } from "../types";
import { JournalHistoryList } from "../components/Journal/JournalHistoryList";

type HistoryProps = {
  entries: JournalEntry[];
};

export const History = ({ entries }: HistoryProps) => <JournalHistoryList entries={entries} />;
