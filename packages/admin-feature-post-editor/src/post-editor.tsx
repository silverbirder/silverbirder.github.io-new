"use client";

import { Box, Flex, Textarea } from "@chakra-ui/react";
import { TiptapMarkdownEditor } from "@repo/ui";
import { useTranslations } from "next-intl";
import { useState } from "react";

const INITIAL_MARKDOWN = `# New post\n\nWrite **Markdown** here.\n`;

export const PostEditor = () => {
  const t = useTranslations("admin.postEditor");
  const [markdown, setMarkdown] = useState(INITIAL_MARKDOWN);

  return (
    <main>
      <Flex gap={6}>
        <Box flex={1} minW={0}>
          <TiptapMarkdownEditor
            ariaLabel={t("editorTitle")}
            onChange={setMarkdown}
            value={markdown}
          />
        </Box>
        <Box flex={1} minW={0}>
          <Textarea
            aria-label={t("contentLabel")}
            readOnly
            rows={24}
            value={markdown}
          />
        </Box>
      </Flex>
    </main>
  );
};
