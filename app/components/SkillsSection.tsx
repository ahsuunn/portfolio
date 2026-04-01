import type { Skills } from '../lib/types';
import {
  SiHtml5, SiJavascript, SiTypescript, SiNextdotjs, SiTailwindcss,
  SiReact, SiFlutter, SiFirebase, SiNodedotjs, SiPrisma,
  SiPostgresql, SiRedis, SiDocker, SiPython, SiGit, SiCplusplus,
} from 'react-icons/si';
import { DiJava } from 'react-icons/di';
import type { IconType } from 'react-icons';

interface Props {
  skills: Skills;
}

const hardSkillIcons: Record<string, IconType> = {
  'HTML & CSS': SiHtml5,
  'JavaScript': SiJavascript,
  'TypeScript': SiTypescript,
  'Next.js': SiNextdotjs,
  'TailwindCSS': SiTailwindcss,
  'React': SiReact,
  'Flutter': SiFlutter,
  'Firebase': SiFirebase,
  'Node.js / Express': SiNodedotjs,
  'Prisma ORM': SiPrisma,
  'PostgreSQL / MySQL': SiPostgresql,
  'Redis': SiRedis,
  'Docker': SiDocker,
  'Python': SiPython,
  'Java': DiJava,
  'C / C++': SiCplusplus,
  'Git': SiGit,
};

export default function SkillsSection({ skills }: Props) {
  return (
    <section className="section-content">
      {/* Hard Skills — icon grid */}
      <div className="mb-14">
        <h3 className="text-gray-600 dark:text-[#ABABAB] text-md tracking-wide mb-8">
          Hard Skills
        </h3>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-x-4 sm:gap-x-5 md:gap-x-6 gap-y-6 md:gap-y-8">
          {skills.hardSkills.map((item) => {
            const Icon = hardSkillIcons[item];
            return (
              <div key={item} className="min-w-0 flex flex-col items-center gap-2 text-center">
                {Icon && <Icon size={22} className="text-black dark:text-white" />}
                <span className="text-[10px] sm:text-[11px] md:text-xs leading-tight text-black dark:text-white">
                  {item}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Soft Skills + Languages — bullet lists */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {([
          { key: 'softSkills' as const, label: 'Soft Skills' },
          { key: 'languages' as const, label: 'Languages' },
        ]).map(({ key, label }) => (
          <div key={key} className="space-y-6">
            <h3 className="text-gray-600 dark:text-[#ABABAB] text-md tracking-wide">
              {label}
            </h3>
            <ul className="space-y-2 text-black dark:text-white text-sm md:text-[15px] list-disc pl-4 marker:text-black dark:marker:text-white">
              {skills[key].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
