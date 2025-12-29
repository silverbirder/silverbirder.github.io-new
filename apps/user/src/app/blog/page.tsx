import Link from "next/link";

import { getPostSlugs } from "@/libs";

export default async function Page() {
  const slugs = await getPostSlugs();

  return (
    <main>
      <h1>Blog</h1>
      <ul>
        {slugs.map((slug) => (
          <li key={slug}>
            <Link href={`/blog/contents/${slug}`}>{slug}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
