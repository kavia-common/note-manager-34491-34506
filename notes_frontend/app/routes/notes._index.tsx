export default function NotesIndex() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-24">
      <div className="badge mb-3">Welcome</div>
      <h2 className="text-2xl font-bold mb-2">Select or create a note</h2>
      <p className="text-gray-600 max-w-md">
        Use the New button to create a note, or select an existing note from the sidebar.
        Your notes are stored locally in your browser.
      </p>
    </div>
  );
}
