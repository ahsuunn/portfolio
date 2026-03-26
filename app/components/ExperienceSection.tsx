import type { Job } from '../lib/types';

interface Props {
  jobs: Job[];
}

export default function ExperienceSection({ jobs }: Props) {
  return (
    <section>
      <div className="space-y-14">
        {jobs.map((job) => (
          <div key={`${job.company}-${job.period}`}>
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
