import { notFound } from "next/navigation";

import { getPostSlugs } from "@/libs";

const loadPost = async (slug: string) => {
  return import(`./${slug}.md`);
};

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function Page(props: PageProps<"/blog/contents/[slug]">) {
  const { slug } = await props.params;

  try {
    const { default: Post } = await loadPost(slug);
    return (
      <article>
        <Post />
      </article>
    );
  } catch {
    notFound();
  }
}

export const dynamicParams = false;
