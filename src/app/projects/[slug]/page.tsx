import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CaseStudyContent } from "@/components/projects/CaseStudyContent";
import { ProjectSwitcher } from "@/components/projects/ProjectSwitcher";
import { CtaSection } from "@/components/CtaSection";
import { getProjectBySlug, getProjectNeighbors, getProjectSlugs } from "@/lib/projects";

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: `${project.title} — RVNW Studios`,
    description: `${project.disciplines.join(" + ")} case study — ${project.title}.`,
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  // getProjectNeighbors wraps at both ends, so this is only undefined if
  // getProjectBySlug already succeeded and the roster is empty — can't
  // happen alongside a resolved `project`, but keep the type honest.
  const neighbors = await getProjectNeighbors(slug);

  return (
    <>
      <Nav />
      {/* Reading content (prose + imagery) stays capped at 1280px, same as
          /projects; the CTA below runs full-bleed like it does on the
          homepage, so its horizontal padding lives on CtaSection itself
          rather than on this wrapper. */}
      <main className="bg-ink pt-[104px] sm:pt-[128px]">
        <div className="mx-auto max-w-[1280px] px-6 pb-20 sm:px-8 md:px-12 lg:px-20">
          <CaseStudyContent project={project} />
          {neighbors && <ProjectSwitcher prev={neighbors.prev} next={neighbors.next} />}
        </div>
        <CtaSection eyebrow="04 — Get Started" />
      </main>
      <Footer />
    </>
  );
}
