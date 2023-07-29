import { motion } from "framer-motion";

export function FadeInUp({
  children,
  className,
  delay,
}: {
  children?: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      animate={{ y: 0, opacity: 1 }}
      initial={{ y: 10, opacity: 0 }}
      transition={{ delay: delay ? delay / 1000 : 0 }}
    >
      {children}
    </motion.div>
  );
}
