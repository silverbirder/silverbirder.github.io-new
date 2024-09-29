import { BlogPosts } from "app/components/posts";
import NotebookLine from "app/components/notebook-line";

export default function Page() {
  return (
    <section className="notebook-content">
      <NotebookLine>
        <h1 className="text-2xl font-semibold tracking-tighter">
          My Portfolio
        </h1>
      </NotebookLine>
      <NotebookLine>&nbsp;</NotebookLine>
      <NotebookLine>
        {`I'm a Vim enthusiast and tab advocate, finding unmatched efficiency in`}
      </NotebookLine>
      <NotebookLine>
        {`Vim's keystroke commands and tabs' flexibility for personal viewing`}
      </NotebookLine>
      <NotebookLine>
        {`preferences. This extends to my support for static typing, where its`}
      </NotebookLine>
      <NotebookLine>
        {`early error detection ensures cleaner code, and my preference for dark`}
      </NotebookLine>
      <NotebookLine>
        {`mode, which eases long coding sessions by reducing eye strain.`}
      </NotebookLine>
      <NotebookLine>&nbsp;</NotebookLine>
      <div className="notebook-blog-posts">
        <BlogPosts />
      </div>
    </section>
  );
}
