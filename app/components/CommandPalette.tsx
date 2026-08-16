'use client';

import { useEffect, useState, useMemo, useRef, useCallback } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useTheme } from 'next-themes';
import {
  Search,
  Briefcase,
  FolderGit2,
  Cpu,
  GraduationCap,
  Trophy,
  BookOpen,
  Copy,
  Mail,
  Github,
  Linkedin,
  Sun,
  Moon,
  Check,
} from 'lucide-react';
import type { SectionTabId } from '../lib/types';

interface CommandItem {
  id: string;
  title: string;
  subtitle?: string;
  category: 'Navigation' | 'Actions' | 'Social' | 'Preferences';
  icon: React.ComponentType<{ className?: string; size?: number }>;
  shortcut?: string;
  perform: () => void;
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isMac, setIsMac] = useState(true);

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { theme, setTheme } = useTheme();

  // Detect platform for keyboard hint
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMac(/(Mac|iPhone|iPod|iPad)/i.test(navigator.userAgent));
    }
  }, []);

  const navigateToSection = useCallback((section: SectionTabId) => {
    const nextParams = new URLSearchParams(searchParams.toString());
    nextParams.set('section', section);
    router.replace(`${pathname}?${nextParams.toString()}`, { scroll: false });
    setIsOpen(false);
  }, [pathname, router, searchParams]);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  }, []);

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText('themalique1910@gmail.com');
      showToast('Email copied to clipboard!');
    } catch {
      showToast('themalique1910@gmail.com');
    }
    setIsOpen(false);
  }, [showToast]);

  const openLink = useCallback((url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
    setIsOpen(false);
  }, [setTheme, theme]);

  const allCommands: CommandItem[] = useMemo(() => [
    {
      id: 'nav-experience',
      title: 'Go to Experience',
      subtitle: 'ParagonCorp, KM ITB, Lab Assistant',
      category: 'Navigation',
      icon: Briefcase,
      shortcut: 'GE',
      perform: () => navigateToSection('experience'),
    },
    {
      id: 'nav-projects',
      title: 'Go to Projects',
      subtitle: 'Pharmanova, Sahabat Karir, GEMMA',
      category: 'Navigation',
      icon: FolderGit2,
      shortcut: 'GP',
      perform: () => navigateToSection('projects'),
    },
    {
      id: 'nav-skills',
      title: 'Go to Skills',
      subtitle: 'Next.js, Python, PyTorch, Flutter',
      category: 'Navigation',
      icon: Cpu,
      shortcut: 'GS',
      perform: () => navigateToSection('skills'),
    },
    {
      id: 'nav-education',
      title: 'Go to Education',
      subtitle: 'Chung-Ang Univ (CAU) & ITB',
      category: 'Navigation',
      icon: GraduationCap,
      shortcut: 'GD',
      perform: () => navigateToSection('education'),
    },
    {
      id: 'nav-awards',
      title: 'Go to Awards',
      subtitle: 'Global FinTech Scholar, Innovest 1st',
      category: 'Navigation',
      icon: Trophy,
      shortcut: 'GA',
      perform: () => navigateToSection('awards'),
    },
    {
      id: 'nav-research',
      title: 'Go to Research',
      subtitle: 'Academic papers & algorithms',
      category: 'Navigation',
      icon: BookOpen,
      shortcut: 'GR',
      perform: () => navigateToSection('research'),
    },
    {
      id: 'action-copy-email',
      title: 'Copy Email Address',
      subtitle: 'themalique1910@gmail.com',
      category: 'Actions',
      icon: Copy,
      shortcut: 'CE',
      perform: copyEmail,
    },
    {
      id: 'action-send-email',
      title: 'Send Email',
      subtitle: 'Open default email client',
      category: 'Actions',
      icon: Mail,
      perform: () => {
        window.location.href = 'mailto:themalique1910@gmail.com';
        setIsOpen(false);
      },
    },
    {
      id: 'social-github',
      title: 'Open GitHub Profile',
      subtitle: 'github.com/ahsuunn',
      category: 'Social',
      icon: Github,
      perform: () => openLink('https://github.com/ahsuunn'),
    },
    {
      id: 'social-linkedin',
      title: 'Open LinkedIn Profile',
      subtitle: 'linkedin.com/in/ahsan-malik-al-farisi',
      category: 'Social',
      icon: Linkedin,
      perform: () => openLink('https://linkedin.com/in/ahsan-malik-al-farisi'),
    },
    {
      id: 'pref-theme',
      title: `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`,
      subtitle: 'Toggle theme preference',
      category: 'Preferences',
      icon: theme === 'dark' ? Sun : Moon,
      shortcut: 'T',
      perform: toggleTheme,
    },
  ], [copyEmail, navigateToSection, openLink, theme, toggleTheme]);

  const filteredCommands = useMemo(() => {
    if (!search.trim()) return allCommands;
    const query = search.toLowerCase();
    return allCommands.filter(
      (cmd) =>
        cmd.title.toLowerCase().includes(query) ||
        (cmd.subtitle && cmd.subtitle.toLowerCase().includes(query)) ||
        cmd.category.toLowerCase().includes(query)
    );
  }, [allCommands, search]);

  // Global keydown handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle palette on Cmd+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }

      // Open on '/' if not currently in an input
      if (
        e.key === '/' &&
        !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName) &&
        !isOpen
      ) {
        e.preventDefault();
        setIsOpen(true);
      }

      // Close on Escape
      if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Reset selection index when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 10);
    } else {
      setSearch('');
    }
  }, [isOpen]);

  // Ensure keyboard navigated item is always scrolled into view immediately
  useEffect(() => {
    if (isOpen) {
      if (selectedIndex === 0) {
        listRef.current?.scrollTo({ top: 0, behavior: 'auto' });
      } else if (itemRefs.current[selectedIndex]) {
        itemRefs.current[selectedIndex]?.scrollIntoView({
          block: 'nearest',
          behavior: 'auto',
        });
      }
    }
  }, [selectedIndex, isOpen]);

  // Listen for custom trigger event
  useEffect(() => {
    const handleOpenTrigger = () => setIsOpen(true);
    window.addEventListener('open-command-palette', handleOpenTrigger);
    return () => window.removeEventListener('open-command-palette', handleOpenTrigger);
  }, []);

  // Keyboard navigation within list
  const handleModalKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev === 0 ? filteredCommands.length - 1 : prev - 1
      );
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].perform();
      }
    }
  };

  // Group commands for rendering
  const groupedCommands = useMemo(() => {
    const groups: { category: string; items: { command: CommandItem; index: number }[] }[] = [];
    let count = 0;

    filteredCommands.forEach((cmd) => {
      let group = groups.find((g) => g.category === cmd.category);
      if (!group) {
        group = { category: cmd.category, items: [] };
        groups.push(group);
      }
      group.items.push({ command: cmd, index: count });
      count++;
    });

    return groups;
  }, [filteredCommands]);

  if (!isOpen && !toastMessage) return null;

  return (
    <>
      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-lg bg-black text-white dark:bg-white dark:text-black shadow-xl text-xs font-medium tracking-tight">
          <Check size={14} className="text-emerald-500" />
          {toastMessage}
        </div>
      )}

      {/* Palette Modal (No blur, no popup animation, wider, transparent background) */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4"
          onKeyDown={handleModalKeyDown}
        >
          {/* Backdrop (semi-transparent, no blur) */}
          <div
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 dark:bg-black/70"
          />

          {/* Modal Card (wider, sleek height, translucent without blur, no scale animation) */}
          <div className="relative w-full max-w-2xl sm:max-w-3xl overflow-hidden rounded-xl border border-black/15 dark:border-white/20 bg-white/95 dark:bg-[#121212]/95 shadow-2xl flex flex-col max-h-[62vh]">
            {/* Search Bar */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-black/10 dark:border-white/10">
              <Search size={15} className="text-gray-400 dark:text-gray-500 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Type a command or search..."
                className="flex-1 bg-transparent text-sm text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none"
              />
              <kbd className="hidden sm:inline-flex items-center px-1 py-[1px] text-[10px] text-gray-500 dark:text-gray-400 rounded border border-black/15 dark:border-white/20 font-normal">
                ESC
              </kbd>
            </div>

            {/* Command List */}
            <div
              ref={listRef}
              className="overflow-y-auto p-1.5 pb-1.5 scroll-py-1 text-sm [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              {filteredCommands.length === 0 ? (
                <div className="py-10 text-center text-xs text-gray-500 dark:text-gray-400">
                  No matching commands found.
                </div>
              ) : (
                groupedCommands.map((group) => (
                  <div key={group.category} className="py-1 first:pt-0">
                    <div className="px-2.5 py-1 text-[11px] font-semibold text-gray-600 dark:text-gray-400">
                      {group.category}
                    </div>
                    <div className="space-y-0.5">
                      {group.items.map(({ command, index }) => {
                        const Icon = command.icon;
                        const isSelected = selectedIndex === index;

                        return (
                          <button
                            key={command.id}
                            ref={(el) => {
                              itemRefs.current[index] = el;
                            }}
                            type="button"
                            onClick={() => command.perform()}
                            onMouseEnter={() => setSelectedIndex(index)}
                            className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-left scroll-my-1 ${
                              isSelected
                                ? 'bg-black/5 dark:bg-white/[0.08] text-black dark:text-white'
                                : 'text-black/80 dark:text-white/80 hover:bg-black/[0.03] dark:hover:bg-white/[0.04]'
                            }`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <Icon
                                size={15}
                                className={`shrink-0 ${
                                  isSelected
                                    ? 'text-black dark:text-white'
                                    : 'text-gray-500 dark:text-gray-400'
                                }`}
                              />
                              <div className="min-w-0">
                                <div className="font-medium text-xs sm:text-[13px] truncate leading-tight">
                                  {command.title}
                                </div>
                                {command.subtitle && (
                                  <div className="text-[11px] truncate text-gray-500 dark:text-gray-400 leading-tight">
                                    {command.subtitle}
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0 ml-2">
                              {command.shortcut && (
                                <span className="text-[9px] px-1 py-[1px] rounded border border-black/15 dark:border-white/20 text-gray-500 dark:text-gray-400 font-normal leading-tight">
                                  {command.shortcut}
                                </span>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Key Hints (Moved to bottom right, tight padding) */}
            <div className="px-3.5 py-1.5 border-t border-black/10 dark:border-white/10 flex items-center justify-end text-[10px] text-gray-500 dark:text-gray-400 gap-3">
              <span className="flex items-center gap-1">
                <kbd className="text-[9px] px-1 py-[1px] rounded border border-black/15 dark:border-white/20 font-normal leading-tight">↑</kbd>
                <kbd className="text-[9px] px-1 py-[1px] rounded border border-black/15 dark:border-white/20 font-normal leading-tight">↓</kbd>
                <span>Navigate</span>
              </span>
              <span className="flex items-center gap-1">
                <kbd className="text-[9px] px-1 py-[1px] rounded border border-black/15 dark:border-white/20 font-normal leading-tight">↵</kbd>
                <span>Select</span>
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
