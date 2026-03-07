import Link from 'next/link';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ExperienceSection from './components/ExperienceSection';
import ProjectsSection from './components/ProjectsSection';
import SkillsSection from './components/SkillsSection';
import EducationSection from './components/EducationSection';
import AwardsSection from './components/AwardsSection';
import {
  getProfile,
  getExperience,
  getProjects,
  getSkills,
  getEducation,
  getAwards,
} from './lib/cms';

export default async function Portfolio() {
  const [profile, jobs, projects, skills, education, awards] = await Promise.all([
    getProfile(),
    getExperience(),
    getProjects(),
    getSkills(),
    getEducation(),
    getAwards(),
  ]);

  return (
    <div className="min-h-screen p-6 md:p-12 max-w-[1600px] mx-auto font-sans">
      <Header name={profile.name} title={profile.title} />

      <main className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
        <Sidebar
          bio={profile.bio}
          email={profile.email}
          phone={profile.phone}
          linkedin={profile.linkedin}
          github={profile.github}
        />

        <div className="lg:col-span-8 space-y-20 md:space-y-32">
          <ExperienceSection jobs={jobs} />
          <ProjectsSection projects={projects} />
          <SkillsSection skills={skills} />
          <EducationSection education={education} />
          <AwardsSection awards={awards} />

          <footer className="pt-20 pb-32">
            <div className="h-px w-full bg-black/10 dark:bg-white/20 mb-8" />
            <Link
              href={"mailto:" + profile.email}
              className="text-4xl md:text-6xl font-medium hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
            >
              Contact me
            </Link>
          </footer>
        </div>
      </main>
    </div>
  );
}
