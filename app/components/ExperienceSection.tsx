import type { Job } from '../lib/types';

interface Props {
  jobs: Job[];
}

export default function ExperienceSection({ jobs }: Props) {
  return (
    <section>
      <div className="h-px w-full bg-black/10 dark:bg-white/20 mb-8" />
      <h2 className="text-sm font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-12">
        Experience
      </h2>

      <div className="space-y-16">
        {jobs.map((job) => (
          <div key={`${job.company}-${job.period}`} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-medium mb-1">{job.role}</h3>
              <div className="text-gray-500 dark:text-gray-400 text-sm space-y-1 mb-4">
                <p className="font-medium text-gray-700 dark:text-gray-300">{job.company}</p>
                <p>{job.period}</p>
                <p>{job.location}</p>
              </div>
            </div>
            <ul className="space-y-4 text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed list-disc pl-4 marker:text-gray-400 dark:marker:text-gray-500">
              {job.highlights.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
