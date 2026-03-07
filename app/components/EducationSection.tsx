import type { Education } from '../lib/types';

interface Props {
  education: Education;
}

export default function EducationSection({ education }: Props) {
  return (
    <section>
      <div className="h-px w-full bg-black/10 dark:bg-white/20 mb-8" />
      <h2 className="text-sm font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-12">
        Education
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-medium mb-1">{education.institution}</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm">{education.location}</p>
          <p className="text-gray-500 dark:text-gray-400 text-sm">{education.period}</p>
        </div>
        <div>
          <h3 className="text-lg font-medium mb-1">{education.degree}</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm">GPA: {education.gpa}</p>
        </div>
      </div>
    </section>
  );
}
