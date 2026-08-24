import BookCta from "@/components/home/BookCta";
import Faq from "@/components/home/Faq";
import Gap from "@/components/home/Gap";
import Hero from "@/components/home/Hero";
import Manifesto from "@/components/home/Manifesto";
import Sprint from "@/components/home/Sprint";
import Work from "@/components/home/Work";
import styles from "./home.module.css";

export default function HomePage() {
  return (
    <div className={styles.shell}>
      <Hero />
      <Manifesto />
      <Work />
      <Gap />
      <Sprint />
      <BookCta />
      <Faq />
    </div>
  );
}
