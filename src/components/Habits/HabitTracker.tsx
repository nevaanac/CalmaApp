import { useState } from "react";
import type { DailyHabitRecord, Habit } from "../../types";
import { Card } from "../UI/Card";
import { SectionTitle } from "../UI/SectionTitle";

type HabitTrackerProps = {
  date: string;
  habits: Habit[];
  records: DailyHabitRecord[];
  onToggle: (habitId: string, completed: boolean) => void;
  onAddHabit: (name: string) => void;
  onDeleteHabit: (habitId: string) => void;
};

export const HabitTracker = ({
  date,
  habits,
  records,
  onToggle,
  onAddHabit,
  onDeleteHabit,
}: HabitTrackerProps) => {
  const [newHabit, setNewHabit] = useState("");

  const isChecked = (habitId: string) =>
    records.some((record) => record.date === date && record.habitId === habitId && record.completed);

  const handleAddHabit = () => {
    const value = newHabit.trim();
    if (!value) {
      return;
    }

    onAddHabit(value);
    setNewHabit("");
  };

  return (
    <Card>
      <SectionTitle
        title="Habit tracker"
        description="Keep today's habits simple and visible. The goal is awareness, not pressure."
      />
      <div className="habit-list">
        {habits.map((habit) => (
          <label key={habit.id} className="habit-item">
            <span className="habit-item__main">
              <input
                type="checkbox"
                checked={isChecked(habit.id)}
                onChange={(event) => onToggle(habit.id, event.target.checked)}
              />
              <span>{habit.name}</span>
            </span>
            {habit.isCustom ? (
              <button
                type="button"
                className="icon-button"
                onClick={() => onDeleteHabit(habit.id)}
                aria-label={`Delete ${habit.name}`}
              >
                Remove
              </button>
            ) : null}
          </label>
        ))}
      </div>
      <div className="inline-form">
        <input
          className="input"
          value={newHabit}
          onChange={(event) => setNewHabit(event.target.value)}
          placeholder="Add a custom habit"
        />
        <button type="button" className="button" onClick={handleAddHabit}>
          Add
        </button>
      </div>
    </Card>
  );
};
