import { Outlet, useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";
import Sidebar from "~/components/Sidebar";
import { createNote, listNotes, type Note } from "~/utils/notes.client";

// PUBLIC_INTERFACE
export default function NotesLayout() {
  /** Notes layout with Ocean theme sidebar and nested content. */
  const [notes, setNotes] = useState<Note[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setNotes(listNotes());
    const onStorage = (e: StorageEvent) => {
      if (e.key === "remix.notes.v1") {
        setNotes(listNotes());
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return (
    <div className="flex h-screen">
      <Sidebar
        notes={notes}
        onCreate={() => {
          const n = createNote({ title: "Untitled", content: "" });
          setNotes(listNotes());
          navigate(`/notes/${n.id}`);
        }}
      />
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-4xl mx-auto card card-elevated p-5">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
