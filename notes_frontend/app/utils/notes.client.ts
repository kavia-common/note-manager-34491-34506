export type Note = {
  id: string;
  title: string;
  content: string;
  updatedAt: number;
  createdAt: number;
};

const STORAGE_KEY = "remix.notes.v1";

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

function readAll(): Note[] {
  if (!isBrowser()) return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Note[];
    // Ensure sorted by updatedAt desc
    return parsed.sort((a, b) => b.updatedAt - a.updatedAt);
  } catch {
    return [];
  }
}

function writeAll(notes: Note[]) {
  if (!isBrowser()) return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

function uid(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

// PUBLIC_INTERFACE
export function listNotes(query?: string): Note[] {
  /** List notes from localStorage, filtered by an optional query (title/content). */
  const all = readAll();
  if (!query) return all;
  const q = query.toLowerCase();
  return all.filter(
    (n) =>
      n.title.toLowerCase().includes(q) ||
      n.content.toLowerCase().includes(q)
  );
}

// PUBLIC_INTERFACE
export function getNote(id: string): Note | undefined {
  /** Get a single note by id from localStorage. */
  return readAll().find((n) => n.id === id);
}

// PUBLIC_INTERFACE
export function createNote(input: { title: string; content: string }): Note {
  /** Create a new note and persist to localStorage. */
  const now = Date.now();
  const note: Note = {
    id: uid(),
    title: input.title || "Untitled",
    content: input.content || "",
    createdAt: now,
    updatedAt: now,
  };
  const all = readAll();
  all.unshift(note);
  writeAll(all);
  return note;
}

// PUBLIC_INTERFACE
export function updateNote(
  id: string,
  patch: Partial<Pick<Note, "title" | "content">>
): Note | undefined {
  /** Update an existing note and persist to localStorage. */
  const all = readAll();
  const idx = all.findIndex((n) => n.id === id);
  if (idx === -1) return undefined;
  const updated: Note = {
    ...all[idx],
    ...patch,
    updatedAt: Date.now(),
  };
  all[idx] = updated;
  writeAll(all);
  return updated;
}

// PUBLIC_INTERFACE
export function deleteNote(id: string): boolean {
  /** Delete a note by id from localStorage. Returns true if deleted. */
  const all = readAll();
  const next = all.filter((n) => n.id !== id);
  const changed = next.length !== all.length;
  if (changed) writeAll(next);
  return changed;
}
