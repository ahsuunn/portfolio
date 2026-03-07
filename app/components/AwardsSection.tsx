import type { Award } from '../lib/types';

interface Props {
  awards: Award[];
}

export default function AwardsSection({ awards }: Props) {
  return (
    <section>
      <div className="h-px w-full bg-black dark:bg-white/20 mb-8" />
      <h2 className="text-sm font-medium  tracking-wider text-gray-700 dark:text-[#ABABAB] mb-12">
        Honors &amp; Awards
      </h2>

      <div className="space-y-10">
        {awards.map((award) => (
          <div key={`${award.title}-${award.date}`} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-[15px] font-medium mb-1">{award.title}</h3>
              <p className="text-gray-600 dark:text-[#ABABAB] text-sm">{award.event}</p>
              <p className="text-gray-600 dark:text-[#ABABAB] text-sm">{award.date}</p>
            </div>
            <p className="text-black dark:text-white text-sm md:text-[15px] leading-relaxed">
              {award.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
