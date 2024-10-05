import { Link } from "next-view-transitions";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import { highlight } from "sugar-high";
import React from "react";

function Table({ data }) {
  const headers = data.headers.map((header, index) => (
    <th key={index}>{header}</th>
  ));
  const rows = data.rows.map((row, index) => (
    <tr key={index}>
      {row.map((cell, cellIndex) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ));

  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function CustomLink(props) {
  const href = props.href;

  if (href.startsWith("/")) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    );
  }

  if (href.startsWith("#")) {
    return <a {...props} />;
  }

  return (
    <a
      className="text-xs"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  );
}

function RoundedImage(props) {
  return (
    <Image
      className={`rounded-lg object-contain h-48 md:h-64 lg:96`}
      {...props}
    />
  );
}

function slugify(str) {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters except for -
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

function createHeading(level) {
  const Heading = ({ children }) => {
    const slug = slugify(children);
    const className = level <= 2 ? "text-2xl my-4" : "text-xs my-4";
    return React.createElement(
      `h${level}`,
      { id: slug, className },
      [
        React.createElement("a", {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: "anchor",
        }),
      ],
      children
    );
  };

  Heading.displayName = `Heading${level}`;

  return Heading;
}

function Paragraph({ children }) {
  return <p className="text-xs my-4">{children}</p>;
}

function OrderedList({ children }) {
  return <ul className="text-xs my-0">{children}</ul>;
}

function UnorderedList({ children }) {
  return <ul className="text-xs my-0">{children}</ul>;
}

function ListItem({ children }) {
  return <li className="text-xs my-0">{children}</li>;
}

function Pre({ children }) {
  return <pre className="my-4 py-4 text-xs">{children}</pre>;
}

function Code({ children, ...props }) {
  const codeHTML = highlight(children);

  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
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
  Table,
  p: Paragraph,
  ol: OrderedList,
  ul: UnorderedList,
  li: ListItem,
  code: Code,
};

export function CustomMDX(props) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  );
}
