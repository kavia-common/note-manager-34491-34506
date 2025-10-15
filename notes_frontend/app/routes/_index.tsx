import type { MetaFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";

export const meta: MetaFunction = () => [
  { title: "Notes" },
  { name: "description", content: "Remix Notes App" },
];

export async function loader() {
  return redirect("/notes");
}

export default function Index() {
  return null;
}
