import { Container } from "@chakra-ui/react";
import { MdxClientWrapper, Notebook } from "@repo/ui";

type Props = {
  compiledSource: string;
  meta: {
    publishedAt?: string;
    tags?: string[];
    title?: string;
  };
};

export const PostArticle = ({ compiledSource, meta }: Props) => {
  return (
    <Container centerContent p="2">
      <Notebook
        publishedAt={meta.publishedAt}
        tags={meta.tags}
        title={meta.title}
      >
        <MdxClientWrapper compiledSource={compiledSource} />
      </Notebook>
    </Container>
  );
};
