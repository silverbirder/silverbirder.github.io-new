import { Posts } from "@repo/user-feature-posts";
import { Suspense } from "react";

import { getPostList } from "@/libs";

export default async function Page() {
  const posts = await getPostList();

  return (
    <Suspense fallback={null}>
      <Posts posts={posts} />
    </Suspense>
  );
}
