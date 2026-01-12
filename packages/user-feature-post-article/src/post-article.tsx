import { Container } from "@chakra-ui/react";
import { MdxClientWrapper, NotebookProse } from "@repo/ui";

type Props = {
  compiledSource: string;
  meta?: {
    publishedAt?: string;
    tags?: string[];
    title?: string;
  };
};

export const PostArticle = ({ compiledSource }: Props) => {
  return (
    <Container centerContent>
      <NotebookProse
        borderColor="border.muted"
        borderWidth="1px"
        px="2"
        w="full"
      >
        <MdxClientWrapper compiledSource={compiledSource} />
      </NotebookProse>
    </Container>
  );
};
