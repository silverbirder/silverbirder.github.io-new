import { ReactNode } from "react";

type Props = {
  appName: string;
  children: ReactNode;
};

export const Button = ({ appName, children }: Props) => {
  return (
    <button onClick={() => alert(`Hello from your ${appName} app!`)}>
      {children}
    </button>
  );
};
