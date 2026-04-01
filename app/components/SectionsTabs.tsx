'use client';

import { useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import ExperienceSection from './ExperienceSection';
import ProjectsSection from './ProjectsSection';
import SkillsSection from './SkillsSection';
import EducationSection from './EducationSection';
import AwardsSection from './AwardsSection';
import ResearchSection from './ResearchSection';
import ScrollReveal from './ScrollReveal';
import type {
  Award,
  Education,
  Job,
  Project,
  Research,
  SectionTabId,
  Skills,
} from '../lib/types';
import { sectionTabIds } from '../lib/types';

interface Props {
  jobs: Job[];
  projects: Project[];
  skills: Skills;
  education: Education;
  awards: Award[];
  research: Research[];
}

const tabLabels: Record<SectionTabId, string> = {
  experience: 'Experience',
  projects: 'Projects',
  skills: 'Skills',
  education: 'Education',
  awards: 'Awards',
  research: 'Research',
};

function isSectionTabId(value: string | null): value is SectionTabId {
  return value !== null && sectionTabIds.includes(value as SectionTabId);
}

export default function SectionsTabs({ jobs, projects, skills, education, awards, research }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeTab = isSectionTabId(searchParams.get('section'))
    ? searchParams.get('section')
    : 'experience';

  const activePanel = useMemo(() => {
    switch (activeTab) {
      case 'experience':
        return <ExperienceSection jobs={jobs} />;
      case 'projects':
        return <ProjectsSection projects={projects} />;
      case 'skills':
        return <SkillsSection skills={skills} />;
      case 'education':
        return <EducationSection education={education} />;
      case 'awards':
        return <AwardsSection awards={awards} />;
      case 'research':
        return <ResearchSection research={research} />;
      default:
        return <ExperienceSection jobs={jobs} />;
    }
  }, [activeTab, awards, education, jobs, projects, research, skills]);

  const handleTabChange = (tabId: SectionTabId) => {
    const nextParams = new URLSearchParams(searchParams.toString());
    nextParams.set('section', tabId);
    router.replace(`${pathname}?${nextParams.toString()}`, { scroll: false });
  };

  return (
    <div>
      <div className="sticky top-0  z-20 -mx-2 px-2 pb-4 mb-8 bg-white dark:bg-black">
        <div className="overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <div
            className="inline-flex min-w-max items-center gap-3 border-b border-black/20 dark:border-white/20 pb-1"
            role="tablist"
            aria-label="Portfolio sections"
          >
            {sectionTabIds.map((tabId) => {
              const selected = activeTab === tabId;
              return (
                <button
                  key={tabId}
                  type="button"
                  role="tab"
                  id={`tab-${tabId}`}
                  aria-selected={selected}
                  aria-controls={`panel-${tabId}`}
                  onClick={() => handleTabChange(tabId)}
                  className={`shrink-0 px-1 py-2 text-sm tracking-wide transition-colors duration-200 border-b ${
                    selected
                      ? 'text-black dark:text-white border-black dark:border-white'
                      : 'text-gray-600 dark:text-[#ABABAB] border-transparent hover:text-black dark:hover:text-white'
                  } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/60 dark:focus-visible:ring-white/60`}
                >
                  {tabLabels[tabId]}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div role="tabpanel" id={`panel-${activeTab}`} aria-labelledby={`tab-${activeTab}`}>
        <ScrollReveal key={activeTab}>{activePanel}</ScrollReveal>
      </div>
    </div>
  );
}
