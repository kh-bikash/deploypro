import { redirect } from "next/navigation";

/** The blog listing now lives on /proof, alongside the delivered work. */
export default function BlogsPage() {
  redirect("/proof");
}
