import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import type { Profile } from '../lib/types';

type Props = Pick<Profile, 'bio' | 'email' | 'phone' | 'linkedin' | 'github'>;

export default function Sidebar({ bio, email, phone, linkedin, github }: Props) {
  const contacts = [
    { label: email, href: `mailto:${email}` },
    { label: phone, href: `tel:${phone.replace(/\D/g, '')}` },
    { label: 'LinkedIn', href: linkedin },
    { label: 'GitHub', href: github },
  ];

  return (
    <aside className="lg:col-span-4 space-y-12 md:space-y-24 lg:sticky lg:top-32 lg:self-start">
      <div className="space-y-8">
        <div className="h-px w-full bg-black/10 dark:bg-white/20 mb-8" />
        <p className="text-lg md:text-xl leading-relaxed text-gray-700 dark:text-gray-200">
          {bio}
        </p>
      </div>

      <div className="space-y-6">
        <div className="h-px w-full bg-black/10 dark:bg-white/20 mb-6" />
        <div className="space-y-4 text-sm md:text-base">
          {contacts.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="group flex items-center justify-between py-2 border-b border-black/8 dark:border-white/10 hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
            >
              <span>{label}</span>
              <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
