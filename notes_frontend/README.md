# Notes Frontend (Remix)

A simple notes UI built with Remix + Vite and Tailwind, styled with the Ocean Professional theme.

Features:
- Sidebar with search
- Create, view, edit, delete notes
- Client-side persistence via localStorage
- Clean, modern UI with subtle shadows and gradients

Getting started:
1. Install dependencies: npm install
2. Run the dev server: npm run dev
3. Open http://localhost:3000

Build and run production:
- npm run build
- npm start

Notes storage:
- Notes are persisted in the browser using localStorage under key "remix.notes.v1".
- No backend is required.

Project structure:
- app/routes/notes.tsx: Layout with sidebar + Outlet
- app/routes/notes._index.tsx: Empty state
- app/routes/notes.$noteId.tsx: Editor for a note
- app/routes/notes.new.tsx: New note composer
- app/utils/notes.client.ts: localStorage-backed notes api
- app/components: Sidebar, Editor, NoteListItem
- app/styles/theme.css: Ocean Professional theme tokens
