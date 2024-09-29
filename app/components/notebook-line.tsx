import React from "react";

interface NotebookLineProps {
  children: React.ReactNode;
  className?: string;
}

const NotebookLine: React.FC<NotebookLineProps> = ({
  children,
  className = "",
}) => {
  return <div className={`notebook-line ${className}`}>{children}</div>;
};

export default NotebookLine;
