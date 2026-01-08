import { PostEditor } from "@repo/admin-feature-post-editor";

import { resolvePreview } from "@/app/actions/resolve-preview";
import { uploadImage } from "@/app/actions/upload-image";

export default function Page() {
  return (
    <PostEditor resolvePreview={resolvePreview} uploadImage={uploadImage} />
  );
}
