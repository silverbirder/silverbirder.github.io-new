"use client";

import type { ReactNode } from "react";

import { chakra } from "@chakra-ui/react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  EmbeddedTweet,
  TweetNotFound,
  TweetSkeleton,
  useTweet,
} from "react-tweet";

type Props = {
  apiUrl?: string;
  fallback?: ReactNode;
  id: string;
};

const resolveNotebookLineHeightPx = () => {
  if (typeof window === "undefined") {
    return null;
  }
  const rootFontSize = window.getComputedStyle(
    document.documentElement,
  ).fontSize;
  const rootFontSizePx = Number.parseFloat(rootFontSize);
  if (!Number.isFinite(rootFontSizePx) || rootFontSizePx <= 0) {
    return null;
  }
  return rootFontSizePx * 2;
};

const computePaddingToNextMultiple = (heightPx: number, unitPx: number) => {
  if (!Number.isFinite(heightPx) || !Number.isFinite(unitPx) || unitPx <= 0) {
    return 0;
  }
  const remainder = heightPx % unitPx;
  if (remainder < 0.5 || unitPx - remainder < 0.5) {
    return 0;
  }
  return unitPx - remainder;
};

export const TweetEmbed = ({
  apiUrl,
  fallback = <TweetSkeleton />,
  id,
}: Props) => {
  const { data, error, isLoading } = useTweet(id, apiUrl);

  const outerRef = useRef<HTMLDivElement | null>(null);
  const [paddingBottomPx, setPaddingBottomPx] = useState(0);

  const notebookLineHeightPx = useMemo(() => resolveNotebookLineHeightPx(), []);

  useEffect(() => {
    if (!notebookLineHeightPx) {
      return;
    }

    const outer = outerRef.current;
    if (!outer) {
      return;
    }

    let rafId = 0;
    const update = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      rafId = requestAnimationFrame(() => {
        const measuredOuter = outer.getBoundingClientRect().height;
        const measuredBase = Math.max(0, measuredOuter - paddingBottomPx);
        const nextPadding = computePaddingToNextMultiple(
          measuredBase,
          notebookLineHeightPx,
        );
        setPaddingBottomPx((prev) =>
          Math.abs(prev - nextPadding) < 0.5 ? prev : nextPadding,
        );
      });
    };

    update();

    if (typeof ResizeObserver === "undefined") {
      return () => {
        if (rafId) cancelAnimationFrame(rafId);
      };
    }

    const observer = new ResizeObserver(() => {
      update();
    });
    observer.observe(outer);

    return () => {
      observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [notebookLineHeightPx, isLoading, error, data, paddingBottomPx]);

  return (
    <chakra.div
      className="oembed-card not-prose"
      data-embed="tweet"
      data-tweet-id={id}
      display="flow-root"
      paddingBottom={paddingBottomPx ? `${paddingBottomPx}px` : undefined}
      ref={outerRef}
    >
      {isLoading ? (
        fallback
      ) : error || !data ? (
        <TweetNotFound error={error} />
      ) : (
        <EmbeddedTweet tweet={data} />
      )}
    </chakra.div>
  );
};
