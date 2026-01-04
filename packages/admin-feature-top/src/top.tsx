import type { PropsWithChildren } from "react";

type Props = PropsWithChildren;

export const Top = ({ children }: Props) => {
  return <div>{children}</div>;
};
