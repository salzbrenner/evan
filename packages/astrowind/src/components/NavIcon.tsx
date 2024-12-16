import { Icon, IconTypes, Link } from '@evan/ui/components';
import { ThemeToggle } from './ThemeToggle';

// function NavIcon({ type, href, currentPath }: { type: IconTypes; href: string; currentPath }) {
//   const pathname = currentPath;

//   const active =
//     (href === '/' && pathname === '/') || (pathname !== '/' && href.includes(pathname))
//       ? 'text-clr-text-primary  dark:bg-clr-gray-15 border-clr-ui-accent'
//       : 'border-transparent text-clr-gray-60';

//   return (
//     <Link anchor={({ children }) => <a href={href}>{children}</a>}>
//       <div
//         className={`
//         p-2
//         ${active}
//         border
//         hover:border-clr-text-primary
//         hover:border-dashed
//         rounded
//         `}
//       >
//         <Icon type={type} />
//       </div>
//     </Link>
//   );
// }
function NavIcon({ type, href, currentPath }: { type: IconTypes; href: string; currentPath: string }) {
  const pathname = currentPath;

  // const active =
  //   (href === '/' && pathname === '/') || (pathname !== '/' && href.includes(pathname))
  //     ? 'bg-gradient-to-br from-clr-text-primary via-clr-ui-accent to-clr-ui-accent '
  //     : 'border-transparent text-clr-gray-60 hover:border-clr-text-primary hover:border-dashed';

  const active =
    (href === '/' && pathname === '/') || (pathname !== '/' && href.includes(pathname))
      ? 'border border-clr-gray-55 border-dashed'
      : 'border-transparent text-clr-gray-60 hover:border-clr-text-primary hover:border-dashed hover:bg-dot hover:text-clr-text-primary';

  return (
    <Link anchor={({ children }) => <a href={href}>{children}</a>}>
      <div
        className={`
        p-[1px]
        border
        rounded-sm
        ${active}
        `}
      >
        <div className="p-[2px] rounded">
          <Icon type={type} />
        </div>
      </div>
    </Link>
  );
}

export const NavigationBar = ({ currentPath }: { currentPath: string }) => {
  return (
    <div className="flex gap-1 border-clr-ui-accent no-script p-2 items-center">
      {/* <ThemeToggle /> */}
      <NavIcon currentPath={currentPath} type={IconTypes.home} href="/" />
      <NavIcon currentPath={currentPath} type={IconTypes.paper} href="/about" />
      <NavIcon currentPath={currentPath} type={IconTypes.stack} href="/project" />
      <NavIcon currentPath={currentPath} type={IconTypes.paper} href="/blog" />
      <ThemeToggle />
    </div>
  );
};
