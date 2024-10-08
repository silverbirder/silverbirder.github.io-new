import { cx } from "class-variance-authority";
import { motion } from "framer-motion";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export const Notebook = ({ children, className }: Props) => {
  return (
    <motion.div
      className={cx(
        "bg-white border-l-4 border-primary shadow-lg p-4",
        "antialiased mx-auto min-h-96",
        "bg-[linear-gradient(hsl(var(--muted-foreground))_1px,transparent_1px)]",
        "bg-[length:100%_1rem]",
        "relative",
        className
      )}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {children}
    </motion.div>
  );
};
