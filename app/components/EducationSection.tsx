import type { Education } from '../lib/types';

interface Props {
  education: Education[];
}

export default function EducationSection({ education }: Props) {
  return (
    <section className="section-content">
      <div className="space-y-12">
        {education.map((item) => (
          <div key={`${item.institution}-${item.period}`} className="grid grid-cols-1 md:grid-cols-2 gap-y-3 md:gap-y-0 md:gap-x-8">
            <div className="min-w-0">
              <h3 className="text-[15px] font-medium mb-1">{item.institution}</h3>
              <p className="text-gray-600 dark:text-[#ABABAB] text-sm">{item.location}</p>
              <p className="text-gray-600 dark:text-[#ABABAB] text-sm">{item.period}</p>
            </div>
            <div className="min-w-0">
              <h3 className="text-[15px] font-medium mb-1">{item.degree}</h3>
              {item.gpa && <p className="text-gray-600 dark:text-[#ABABAB] text-sm mb-2">GPA: {item.gpa}</p>}
              {item.details && item.details.length > 0 && (
                <ul className="space-y-2 text-black dark:text-white text-sm md:text-[15px] leading-relaxed list-disc pl-4 marker:text-black dark:marker:text-white">
                  {item.details.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
