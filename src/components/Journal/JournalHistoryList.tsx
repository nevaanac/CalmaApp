import type { JournalEntry } from "../../types";
import { formatFriendlyDate } from "../../utils/date";
import { Card } from "../UI/Card";
import { EmptyState } from "../UI/EmptyState";
import { SectionTitle } from "../UI/SectionTitle";

type JournalHistoryListProps = {
  entries: JournalEntry[];
};

export const JournalHistoryList = ({ entries }: JournalHistoryListProps) => {
  if (entries.length === 0) {
    return (
      <Card>
        <SectionTitle
          title="History"
          description="Your reflections stay on this device and are ready whenever you want to look back."
        />
        <EmptyState title="No entries yet" description="Your journal entries will appear here after you save one." />
      </Card>
    );
  }

  return (
    <div className="stack">
      <SectionTitle
        title="History"
        description="A simple record of what you have captured for yourself over time."
      />
      {entries.map((entry) => (
        <Card key={entry.date}>
          <div className="history-entry">
            <div>
              <h3>{formatFriendlyDate(entry.date)}</h3>
              {entry.prompt ? <p className="history-entry__prompt">{entry.prompt}</p> : null}
            </div>
            <p>{entry.text}</p>
          </div>
        </Card>
      ))}
    </div>
  );
};
