import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ProjectsGrid } from "@/components/projects/ProjectsGrid";
import { getProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects — RVNW Studios",
  description: "Case studies across DTC, e-commerce, startups, hospitality, sports, and service businesses.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <>
      <Nav />
      <main className="bg-ink px-6 pt-[104px] pb-20 sm:px-8 sm:pt-[128px] md:px-12 lg:px-20">
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-12 max-w-[640px] sm:mb-16">
            <span className="mb-4 block font-mono text-xs tracking-[0.15em] text-grid uppercase">
              Our Work
            </span>
            <h1 className="font-display text-[clamp(32px,6vw,52px)] leading-[1.05] font-semibold text-paper">
              Projects
            </h1>
          </div>

          <ProjectsGrid projects={projects} />
        </div>
      </main>
      <Footer />
    </>
  );
}
