import { useEffect, useState } from "react";
import { Card } from "../UI/Card";
import { SectionTitle } from "../UI/SectionTitle";

type JournalEditorProps = {
  date: string;
  prompt?: string;
  initialText: string;
  onSave: (text: string) => void;
};

export const JournalEditor = ({ date, prompt, initialText, onSave }: JournalEditorProps) => {
  const [text, setText] = useState(initialText);
  const [status, setStatus] = useState("");

  useEffect(() => {
    setText(initialText);
    setStatus("");
  }, [initialText, date]);

  const handleSave = () => {
    onSave(text);
    setStatus("Saved for today.");
  };

  return (
    <Card>
      <SectionTitle
        eyebrow={date}
        title="Guided journalling"
        description="Write freely, follow the prompt, or ignore it and check in with whatever feels present."
      />
      {prompt ? (
        <div className="prompt-box">
          <span className="prompt-box__label">Optional prompt</span>
          <p>{prompt}</p>
        </div>
      ) : null}
      <label className="field-label" htmlFor="journal-entry">
        Reflection
      </label>
      <textarea
        id="journal-entry"
        className="textarea"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="A few lines is enough."
        rows={8}
      />
      <div className="action-row">
        <button type="button" className="button button--primary" onClick={handleSave}>
          Save entry
        </button>
        {status ? <span className="status-text">{status}</span> : null}
      </div>
    </Card>
  );
};
