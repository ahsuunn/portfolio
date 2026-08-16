import HeaderStatus from './HeaderStatus';
import ThemeToggle from './ThemeToggle';

interface Props {
  name: string;
  title: string;
}

export default function Header({ name, title }: Props) {
  const [firstName, ...rest] = name.split(' ');
  const lastName = rest.join(' ');

  return (
    <header className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-16 md:mb-24">
      <div>
        <h1 className="text-2xl md:text-3xl font-medium tracking-tight">
          {firstName} {lastName},
        </h1>
        <p className="text-2xl md:text-3xl text-gray-600 dark:text-[#ABABAB] font-light">
          {title}
        </p>
      </div>
      <div className="flex items-center gap-3 sm:gap-4 self-end sm:self-start">
        <ThemeToggle />
      </div>
    </header>
  );
}
