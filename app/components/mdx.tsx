import { Link } from "next-view-transitions";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import { highlight } from "sugar-high";
import React from "react";
import NotebookLine from "./notebook-line";

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

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
}

function RoundedImage(props) {
  return <Image alt={props.alt} className="rounded-lg" {...props} />;
}

function Code({ children, ...props }) {
  const codeHTML = highlight(children);
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
}

// function slugify(str) {
//   return str
//     .toString()
//     .toLowerCase()
//     .trim() // Remove whitespace from both ends of a string
//     .replace(/\s+/g, "-") // Replace spaces with -
//     .replace(/&/g, "-and-") // Replace & with 'and'
//     .replace(/[^\w\-]+/g, "") // Remove all non-word characters except for -
//     .replace(/\-\-+/g, "-"); // Replace multiple - with single -
// }

// function createHeading(level) {
//   const Heading = ({ children }) => {
//     const slug = slugify(children);
//     return React.createElement(
//       `h${level}`,
//       { id: slug },
//       [
//         React.createElement("a", {
//           href: `#${slug}`,
//           key: `link-${slug}`,
//           className: "anchor",
//         }),
//       ],
//       children
//     );
//   };

//   Heading.displayName = `Heading${level}`;

//   return Heading;
// }

const components = {
  h1: ({ children }) => (
    <NotebookLine>
      <h1>{children}</h1>
    </NotebookLine>
  ),
  h2: ({ children }) => (
    <NotebookLine>
      <h2>{children}</h2>
    </NotebookLine>
  ),
  h3: ({ children }) => (
    <NotebookLine>
      <h3>{children}</h3>
    </NotebookLine>
  ),
  h4: ({ children }) => (
    <NotebookLine>
      <h4>{children}</h4>
    </NotebookLine>
  ),
  h5: ({ children }) => (
    <NotebookLine>
      <h5>{children}</h5>
    </NotebookLine>
  ),
  h6: ({ children }) => (
    <NotebookLine>
      <h6>{children}</h6>
    </NotebookLine>
  ),
  p: ({ children }) => <NotebookLine>{children}</NotebookLine>,
  Image: RoundedImage,
  a: CustomLink,
  code: Code,
  Table,
};

export function CustomMDX(props) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  );
}
