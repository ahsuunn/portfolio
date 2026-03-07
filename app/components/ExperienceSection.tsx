import type { Job } from '../lib/types';

interface Props {
  jobs: Job[];
}

export default function ExperienceSection({ jobs }: Props) {
  return (
    <section>
      <div className="h-px w-full bg-black dark:bg-white/20 mb-8" />
      <h2 className="text-sm font-medium tracking-wider text-gray-600 dark:text-white mb-8">
        Experience
      </h2>

      <div className="space-y-14">
        {jobs.map((job) => (
          <div key={`${job.company}-${job.period}`}>
            <div className="h-px w-full bg-black dark:bg-[#383838] mb-5" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-md font-medium mb-3">{job.role}</h3>
                <div className="text-gray-600 dark:text-[#ABABAB] text-md space-y-1 mb-4">
                  <p>{job.company}</p>
                  <p>{job.period}</p>
                  <p>{job.location}</p>
                </div>
              </div>
              <ul className="space-y-4 text-black dark:text-white text-sm md:text-[15px] leading-relaxed list-disc pl-4 marker:text-black dark:marker:text-white">
                {job.highlights.map((h, i) => (
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
