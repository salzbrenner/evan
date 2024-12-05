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

  // const active =
  //   (href === '/' && pathname === '/') || (pathname !== '/' && href.includes(pathname))
  //     ? 'bg-gradient-to-br from-clr-text-primary via-clr-ui-accent to-clr-ui-accent '
  //     : 'border-transparent text-clr-gray-60 hover:border-clr-text-primary hover:border-dashed';

  const active =
    (href === '/' && pathname === '/') || (pathname !== '/' && href.includes(pathname))
      ? 'border border-clr-txt-primary border-dashed'
      : 'border-transparent text-clr-gray-60 hover:border-clr-text-primary hover:border-dashed hover:bg-dot';

  return (
    <Link anchor={({ children }) => <a href={href}>{children}</a>}>
      <div
        className={`
        p-[1px]
        border
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
    <div className="flex border-clr-ui-accent no-script h-14 items-center justify-between w-full">
      {/* <ThemeToggle /> */}
      <NavIcon currentPath={currentPath} type={IconTypes.home} href="/" />
      <NavIcon currentPath={currentPath} type={IconTypes.paper} href="/about" />
      <NavIcon currentPath={currentPath} type={IconTypes.stack} href="/project" />
      <NavIcon currentPath={currentPath} type={IconTypes.paper} href="/blog" />
    </div>
  );
};
