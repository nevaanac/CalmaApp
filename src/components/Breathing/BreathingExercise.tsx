import { useEffect, useMemo, useRef, useState } from "react";
import { Card } from "../UI/Card";
import { SectionTitle } from "../UI/SectionTitle";

const PHASE_DURATION_MS = 4000;

export const BreathingExercise = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedMs, setElapsedMs] = useState(0);
  const elapsedRef = useRef(0);

  useEffect(() => {
    elapsedRef.current = elapsedMs;
  }, [elapsedMs]);

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    const startedAt = Date.now() - elapsedRef.current;
    const interval = window.setInterval(() => {
      setElapsedMs(Date.now() - startedAt);
    }, 100);

    return () => window.clearInterval(interval);
  }, [isRunning]);

  const phase = useMemo(() => {
    const currentPhaseIndex = Math.floor(elapsedMs / PHASE_DURATION_MS) % 2;
    return currentPhaseIndex === 0 ? "Inhale" : "Exhale";
  }, [elapsedMs]);

  const cycleCount = Math.floor(elapsedMs / (PHASE_DURATION_MS * 2));

  return (
    <Card className="breathing-card">
      <SectionTitle
        title="Breathing exercise"
        description="Settle into a steady rhythm with a slow inhale and exhale."
      />
      <div className="breathing-stage">
        <div className={isRunning ? "breathing-circle is-running" : "breathing-circle"}>
          <span>{phase}</span>
        </div>
      </div>
      <div className="breathing-meta">
        <p>{isRunning ? "Let the circle guide the pace." : "Press start when you are ready."}</p>
        <span>Cycles completed: {cycleCount}</span>
      </div>
      <div className="action-row action-row--center">
        <button type="button" className="button button--primary" onClick={() => setIsRunning((value) => !value)}>
          {isRunning ? "Pause" : "Start"}
        </button>
        <button
          type="button"
          className="button"
          onClick={() => {
            setElapsedMs(0);
            setIsRunning(false);
          }}
        >
          Reset
        </button>
      </div>
    </Card>
  );
};
