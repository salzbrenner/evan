export function BodyContainer({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) {
  return <div className="max-w-2xl space-y-8 md:space-y-10">{children}</div>;
}
