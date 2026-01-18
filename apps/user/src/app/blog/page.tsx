import { Posts } from "@repo/user-feature-posts";

import { getPostList } from "@/libs";

export default async function Page() {
  const posts = await getPostList();

  return <Posts posts={posts} />;
}
