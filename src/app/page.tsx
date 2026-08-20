import { Nav } from "@/components/Nav";
import { HeroSection } from "@/components/HeroSection";
import { ServicesSection } from "@/components/ServicesSection";
import { VerticalsSection } from "@/components/VerticalsSection";
import { ProcessSection } from "@/components/ProcessSection";
import { OperatingStackSection } from "@/components/OperatingStackSection";
import { WorkSection } from "@/components/WorkSection";
import { getProjects } from "@/lib/projects";
import { CtaSection } from "@/components/CtaSection";
import { Footer } from "@/components/Footer";

export default async function Home() {
  const projects = await getProjects();

  return (
    <>
      <Nav />
      <main>
        <HeroSection />
        <ServicesSection />
        <VerticalsSection />
        <ProcessSection />
        <OperatingStackSection />
        <WorkSection projects={projects} />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
