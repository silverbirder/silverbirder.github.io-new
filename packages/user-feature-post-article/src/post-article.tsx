import { MdxClientWrapper, NotebookProse } from "@repo/ui";

type Props = {
  compiledSource: string;
};

export const PostArticle = ({ compiledSource }: Props) => {
  return (
    <NotebookProse>
      <MdxClientWrapper compiledSource={compiledSource} />
    </NotebookProse>
  );
};
