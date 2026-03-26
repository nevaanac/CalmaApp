import type { DailyCheckIn, DailyHabitRecord, Habit, JournalEntry } from "../../types";
import { getWeeklySummary } from "../../utils/calculations";
import { formatFriendlyDate } from "../../utils/date";
import { Card } from "../UI/Card";
import { EmptyState } from "../UI/EmptyState";
import { SectionTitle } from "../UI/SectionTitle";

type SummaryCardsProps = {
  entries: JournalEntry[];
  habits: Habit[];
  records: DailyHabitRecord[];
  checkIns: DailyCheckIn[];
};

export const SummaryCards = ({ entries, habits, records, checkIns }: SummaryCardsProps) => {
  const summary = getWeeklySummary(entries, habits, records, checkIns);
  const hasAnyData = summary.journalDays > 0 || summary.habitCompletionRate > 0 || summary.averageMood > 0;

  return (
    <div className="stack">
      <SectionTitle
        title="Weekly summary"
        description="A descriptive view of the last seven days, built from your entries on this device."
      />
      <div className="summary-grid">
        <Card className="metric-card">
          <span className="metric-card__label">Journal days</span>
          <strong>{summary.journalDays}</strong>
          <p>Days with at least one saved reflection.</p>
        </Card>
        <Card className="metric-card">
          <span className="metric-card__label">Habit completion</span>
          <strong>{Math.round(summary.habitCompletionRate)}%</strong>
          <p>Across all habits over the last seven days.</p>
        </Card>
        <Card className="metric-card">
          <span className="metric-card__label">Average mood</span>
          <strong>{summary.averageMood > 0 ? summary.averageMood.toFixed(1) : "--"}</strong>
          <p>Based on the check-ins you chose to save.</p>
        </Card>
      </div>
      {hasAnyData ? (
        <Card>
          <div className="summary-bars">
            {summary.byDay.map((day) => (
              <div key={day.date} className="summary-bars__row">
                <div className="summary-bars__header">
                  <span>{formatFriendlyDate(day.date)}</span>
                  <span>{Math.round(day.habitCompletion * 100)}% habits</span>
                </div>
                <div className="bar-track">
                  <div className="bar-fill" style={{ width: `${day.habitCompletion * 100}%` }} />
                </div>
                <div className="summary-bars__details">
                  <span>{day.journaled ? "Journaled" : "No journal entry"}</span>
                  <span>{day.mood > 0 ? `Mood ${day.mood}/5` : "No mood saved"}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      ) : (
        <Card>
          <EmptyState
            title="A little data helps this page come to life"
            description="After a few entries, check-ins, or habits, your weekly picture will show up here."
          />
        </Card>
      )}
    </div>
  );
};
