import { useEffect, useState } from "react";

type EditorProps = {
  title: string;
  content: string;
  onChange: (next: { title: string; content: string }) => void;
  onSave?: () => void;
  onDelete?: () => void;
  isNew?: boolean;
};

// PUBLIC_INTERFACE
export default function Editor({
  title,
  content,
  onChange,
  onSave,
  onDelete,
  isNew,
}: EditorProps) {
  /** Rich-ish editor area for editing note title and content. */
  const [t, setT] = useState(title);
  const [c, setC] = useState(content);

  useEffect(() => setT(title), [title]);
  useEffect(() => setC(content), [content]);

  useEffect(() => {
    onChange({ title: t, content: c });
    // onChange is expected to be stable from parent; include to satisfy lint
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t, c, onChange]);

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between gap-3 mb-3">
        <input
          className="input text-xl font-semibold"
          placeholder="Note title"
          value={t}
          onChange={(e) => setT(e.target.value)}
        />
        <div className="flex items-center gap-2">
          {onDelete && !isNew && (
            <button
              type="button"
              className="btn"
              style={{ color: "#EF4444", borderColor: "rgba(239,68,68,0.25)" }}
              onClick={() => onDelete()}
            >
              Delete
            </button>
          )}
          {onSave && (
            <button type="button" className="btn btn-primary" onClick={() => onSave()}>
              Save
            </button>
          )}
        </div>
      </div>
      <div className="flex-1">
        <textarea
          className="textarea h-[calc(100vh-240px)]"
          placeholder="Write your note..."
          value={c}
          onChange={(e) => setC(e.target.value)}
        />
      </div>
    </div>
  );
}
