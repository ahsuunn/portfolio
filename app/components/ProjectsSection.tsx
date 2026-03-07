import type { Project } from '../lib/types';

interface Props {
  projects: Project[];
}

export default function ProjectsSection({ projects }: Props) {
  return (
    <section>
      <div className="h-px w-full bg-black dark:bg-white/20 mb-8" />
      <h2 className="text-sm font-medium tracking-wider text-gray-600 dark:text-white mb-8">
        Projects
      </h2>

      <div className="space-y-16">
        {projects.map((project) => (
          <div key={project.name}>
            <div className="h-px w-full bg-black dark:bg-[#383838] mb-5" />
          <div  className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-md font-medium mb-3">{project.name}</h3>
              <div className="text-gray-700 dark:text-[#ABABAB] space-y-1 mb-4">
                <p className="font-medium text-gray-700 dark:text-[#ABABAB]">{project.role}</p>
                <p>{project.period}</p>
                {project.techStack && (
                  <p className="text-xs text-gray-700 dark:text-[#ABABAB] leading-relaxed">
                    {project.techStack}
                  </p>
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
