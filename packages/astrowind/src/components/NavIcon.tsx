import { Icon, IconTypes, Link } from '@evan/ui/components';
import { ThemeToggle } from './ThemeToggle';

function NavIcon({ type, href, currentPath }: { type: IconTypes; href: string; currentPath: string }) {
  const pathname = currentPath;

  const active =
    (href === '/' && pathname === '/') || (pathname !== '/' && href.includes(pathname))
      ? ''
      : 'text-clr-gray-60  hover:text-clr-text-primary';

  return (
    <Link anchor={({ children }) => <a href={href}>{children}</a>}>
      <div
        className={`
        ${active}
        `}
      >
        <Icon type={type} />
      </div>
    </Link>
  );
}

export const NavigationBar = ({ currentPath }: { currentPath: string }) => {
  return (
    <div className="flex gap-4 border-clr-ui-accent no-script p-2 items-center">
      <NavIcon currentPath={currentPath} type={IconTypes.home} href="/" />
      <NavIcon currentPath={currentPath} type={IconTypes.paper} href="/about" />
      <NavIcon currentPath={currentPath} type={IconTypes.stack} href="/project" />
      <NavIcon currentPath={currentPath} type={IconTypes.paper} href="/blog" />
      <ThemeToggle />
    </div>
  );
};
