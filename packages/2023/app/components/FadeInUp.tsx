import { useFadeInUp } from "@/app/hooks/useFadeInUp";
import { animated } from "@react-spring/web";

export function FadeInUp({
  children,
  className,
  delay,
}: {
  children?: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const style = useFadeInUp({
    delay,
  });
  return (
    <animated.div className={className} style={style} suppressHydrationWarning>
      {children}
    </animated.div>
  );
}
