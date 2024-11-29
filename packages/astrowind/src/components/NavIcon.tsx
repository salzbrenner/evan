import { Icon, IconTypes, Link } from '@evan/ui/components';

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
function NavIcon({ type, href, currentPath }: { type: IconTypes; href: string; currentPath }) {
  const pathname = currentPath;

  const active =
    (href === '/' && pathname === '/') || (pathname !== '/' && href.includes(pathname))
      ? 'bg-gradient-to-br from-clr-text-primary via-clr-ui-accent to-clr-ui-accent '
      : 'border-transparent text-clr-gray-60 hover:border-clr-text-primary hover:border-dashed';

  return (
    <Link anchor={({ children }) => <a href={href}>{children}</a>}>
      <div
        className={`
        p-[1px]
        border
        border-clr-ui-bg
 
        rounded
        ${active}
        `}
      >
        <div className="p-2 bg-clr-ui-bg rounded">
          <Icon type={type} />
        </div>
      </div>
    </Link>
  );
}

export const NavigationBar = ({ currentPath }: { currentPath: string }) => {
  return (
    <div className="flex border-b border-clr-ui-accent w-full no-script h-14 items-center justify-between">
      {/* <ThemeToggle /> */}
      <div className="flex">
        <NavIcon currentPath={currentPath} type={IconTypes.home} href="/" />
        <NavIcon currentPath={currentPath} type={IconTypes.paper} href="/about" />
        <NavIcon currentPath={currentPath} type={IconTypes.stack} href="/project" />
      </div>
    </div>
  );
};
