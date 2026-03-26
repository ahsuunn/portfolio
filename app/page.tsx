import Link from 'next/link';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import SectionsTabs from './components/SectionsTabs';
import {
  getProfile,
  getExperience,
  getProjects,
  getSkills,
  getEducation,
  getAwards,
  getResearch,
} from './lib/cms';

export default async function Portfolio() {
  const [profile, jobs, projects, skills, education, awards, research] = await Promise.all([
    getProfile(),
    getExperience(),
    getProjects(),
    getSkills(),
    getEducation(),
    getAwards(),
    getResearch(),
  ]);

  return (
    <div className="min-h-screen p-6 md:p-12 max-w-7xl mx-auto">
      <Header name={profile.name} title={profile.title} />

      <main className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
        <Sidebar
          bio={profile.bio}
          email={profile.email}
          linkedin={profile.linkedin}
          github={profile.github}
        />

        <div className="lg:col-span-8">
          <SectionsTabs
            jobs={jobs}
            projects={projects}
            skills={skills}
            education={education}
            awards={awards}
            research={research}
          />

          <footer className="pt-12 pb-32">
            <div className="h-px w-full bg-black dark:bg-white/20 mb-8" />
            <Link
              href={"mailto:" + profile.email}
              className="text-4xl md:text-6xl font-medium hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              Contact me
            </Link>
          </footer>
        </div>
      </main>
    </div>
  );
}
