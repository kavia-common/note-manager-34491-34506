import { useNavigate } from "@remix-run/react";
import { useState } from "react";
import Editor from "~/components/Editor";
import { createNote } from "~/utils/notes.client";

export default function NewNoteRoute() {
  const [data, setData] = useState({ title: "", content: "" });
  const navigate = useNavigate();

  return (
    <Editor
      title={data.title}
      content={data.content}
      isNew
      onChange={(next) => setData(next)}
      onSave={() => {
        const n = createNote({ title: data.title, content: data.content });
        navigate(`/notes/${n.id}`);
      }}
    />
  );
}
