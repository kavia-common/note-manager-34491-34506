import type { Note } from "~/utils/notes.client";

// PUBLIC_INTERFACE
export default function NoteListItem({ note }: { note: Note }) {
  /** Minimal list item renderer for a note. */
  return (
    <div className="flex flex-col">
      <span className="font-medium truncate">{note.title || "Untitled"}</span>
      <span className="text-xs text-gray-500 truncate">{note.content}</span>
    </div>
  );
}
