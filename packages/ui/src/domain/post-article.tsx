import type { ReactNode } from "react";

import { Prose } from "../chakra/prose";

type Props = {
  children: ReactNode;
};

export const PostArticle = ({ children }: Props) => {
  return <Prose>{children}</Prose>;
};
