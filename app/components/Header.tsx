import ThemeToggle from './ThemeToggle';

interface Props {
  name: string;
  title: string;
}

export default function Header({ name, title }: Props) {
  const [firstName, ...rest] = name.split(' ');
  const lastName = rest.join(' ');

  return (
    <header className="flex justify-between items-start mb-20 md:mb-32">
      <div>
        <h1 className="text-2xl md:text-3xl font-medium tracking-tight">
          {firstName} {lastName},
        </h1>
        <p className="text-2xl md:text-3xl text-gray-600 dark:text-[#ABABAB] font-light">
          {title}
        </p>
      </div>
      <div className="flex items-center gap-4">
        <ThemeToggle />
      </div>
    </header>
  );
}
