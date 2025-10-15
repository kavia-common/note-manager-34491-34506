import { Link, NavLink, useNavigate } from "@remix-run/react";
import { useEffect, useMemo, useState } from "react";
import type { Note } from "~/utils/notes.client";

type SidebarProps = {
  notes: Note[];
  onCreate: () => void;
};

function classNames(...c: Array<string | false | null | undefined>) {
  return c.filter(Boolean).join(" ");
}

// PUBLIC_INTERFACE
export default function Sidebar({ notes, onCreate }: SidebarProps) {
  /** Sidebar with search, create button, and notes list. */
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  // debounce
  const [debounced, setDebounced] = useState(q);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(q), 180);
    return () => clearTimeout(t);
  }, [q]);

  const filtered = useMemo(() => {
    if (!debounced) return notes;
    const term = debounced.toLowerCase();
    return notes.filter(
      (n) =>
        n.title.toLowerCase().includes(term) ||
        n.content.toLowerCase().includes(term)
    );
  }, [notes, debounced]);

  return (
    <aside className="sidebar w-80 shrink-0 border-r border-gray-200/70 px-4 py-4">
      <div className="flex items-center justify-between mb-3">
        <Link to="/notes" className="font-extrabold text-lg tracking-tight link">
          Ocean Notes
        </Link>
        <button
          className="btn btn-primary"
          onClick={() => {
            onCreate();
            navigate("/notes/new");
          }}
          aria-label="Create note"
        >
          +
          <span className="sr-only">New</span>
        </button>
      </div>
      <div className="mb-4">
        <div className="relative">
          <input
            className="input pl-9"
            placeholder="Search notes..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            aria-label="Search notes"
          />
          <svg
            className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
          </svg>
        </div>
      </div>
      <nav className="space-y-1 overflow-auto max-h-[calc(100vh-8rem)] pr-1">
        {filtered.length === 0 ? (
          <p className="text-sm text-gray-500 px-2">No notes found.</p>
        ) : (
          filtered.map((n) => (
            <NavLink
              key={n.id}
              to={`/notes/${n.id}`}
              className={({ isActive }) =>
                classNames(
                  "block rounded-md px-2 py-2 transition-colors",
                  isActive
                    ? "bg-blue-50 text-blue-700"
                    : "hover:bg-gray-50 text-gray-700"
                )
              }
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-medium truncate">{n.title || "Untitled"}</span>
              </div>
              <p className="text-xs text-gray-500 truncate">
                {n.content || "No content"}
              </p>
            </NavLink>
          ))
        )}
      </nav>
    </aside>
  );
}
