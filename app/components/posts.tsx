import { Link } from "next-view-transitions";
import { formatDate, getBlogPosts } from "app/blog/utils";
import NotebookLine from "./notebook-line";

export function BlogPosts() {
  const allBlogs = getBlogPosts();

  return (
    <div className="notebook-blog-posts">
      {allBlogs
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1;
          }
          return 1;
        })
        .map((post) => (
          <Link
            key={post.slug}
            className="block text-neutral-900 dark:text-neutral-100 hover:underline"
            href={`/blog/${post.slug}`}
          >
            <NotebookLine>
              <div className="flex flex-col md:flex-row md:items-center">
                <span className="text-neutral-600 dark:text-neutral-400 w-[100px] tabular-nums mr-4">
                  {formatDate(post.metadata.publishedAt, false)}
                </span>
                <span className="tracking-tight">{post.metadata.title}</span>
              </div>
            </NotebookLine>
          </Link>
        ))}
    </div>
  );
}
