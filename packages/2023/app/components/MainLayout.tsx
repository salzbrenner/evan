export function MainLayout({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) {
  return (
    <div className="flex min-h-screen px-8 lg:px-12 py-64 justify-center lg:justify-normal">
      {children}
    </div>
  );
}
