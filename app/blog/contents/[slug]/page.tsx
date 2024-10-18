import { notFound } from "next/navigation";
import { CustomMDX } from "app/components/mdx";
import { baseUrl } from "app/sitemap";
import { NotebookLayout } from "@/components/notebook-layout";
import { getBlogPosts } from "@/lib/blog";
import { formatDate } from "@/lib/utils";
import dynamic from "next/dynamic";

export async function generateStaticParams() {
  const posts = getBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export function generateMetadata({ params }) {
  const post = getBlogPosts().find((post) => post.slug === params.slug);
  if (!post) {
    return;
  }

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;
  const ogImage = image
    ? image
    : `${baseUrl}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${baseUrl}/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

const DiscusNoSSR = dynamic(() => import("@/lib/discus"), {
  ssr: false,
});

export default function Blog({ params }) {
  const post = getBlogPosts().find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `${baseUrl}${post.metadata.image}`
              : `/og?title=${encodeURIComponent(post.metadata.title)}`,
            url: `${baseUrl}/blog/${post.slug}`,
            author: {
              "@type": "Person",
              name: "silverbirder",
            },
          }),
        }}
      />
      <NotebookLayout title={"ブログ"} pathname={"/blog"}>
        <div className="flex flex-col items-start mb-6 leading-12">
          <h2 className="font-semibold text-2xl leading-[3rem]">
            {post.metadata.title}
          </h2>
          <p className="self-end text-xs leading-6 text-muted">
            {formatDate(post.metadata.publishedAt)}
          </p>
        </div>
        <article className="prose max-w-none">
          <CustomMDX source={post.content} />
        </article>
      </NotebookLayout>
      <div>
        <DiscusNoSSR url={`${baseUrl}/blog/contents/${params.slug}/`} />
      </div>
    </>
  );
}
