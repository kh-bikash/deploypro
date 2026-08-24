import { redirect } from "next/navigation";

/** Resources is gone from the nav — everything it pointed at lives on /proof. */
export default function ResourcesPage() {
  redirect("/proof");
}
