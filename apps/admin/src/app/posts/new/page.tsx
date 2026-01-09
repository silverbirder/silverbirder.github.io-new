import { PostEditor } from "@repo/admin-feature-post-editor";

import { resolveLinkTitles } from "@/app/actions/resolve-link-titles";
import { resolvePreview } from "@/app/actions/resolve-preview";
import { uploadImage } from "@/app/actions/upload-image";

export default function Page() {
  return (
    <PostEditor
      resolveLinkTitles={resolveLinkTitles}
      resolvePreview={resolvePreview}
      uploadImage={uploadImage}
    />
  );
}
