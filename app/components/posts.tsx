"use client";

import { formatDate, type Metadata } from "@/lib/utils";
import { Link } from "next-view-transitions";
import { useState, useMemo } from "react";

type Props = {
  allBlogs: {
    metadata: Metadata;
    slug: string;
    content: string;
  }[];
};

export function BlogPosts({ allBlogs }: Props) {
  const [selectedYear, setSelectedYear] = useState<number | null>(
    new Date().getFullYear()
  );

  const blogsByYear = useMemo(() => {
    const sorted = allBlogs.sort(
      (a, b) =>
        new Date(b.metadata.publishedAt).getTime() -
        new Date(a.metadata.publishedAt).getTime()
    );

    return sorted.reduce((acc, post) => {
      const year = new Date(post.metadata.publishedAt).getFullYear();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(post);
      return acc;
    }, {} as Record<number, typeof allBlogs>);
  }, [allBlogs]);

  const years = Object.keys(blogsByYear)
    .map(Number)
    .sort((a, b) => b - a);

  const filteredBlogs = selectedYear ? blogsByYear[selectedYear] : allBlogs;

  return (
    <div className="flex">
      <div className="flex flex-col border-r border-background">
        {years.map((year) => (
          <button
            key={year}
            className={`w-full mb-4 px-2 text-xs text-left  ${
              selectedYear === year
                ? "bg-primary text-primary-foreground"
                : "hover:bg-primary hover:text-primary-foreground"
            }`}
            onClick={() => setSelectedYear(year === selectedYear ? null : year)}
          >
            {year}
          </button>
        ))}
      </div>
      <div className="flex-grow pl-4">
        {filteredBlogs.map((post) => (
          <Link
            key={post.slug}
            className="flex flex-col mb-4"
            href={`/blog/${post.slug}`}
          >
            <div className="flex flex-row">
              <p className="text-foreground tracking-tight leading-4">
                {post.metadata.title} - {formatDate(post.metadata.publishedAt)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
