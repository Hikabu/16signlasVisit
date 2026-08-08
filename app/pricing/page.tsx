import type { Metadata } from "next";
import { PricingSection } from "@/app/sections/PricingSection";

export const metadata: Metadata = {
  title: "Pricing | 16 Signals",
  description: "Start free or join the 16 Signals Design Partner Program.",
};

export default function PricingPage() {
  return (
    <main>
      <PricingSection standalone />
    </main>
  );
}
