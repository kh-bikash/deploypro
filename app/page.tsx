import BrandFilm from "@/components/BrandFilm";
import DeliveryPhases from "@/components/DeliveryPhases";
import Evidence from "@/components/Evidence";
import FinalCta from "@/components/FinalCta";
import Hero from "@/components/Hero";
import HomeMotion from "@/components/HomeMotion";
import HowItWorks from "@/components/HowItWorks";
import Integrations from "@/components/Integrations";
import Pod from "@/components/Pod";
import Principles from "@/components/Principles";
import Results from "@/components/Results";
import Studio from "@/components/Studio";
import Versus from "@/components/Versus";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Evidence />
      <Results />
      <BrandFilm />
      <Pod />
      <Studio />
      <Integrations />
      <DeliveryPhases />
      <HowItWorks />
      <Principles />
      <Versus />
      <FinalCta />
      <HomeMotion />
    </>
  );
}
