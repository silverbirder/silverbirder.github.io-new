import { cx } from "class-variance-authority";
import { Link } from "next-view-transitions";

type Props = {
  children: React.ReactNode;
  pathname: string;
  className?: string;
};

type TabProps = {
  href: string;
  label: string;
  color: string;
  isActive: boolean;
};

const Tab = ({ href, label, color, isActive }: TabProps) => (
  <div
    className={cx(
      "px-4 py-2 rounded-t-lg transition-all duration-300",
      color,
      isActive ? "font-bold shadow-lg" : "opacity-70 hover:opacity-100"
    )}
  >
    <Link
      href={href}
      className={cx(
        "text-primary-foreground font-semibold",
        isActive ? "border-primary-foreground" : ""
      )}
    >
      {label}
    </Link>
  </div>
);

export const Notebook = ({ children, className, pathname }: Props) => {
  const getBorderColor = () => {
    switch (pathname) {
      case "/":
        return "border-l-4 border-primary";
      case "/blog":
        return "border-l-4 border-green-500";
      default:
        return "border-l-4 border-gray-500";
    }
  };

  return (
    <div>
      <div className="flex justify-start space-x-1">
        <Tab
          href="/"
          label="トップ"
          color={"bg-primary"}
          isActive={pathname === "/"}
        />
        <Tab
          href="/blog"
          label="ブログ"
          color={"bg-green-500"}
          isActive={pathname === "/blog"}
        />
      </div>
      <div
        className={cx(
          "bg-white shadow-lg p-4",
          "antialiased mx-auto min-h-96",
          "bg-[linear-gradient(hsl(var(--muted-foreground))_1px,transparent_1px)]",
          "bg-[length:100%_1rem]",
          "relative z-10",
          getBorderColor(),
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};
