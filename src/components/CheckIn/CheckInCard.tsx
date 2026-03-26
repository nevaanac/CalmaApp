import { useEffect, useState } from "react";
import type { DailyCheckIn } from "../../types";
import { Card } from "../UI/Card";
import { SectionTitle } from "../UI/SectionTitle";

type CheckInCardProps = {
  initialCheckIn?: DailyCheckIn;
  shouldShowReflectionPrompt: boolean;
  onSave: (moodLevel: number, reflectionNote: string) => void;
};

const MOOD_LABELS = ["Very low", "Low", "Steady", "Good", "Bright"];

export const CheckInCard = ({
  initialCheckIn,
  shouldShowReflectionPrompt,
  onSave,
}: CheckInCardProps) => {
  const [moodLevel, setMoodLevel] = useState(initialCheckIn?.moodLevel ?? 3);
  const [reflectionNote, setReflectionNote] = useState(initialCheckIn?.reflectionNote ?? "");
  const [status, setStatus] = useState("");

  useEffect(() => {
    setMoodLevel(initialCheckIn?.moodLevel ?? 3);
    setReflectionNote(initialCheckIn?.reflectionNote ?? "");
    setStatus("");
  }, [initialCheckIn]);

  const handleSave = () => {
    onSave(moodLevel, reflectionNote);
    setStatus("Check-in saved.");
  };

  return (
    <Card>
      <SectionTitle
        title="Daily check-in"
        description="A quick note on how today feels, with a little space for context if you want it."
      />
      <div className="mood-scale" role="radiogroup" aria-label="Mood level">
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            type="button"
            className={value === moodLevel ? "mood-scale__button is-selected" : "mood-scale__button"}
            onClick={() => setMoodLevel(value)}
            aria-pressed={value === moodLevel}
          >
            <span>{value}</span>
            <small>{MOOD_LABELS[value - 1]}</small>
          </button>
        ))}
      </div>
      {shouldShowReflectionPrompt ? (
        <div className="prompt-box">
          <span className="prompt-box__label">Optional reflection</span>
          <p>What got in the way today?</p>
        </div>
      ) : null}
      <label className="field-label" htmlFor="check-in-note">
        Reflection note
      </label>
      <textarea
        id="check-in-note"
        className="textarea textarea--small"
        value={reflectionNote}
        onChange={(event) => setReflectionNote(event.target.value)}
        placeholder="Only if helpful."
        rows={4}
      />
      <div className="action-row">
        <button type="button" className="button button--primary" onClick={handleSave}>
          Save check-in
        </button>
        {status ? <span className="status-text">{status}</span> : null}
      </div>
    </Card>
  );
};
