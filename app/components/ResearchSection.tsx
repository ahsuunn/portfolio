import { ArrowUpRight } from 'lucide-react';
import type { Research } from '../lib/types';

interface Props {
  research: Research[];
}

export default function ResearchSection({ research }: Props) {
  return (
    <section>
      <div className="h-px w-full bg-black dark:bg-white/20 mb-8" />
      <h2 className="text-sm font-medium tracking-wider text-gray-700 dark:text-[#ABABAB] mb-12">
        Research
      </h2>

      <div className="space-y-10">
        {research.map((paper) => (
          <div key={paper.url} className="grid grid-cols-1 gap-8">
            <div>
            <a
              href={paper.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black dark:text-white text-sm md:text-[15px] leading-relaxed hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              {paper.title}
              <ArrowUpRight className="inline-block ml-1 w-4 h-4" />
            </a>
              <p className="text-gray-600 dark:text-[#ABABAB] text-sm">{paper.coursework}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
