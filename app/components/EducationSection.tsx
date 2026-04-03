import type { Education } from '../lib/types';

interface Props {
  education: Education;
}

export default function EducationSection({ education }: Props) {
  return (
    <section className="section-content">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 md:gap-y-0 md:gap-x-8">
        <div className="min-w-0">
          <h3 className="text-[15px] font-medium mb-1">{education.institution}</h3>
          <p className="text-gray-600 dark:text-[#ABABAB] text-sm">{education.location}</p>
          <p className="text-gray-600 dark:text-[#ABABAB] text-sm">{education.period}</p>
        </div>
        <div className="min-w-0">
          <h3 className="text-[15px] font-medium mb-1">{education.degree}</h3>
          <p className="text-gray-600 dark:text-[#ABABAB] text-sm">GPA: {education.gpa}</p>
        </div>
      </div>
    </section>
  );
}
