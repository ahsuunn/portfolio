import type { Skills } from '../lib/types';

interface Props {
  skills: Skills;
}

const categories = [
  { key: 'hardSkills' as const, label: 'Hard Skills' },
  { key: 'softSkills' as const, label: 'Soft Skills' },
  { key: 'languages' as const, label: 'Languages' },
];

export default function SkillsSection({ skills }: Props) {
  return (
    <section>
      <div className="h-px w-full bg-black dark:bg-white/20 mb-8" />
      <h2 className="text-sm font-medium tracking-wider text-black dark:text-white mb-8">
        Skills
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {categories.map(({ key, label }) => (
          <div key={key} className="space-y-6">
            <h3 className="text-gray-600 dark:text-[#ABABAB] text-md  tracking-wide">
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
