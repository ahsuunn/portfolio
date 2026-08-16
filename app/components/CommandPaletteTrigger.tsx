'use client';

import { useEffect, useState } from 'react';
import { Command } from 'lucide-react';

export default function CommandPaletteTrigger() {
  const [isMac, setIsMac] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMac(/(Mac|iPhone|iPod|iPad)/i.test(navigator.userAgent));
    }
  }, []);

  const handleClick = () => {
    window.dispatchEvent(new Event('open-command-palette'));
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Open Command Palette"
      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white rounded-md border border-black/10 dark:border-white/15 transition-all"
    >
      <Command size={12} className="opacity-70" />
      <span className="font-normal">{isMac ? '⌘K' : 'Ctrl K'}</span>
    </button>
  );
}
