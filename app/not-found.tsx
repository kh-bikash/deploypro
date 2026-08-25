import Link from "next/link";
import HomeNav from "@/components/home/HomeNav";
import shell from "./home.module.css";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <div className={shell.shell}>
      <HomeNav />
      <div className={styles.wrap}>
        <span className={styles.code}>404</span>
        <h1 className={styles.title}>That page is not deployed.</h1>
        <p className={styles.lead}>
          The link is out of date. Everything about the program lives in one of the three places
          below.
        </p>
        <div className={styles.links}>
          <Link href="/">Home</Link>
          <Link href="/proof">Proof</Link>
          <Link href="/#book">Book a call</Link>
        </div>
      </div>
    </div>
  );
}
