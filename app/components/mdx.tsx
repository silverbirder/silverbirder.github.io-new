import { Link } from "next-view-transitions";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import { highlight } from "sugar-high";
import React from "react";
import remarkGfm from "remark-gfm";

function Table({ children }) {
  return <table className="my-4">{children}</table>;
}

function CustomLink(props) {
  const href = props.href;

  if (href.startsWith("/")) {
    return (
      <Link href={href} {...props} className="text-accent hover:underline">
        {props.children}
      </Link>
    );
  }

  if (href.startsWith("#")) {
    return <a {...props} className="text-accent hover:underline" />;
  }

  return (
    <a
      className="text-accent hover:underline text-xs"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  );
}

function RoundedImage(props) {
  const { alt, ...restProps } = props;
  return (
    <Image
      alt={alt}
      className="rounded-lg object-contain h-48 md:h-64 lg:96"
      {...restProps}
    />
  );
}

function slugify(str) {
  return str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/&/g, "-and-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

function createHeading(level) {
  const Heading = ({ children }) => {
    const slug = slugify(children);
    const className =
      level <= 2
        ? "text-2xl font-bold text-primary my-4"
        : "text-xs font-semibold text-primary my-4";
    return React.createElement(
      `h${level}`,
      { id: slug, className },
      [
        React.createElement("a", {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: "anchor hover:text-accent",
        }),
      ],
      children
    );
  };

  Heading.displayName = `Heading${level}`;

  return Heading;
}

function Paragraph({ children }) {
  return <p className="text-foreground text-xs my-4">{children}</p>;
}

function OrderedList({ children }) {
  return <ol className="text-foreground text-xs my-0">{children}</ol>;
}

function UnorderedList({ children }) {
  return <ul className="text-foreground text-xs my-0">{children}</ul>;
}

function ListItem({ children }) {
  return <li className="text-foreground text-xs my-0">{children}</li>;
}

function Pre({ children }) {
  return <pre className="my-4 py-4 text-xs">{children}</pre>;
}

function Code({ children, ...props }) {
  const codeHTML = highlight(children);

  return (
    <code
      className="leading-3"
      dangerouslySetInnerHTML={{ __html: codeHTML }}
      {...props}
    />
  );
}

function BlockQuote({ children }) {
  return (
    <blockquote className="my-4 text-muted-foreground">{children}</blockquote>
  );
}

function HorizontalRule() {
  return (
    <hr className="h-4 mt-4 mb-0 border-dotted border-t-4 border-border" />
  );
}

const components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Image: RoundedImage,
  a: CustomLink,
  pre: Pre,
  table: Table,
  p: Paragraph,
  ol: OrderedList,
  ul: UnorderedList,
  li: ListItem,
  code: Code,
  blockquote: BlockQuote,
  hr: HorizontalRule,
};

export function CustomMDX(props) {
  return (
    <MDXRemote
      {...props}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
        },
      }}
      components={{ ...components, ...(props.components || {}) }}
    />
  );
}
