import type { Metadata } from "next";
import BookCta from "@/components/home/BookCta";
import HomeNav from "@/components/home/HomeNav";
import Impact from "@/components/home/Impact";
import styles from "../home.module.css";

export const metadata: Metadata = {
  title: "Impact",
  description:
    "Systems in real operational use — three builds and the numbers their teams measured themselves.",
};

export default function ImpactPage() {
  return (
    <div className={styles.shell}>
      <HomeNav />
      {/* the nav is fixed, so the section needs to clear it */}
      <div className={styles.routeTop}>
        <Impact />
      </div>
      <BookCta />
    </div>
  );
}
