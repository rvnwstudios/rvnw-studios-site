import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { InquiryForm } from "@/components/start-a-project/InquiryForm";
import { BookCallPanel } from "@/components/start-a-project/BookCallPanel";
import { ContactPanel } from "@/components/start-a-project/ContactPanel";

export const metadata: Metadata = {
  title: "Start a Project — RVNW Studios",
  description: "Every project's scoped to what it actually needs — tell us about yours.",
};

export default function StartAProjectPage() {
  return (
    <>
      <Nav />
      <main className="bg-ink px-6 pt-[104px] pb-20 sm:px-8 sm:pt-[128px] md:px-12 lg:px-20">
        <div className="mx-auto max-w-[1100px]">
          <div className="mb-12 max-w-[640px] sm:mb-16">
            <span className="mb-4 block font-mono text-xs tracking-[0.15em] text-grid uppercase">
              Start a Project
            </span>
            <h1 className="mb-4 font-display text-[clamp(32px,6vw,52px)] leading-[1.05] font-semibold text-paper">
              Every project&apos;s scoped to what it actually needs.
            </h1>
            <p className="font-body text-lg leading-relaxed text-grid text-pretty">
              Tell us about yours below, or grab time on the calendar — whichever gets you moving
              faster.
            </p>
          </div>

          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[2fr_1fr] lg:gap-8">
            <div className="border border-[#2A2A28] bg-[#111110] p-8 sm:p-10">
              <span className="mb-4 block font-mono text-xs tracking-[0.15em] text-grid uppercase">
                Path 01
              </span>
              <h2 className="mb-6 font-display text-2xl font-semibold text-paper sm:text-[28px]">
                Send an Inquiry
              </h2>
              <InquiryForm />
            </div>

            <ContactPanel />
          </div>

          <div className="mt-6 lg:mt-8">
            <BookCallPanel />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
