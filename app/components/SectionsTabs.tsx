'use client';

import { motion } from 'framer-motion';
import { useMemo, useState, useEffect, useCallback } from 'react';
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
  education: Education[];
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
  const [isAltHeld, setIsAltHeld] = useState(false);
  const [isMac, setIsMac] = useState(false);

  const activeTab = isSectionTabId(searchParams.get('section'))
    ? searchParams.get('section')
    : 'experience';

  const tabCounts: Record<SectionTabId, number | null> = useMemo(() => ({
    experience: jobs.length,
    projects: projects.length,
    skills: skills.hardSkills.length,
    education: education.length,
    awards: awards.length,
    research: research.length,
  }), [awards.length, education.length, jobs.length, projects.length, research.length, skills.hardSkills.length]);

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

  const handleTabChange = useCallback((tabId: SectionTabId) => {
    const nextParams = new URLSearchParams(searchParams.toString());
    nextParams.set('section', tabId);
    router.replace(`${pathname}?${nextParams.toString()}`, { scroll: false });
  }, [pathname, router, searchParams]);

  useEffect(() => {
    setIsMac(typeof navigator !== 'undefined' && navigator.platform.toUpperCase().includes('MAC'));

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Alt') {
        setIsAltHeld(true);
      }

      // Don't trigger if user is actively typing in an input or textarea
      const target = e.target as HTMLElement | null;
      const isTyping =
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable);

      if (isTyping) return;

      const num = parseInt(e.key, 10);
      if (!isNaN(num) && num >= 1 && num <= sectionTabIds.length) {
        if (e.altKey || (!e.ctrlKey && !e.metaKey && !e.shiftKey)) {
          e.preventDefault();
          handleTabChange(sectionTabIds[num - 1]);
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Alt') {
        setIsAltHeld(false);
      }
    };

    const handleBlur = () => {
      setIsAltHeld(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('blur', handleBlur);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('blur', handleBlur);
    };
  }, [handleTabChange]);

  return (
    <div>
      <div className="sticky top-0 z-20 w-full pt-4 lg:pt-0 mb-8 bg-white/90 dark:bg-black/90 backdrop-blur-sm">
        <div className="w-full overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <div
            className="inline-flex w-max min-w-full items-center gap-1 sm:gap-2 border-b border-black/10 dark:border-white/15"
            role="tablist"
            aria-label="Portfolio sections"
          >
            {sectionTabIds.map((tabId, idx) => {
              const selected = activeTab === tabId;
              const count = tabCounts[tabId];

              return (
                <button
                  key={tabId}
                  type="button"
                  role="tab"
                  id={`tab-${tabId}`}
                  aria-selected={selected}
                  aria-controls={`panel-${tabId}`}
                  onClick={() => handleTabChange(tabId)}
                  className={`relative shrink-0 px-2.5 py-2.5 text-sm tracking-tight transition-colors duration-75 ${
                    selected
                      ? 'text-black dark:text-white font-medium'
                      : 'text-gray-500 dark:text-[#8E8E8E] hover:text-black dark:hover:text-white'
                  } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/60 dark:focus-visible:ring-white/60`}
                >
                  <span className="flex items-center gap-1.5 font-sans">
                    {tabLabels[tabId]}

                    {isAltHeld && (
                      <kbd className="text-[9px] px-1 py-[1px] rounded border border-black/20 dark:border-white/20 text-black dark:text-white font-sans font-normal leading-tight bg-black/[0.04] dark:bg-white/[0.08]">
                        {isMac ? '⌥' : 'Alt+'}{idx + 1}
                      </kbd>
                    )}

                    {count !== null && !isAltHeld && (
                      <span
                        className={`text-[11px] tabular-nums font-sans transition-opacity ${
                          selected
                            ? 'text-black/70 dark:text-white/70'
                            : 'text-gray-400 dark:text-gray-500'
                        }`}
                      >
                        {count}
                      </span>
                    )}
                  </span>

                  {selected && (
                    <motion.div
                      layoutId="activeTabUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-black dark:bg-white"
                      transition={{ duration: 0.1, ease: 'easeOut' }}
                    />
                  )}
                </button>
              );
            })}

            {/* Subtle Right-Aligned Hint */}
            <div className="ml-auto hidden md:flex items-center text-[10px] text-gray-400 dark:text-gray-500 gap-1 select-none pr-1">
              <span>Hold</span>
              <kbd className="text-[9px] px-1 py-[1px] rounded border border-black/15 dark:border-white/20 font-sans leading-tight">
                {isMac ? '⌥ Option' : 'Alt'}
              </kbd>
              <span>for hotkeys</span>
            </div>
          </div>
        </div>
      </div>

      <div role="tabpanel" id={`panel-${activeTab}`} aria-labelledby={`tab-${activeTab}`}>
        {activePanel}
      </div>
    </div>
  );
}
