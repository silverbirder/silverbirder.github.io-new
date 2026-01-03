import type { ReactNode } from "react";

import { NotebookProse } from "../chakra/notebook-prose";

type Props = {
  children: ReactNode;
};

export const PostArticle = ({ children }: Props) => {
  return <NotebookProse>{children}</NotebookProse>;
};
