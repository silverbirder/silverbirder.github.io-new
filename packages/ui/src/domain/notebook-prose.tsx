"use client";

import { chakra } from "@chakra-ui/react";

const TRAILING_PSEUDO_REGEX = /(::?[\w-]+(?:\([^)]*\))?)+$/;
const EXCLUDE_CLASSNAME = ".not-prose";
const NOTEBOOK_LINE_HEIGHT = "2rem";
const NOTEBOOK_LINE_COLOR = "var(--chakra-colors-border-muted)";
function inWhere<T extends string>(selector: T): T {
  const rebuiltSelector = selector.startsWith("& ")
    ? selector.slice(2)
    : selector;
  const match = selector.match(TRAILING_PSEUDO_REGEX);
  const pseudo = match ? match[0] : "";
  const base = match ? selector.slice(0, -match[0].length) : rebuiltSelector;
  return `& :where(${base}):not(${EXCLUDE_CLASSNAME}, ${EXCLUDE_CLASSNAME} *)${pseudo}` as T;
}

export const NotebookProse = chakra("div", {
  base: {
    "& .oembed-card": {
      marginBottom: "var(--notebook-line-height)",
      marginTop: "var(--notebook-line-height)",
    },
    "& .oembed-card iframe": {
      display: "block",
      maxWidth: "100%",
      width: "100%",
    },
    '& .oembed-card iframe[src*="youtube.com/embed"], & .oembed-card iframe[src*="youtube-nocookie.com/embed"]':
      {
        height: {
          base: "calc(var(--notebook-line-height) * 7)",
          lg: "calc(var(--notebook-line-height) * 13)",
          md: "calc(var(--notebook-line-height) * 10)",
        },
      },
    "--notebook-line-height": NOTEBOOK_LINE_HEIGHT,
    _dark: {
      [inWhere("& pre code span")]: {
        color: "var(--shiki-dark)",
      },
    },
    backgroundColor: "bg",
    backgroundImage: `repeating-linear-gradient(to bottom, transparent 0, transparent calc(var(--notebook-line-height) - 1px), ${NOTEBOOK_LINE_COLOR} calc(var(--notebook-line-height) - 1px), ${NOTEBOOK_LINE_COLOR} var(--notebook-line-height))`,
    backgroundPosition: "0 0",
    backgroundSize: "100% var(--notebook-line-height)",
    color: "fg.muted",
    fontSize: "sm",
    [inWhere("& :is(h1,h2,h3,h4,h5,hr) + *")]: {
      marginTop: "0",
    },
    [inWhere("& > ol > li > p:first-of-type")]: {
      marginTop: "0em",
    },
    [inWhere("& > ol > li > p:last-of-type")]: {
      marginBottom: "0em",
    },
    [inWhere("& > ol > li p")]: {
      marginBottom: "0",
      marginTop: "0",
    },
    [inWhere("& > ul > li > p:first-of-type")]: {
      marginTop: "0em",
    },
    [inWhere("& > ul > li > p:last-of-type")]: {
      marginBottom: "0em",
    },
    [inWhere("& > ul > li p")]: {
      marginBottom: "0",
      marginTop: "0",
    },
    [inWhere("& a")]: {
      color: "fg",
      fontWeight: "500",
      textDecoration: "underline",
      textDecorationColor: "border.muted",
      textDecorationThickness: "2px",
      textUnderlineOffset: "3px",
    },
    [inWhere("& a strong")]: {
      color: "inherit",
    },
    [inWhere("& blockquote")]: {
      borderInlineStartWidth: "0.25em",
      color: "fg",
      marginBottom: "var(--notebook-line-height)",
      marginTop: "var(--notebook-line-height)",
      paddingInline: "var(--notebook-line-height)",
    },
    [inWhere("& code")]: {
      bg: "bg.muted",
      borderRadius: "md",
      borderWidth: "0",
      fontFamily: "inherit",
      fontSize: "1em",
      letterSpacing: "-0.01em",
      lineHeight: "inherit",
      paddingBlock: "0",
      paddingInline: "0.25em",
    },
    [inWhere("& dd")]: {
      marginTop: "var(--notebook-line-height)",
      paddingInlineStart: "var(--notebook-line-height)",
    },
    [inWhere("& dl")]: {
      marginBottom: "var(--notebook-line-height)",
      marginTop: "var(--notebook-line-height)",
    },
    [inWhere("& dt")]: {
      fontWeight: "600",
      marginTop: "var(--notebook-line-height)",
    },
    [inWhere("& em")]: {
      fontStyle: "italic",
    },
    [inWhere("& figcaption")]: {
      color: "fg.muted",
      fontSize: "0.85em",
      lineHeight: "var(--notebook-line-height)",
      marginTop: "var(--notebook-line-height)",
    },
    [inWhere("& figure")]: {
      marginBottom: "var(--notebook-line-height)",
      marginTop: "var(--notebook-line-height)",
    },
    [inWhere("& figure > *")]: {
      marginBottom: "0",
      marginTop: "0",
    },
    [inWhere("& h1")]: {
      fontSize: "2.15em",
      letterSpacing: "-0.02em",
      lineHeight: "var(--notebook-line-height)",
      marginBottom: "var(--notebook-line-height)",
      marginTop: "0",
    },
    [inWhere("& h1, h2, h3, h4, h5, h6")]: {
      color: "fg",
      fontWeight: "600",
    },
    [inWhere("& h2")]: {
      fontSize: "1.65em",
      letterSpacing: "-0.02em",
      lineHeight: "var(--notebook-line-height)",
      marginBottom: "var(--notebook-line-height)",
      marginTop: "var(--notebook-line-height)",
    },
    [inWhere("& h2 code")]: {
      fontSize: "0.9em",
    },
    [inWhere("& h3")]: {
      fontSize: "1.35em",
      letterSpacing: "-0.01em",
      lineHeight: "var(--notebook-line-height)",
      marginBottom: "var(--notebook-line-height)",
      marginTop: "var(--notebook-line-height)",
    },
    [inWhere("& h3 code")]: {
      fontSize: "0.8em",
    },
    [inWhere("& h4")]: {
      letterSpacing: "-0.01em",
      lineHeight: "var(--notebook-line-height)",
      marginBottom: "var(--notebook-line-height)",
      marginTop: "var(--notebook-line-height)",
    },
    [inWhere("& hr")]: {
      border: "0",
      height: "0",
      marginBottom: "var(--notebook-line-height)",
      marginTop: "var(--notebook-line-height)",
      position: "relative",
    },
    [inWhere("& hr::after")]: {
      borderTopColor: "border.muted",
      borderTopStyle: "solid",
      borderTopWidth: "1px",
      content: '""',
      insetInline: "0",
      position: "absolute",
      top: "0",
    },
    [inWhere("& img")]: {
      borderRadius: "lg",
      boxShadow: "inset",
      marginBottom: "var(--notebook-line-height)",
      marginTop: "var(--notebook-line-height)",
    },
    [inWhere("& kbd")]: {
      "--shadow": "colors.border",
      borderRadius: "xs",
      boxShadow: "0 0 0 1px var(--shadow), 0 1px 0 1px var(--shadow)",
      color: "fg.muted",
      fontFamily: "inherit",
      fontSize: "1em",
      lineHeight: "inherit",
      paddingBlock: "0",
      paddingInlineEnd: "0.35em",
      paddingInlineStart: "0.35em",
    },
    [inWhere("& li")]: {
      lineHeight: "var(--notebook-line-height)",
      marginBottom: "0",
      marginTop: "0",
    },
    [inWhere("& ol")]: {
      marginBottom: "var(--notebook-line-height)",
      marginTop: "var(--notebook-line-height)",
      paddingInlineStart: "var(--notebook-line-height)",
    },
    [inWhere("& ol > li")]: {
      "&::marker": {
        color: "fg.muted",
      },
      listStyleType: "decimal",
      paddingInlineStart: "0.4em",
    },
    [inWhere("& p")]: {
      lineHeight: "var(--notebook-line-height)",
      marginBottom: "var(--notebook-line-height)",
      marginTop: "var(--notebook-line-height)",
    },
    [inWhere("& picture")]: {
      marginBottom: "var(--notebook-line-height)",
      marginTop: "var(--notebook-line-height)",
    },
    [inWhere("& picture > img")]: {
      marginBottom: "0",
      marginTop: "0",
    },
    [inWhere("& pre")]: {
      backgroundColor: "bg.muted",
      fontFamily: "var(--chakra-fonts-mono)",
      fontSize: "0.9em",
      fontWeight: "400",
      lineHeight: "var(--notebook-line-height)",
      marginBottom: "var(--notebook-line-height)",
      marginTop: "var(--notebook-line-height)",
      overflowX: "auto",
      paddingBottom: "var(--notebook-line-height)",
      paddingInlineEnd: "var(--notebook-line-height)",
      paddingInlineStart: "var(--notebook-line-height)",
      paddingTop: "var(--notebook-line-height)",
    },
    [inWhere("& pre [data-line]")]: {
      display: "block",
      minHeight: "1em",
      paddingInlineEnd: "calc(var(--notebook-line-height) / 2)",
    },
    [inWhere("& pre code")]: {
      bg: "transparent",
      borderWidth: "inherit",
      fontFamily: "inherit",
      fontSize: "inherit",
      letterSpacing: "inherit",
      lineHeight: "inherit",
      padding: "0",
    },
    [inWhere("& pre code span")]: {
      color: "var(--shiki-light)",
    },
    [inWhere("& strong")]: {
      fontWeight: "600",
    },
    [inWhere("& table")]: {
      borderCollapse: "separate",
      borderSpacing: "0",
      lineHeight: "var(--notebook-line-height)",
      marginBottom: "var(--notebook-line-height)",
      marginTop: "var(--notebook-line-height)",
      tableLayout: "auto",
      textAlign: "start",
      width: "100%",
    },
    [inWhere("& tbody td, tfoot td")]: {
      paddingBlock: "calc(var(--notebook-line-height) / 2)",
      paddingInlineEnd: "1em",
      paddingInlineStart: "1em",
    },
    [inWhere("& tbody td:first-of-type, tfoot td:first-of-type")]: {
      paddingInlineStart: "0",
    },
    [inWhere("& tbody td:last-of-type, tfoot td:last-of-type")]: {
      paddingInlineEnd: "0",
    },
    [inWhere("& tbody tr")]: {
      borderBottomColor: "border",
      borderBottomWidth: "1px",
    },
    [inWhere("& thead")]: {
      borderBottomWidth: "1px",
      color: "fg",
    },
    [inWhere("& thead th")]: {
      fontWeight: "medium",
      paddingBlock: "calc(var(--notebook-line-height) / 2)",
      paddingInlineEnd: "1em",
      paddingInlineStart: "1em",
      textAlign: "start",
    },
    [inWhere("& thead th:first-of-type")]: {
      paddingInlineStart: "0",
    },
    [inWhere("& thead th:last-of-type")]: {
      paddingInlineEnd: "0",
    },
    [inWhere("& ul")]: {
      marginBottom: "var(--notebook-line-height)",
      marginTop: "var(--notebook-line-height)",
      paddingInlineStart: "var(--notebook-line-height)",
    },
    [inWhere("& ul > li")]: {
      "&::marker": {
        color: "fg.muted",
      },
      listStyleType: "disc",
      paddingInlineStart: "0.4em",
    },
    [inWhere("& ul ul, ul ol, ol ul, ol ol")]: {
      marginBottom: "0",
      marginTop: "0",
    },
    [inWhere("& video")]: {
      marginBottom: "var(--notebook-line-height)",
      marginTop: "var(--notebook-line-height)",
    },
    lineHeight: "var(--notebook-line-height)",
    maxWidth: "42rem",
  },
  defaultVariants: {
    size: "md",
  },
  variants: {
    size: {
      lg: {
        fontSize: "md",
      },
      md: {
        fontSize: "sm",
      },
    },
  },
});
