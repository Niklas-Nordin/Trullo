"use client";

import Hero from "../components/landingPage/Hero";
import Card from "../components/landingPage/InfoCard";
import Wave from "@/components/cssPattern/Wave";
import TrustedBySection from "@/components/landingPage/TrustedBySection";
import ReviewCard from "@/components/landingPage/ReviewCard";

export default function Home() {
  return (
    <>
      <Hero />
      <Wave />
      <Card />
      <TrustedBySection />
      <ReviewCard />
    </>
  );
}
