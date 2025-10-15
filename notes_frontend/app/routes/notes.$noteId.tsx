import { useNavigate, useParams } from "@remix-run/react";
import { useEffect, useMemo, useState } from "react";
import Editor from "~/components/Editor";
import { deleteNote, getNote, updateNote } from "~/utils/notes.client";

export default function NoteDetailRoute() {
  const { noteId } = useParams();
  const navigate = useNavigate();
  const note = useMemo(() => (noteId ? getNote(noteId) : undefined), [noteId]);

  const [state, setState] = useState({
    title: note?.title ?? "",
    content: note?.content ?? "",
  });

  useEffect(() => {
    setState({
      title: note?.title ?? "",
      content: note?.content ?? "",
    });
  }, [noteId, note?.title, note?.content]);

  if (!note) {
    return (
      <div className="p-8">
        <div className="text-red-600 font-semibold">Note not found</div>
        <p className="text-gray-600 mt-2">
          The requested note does not exist or was deleted.
        </p>
      </div>
    );
  }

  return (
    <Editor
      title={state.title}
      content={state.content}
      onChange={(next) => setState(next)}
      onSave={() => {
        updateNote(note.id, { title: state.title, content: state.content });
        // stay on page
      }}
      onDelete={() => {
        const ok = confirm("Delete this note? This cannot be undone.");
        if (!ok) return;
        deleteNote(note.id);
        navigate("/notes");
      }}
    />
  );
}

export function ErrorBoundary() {
  return (
    <div className="p-6">
      <div className="text-red-600 font-semibold">Something went wrong</div>
      <p className="text-gray-600">Please go back and try again.</p>
    </div>
  );
}
