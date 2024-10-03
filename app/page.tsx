"use client";

import Spiral from "./components/char/spiral";
import Link from "next/link";
import { useState } from "react";
import { Pencil, Wrench, Twitter, Github } from "lucide-react";

const StickyNote = ({ href, title, color, Icon }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={href}
      className={`
        ${color}
        transform transition-all duration-300 ease-in-out
        ${isHovered ? "rotate-0 scale-105 z-10" : "rotate-2"}
        p-2 shadow-md hover:shadow-lg
        flex flex-col items-center justify-center
        w-16 h-16 text-center
        font-bold text-gray-800
        relative
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Icon className="w-4 h-4 mb-1 transition-transform duration-300 ease-in-out transform hover:scale-125" />
      <span className="text-xs transition-all duration-300 ease-in-out transform hover:scale-110">
        {title}
      </span>
    </Link>
  );
};

export default function Page() {
  return (
    <section>
      <div className="mb-4 text-2xl font-semibold tracking-tighter leading-8 flex items-center">
        <h1>私の個人サイト</h1>
        <Spiral
          className="h-8 ml-4"
          startDelay={0.0}
          duration={3.0}
          strokeColor="stroke-rose-500"
        />
      </div>
      <div className="mb-8 flex items-center">
        <p className="leading-4">
          ようこそ！私は@silverbirderです。ウェブ開発と甘味が大好きなWebエンジニアです。
        </p>
      </div>
      <div className="flex flex-wrap justify-start gap-4">
        <StickyNote
          href="/blog"
          title="ブログ"
          color="bg-yellow-200"
          Icon={Pencil}
        />
        <StickyNote
          href="/artifacts"
          title="成果物"
          color="bg-green-200"
          Icon={Wrench}
        />
        <StickyNote
          href="https://x.com/silverbirder"
          title="Twitter"
          color="bg-blue-200"
          Icon={Twitter}
        />
        <StickyNote
          href="https://github.com/silverbirder"
          title="GitHub"
          color="bg-purple-200"
          Icon={Github}
        />
      </div>
    </section>
  );
}
