import type { Project } from '../lib/types';
import type { IconType } from 'react-icons';
import { FiCode } from 'react-icons/fi';
import {
  SiDocker,
  SiDrizzle,
  SiExpress,
  SiFirebase,
  SiFlutter,
  SiGooglemaps,
  SiHono,
  SiHuggingface,
  SiMysql,
  SiNextdotjs,
  SiNginx,
  SiNodedotjs,
  SiOnnx,
  SiPhp,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiPytorch,
  SiReact,
  SiReactquery,
  SiRedis,
  SiResend,
  SiSocketdotio,
  SiTailwindcss,
  SiTypescript,
  SiZod,
} from 'react-icons/si';

interface Props {
  projects: Project[];
}

const techStackIcons: Record<string, IconType> = {
  'Next.js': SiNextdotjs,
  'Next.js 16': SiNextdotjs,
  TypeScript: SiTypescript,
  React: SiReact,
  'React.js': SiReact,
  TailwindCSS: SiTailwindcss,
  'Express.js': SiExpress,
  Express: SiExpress,
  'Node.js': SiNodedotjs,
  'Node.js / Express': SiNodedotjs,
  'Node.js/Express': SiNodedotjs,
  'Hono.js': SiHono,
  Hono: SiHono,
  'Drizzle ORM': SiDrizzle,
  'Prisma ORM': SiPrisma,
  Prisma: SiPrisma,
  MySQL: SiMysql,
  PostgreSQL: SiPostgresql,
  Redis: SiRedis,
  Docker: SiDocker,
  Nginx: SiNginx,
  PHP: SiPhp,
  'Socket.io': SiSocketdotio,
  Flutter: SiFlutter,
  Firebase: SiFirebase,
  'Firebase Auth': SiFirebase,
  'Cloud Firestore': SiFirebase,
  'TanStack Query': SiReactquery,
  Python: SiPython,
  PyTorch: SiPytorch,
  'Hugging Face': SiHuggingface,
  'Hugging Face Transformers': SiHuggingface,
  'ONNX Runtime': SiOnnx,
  Zod: SiZod,
  Resend: SiResend,
  'Google Maps API': SiGooglemaps,
  'Google Maps': SiGooglemaps,
};

function getTechItems(techStack: string): string[] {
  return techStack
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

export default function ProjectsSection({ projects }: Props) {
  return (
    <section className="section-content">
      <div className="space-y-16">
        {projects.map((project) => (
          <div key={project.name}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 md:gap-y-0 md:gap-x-8">
            <div className="min-w-0">
              <h3 className="text-md font-medium mb-3 wrap-break-word">{project.name}</h3>
              <div className="text-gray-700 dark:text-[#ABABAB] space-y-1">
                <p className="font-medium text-gray-700 dark:text-[#ABABAB]">{project.role}</p>
                <p>{project.period}</p>
                {project.techStack && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {getTechItems(project.techStack).map((tech) => {
                      const Icon = techStackIcons[tech] ?? FiCode;

                      return (
                        <span
                          key={tech}
                          className="max-w-full inline-flex items-center gap-1.5 rounded-md border border-black/8 dark:border-white/15 px-2 py-1 text-[11px] text-gray-700 dark:text-[#ABABAB] bg-black/[0.01] dark:bg-white/[0.02] hover:border-black/30 dark:hover:border-white/40 hover:bg-black/[0.03] dark:hover:bg-white/[0.06] hover:text-black dark:hover:text-white transition-all whitespace-normal wrap-break-word font-medium"
                        >
                          <Icon size={12} className="text-black/80 dark:text-white/80" />
                          {tech}
                        </span>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
            <ul className="min-w-0 space-y-2 text-black dark:text-white text-sm md:text-[15px] leading-relaxed list-disc pl-4 marker:text-black dark:marker:text-white">
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
