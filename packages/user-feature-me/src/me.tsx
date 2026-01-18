import type { PropsWithChildren } from "react";

type Props = PropsWithChildren;

export const Me = ({ children }: Props) => {
  return <div>{children}</div>;
};
