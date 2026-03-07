import type { Award } from '../lib/types';

interface Props {
  awards: Award[];
}

export default function AwardsSection({ awards }: Props) {
  return (
    <section>
      <div className="h-px w-full bg-black/10 dark:bg-white/20 mb-8" />
      <h2 className="text-sm font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-12">
        Honors &amp; Awards
      </h2>

      <div className="space-y-10">
        {awards.map((award) => (
          <div key={`${award.title}-${award.date}`} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium mb-1">{award.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">{award.event}</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">{award.date}</p>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed">
              {award.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
