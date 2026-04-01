import type { Project } from '../lib/types';
import type { IconType } from 'react-icons';
import { FiCode } from 'react-icons/fi';
import {
  SiDocker,
  SiExpress,
  SiFirebase,
  SiFlutter,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPhp,
  SiPostgresql,
  SiPrisma,
  SiReact,
  SiRedis,
  SiSocketdotio,
  SiTypescript,
} from 'react-icons/si';

interface Props {
  projects: Project[];
}

const techStackIcons: Record<string, IconType> = {
  'Next.js': SiNextdotjs,
  TypeScript: SiTypescript,
  React: SiReact,
  'Express.js': SiExpress,
  Express: SiExpress,
  'Node.js': SiNodedotjs,
  'Node.js / Express': SiNodedotjs,
  'Node.js/Express': SiNodedotjs,
  'Prisma ORM': SiPrisma,
  Prisma: SiPrisma,
  MySQL: SiMysql,
  PostgreSQL: SiPostgresql,
  Redis: SiRedis,
  Docker: SiDocker,
  PHP: SiPhp,
  'Socket.io': SiSocketdotio,
  Flutter: SiFlutter,
  Firebase: SiFirebase,
};

function getTechItems(techStack: string): string[] {
  return techStack
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

export default function ProjectsSection({ projects }: Props) {
  return (
    <section>
      <div className="space-y-16">
        {projects.map((project) => (
          <div key={project.name}>
          <div  className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-md font-medium mb-3">{project.name}</h3>
              <div className="text-gray-700 dark:text-[#ABABAB] space-y-1 mb-4">
                <p className="font-medium text-gray-700 dark:text-[#ABABAB]">{project.role}</p>
                <p>{project.period}</p>
                {project.techStack && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {getTechItems(project.techStack).map((tech) => {
                      const Icon = techStackIcons[tech] ?? FiCode;

                      return (
                        <span
                          key={tech}
                          className="inline-flex items-center gap-1.5 rounded-md border border-gray-200 dark:border-white/20 px-2 py-1 text-[11px] text-gray-700 dark:text-[#ABABAB]"
                        >
                          <Icon size={12} className="text-black dark:text-white" />
                          {tech}
                        </span>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
            <ul className="space-y-4 text-black dark:text-white text-sm md:text-[15px] leading-relaxed list-disc pl-4 marker:text-black dark:marker:text-white">
              {project.highlights.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          </div>
          </div>
        ))}
      </div>
    </section>
  );
}
