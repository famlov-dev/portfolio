import Navbar from "@/components/navbar/navbar";
import HeroSection from "@/components/sections/hero/hero-section";
import AboutSection from "@/components/sections/about/about-section";
import SkillsSection from "@/components/sections/skills/skills-section";
import ProjectsSection from "@/components/sections/projects/projects-section";
import EducationSection from "@/components/sections/education/education-section";
import ExperienceSection from "@/components/sections/experience/experience-section";
import ContactSection from "@/components/sections/contact/contact-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <SkillsSection />
      <EducationSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
