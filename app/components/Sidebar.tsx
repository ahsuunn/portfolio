import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import type { Profile } from '../lib/types';

type Props = Pick<Profile, 'bio' | 'email' | 'linkedin' | 'github'>;

export default function Sidebar({ bio, email, linkedin, github }: Props) {
  const contacts = [
    { label: "Email", href: `mailto:${email}` },
    { label: 'LinkedIn', href: linkedin },
    { label: 'GitHub', href: github },
  ];

  return (
    <aside className="lg:col-span-4 min-w-0 space-y-12 md:space-y-24 lg:sticky lg:top-32 lg:self-start">
      <div className="space-y-8">
        <div className="h-px w-full bg-black dark:bg-white/20 mb-8" />
        <p className="text-sm md:text-[15px] leading-relaxed text-black dark:text-white">
          {bio}
        </p>
      </div>

      <div className="space-y-6">
        <div className="h-px w-full bg-black dark:bg-white/20 mb-6" />
        <div className="space-y-4 text-xs md:text-sm">
          {contacts.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="group flex items-center py-2 gap-1 border-b border-black/8 dark:border-white/10 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <span>{label}</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
