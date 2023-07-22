import { useSpring } from "@react-spring/web";

export function useFadeInUp({ delay = 0 }) {
  const [props, api] = useSpring(
    () => ({
      from: { opacity: 0, y: 10 },
      delay,
      to: { opacity: 1, y: 0 },
    }),
    []
  );
  return props;
}
