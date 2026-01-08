import { PostEditor } from "@repo/admin-feature-post-editor";

import { resolvePreview } from "@/app/actions/resolve-preview";

export default function Page() {
  return <PostEditor resolvePreview={resolvePreview} />;
}
